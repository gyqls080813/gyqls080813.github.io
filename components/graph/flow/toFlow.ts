import type { Edge } from "@xyflow/react";
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

/**
 * 좌표 스프레드: 데이터 좌표는 원형 노드 시절의 촘촘한 배치라,
 * 카드형 노드가 겹치지 않도록 벌린다. fitView가 다시 화면에 맞춘다.
 */
export const SPREAD = { x: 1.5, y: 1.35 };

/** 카드 높이 추정치 — 중심 좌표 보정용 (헤더 한 줄 ≈ 37px) */
function cardHeight(node: GraphNodeData): number {
  const twoLineTitle = node.kind === "trouble" && node.label.length > 13;
  const base = twoLineTitle ? 52 : 37;
  return node.meta ? base + 19 : base;
}

/** 데이터 좌표(중심 기준)를 React Flow 노드(좌상단 기준)로 변환 */
export function toFlowNodes(nodes: GraphNodeData[]): KnowledgeFlowNode[] {
  return nodes.map((node) => ({
    id: node.id,
    type: "knowledge",
    position: {
      x: node.x * SPREAD.x - cardWidth(node) / 2,
      y: node.y * SPREAD.y - cardHeight(node) / 2,
    },
    data: node,
  }));
}

const BACKDROP_PAD = 26;
const BACKDROP_TITLE = 30;

/**
 * 백드랍 프레임: 멤버 카드들의 바운딩 박스 + 여백 + 타이틀 바.
 * 멤버가 화면에 없으면(필터) 그 백드랍도 그리지 않는다.
 */
export function toBackdropNodes(
  backdrops: GraphBackdropData[],
  nodes: GraphNodeData[],
): BackdropFlowNode[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const result: BackdropFlowNode[] = [];

  for (const backdrop of backdrops) {
    const members = backdrop.members
      .map((id) => byId.get(id))
      .filter((node): node is GraphNodeData => Boolean(node));
    if (members.length === 0) continue;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const member of members) {
      const w = cardWidth(member);
      const h = cardHeight(member);
      minX = Math.min(minX, member.x * SPREAD.x - w / 2);
      minY = Math.min(minY, member.y * SPREAD.y - h / 2);
      maxX = Math.max(maxX, member.x * SPREAD.x + w / 2);
      maxY = Math.max(maxY, member.y * SPREAD.y + h / 2);
    }

    const unit =
      backdrop.tint === "project"
        ? "프로젝트"
        : backdrop.tint === "trouble"
          ? "글"
          : "개념";
    result.push({
      id: backdrop.id,
      type: "backdrop",
      position: { x: minX - BACKDROP_PAD, y: minY - BACKDROP_PAD - BACKDROP_TITLE },
      data: {
        label: backdrop.label,
        tint: backdrop.tint,
        countLabel: `${unit} ${members.length}`,
      },
      style: {
        width: maxX - minX + BACKDROP_PAD * 2,
        height: maxY - minY + BACKDROP_PAD * 2 + BACKDROP_TITLE,
      },
      zIndex: -1,
      selectable: false,
      draggable: false,
      focusable: false,
    });
  }

  return result;
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
