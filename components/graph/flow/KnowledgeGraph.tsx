"use client";

import { useMemo, useState } from "react";
import {
  Background,
  ReactFlow,
  type Node,
  type ReactFlowInstance,
} from "@xyflow/react";
import type { GraphBackdropData, GraphEdgeData, GraphNodeData } from "../types";
import BackdropNode from "./BackdropNode";
import KnowledgeNode from "./KnowledgeNode";
import { HoverHighlightContext } from "./hoverContext";
import { toBackdropNodes, toFlowEdges, toFlowNodes } from "./toFlow";
import styles from "./KnowledgeGraph.module.css";

const nodeTypes = { knowledge: KnowledgeNode, backdrop: BackdropNode };

interface KnowledgeGraphProps {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  /** 클러스터 백드랍 — 멤버 노드 위치에서 프레임이 계산됨 */
  backdrops?: GraphBackdropData[];
  /** 호버 시 이웃 외 흐리기 */
  hoverHighlight?: boolean;
  /** fitView 여백 (0~1). 좁은 판에서는 크게 */
  fitPadding?: number;
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
  focusNodeId,
  onNodeClick,
  onReady,
}: KnowledgeGraphProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const neighborsByNode = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of edges) {
      if (!map.has(edge.from)) map.set(edge.from, new Set());
      if (!map.has(edge.to)) map.set(edge.to, new Set());
      map.get(edge.from)?.add(edge.to);
      map.get(edge.to)?.add(edge.from);
    }
    return map;
  }, [edges]);

  /* 호버 시에도 노드 배열은 재생성하지 않는다 — DOM이 갈리면 커서 아래에서
     mouseenter/leave가 연쇄 발생해 깜빡인다. 흐림은 컨텍스트로 전달. */
  const flowNodes = useMemo<Node[]>(
    () => [...toBackdropNodes(backdrops, nodes), ...toFlowNodes(nodes)],
    [nodes, backdrops],
  );

  /* 포커스 노드는 "고정된 호버"처럼 동작한다 — 그 갈래 밖은 흐려진다 */
  const activeId = (hoverHighlight ? hoveredId : null) ?? focusNodeId ?? null;

  /* 직접 이웃 한 층이 아니라 이어진 갈래 전체를 밝힌다 (BFS) */
  const activeBranch = useMemo(() => {
    if (!activeId) return null;
    const branch = new Set<string>([activeId]);
    const queue = [activeId];
    while (queue.length > 0) {
      const current = queue.pop();
      if (!current) break;
      for (const next of neighborsByNode.get(current) ?? []) {
        if (!branch.has(next)) {
          branch.add(next);
          queue.push(next);
        }
      }
    }
    return branch;
  }, [activeId, neighborsByNode]);

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
        nodes={flowNodes}
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
        onInit={(instance: ReactFlowInstance) => onReady?.(instance)}
        onNodeClick={(_, node) => onNodeClick?.(node.id)}
        onNodeMouseEnter={(_, node) => {
          if (node.type === "knowledge") setHoveredId(node.id);
        }}
        onNodeMouseLeave={() => setHoveredId(null)}
      >
          <Background bgColor="var(--bg)" color="transparent" />
        </ReactFlow>
      </HoverHighlightContext.Provider>
    </div>
  );
}
