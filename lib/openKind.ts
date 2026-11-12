import { CONTENT_OF } from "./nodeContent";
import { OPEN_KINDS, type NodeOpenKind } from "./nodeKinds";

/**
 * 본문 데이터를 보고 노드가 무엇으로 열리는지 정한다.
 *
 * 그래프에서 눌렀든 시트의 포트에서 눌렀든 이 판단 하나를 쓴다. null이면 아직 내용이
 * 없는 노드라 이동·확대까지만 하고 멈춘다.
 *
 * 본문 모듈을 전부 불러오므로 브라우저 코드는 이걸 부르지 않는다 — 빌드 때
 * scripts/sheet-index.mjs가 여기서 뽑아 둔 색인(lib/generated/sheetIndex)을
 * lib/nodeTarget의 nodeOpenKind가 읽는다.
 */
export function nodeOpenKindFromContent(nodeId: string): NodeOpenKind | null {
  return OPEN_KINDS.find((kind) => CONTENT_OF[kind](nodeId)) ?? null;
}
