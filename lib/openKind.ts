import { getIdea } from "./ideas";
import { getPost } from "./posts";
import { getProject } from "./projects";
import { getTheory } from "./theories";
import { getTil } from "./tils";
import { getDictionary } from "./dictionary";
import type { NodeOpenKind } from "./nodeTarget";

/**
 * 본문 데이터를 보고 노드가 무엇으로 열리는지 정한다.
 *
 * 본문 모듈을 전부 불러오므로 브라우저 코드는 이걸 부르지 않는다 — 빌드 때
 * scripts/sheet-index.mjs가 여기서 뽑아 둔 색인(lib/generated/sheetIndex)을
 * lib/nodeTarget의 nodeOpenKind가 읽는다.
 */
/**
 * 그래프에서 눌렀든 시트의 포트에서 눌렀든 이 판단 하나를 쓴다.
 * null이면 아직 내용이 없는 노드라 이동·확대까지만 하고 멈춘다.
 */
export function nodeOpenKindFromContent(nodeId: string): NodeOpenKind | null {
  if (nodeId === "me") return "intro";
  if (getProject(nodeId)) return "project";
  if (getPost(nodeId)) return "post";
  if (getTheory(nodeId)) return "theory";
  if (getIdea(nodeId)) return "idea";
  if (getTil(nodeId)) return "til";
  if (getDictionary(nodeId)) return "dict";
  return null;
}
