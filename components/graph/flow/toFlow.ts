import type { Edge, Node } from "@xyflow/react";
import { LAYOUT_GAP, layoutTree, type LayoutItem } from "@/lib/layout";
import type {
  EdgeKind,
  GraphBackdropData,
  GraphEdgeData,
  GraphNodeData,
} from "../types";
import type { BackdropFlowNode } from "./BackdropNode";
import { cardWidth, type KnowledgeFlowNode } from "./KnowledgeNode";

const EDGE_STYLE: Record<EdgeKind, React.CSSProperties> = {
  link: { stroke: "var(--edge)", strokeWidth: 1.6 },
  bridge: { stroke: "#33405a", strokeWidth: 1.6 },
  cross: { stroke: "var(--edge-cross)", strokeWidth: 1.2, strokeDasharray: "5 5" },
};

export const BACKDROP_PAD = 26;
export const BACKDROP_TITLE = 30;

/** 카드 높이 추정치 — 초기 배치 계산용 (제목 한 줄 ≈ 37px) */
export function cardHeight(node: GraphNodeData): number {
  const twoLineTitle = node.kind === "trouble" && node.label.length > 13;
  let height = twoLineTitle ? 52 : 37;
  if (node.dateLabel) height += 15;
  if (node.meta) height += 19;
  return height;
}

/**
 * 초기 배치부터 원작의 layoutTree로 계산한다 — 틀은 하나의 덩어리,
 * 깊이(최장 경로)가 열을 정하고, 열 안의 순서는 데이터의 y 순서를 따른다.
 * 데이터 좌표는 순서를 정할 뿐, 실제 자리는 여기서 나온다.
 */
export function buildFlowGraph(
  nodes: GraphNodeData[],
  edges: GraphEdgeData[],
  backdrops: GraphBackdropData[],
): Node[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));

  const leafItem = (id: string): LayoutItem | null => {
    const node = byId.get(id);
    if (!node) return null;
    return { id, width: cardWidth(node), height: cardHeight(node), y: node.y };
  };
  const leafItems = (ids: readonly string[]): LayoutItem[] =>
    ids.map(leafItem).filter((item): item is LayoutItem => item !== null);

  const framed = new Set(backdrops.flatMap((backdrop) => backdrop.members));
  const items: LayoutItem[] = [
    ...leafItems(nodes.map((node) => node.id).filter((id) => !framed.has(id))),
    ...backdrops
      .map((backdrop): LayoutItem | null => {
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
        if (children.length === 0) return null;
        return {
          id: backdrop.id,
          width: 0,
          height: 0,
          y: Math.min(...children.map((item) => item.y)),
          children,
        };
      })
      .filter((item): item is LayoutItem => item !== null),
  ];

  const tree = layoutTree(
    items,
    edges.map((edge) => ({ source: edge.from, target: edge.to })),
    LAYOUT_GAP,
    { top: BACKDROP_PAD + BACKDROP_TITLE, side: BACKDROP_PAD },
  );

  const backdropNodes: BackdropFlowNode[] = [];
  for (const backdrop of backdrops) {
    const at = tree?.positions.get(backdrop.id);
    const size = tree?.sizes.get(backdrop.id);
    if (!at || !size) continue;
    const present = backdrop.members.filter((id) => byId.has(id));
    const unit =
      backdrop.tint === "project"
        ? "프로젝트"
        : backdrop.tint === "trouble"
          ? "글"
          : "개념";
    backdropNodes.push({
      id: backdrop.id,
      type: "backdrop",
      position: at,
      data: {
        label: backdrop.label,
        tint: backdrop.tint,
        countLabel: `${unit} ${present.length}`,
        memberIds: backdrop.members,
      },
      style: { width: size.width, height: size.height },
      zIndex: -1,
      selectable: false,
      draggable: true,
      dragHandle: ".backdrop-drag-handle",
      focusable: false,
    });
  }

  const knowledgeNodes: KnowledgeFlowNode[] = nodes.map((node) => ({
    id: node.id,
    type: "knowledge",
    /* 순환 등으로 배치를 못 정하면 데이터 좌표를 그대로 쓴다 */
    position: tree?.positions.get(node.id) ?? { x: node.x, y: node.y },
    data: node,
  }));

  return [...backdropNodes, ...knowledgeNodes];
}

export function toFlowEdges(edges: GraphEdgeData[]): Edge[] {
  return edges.map((edge) => {
    const kind = edge.kind ?? "link";
    return {
      id: `${edge.from}-${edge.to}`,
      source: edge.from,
      target: edge.to,
      type: "default",
      style: EDGE_STYLE[kind],
      focusable: false,
      label: edge.label,
      labelStyle: { fill: "var(--muted)", fontSize: 11, fontWeight: 500 },
      labelBgStyle: { fill: "var(--bg)", fillOpacity: 0.85 },
      labelBgPadding: [6, 3] as [number, number],
      labelBgBorderRadius: 4,
    };
  });
}
