"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  applyNodeChanges,
  Background,
  ReactFlow,
  ViewportPortal,
  type NodeChange,
  type ReactFlowInstance,
} from "@xyflow/react";
import { planClaim } from "@/lib/membership";
import { snapToNeighbors, type Guide, type SnapRect } from "@/lib/snap";
import { ancestorChain, lineageOf } from "@/lib/topology";
import { toggled } from "@/lib/util";
import { GridIcon } from "../../icons";
import type { GraphBackdropData, GraphEdgeData, GraphNodeData } from "../types";
import BackdropNode from "./BackdropNode";
import KnowledgeNode from "./KnowledgeNode";
import { HoverHighlightContext } from "./hoverContext";
import {
  BACKDROP_PAD,
  BACKDROP_TITLE,
  collapsedWidth,
  sizeOnScreen,
  type GraphFlowNode,
} from "./sizes";
import {
  buildFlowGraph,
  buildLayoutItems,
  frameCountLabel,
  frameDescendants,
  hiddenByOf,
  placeItems,
  rerouteEdges,
  sourceTarget,
  toFlowEdges,
} from "./toFlow";
import styles from "./KnowledgeGraph.module.css";

const nodeTypes = { knowledge: KnowledgeNode, backdrop: BackdropNode };

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2.5;

/** 전체 보기의 여백 (0~1) */
const FIT_PADDING = 0.08;

/** 이만큼(px) 안에서 움직인 누름은 끌기가 아니라 클릭이다 */
const CLICK_SLOP = 5;

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

/**
 * 초기 배치는 입력이 같으면 결과도 같다 — 홈 그래프와 시트 뒤 그래프가 같은
 * 데이터(모듈 상수)로 두 번 계산하지 않게 마지막 결과를 들고 있는다. 노드를
 * 열어 시트로 넘어가는 순간 이 계산이 뒤 그래프 마운트와 겹치면 화면이 멈춘다.
 * 결과 배열은 읽기만 한다 — 바꿀 때는 언제나 새 배열을 만든다(setRfNodes).
 */
let lastFlow: {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  backdrops: GraphBackdropData[];
  result: GraphFlowNode[];
} | null = null;

function cachedFlowGraph(
  nodes: GraphNodeData[],
  edges: GraphEdgeData[],
  backdrops: GraphBackdropData[],
): GraphFlowNode[] {
  if (
    lastFlow &&
    lastFlow.nodes === nodes &&
    lastFlow.edges === edges &&
    lastFlow.backdrops === backdrops
  ) {
    return lastFlow.result;
  }
  const result = buildFlowGraph(nodes, edges, backdrops);
  lastFlow = { nodes, edges, backdrops, result };
  return result;
}

function rectOf(node: GraphFlowNode): SnapRect {
  return { x: node.position.x, y: node.position.y, ...sizeOnScreen(node) };
}

/** 틀의 지금 소속. 소속은 화면 상태(rfNodes)의 memberIds 한 곳에만 있다 */
const memberIdsOf = (node: GraphFlowNode): string[] =>
  node.type === "backdrop" ? node.data.memberIds : [];

/** 소속을 한 줄 글자로 — 노드가 움직일 때마다가 아니라 소속이 바뀔 때만 다시 계산하려고 */
const membershipKeyOf = (list: readonly GraphFlowNode[]) =>
  list
    .flatMap((node) =>
      node.type === "backdrop" ? [`${node.id}:${node.data.memberIds.join(",")}`] : [],
    )
    .join("|");

const parseMembership = (key: string) =>
  new Map(
    key
      .split("|")
      .filter(Boolean)
      .map((entry) => {
        const [id, members] = entry.split(":");
        return [id, members ? members.split(",") : []] as const;
      }),
  );

interface KnowledgeGraphProps {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  /** 클러스터 백드랍 — 멤버 노드 위치에서 프레임이 계산됨 */
  backdrops?: GraphBackdropData[];
  /** 호버 시 이웃 외 흐리기 */
  hoverHighlight?: boolean;
  /** 정렬 버튼 등 컨트롤 표시 — 배경용(글 페이지)에서는 끈다 */
  showControls?: boolean;
  /**
   * 이 노드를 중심으로 뷰를 맞추고, 그 이웃 밖은 흐린다.
   * 글 페이지 배경: 읽는 중인 트러블 노드의 실제 연결선이 보이게.
   */
  focusNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
  /** 뷰포트 제어(클릭 시 줌인 등)가 필요한 부모에게 인스턴스와 손잡이를 넘긴다 */
  onReady?: (instance: ReactFlowInstance<GraphFlowNode>, graph: GraphHandle) => void;
}

export default function KnowledgeGraph({
  nodes,
  edges,
  backdrops = [],
  hoverHighlight = false,
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
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set(initialCollapsed));
  /* 백드랍(데이터)이 바뀌면 접힘도 그 처음 상태로 되돌린다 — 이펙트가 아니라
     그리는 중에 맞춘다(바뀐 것을 보고 바로 고치는 리액트의 권장 방식) */
  const [collapsedSource, setCollapsedSource] = useState(initialCollapsed);
  if (collapsedSource !== initialCollapsed) {
    setCollapsedSource(initialCollapsed);
    setCollapsed(new Set(initialCollapsed));
  }

  const toggleFrame = useCallback(
    (id: string) => setCollapsed((current) => toggled(current, id)),
    [],
  );

  /* 드래그가 실제로 반영되려면 노드 상태를 우리가 들고 변경을 적용해야 한다.
     데이터(필터 등)가 바뀌면 배치는 초기 좌표로 되돌아간다.
     초기 배치부터 layoutTree — "정렬" 버튼과 같은 규칙으로 시작한다 */
  const baseNodes = useMemo(
    () => cachedFlowGraph(nodes, edges, backdrops),
    [nodes, edges, backdrops],
  );
  const [rfNodes, setRfNodes] = useState<GraphFlowNode[]>(baseNodes);
  const [nodesSource, setNodesSource] = useState(baseNodes);
  if (nodesSource !== baseNodes) {
    setNodesSource(baseNodes);
    setRfNodes(baseNodes);
  }
  const instanceRef = useRef<ReactFlowInstance<GraphFlowNode> | null>(null);

  /**
   * 틀 목록 — 처음 모양(갈래 색·덩어리)은 데이터에서, 소속은 화면 상태에서.
   *
   * 소속을 두 곳에서 읽으면 노드를 다른 틀로 끌어 넣은 뒤 접기·정렬·펴기가 옛
   * 소속을 따른다 — 옮긴 노드가 새 틀을 접어도 안 숨고, 정렬하면 옛 틀로 돌아간다.
   * 그래서 끌어 넣기가 바꾸는 화면 상태(memberIds)를 유일한 소속으로 본다.
   */
  const membershipKey = membershipKeyOf(rfNodes);
  const frames = useMemo<GraphBackdropData[]>(() => {
    const live = parseMembership(membershipKey);
    return backdrops.map((frame) => ({ ...frame, members: live.get(frame.id) ?? frame.members }));
  }, [backdrops, membershipKey]);

  /* 접힌 틀이 가리는 노드 → 그 틀 id. 바깥 틀부터 정한다 —
     한 곳에만 붙어야 옮겨 그린 선이 두 갈래로 갈라지지 않는다. */
  const hiddenBy = useMemo(
    () => hiddenByOf(frames, (id) => collapsed.has(id)),
    [frames, collapsed],
  );

  /**
   * 갈래를 따질 때 보는 간선 — 화면에 그려진 것과 같아야 한다.
   *
   * 원본 간선으로 따지면 접힌 틀은 갈래에 들어오지 못한다. 민엽에 올렸을 때
   * 이론 쪽이 살아나지 않던 것이 이 때문이었다 — 선은 민엽에서 틀로 옮겨 그려져
   * 있는데, 갈래는 여전히 틀 안의 숨은 노드를 찾고 있었다.
   */
  const directedEdges = useMemo(
    () => rerouteEdges(sourceTarget(edges), hiddenBy),
    [edges, hiddenBy],
  );

  /* 그리기 직전에 접힘을 입힌다. 가려진 노드는 hidden, 접힌 틀은 카드 한 장
     크기로 줄인다 — rfNodes(진짜 배치)는 건드리지 않으므로 펴면 그대로 돌아온다. */
  const viewNodes = useMemo<GraphFlowNode[]>(
    () =>
      rfNodes.map((node): GraphFlowNode => {
        if (hiddenBy.has(node.id)) return { ...node, hidden: true };
        if (node.type !== "backdrop") return node;
        const onToggle = () => toggleFrame(node.id);
        if (!collapsed.has(node.id)) {
          return { ...node, data: { ...node.data, collapsed: false, onToggle } };
        }
        return {
          ...node,
          data: { ...node.data, collapsed: true, onToggle },
          style: { ...node.style, width: collapsedWidth(node.data.tint), height: BACKDROP_TITLE },
        };
      }),
    [rfNodes, hiddenBy, collapsed, toggleFrame],
  );

  /* 자동 정렬 — asset-pipeline의 layoutTree: 틀(백드랍)을 하나의 덩어리로
     안쪽부터 늘어놓는다. 그래서 틀끼리 절대 겹치지 않는다.
     깊이(최장 경로)가 열을 정하고, 열 안의 순서는 지금 순서를 유지하며,
     순환이 있으면 손대지 않는다. 처음 배치와 같은 계산(toFlow)을 쓰고, 크기와
     위아래 자리만 지금 화면에서 읽는다. */
  const relayout = (folded: ReadonlySet<string>, fit = true) => {
    const nodeById = new Map(rfNodes.map((node) => [node.id, node]));
    const items = buildLayoutItems({
      nodeIds: nodes.map((node) => node.id),
      frames,
      isFolded: (id) => folded.has(id),
      /* 방금 펼쳐진 노드는 아직 그려지지 않아 재어 둔 크기가 없다.
         그때는 초기 배치와 같은 추정치를 쓴다 — 재고 나면 틀 맞춤이 바로잡는다 */
      leafOf: (id) => {
        const node = nodeById.get(id);
        if (!node || node.type !== "knowledge") return null;
        return { id, ...sizeOnScreen(node), y: node.position.y };
      },
      frameY: (frame, minY) => nodeById.get(frame.id)?.position.y ?? minY,
    });
    /* 접힌 상자는 안쪽 노드의 선을 자기 것으로 읽어야 깊이가 정해진다 */
    const tree = placeItems(
      items,
      edges,
      hiddenByOf(frames, (id) => folded.has(id)),
    );
    if (!tree) return;

    setRfNodes((current) =>
      current.map((node): GraphFlowNode => {
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
      instanceRef.current?.fitView({ padding: FIT_PADDING, duration: 420 }),
    );
  };

  const tidyUp = () => relayout(collapsed);

  /* 펴 달라는 요청이 걸려 있는 노드 — 이게 있으면 전체 맞춤을 건너뛴다 */
  const pendingRevealRef = useRef<string | null>(null);

  /**
   * 접거나 펴면 자리를 다시 잡는다.
   *
   * 접힌 틀은 배치에 잎 하나로 들어가므로 안쪽 노드는 자리를 받지 못한다.
   * 그대로 펴면 데이터 원좌표에 그려져 다른 것들과 겹친다 — 펴는 순간
   * 다시 늘어놓아야 안쪽이 제자리를 찾는다.
   */
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
    const owners = frames.filter(
      (frame) => collapsed.has(frame.id) && frameDescendants(frame.id, frames).includes(nodeId),
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
  /* 최신 함수는 그린 뒤에 옮겨 둔다 — 그리는 중에 ref를 쓰면 안 된다 */
  useLayoutEffect(() => {
    revealRef.current = reveal;
  });
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

  /* 틀 맞춤: 틀을 멤버들의 바운딩에 맞춘다 */
  const fitFrames = (list: GraphFlowNode[]): GraphFlowNode[] => {
    const byId = new Map(list.map((node) => [node.id, node]));
    return list.map((node): GraphFlowNode => {
      if (node.type !== "backdrop") return node;
      /* 접힌 틀은 크기가 내용이 아니라 카드 한 장에 맞춰져 있다 */
      if (collapsed.has(node.id)) return node;
      /* 안쪽에 틀이 있으면 그 틀을 감싼다 — 노드만 보면 바깥 틀이
         안쪽 틀의 제목 줄을 잘라먹는다 */
      const members = memberIdsOf(node).flatMap((id) => {
        const member = byId.get(id);
        return member && !member.hidden && member.id !== node.id ? [member] : [];
      });
      if (members.length === 0) return node;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const member of members) {
        const size = sizeOnScreen(member, collapsed.has(member.id));
        minX = Math.min(minX, member.position.x);
        minY = Math.min(minY, member.position.y);
        maxX = Math.max(maxX, member.position.x + size.width);
        maxY = Math.max(maxY, member.position.y + size.height);
      }

      const floor = frameFloors.get(node.id);
      const width = Math.max(maxX - minX + BACKDROP_PAD * 2, floor?.width ?? 0);
      const height = Math.max(maxY - minY + BACKDROP_PAD * 2 + BACKDROP_TITLE, floor?.height ?? 0);
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
      return { ...node, position: { x, y }, style: { ...node.style, width, height } };
    });
  };

  const handleNodesChange = (changes: NodeChange<GraphFlowNode>[]) =>
    setRfNodes((current) => fitFrames(applyNodeChanges(changes, current)));

  /* 백드랍 타이틀 바 드래그: 멤버 노드(안쪽 백드랍 포함)가 함께 움직인다 */
  const dragStartRef = useRef<{
    id: string;
    origin: { x: number; y: number };
    followers: Map<string, { x: number; y: number }>;
  } | null>(null);

  /* 드래그 중에는 호버를 잠근다 — 빠르게 끌면 포인터가 노드를 들락거리며
     mouseenter/leave가 연타되고, 갈래 하이라이트가 깜빡인다 */
  const isDraggingRef = useRef(false);

  const handleNodeDragStart = (_: unknown, node: GraphFlowNode) => {
    isDraggingRef.current = true;
    if (node.type === "knowledge") setHoveredId(node.id);
    if (node.type !== "backdrop") return;
    /* 함께 움직일 것 — 계층을 따라 끝까지 내려간다.
       직속 멤버만 보면 안쪽 틀은 따라오고 그 안의 노드는 제자리에 남는다. */
    const byId = new Map(rfNodes.map((other) => [other.id, other]));
    const followers = new Map<string, { x: number; y: number }>();
    for (const id of frameDescendants(node.id, frames)) {
      const member = byId.get(id);
      if (member) followers.set(id, { ...member.position });
    }
    dragStartRef.current = { id: node.id, origin: { ...node.position }, followers };
  };

  /* Shift + 드래그: 이웃 노드의 시작·가운데·끝 선에 자석처럼 붙는다 */
  const handleNodeDrag = (
    event: MouseEvent | React.MouseEvent | TouchEvent,
    node: GraphFlowNode,
  ) => {
    if (node.type === "backdrop") {
      const start = dragStartRef.current;
      if (!start || start.id !== node.id) return;
      const dx = node.position.x - start.origin.x;
      const dy = node.position.y - start.origin.y;
      setRfNodes((current) =>
        current.map((candidate) => {
          const from = start.followers.get(candidate.id);
          return from ? { ...candidate, position: { x: from.x + dx, y: from.y + dy } } : candidate;
        }),
      );
      return;
    }
    if (!("shiftKey" in event)) return;
    if (!event.shiftKey) {
      if (guides.length > 0) setGuides([]);
      return;
    }
    const others = rfNodes
      .filter((other) => other.type === "knowledge" && other.id !== node.id)
      .map(rectOf);
    const result = snapToNeighbors(rectOf(node), others);
    setGuides(result.guides);
    if (result.dx !== 0 || result.dy !== 0) {
      const snapped = { x: node.position.x + result.dx, y: node.position.y + result.dy };
      setRfNodes((current) =>
        current.map((candidate) =>
          candidate.id === node.id ? { ...candidate, position: snapped } : candidate,
        ),
      );
    }
  };

  /**
   * 틀 안에 떨어뜨리면 들어온다 — 가운데 기준, 다른 틀에서는 빠진다(단일 소속).
   * 밖으로 끌어내는 것만으로는 빠지지 않는다 (원작 규칙).
   *
   * 겹친 틀에서 임자를 고르는 것은 위치가 아니라 계층이다. 틀은 틀을 담으므로
   * (생각 › TIL) 한 점이 여러 틀 안에 동시에 있다 — 목록에서 먼저 나온 것을
   * 고르면 언제나 가장 바깥이 걸리고, 안쪽 틀 안에서 노드를 움직이기만 해도
   * 바깥 틀이 가져가 버린다. 안쪽이 임자다.
   */
  const claimOnDrop = (node: GraphFlowNode) => {
    if (node.type !== "knowledge") return;
    setRfNodes((current) => {
      const frameNodes = current.flatMap((frame) => (frame.type === "backdrop" ? [frame] : []));

      /* 틀의 계층 — 소속이 목록인 것처럼 부모도 목록에서 읽는다 */
      const isFrame = new Set(frameNodes.map((frame) => frame.id));
      const parentOf = new Map<string, string>();
      for (const frame of frameNodes) {
        for (const member of frame.data.memberIds) {
          if (isFrame.has(member)) parentOf.set(member, frame.id);
        }
      }
      /* 이 틀을 감싸는 틀들, 안에서 밖으로 */
      const ancestorsOf = (id: string) => ancestorChain(id, parentOf);

      const size = sizeOnScreen(node);
      const center = { x: node.position.x + size.width / 2, y: node.position.y + size.height / 2 };
      /* 접혀 숨은 틀은 그릴 자리가 없으니 받을 수도 없다 */
      const inside = frameNodes.filter((frame) => {
        if (frame.hidden) return false;
        const width = Number(frame.style?.width ?? 0);
        const height = Number(frame.style?.height ?? 0);
        return (
          center.x >= frame.position.x &&
          center.x <= frame.position.x + width &&
          center.y >= frame.position.y &&
          center.y <= frame.position.y + height
        );
      });
      /* 깊은 것이 먼저. 계층이 갈리지 않는 겹침(형제끼리)은 좁은 쪽이 더
         구체적인 뜻이므로 그쪽을 고른다 */
      const areaOf = (frame: GraphFlowNode) =>
        Number(frame.style?.width ?? 0) * Number(frame.style?.height ?? 0);
      const hit = [...inside].sort(
        (a, b) => ancestorsOf(b.id).length - ancestorsOf(a.id).length || areaOf(a) - areaOf(b),
      )[0];
      const owner = frameNodes.find((frame) => frame.data.memberIds.includes(node.id));
      if (!hit || hit.id === owner?.id) return current;
      /* 자기 틀을 감싸는 바깥 틀로는 저절로 옮겨 가지 않는다. 안쪽 틀의 노드는
         언제나 바깥 틀 안에도 있어서, 이걸 허락하면 「밖으로 나가도 남는다」가
         무너진다 — 밖으로 내보내는 것은 빼라고 말해야 하는 일이다. */
      if (owner && ancestorsOf(owner.id).includes(hit.id)) return current;

      const writes = planClaim(
        frameNodes.map((frame) => ({ id: frame.id, members: frame.data.memberIds })),
        hit.id,
        [node.id],
      );
      if (writes.length === 0) return current;

      /* 바뀐 소속으로 모든 틀의 개수를 다시 센다 — 바깥 틀의 개수도 함께 바뀐다.
         처음 그릴 때와 같은 함수(frameCountLabel)라 같은 뜻의 숫자다 */
      const nextMembers = new Map(
        frameNodes.map((frame) => [
          frame.id,
          writes.find((write) => write.frameId === frame.id)?.members ?? frame.data.memberIds,
        ]),
      );
      const nextFrames = backdrops.map((frame) => ({
        ...frame,
        members: nextMembers.get(frame.id) ?? frame.members,
      }));
      const isNode = (id: string) =>
        current.some((candidate) => candidate.type === "knowledge" && candidate.id === id);
      const updated = current.map((candidate): GraphFlowNode => {
        if (candidate.type !== "backdrop") return candidate;
        const frame = nextFrames.find((each) => each.id === candidate.id);
        return {
          ...candidate,
          data: {
            ...candidate.data,
            memberIds: nextMembers.get(candidate.id) ?? candidate.data.memberIds,
            countLabel: frame
              ? frameCountLabel(frame, nextFrames, isNode)
              : candidate.data.countLabel,
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
      if (event.target instanceof Element && event.target.closest(".react-flow__node")) return;
      /* 아직 더 확대할 수 있으면 손대지 않는다 — 기본 동작(더블클릭 확대)이 맡는다 */
      if (instance.getZoom() < MAX_ZOOM - 0.02) return;
      event.stopPropagation();
      event.preventDefault();
      instance.fitView({ padding: FIT_PADDING, duration: 420 });
    };
    wrap.addEventListener("dblclick", handleDoubleClick, true);
    return () => wrap.removeEventListener("dblclick", handleDoubleClick, true);
  }, []);

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

  /* 접힌 틀에 가려진 끝은 그 틀로 옮겨 그린다 — 숨은 노드에 붙이면 선이 갈 곳이
     없다. 옮기는 규칙은 정렬·갈래와 같은 하나(toFlow의 rerouteEdges)다. */
  const flowEdges = useMemo(() => {
    const base = rerouteEdges(toFlowEdges(edges), hiddenBy);
    if (!activeBranch) return base;
    return base.map((edge) => {
      const active = activeBranch.has(edge.source) && activeBranch.has(edge.target);
      return active
        ? { ...edge, style: { ...edge.style, stroke: "var(--edge-active)", strokeWidth: 2 } }
        : { ...edge, style: { ...edge.style, opacity: 0.12 } };
    });
  }, [edges, activeBranch, hiddenBy]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <HoverHighlightContext.Provider value={hoverState}>
        <ReactFlow<GraphFlowNode>
          nodes={viewNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          colorMode="dark"
          fitView
          fitViewOptions={{ padding: FIT_PADDING }}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          nodesConnectable={false}
          nodesDraggable
          /* 누르는 손은 떨린다 — 트랙패드 클릭은 1~2px 움직이는 게 보통이다.
             기본값(클릭 0px · 끌기 1px)이면 그 떨림에 클릭이 사라지고 노드가 밀린다.
             몇 px까지는 클릭으로 읽고, 그보다 크게 움직일 때만 끌기로 본다 */
          nodeClickDistance={CLICK_SLOP}
          nodeDragThreshold={CLICK_SLOP}
          elementsSelectable
          onInit={(instance) => {
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
                    ? { left: guide.at, top: guide.from, width: 1, height: guide.to - guide.from }
                    : { top: guide.at, left: guide.from, height: 1, width: guide.to - guide.from }
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
          <GridIcon />
          정렬
        </button>
      )}
    </div>
  );
}
