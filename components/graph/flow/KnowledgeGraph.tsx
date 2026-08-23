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
import type { GraphBackdropData, GraphEdgeData, GraphNodeData } from "../types";
import BackdropNode from "./BackdropNode";
import KnowledgeNode from "./KnowledgeNode";
import { HoverHighlightContext } from "./hoverContext";
import {
  BACKDROP_PAD,
  BACKDROP_TITLE,
  buildFlowGraph,
  toFlowEdges,
} from "./toFlow";
import styles from "./KnowledgeGraph.module.css";

const nodeTypes = { knowledge: KnowledgeNode, backdrop: BackdropNode };

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
  /** 뷰포트 제어(클릭 시 줌인 등)가 필요한 부모에게 인스턴스를 넘긴다 */
  onReady?: (instance: ReactFlowInstance) => void;
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

  const directedEdges = useMemo(
    () => edges.map((edge) => ({ source: edge.from, target: edge.to })),
    [edges],
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

  /* 자동 정렬 — asset-pipeline의 layoutTree: 틀(백드랍)을 하나의 덩어리로
     안쪽부터 늘어놓는다. 그래서 틀끼리 절대 겹치지 않는다.
     깊이(최장 경로)가 열을 정하고, 열 안의 순서는 지금 순서를 유지하며,
     순환이 있으면 손대지 않는다. */
  const tidyUp = () => {
    const nodeById = new Map(rfNodes.map((node) => [node.id, node]));
    const leafItem = (id: string): LayoutItem | null => {
      const node = nodeById.get(id);
      if (!node || node.type !== "knowledge") return null;
      return {
        id,
        width: node.measured?.width ?? 180,
        height: node.measured?.height ?? 56,
        y: node.position.y,
      };
    };
    const leafItems = (ids: readonly string[]): LayoutItem[] =>
      ids.map(leafItem).filter((item): item is LayoutItem => item !== null);

    const framed = new Set(backdrops.flatMap((backdrop) => backdrop.members));
    const items: LayoutItem[] = [
      /* 어느 틀에도 안 담긴 노드(민엽)는 잎으로 */
      ...leafItems(
        nodes.map((node) => node.id).filter((id) => !framed.has(id)),
      ),
      /* 틀은 하나의 상자로 — 소그룹(clusters)이 있으면 한 겹 더 중첩 */
      ...backdrops.map((backdrop): LayoutItem => {
        const frameNode = nodeById.get(backdrop.id);
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
          : leafItems(backdrop.members);
        return {
          id: backdrop.id,
          width: 0,
          height: 0,
          y: frameNode?.position.y ?? 0,
          children,
        };
      }),
    ];

    const tree = layoutTree(items, directedEdges, LAYOUT_GAP, {
      top: BACKDROP_PAD + BACKDROP_TITLE,
      side: BACKDROP_PAD,
    });
    if (!tree) return;

    setRfNodes((current) =>
      current.map((node) => {
        const at = tree.positions.get(node.id);
        if (!at) return node;
        if (node.type === "knowledge") return { ...node, position: at };
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
    /* 새 좌표가 커밋된 뒤에 화면을 맞춘다 */
    requestAnimationFrame(() =>
      instanceRef.current?.fitView({ padding: fitPadding, duration: 420 }),
    );
  };

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

  const measuredSize = (node: Node) => ({
    width: node.measured?.width ?? 180,
    height: node.measured?.height ?? 56,
  });

  /* 틀 맞춤: 틀을 멤버들의 바운딩에 맞춘다 */
  const fitFrames = (list: Node[]): Node[] => {
    const byId = new Map(list.map((node) => [node.id, node]));
    return list.map((node) => {
      if (node.type !== "backdrop") return node;
      const members = memberIdsOf(node)
        .map((id) => byId.get(id))
        .filter((member): member is Node => member?.type === "knowledge");
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

  /* 포커스 노드는 "고정된 호버"처럼 동작한다 — 그 갈래 밖은 흐려진다 */
  const activeId = (hoverHighlight ? hoveredId : null) ?? focusNodeId ?? null;

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
    const base = toFlowEdges(edges);
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
  }, [edges, activeBranch]);

  return (
    <div className={styles.wrap}>
      <HoverHighlightContext.Provider value={hoverState}>
        <ReactFlow
          nodes={rfNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          colorMode="dark"
          fitView
          fitViewOptions={{ padding: fitPadding }}
          minZoom={0.3}
          maxZoom={2.5}
          nodesConnectable={false}
          nodesDraggable
          elementsSelectable
          proOptions={{ hideAttribution: false }}
          onInit={(instance: ReactFlowInstance) => {
            instanceRef.current = instance;
            onReady?.(instance);
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
