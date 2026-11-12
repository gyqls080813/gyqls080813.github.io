import { sheetIndex } from "./generated/sheetIndex";
import { routeOf, type NodeOpenKind } from "./nodeKinds";

/**
 * 노드 하나가 열리면 무엇이 되는가 — 그래프에서 눌렀든 시트의 포트에서 눌렀든
 * 이 판단 하나를 쓴다. null이면 아직 내용이 없는 노드라 이동·확대까지만 하고 멈춘다.
 *
 * 판단 자체는 본문을 봐야 하지만(lib/openKind), 본문 모듈을 브라우저로 보내지
 * 않으려고 빌드 때 뽑아 둔 색인을 읽는다.
 */
export function nodeOpenKind(nodeId: string): NodeOpenKind | null {
  return sheetIndex.openKind[nodeId] ?? null;
}

/** 열린 뒤 머무를 주소 — 확대가 끝나는 시점에 여기로 넘어간다 */
export function nodeDestination(nodeId: string): string | null {
  const kind = nodeOpenKind(nodeId);
  return kind ? routeOf(kind, nodeId) : null;
}

/**
 * 시트의 포트가 가리키는 주소.
 *
 * 목적지 페이지로 바로 보내지 않고 그래프를 거친다. 그래야 어느 노드로 가는지
 * 이동·확대가 보이고, 소개에서 프로젝트로 넘어갈 때와 같은 동작이 된다.
 */
export function nodeHref(nodeId: string): string {
  return `/?node=${nodeId}`;
}
