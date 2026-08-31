"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  applyNodeChanges,
  Background,
  ReactFlow,
  ViewportPortal,
  type Node,
  type NodeChange,
  type ReactFlowInstance,
} from "@xyflow/react";
import { LAYOUT_GAP, layoutTree, type LayoutItem } from "@/lib/layout";
import { planClaim } from "@/lib/membership";
import { snapToNeighbors, type Guide, type SnapRect } from "@/lib/snap";
import { lineageOf } from "@/lib/topology";
import type {
  GraphBackdropData,
  GraphEdgeData,
  GraphNodeData,
  NodeKind,
} from "../types";
import BackdropNode from "./BackdropNode";
import KnowledgeNode from "./KnowledgeNode";
import { HoverHighlightContext } from "./hoverContext";
import {
  BACKDROP_PAD,
  BACKDROP_TITLE,
  collapsedWidth,
  buildFlowGraph,
  cardHeight,
  frameDescendants,
  hiddenByOf,
  outerFrames,
  layoutEdges,
  toFlowEdges,
} from "./toFlow";
import { cardWidth } from "./KnowledgeNode";
import styles from "./KnowledgeGraph.module.css";

const nodeTypes = { knowledge: KnowledgeNode, backdrop: BackdropNode };

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2.5;

/** 펴고 나서 자리가 잡히기까지 — 이동·열기는 이만큼 뒤에 시작해야 한다 */
const REVEAL_SETTLE = 160;

/** 바깥(소개 시트 등)에서 그래프에 시킬 수 있는 일 */
export interface GraphHandle {
  /**
   * 이 노드를 화면에 존재하게 만든다 — 접힌 틀 안에 있으면 그 틀을 편다.
   *
   * 카메라는 건드리지 않는다. 어디로 데려가고 무엇을 열지는 부르는 쪽의 몫이라,
   * 노드로 가는 동작(이동 → 열림)은 어디서 왔든 하나로 유지된다.
   * 돌려주는 값은 자리가 잡히기까지 기다려야 하는 ms — 0이면 이미 보이는 노드다.
   */
  reveal: (nodeId: string) => number;
}

function rectOf(node: Node): SnapRect {
  return {
    x: node.position.x,
    y: node.position.y,
    width: node.measured?.width ?? 180,
    height: node.measured?.height ?? 56,
  };
}

interface KnowledgeGraphProps {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  /** 클러스터 백드랍 — 멤버 노드 위치에서 프레임이 계산됨 */
  backdrops?: GraphBackdropData[];
  /** 호버 시 이웃 외 흐리기 */
  hoverHighlight?: boolean;
  /** fitView 여백 (0~1). 좁은 판에서는 크게 */
  fitPadding?: number;
  /** 정렬 버튼 등 컨트롤 표시 — 배경용(글 페이지)에서는 끈다 */
  showControls?: boolean;
  /**
   * 이 노드를 중심으로 뷰를 맞추고, 그 이웃 밖은 흐린다.
   * 글 페이지 배경: 읽는 중인 트러블 노드의 실제 연결선이 보이게.
   */
  focusNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
  /** 뷰포트 제어(클릭 시 줌인 등)가 필요한 부모에게 인스턴스와 손잡이를 넘긴다 */
  onReady?: (instance: ReactFlowInstance, graph: GraphHandle) => void;
}

export default function KnowledgeGraph({
  nodes,
  edges,
  backdrops = [],
  hoverHighlight = false,
  fitPadding = 0.08,
  showControls = true,
  focusNodeId,
  onNodeClick,
  onReady,
}: KnowledgeGraphProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);

  /* 접힘은 데이터가 아니라 뷰다 — 그래프는 그대로 두고 무엇을 가릴지만 정한다.
     처음 상태는 백드랍 객체가 들고 있고(collapsed), 그 뒤로는 여기서 관리한다. */
  const initialCollapsed = useMemo(
    () => backdrops.filter((frame) => frame.collapsed).map((frame) => frame.id),
    [backdrops],
  );
  const [collapsed, setCollapsed] = useState<Set<string>>(
    () => new Set(initialCollapsed),
  );
  useEffect(() => setCollapsed(new Set(initialCollapsed)), [initialCollapsed]);

  const toggleFrame = (id: string) =>
    setCollapsed((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  /* 접힌 틀이 가리는 노드 → 그 틀 id. 바깥 틀부터 정한다 —
     한 곳에만 붙어야 옮겨 그린 선이 두 갈래로 갈라지지 않는다. */
  const hiddenBy = useMemo(
    () => hiddenByOf(backdrops, (id) => collapsed.has(id)),
    [backdrops, collapsed],
  );

  /**
   * 갈래를 따질 때 보는 간선 — 화면에 그려진 것과 같아야 한다.
   *
   * 원본 간선으로 따지면 접힌 틀은 갈래에 들어오지 못한다. 민엽에 올렸을 때
   * 이론 쪽이 살아나지 않던 것이 이 때문이었다 — 선은 민엽에서 틀로 옮겨 그려져
   * 있는데, 갈래는 여전히 틀 안의 숨은 노드를 찾고 있었다.
   */
  const directedEdges = useMemo(
    () =>
      edges
        .map((edge) => ({
          source: hiddenBy.get(edge.from) ?? edge.from,
          target: hiddenBy.get(edge.to) ?? edge.to,
        }))
        /* 양끝이 같은 틀로 들어간 것 — 밖에서는 없는 연결이다 */
        .filter((edge) => edge.source !== edge.target),
    [edges, hiddenBy],
  );

  /* 드래그가 실제로 반영되려면 노드 상태를 우리가 들고 변경을 적용해야 한다.
     데이터(필터 등)가 바뀌면 배치는 초기 좌표로 되돌아간다. */
  /* 초기 배치부터 layoutTree — "정렬" 버튼과 같은 규칙으로 시작한다 */
  const baseNodes = useMemo<Node[]>(
    () => buildFlowGraph(nodes, edges, backdrops),
    [nodes, edges, backdrops],
  );
  const [rfNodes, setRfNodes] = useState<Node[]>(baseNodes);
  useEffect(() => setRfNodes(baseNodes), [baseNodes]);
  const instanceRef = useRef<ReactFlowInstance | null>(null);

  /* 그리기 직전에 접힘을 입힌다. 가려진 노드는 hidden, 접힌 틀은 카드 한 장
     크기로 줄인다 — rfNodes(진짜 배치)는 건드리지 않으므로 펴면 그대로 돌아온다. */
  const viewNodes = useMemo<Node[]>(
    () =>
      rfNodes.map((node) => {
        if (hiddenBy.has(node.id)) return { ...node, hidden: true };
        if (node.type !== "backdrop") return node;
        const isCollapsed = collapsed.has(node.id);
        if (!isCollapsed) {
          return {
            ...node,
            data: { ...node.data, collapsed: false, onToggle: () => toggleFrame(node.id) },
          };
        }
        return {
          ...node,
          data: {
            ...node.data,
            collapsed: true,
            onToggle: () => toggleFrame(node.id),
          },
          style: {
            ...node.style,
            width: collapsedWidth((node.data as { tint: NodeKind }).tint),
            height: BACKDROP_TITLE,
          },
        };
      }),
    [rfNodes, hiddenBy, collapsed],
  );

  /* 자동 정렬 — asset-pipeline의 layoutTree: 틀(백드랍)을 하나의 덩어리로
     안쪽부터 늘어놓는다. 그래서 틀끼리 절대 겹치지 않는다.
     깊이(최장 경로)가 열을 정하고, 열 안의 순서는 지금 순서를 유지하며,
     순환이 있으면 손대지 않는다. */
  const relayout = (folded: ReadonlySet<string>, fit = true) => {
    const nodeById = new Map(rfNodes.map((node) => [node.id, node]));
    const leafItem = (id: string): LayoutItem | null => {
      const node = nodeById.get(id);
      if (!node || node.type !== "knowledge") return null;
      /* 방금 펼쳐진 노드는 아직 그려지지 않아 재어 둔 크기가 없다.
         그때는 초기 배치와 같은 추정치를 쓴다 — 재고 나면 틀 맞춤이 바로잡는다 */
      const data = node.data as GraphNodeData;
      return {
        id,
        width: node.measured?.width ?? cardWidth(data),
        height: node.measured?.height ?? cardHeight(data),
        y: node.position.y,
      };
    };
    const leafItems = (ids: readonly string[]): LayoutItem[] =>
      ids.map(leafItem).filter((item): item is LayoutItem => item !== null);

    const byFrame = new Map(backdrops.map((frame) => [frame.id, frame]));

    /* 틀 하나를 배치 항목으로 — 안에 틀이 있으면 그것도 항목으로 내려간다.
       접힌 틀만은 잎 하나다: 안쪽이 숨었으니 자리도 카드 한 장만 차지한다 */
    const frameItem = (backdrop: GraphBackdropData): LayoutItem | null => {
      const frameNode = nodeById.get(backdrop.id);
      if (folded.has(backdrop.id)) {
        return {
          id: backdrop.id,
          width: collapsedWidth(backdrop.tint),
          height: BACKDROP_TITLE,
          y: frameNode?.position.y ?? 0,
        };
      }
      const children = backdrop.clusters
        ? backdrop.clusters
            .map((cluster): LayoutItem | null => {
              const inner = leafItems(cluster.members);
              if (inner.length === 0) return null;
              return {
                id: cluster.id,
                width: 0,
                height: 0,
                y: Math.min(...inner.map((item) => item.y)),
                children: inner,
              };
            })
            .filter((item): item is LayoutItem => item !== null)
        : backdrop.members
            .map((id) => {
              const inner = byFrame.get(id);
              return inner ? frameItem(inner) : leafItem(id);
            })
            .filter((item): item is LayoutItem => item !== null);
      if (children.length === 0) return null;
      return {
        id: backdrop.id,
        width: 0,
        height: 0,
        y: frameNode?.position.y ?? 0,
        children,
      };
    };

    const framed = new Set(
      backdrops.flatMap((frame) => frameDescendants(frame, byFrame)),
    );
    const items: LayoutItem[] = [
      /* 어느 틀에도 안 담긴 노드(민엽)는 잎으로 */
      ...leafItems(
        nodes.map((node) => node.id).filter((id) => !framed.has(id)),
      ),
      ...outerFrames(backdrops)
        .map(frameItem)
        .filter((item): item is LayoutItem => item !== null),
    ];

    /* 접힌 상자는 안쪽 노드의 선을 자기 것으로 읽어야 깊이가 정해진다 */
    const folding = hiddenByOf(backdrops, (id) => folded.has(id));
    const tree = layoutTree(items, layoutEdges(edges, folding), LAYOUT_GAP, {
      top: BACKDROP_PAD + BACKDROP_TITLE,
      side: BACKDROP_PAD,
    });
    if (!tree) return;

    setRfNodes((current) =>
      current.map((node) => {
        const at = tree.positions.get(node.id);
        if (!at) return node;
        if (node.type === "knowledge") return { ...node, position: at };
        /* 접힌 틀의 크기는 그리기 단계가 정한다 — 여기서 되돌리면 다시 펴진다 */
        if (folded.has(node.id)) return { ...node, position: at };
        const size = tree.sizes.get(node.id);
        return size
          ? {
              ...node,
              position: at,
              style: { ...node.style, width: size.width, height: size.height },
            }
          : { ...node, position: at };
      }),
    );
    if (!fit) return;
    /* 새 좌표가 커밋된 뒤에 화면을 맞춘다 */
    requestAnimationFrame(() =>
      instanceRef.current?.fitView({ padding: fitPadding, duration: 420 }),
    );
  };

  const tidyUp = () => relayout(collapsed);

  /**
   * 접거나 펴면 자리를 다시 잡는다.
   *
   * 접힌 틀은 배치에 잎 하나로 들어가므로 안쪽 노드는 자리를 받지 못한다.
   * 그대로 펴면 데이터 원좌표에 그려져 다른 것들과 겹친다 — 펴는 순간
   * 다시 늘어놓아야 안쪽이 제자리를 찾는다.
   */
  /* 펴 달라는 요청이 걸려 있는 노드 — 이게 있으면 전체 맞춤을 건너뛴다 */
  const pendingRevealRef = useRef<string | null>(null);

  const foldedRef = useRef(collapsed);
  useEffect(() => {
    if (foldedRef.current === collapsed) return;
    foldedRef.current = collapsed;
    const requested = pendingRevealRef.current !== null;
    pendingRevealRef.current = null;
    /* 부른 쪽이 그 노드로 데려갈 참이면 전체 맞춤은 하지 않는다 — 두 전이가 부딪힌다 */
    relayout(collapsed, !requested);
  });

  /* 바깥에서 쓰는 손잡이. 객체는 그대로 두고 안의 함수만 최신 것을 가리킨다 —
     onReady는 한 번만 불리므로 그때 넘긴 객체가 계속 살아 있어야 한다 */
  const reveal = (nodeId: string): number => {
    const byFrame = new Map(backdrops.map((frame) => [frame.id, frame]));
    const owners = backdrops.filter(
      (frame) =>
        collapsed.has(frame.id) &&
        frameDescendants(frame, byFrame).includes(nodeId),
    );
    /* 이미 보이는 노드면 기다릴 것이 없다 */
    if (owners.length === 0) return 0;
    pendingRevealRef.current = nodeId;
    setCollapsed((current) => {
      const next = new Set(current);
      for (const frame of owners) next.delete(frame.id);
      return next;
    });
    return REVEAL_SETTLE;
  };
  const revealRef = useRef(reveal);
  revealRef.current = reveal;
  const handle = useRef<GraphHandle>({
    reveal: (nodeId) => revealRef.current(nodeId),
  }).current;

  /* 틀의 처음 크기가 곧 최소 크기 — 멤버가 나가면 늘어나고, 돌아오면
     여기까지만 줄어든다 (원작의 minWidth/minHeight 규칙) */
  const frameFloors = useMemo(() => {
    const floors = new Map<string, { width: number; height: number }>();
    for (const node of baseNodes) {
      if (node.type !== "backdrop") continue;
      floors.set(node.id, {
        width: Number(node.style?.width ?? 0),
        height: Number(node.style?.height ?? 0),
      });
    }
    return floors;
  }, [baseNodes]);

  /**
   * 화면에서 차지하는 크기.
   *
   * 노드는 그려진 것을 잰 값, 틀은 스스로 정해 둔 값이다. 접힌 틀만 예외로
   * 그려진 값을 쓴다 — 접으면 크기가 내용이 아니라 카드 한 장에 맞춰지므로
   * 정해 둔 폭·높이는 지금 화면과 상관이 없다. 접어서 아낀 자리만큼이
   * 바깥 틀의 빈 여백이 되면 접은 보람이 없다.
   */
  const measuredSize = (node: Node) => {
    if (node.type === "backdrop" && !collapsed.has(node.id)) {
      return {
        width: Number(node.style?.width ?? 0),
        height: Number(node.style?.height ?? 0),
      };
    }
    return {
      width:
        node.measured?.width ??
        (node.type === "backdrop"
          ? collapsedWidth((node.data as { tint: NodeKind }).tint)
          : 180),
      height: node.measured?.height ?? (node.type === "backdrop" ? BACKDROP_TITLE : 56),
    };
  };

  /* 틀 맞춤: 틀을 멤버들의 바운딩에 맞춘다 */
  const fitFrames = (list: Node[]): Node[] => {
    const byId = new Map(list.map((node) => [node.id, node]));
    return list.map((node) => {
      if (node.type !== "backdrop") return node;
      /* 접힌 틀은 크기가 내용이 아니라 카드 한 장에 맞춰져 있다 */
      if (collapsed.has(node.id)) return node;
      /* 안쪽에 틀이 있으면 그 틀을 감싼다 — 노드만 보면 바깥 틀이
         안쪽 틀의 제목 줄을 잘라먹는다 */
      const members = memberIdsOf(node)
        .map((id) => byId.get(id))
        .filter(
          (member): member is Node =>
            member !== undefined && !member.hidden && member.id !== node.id,
        );
      if (members.length === 0) return node;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const member of members) {
        const size = measuredSize(member);
        minX = Math.min(minX, member.position.x);
        minY = Math.min(minY, member.position.y);
        maxX = Math.max(maxX, member.position.x + size.width);
        maxY = Math.max(maxY, member.position.y + size.height);
      }

      const floor = frameFloors.get(node.id);
      const width = Math.max(
        maxX - minX + BACKDROP_PAD * 2,
        floor?.width ?? 0,
      );
      const height = Math.max(
        maxY - minY + BACKDROP_PAD * 2 + BACKDROP_TITLE,
        floor?.height ?? 0,
      );
      const x = minX - BACKDROP_PAD;
      const y = minY - BACKDROP_PAD - BACKDROP_TITLE;
      if (
        node.position.x === x &&
        node.position.y === y &&
        Number(node.style?.width) === width &&
        Number(node.style?.height) === height
      ) {
        return node;
      }
      return {
        ...node,
        position: { x, y },
        style: { ...node.style, width, height },
      };
    });
  };

  const handleNodesChange = (changes: NodeChange[]) =>
    setRfNodes((current) => fitFrames(applyNodeChanges(changes, current)));

  /* 백드랍 타이틀 바 드래그: 멤버 노드(안쪽 백드랍 포함)가 함께 움직인다 */
  const dragStartRef = useRef<{
    id: string;
    origin: { x: number; y: number };
    followers: Map<string, { x: number; y: number }>;
  } | null>(null);

  const memberIdsOf = (node: Node): string[] =>
    (node.data as { memberIds?: string[] }).memberIds ?? [];

  /* 드래그 중에는 호버를 잠근다 — 빠르게 끌면 포인터가 노드를 들락거리며
     mouseenter/leave가 연타되고, 갈래 하이라이트가 깜빡인다 */
  const isDraggingRef = useRef(false);

  const handleNodeDragStart = (_: unknown, node: Node) => {
    isDraggingRef.current = true;
    if (node.type === "knowledge") setHoveredId(node.id);
    if (node.type !== "backdrop") return;
    const members = new Set(memberIdsOf(node));
    const followers = new Map<string, { x: number; y: number }>();
    for (const other of rfNodes) {
      if (other.id === node.id) continue;
      const nested =
        other.type === "backdrop" &&
        memberIdsOf(other).length > 0 &&
        memberIdsOf(other).every((id) => members.has(id));
      if (members.has(other.id) || nested) {
        followers.set(other.id, { ...other.position });
      }
    }
    dragStartRef.current = { id: node.id, origin: { ...node.position }, followers };
  };

  /* Shift + 드래그: 이웃 노드의 시작·가운데·끝 선에 자석처럼 붙는다 */
  const handleNodeDrag = (
    event: MouseEvent | React.MouseEvent | TouchEvent,
    node: Node,
  ) => {
    if (node.type === "backdrop") {
      const start = dragStartRef.current;
      if (!start || start.id !== node.id) return;
      const dx = node.position.x - start.origin.x;
      const dy = node.position.y - start.origin.y;
      setRfNodes((current) =>
        current.map((candidate) => {
          const from = start.followers.get(candidate.id);
          return from
            ? { ...candidate, position: { x: from.x + dx, y: from.y + dy } }
            : candidate;
        }),
      );
      return;
    }
    if (!("shiftKey" in event)) return;
    if (!event.shiftKey || node.type !== "knowledge") {
      if (guides.length > 0) setGuides([]);
      return;
    }
    const others = rfNodes
      .filter((other) => other.type === "knowledge" && other.id !== node.id)
      .map(rectOf);
    const result = snapToNeighbors(rectOf(node), others);
    setGuides(result.guides);
    if (result.dx !== 0 || result.dy !== 0) {
      const snapped = {
        x: node.position.x + result.dx,
        y: node.position.y + result.dy,
      };
      setRfNodes((current) =>
        current.map((candidate) =>
          candidate.id === node.id
            ? { ...candidate, position: snapped }
            : candidate,
        ),
      );
    }
  };

  /* 틀 안에 떨어뜨리면 들어온다 — 가운데 기준, 다른 틀에서는 빠진다(단일 소속).
     밖으로 끌어내는 것만으로는 빠지지 않는다 (원작 규칙). */
  const claimOnDrop = (node: Node) => {
    if (node.type !== "knowledge") return;
    setRfNodes((current) => {
      const frames = current.filter((frame) => frame.type === "backdrop");
      const size = measuredSize(node);
      const center = {
        x: node.position.x + size.width / 2,
        y: node.position.y + size.height / 2,
      };
      const hit = frames.find((frame) => {
        const width = Number(frame.style?.width ?? 0);
        const height = Number(frame.style?.height ?? 0);
        return (
          center.x >= frame.position.x &&
          center.x <= frame.position.x + width &&
          center.y >= frame.position.y &&
          center.y <= frame.position.y + height
        );
      });
      const owner = frames.find((frame) =>
        memberIdsOf(frame).includes(node.id),
      );
      if (!hit || hit.id === owner?.id) return current;

      const { writes } = planClaim(
        frames.map((frame) => ({ id: frame.id, members: memberIdsOf(frame) })),
        hit.id,
        [node.id],
      );
      if (writes.length === 0) return current;

      const knowledgeIds = new Set(
        current
          .filter((candidate) => candidate.type === "knowledge")
          .map((candidate) => candidate.id),
      );
      const updated = current.map((candidate) => {
        const write = writes.find((entry) => entry.frameId === candidate.id);
        if (!write) return candidate;
        const tint = (candidate.data as { tint?: string }).tint;
        const unit =
          tint === "project" ? "프로젝트" : tint === "trouble" ? "글" : "개념";
        const alive = write.members.filter((id) => knowledgeIds.has(id)).length;
        return {
          ...candidate,
          data: {
            ...candidate.data,
            memberIds: write.members,
            countLabel: `${unit} ${alive}`,
          },
        };
      });
      return fitFrames(updated);
    });
  };

  /**
   * 더 들어갈 데가 없으면 다시 나온다.
   *
   * 원작의 「한 갈래만 보기」와 같은 규칙이다 — 같은 것을 다시 고르면 끄는 뜻이고,
   * 고른 것이 없으면 전체로 돌아간다. 최대 배율에서의 더블클릭은 React Flow가
   * 아무 일도 하지 않으므로, 그 자리를 전체 보기로 준다.
   *
   * 캡처 단계에서 받는 이유: 확대를 맡은 d3-zoom이 더블클릭을 target 단계에서
   * 가로채며 stopImmediatePropagation을 부른다. 그래서 React의 onDoubleClick은
   * 애초에 불리지 않는다 — 내려가기 전에 먼저 잡아야 한다.
   *
   * 우리가 처리할 때는 거기서 이벤트를 끊는다. 그냥 두면 d3가 뒤이어 자기
   * 확대 전이를 걸고, 같은 요소의 전이라 우리 fitView가 그 자리에서 끊긴다
   * (최대 배율이라 결과는 제자리 — 아무 일도 안 일어난 것처럼 보인다).
   */
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const handleDoubleClick = (event: MouseEvent) => {
      const instance = instanceRef.current;
      if (!instance) return;
      /* 노드 위에서의 더블클릭은 노드의 몫이다 */
      if ((event.target as Element | null)?.closest(".react-flow__node")) return;
      /* 아직 더 확대할 수 있으면 손대지 않는다 — 기본 동작(더블클릭 확대)이 맡는다 */
      if (instance.getZoom() < MAX_ZOOM - 0.02) return;
      event.stopPropagation();
      event.preventDefault();
      instance.fitView({ padding: fitPadding, duration: 420 });
    };
    wrap.addEventListener("dblclick", handleDoubleClick, true);
    return () => wrap.removeEventListener("dblclick", handleDoubleClick, true);
  }, [fitPadding]);

  /* 포커스 노드는 "고정된 호버"처럼 동작한다 — 그 갈래 밖은 흐려진다.
     접힌 틀에 가려진 노드를 가리키면 그 틀을 가리킨 것으로 읽는다 */
  const focused = (hoverHighlight ? hoveredId : null) ?? focusNodeId ?? null;
  const activeId = focused ? (hiddenBy.get(focused) ?? focused) : null;

  /* 원작의 lineage: 상류 ∪ 하류만 밝힌다 — 옆으로 뻗은 다른 갈래는
     이 노드와 상관이 없으므로 들어오지 않는다 */
  const activeBranch = useMemo(
    () => (activeId ? lineageOf(activeId, directedEdges) : null),
    [activeId, directedEdges],
  );

  const hoverState = useMemo(
    () => ({ hovered: activeId, neighbors: activeBranch }),
    [activeId, activeBranch],
  );

  const flowEdges = useMemo(() => {
    /* 접힌 틀에 가려진 끝은 그 틀로 옮겨 그린다 — 숨은 노드에 붙이면 선이 갈
       곳이 없다. 원작(asset-pipeline의 useCanvasView)과 같은 규칙이다.
       - 양끝이 같은 틀로 들어가면 밖에서 볼 일이 없는 연결이라 그리지 않는다
       - id는 원래 것을 그대로 둔다. 접었다 펴도 같은 선이라야 React Flow가
         새로 만들지 않고, id를 새로 지어 붙이면 서로 부딪힌다
       원작은 접힌 틀에 안쪽 노드별 핸들이 있어 선이 각자 다른 자리에 붙지만,
       여기 틀은 포트가 없어 전부 한 점으로 모인다. 그래서 같은 곳으로 가는
       선은 하나만 그린다 — 겹쳐 그려 봐야 같은 자리에 포개질 뿐이다. */
    const drawn = new Set<string>();
    const base = toFlowEdges(edges).flatMap((edge) => {
      const source = hiddenBy.get(edge.source);
      const target = hiddenBy.get(edge.target);
      if (source && source === target) return [];
      if (!source && !target) return [edge];
      const pair = `${source ?? edge.source}-${target ?? edge.target}`;
      if (drawn.has(pair)) return [];
      drawn.add(pair);
      return [
        { ...edge, source: source ?? edge.source, target: target ?? edge.target },
      ];
    });
    if (!activeBranch) return base;
    return base.map((edge) => {
      const active = activeBranch.has(edge.source) && activeBranch.has(edge.target);
      return active
        ? {
            ...edge,
            style: { ...edge.style, stroke: "#7d8ba3", strokeWidth: 2 },
          }
        : { ...edge, style: { ...edge.style, opacity: 0.12 } };
    });
  }, [edges, activeBranch, hiddenBy]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <HoverHighlightContext.Provider value={hoverState}>
        <ReactFlow
          nodes={viewNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          colorMode="dark"
          fitView
          fitViewOptions={{ padding: fitPadding }}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          nodesConnectable={false}
          nodesDraggable
          elementsSelectable
          proOptions={{ hideAttribution: false }}
          onInit={(instance: ReactFlowInstance) => {
            instanceRef.current = instance;
            onReady?.(instance, handle);
          }}
          onNodesChange={handleNodesChange}
          onNodeDragStart={handleNodeDragStart}
          onNodeDrag={handleNodeDrag}
          onNodeDragStop={(_, node) => {
            isDraggingRef.current = false;
            dragStartRef.current = null;
            setGuides([]);
            claimOnDrop(node);
          }}
          onNodeClick={(_, node) => onNodeClick?.(node.id)}
          onNodeMouseEnter={(_, node) => {
            if (isDraggingRef.current) return;
            if (node.type === "knowledge") setHoveredId(node.id);
          }}
          onNodeMouseLeave={() => {
            if (isDraggingRef.current) return;
            setHoveredId(null);
          }}
        >
          <Background bgColor="var(--bg)" color="transparent" />
          {/* 스냅 가이드 — 맞물린 두 카드를 함께 지나는 선 */}
          <ViewportPortal>
            {guides.map((guide) => (
              <div
                key={`${guide.axis}-${guide.at}`}
                className={styles.guide}
                style={
                  guide.axis === "x"
                    ? {
                        left: guide.at,
                        top: guide.from,
                        width: 1,
                        height: guide.to - guide.from,
                      }
                    : {
                        top: guide.at,
                        left: guide.from,
                        height: 1,
                        width: guide.to - guide.from,
                      }
                }
              />
            ))}
          </ViewportPortal>
        </ReactFlow>
      </HoverHighlightContext.Provider>

      {showControls && (
      <button
        type="button"
        className={styles.tidyButton}
        onClick={tidyUp}
        title="정렬 — 흐트러진 배치를 흐름 순서로"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        정렬
      </button>
      )}
    </div>
  );
}
