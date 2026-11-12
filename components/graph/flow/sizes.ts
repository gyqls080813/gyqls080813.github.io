import type { GraphNodeData, NodeKind } from "../types";
import type { BackdropFlowNode } from "./BackdropNode";
import type { KnowledgeFlowNode } from "./KnowledgeNode";

/**
 * 캔버스에 서는 것은 둘뿐이다 — 노드 카드와 틀. type으로 갈라 좁히면
 * data의 모양도 함께 정해진다(단언 없이).
 */
export type GraphFlowNode = KnowledgeFlowNode | BackdropFlowNode;

/** 틀 안쪽 여백과 제목 줄 높이 — 배치와 틀 맞춤이 같은 값을 쓴다 */
export const BACKDROP_PAD = 26;
export const BACKDROP_TITLE = 30;

/** 카드 폭 — 노드 에디터처럼 종류별 고정 폭 */
export function cardWidth(node: Pick<GraphNodeData, "kind" | "hub">): number {
  if (node.kind === "trouble") return 196;
  if (node.kind === "project" || node.kind === "me") return 176;
  return node.hub ? 158 : 174;
}

/** 카드 높이 추정치 — 아직 그려지지 않아 잴 수 없을 때 쓴다 (제목 한 줄 ≈ 37px) */
export function cardHeight(
  node: Pick<GraphNodeData, "kind" | "label" | "dateLabel" | "meta">,
): number {
  const twoLineTitle = node.kind === "trouble" && node.label.length > 13;
  let height = twoLineTitle ? 52 : 37;
  if (node.dateLabel) height += 15;
  if (node.meta) height += 19;
  return height;
}

/**
 * 접힌 틀의 폭 — 같은 갈래의 노드 카드와 같은 폭이다.
 * 접히면 카드 한 장처럼 서므로 폭도 카드와 같아야 한 줄로 읽힌다. 그래서 따로 적지
 * 않고 카드 폭에서 바로 얻는다(허브가 아닌 카드).
 */
export function collapsedWidth(tint: NodeKind): number {
  return cardWidth({ kind: tint });
}

/**
 * 노드가 화면에서 차지하는 크기 — 잰 값이 있으면 그것, 없으면 추정치.
 *
 * 틀은 스스로 정해 둔 폭·높이를 쓴다. 접힌 틀만 예외로 카드 한 장 크기다 — 접으면
 * 크기가 내용이 아니라 카드에 맞춰지므로 정해 둔 값은 지금 화면과 상관이 없다.
 * 끌기·스냅·틀 맞춤·카메라 이동이 모두 이 하나로 잰다.
 */
export function sizeOnScreen(
  node: GraphFlowNode,
  collapsed = false,
): { width: number; height: number } {
  if (node.type === "backdrop" && !collapsed) {
    return { width: Number(node.style?.width ?? 0), height: Number(node.style?.height ?? 0) };
  }
  const estimate =
    node.type === "backdrop"
      ? { width: collapsedWidth(node.data.tint), height: BACKDROP_TITLE }
      : { width: cardWidth(node.data), height: cardHeight(node.data) };
  return {
    width: node.measured?.width ?? estimate.width,
    height: node.measured?.height ?? estimate.height,
  };
}
