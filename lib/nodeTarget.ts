import { getPost } from "./posts";
import { getProject } from "./projects";

/** 노드 하나가 열리면 무엇이 되는가 */
export type NodeOpenKind = "intro" | "project" | "post";

/**
 * 그래프에서 눌렀든 시트의 포트에서 눌렀든 이 판단 하나를 쓴다.
 * null이면 열 것이 없는 노드(이론)라 이동·확대까지만 하고 멈춘다.
 */
export function nodeOpenKind(nodeId: string): NodeOpenKind | null {
  if (nodeId === "me") return "intro";
  if (getProject(nodeId)) return "project";
  if (getPost(nodeId)) return "post";
  return null;
}

/** 열린 뒤 머무를 주소 — 확대가 끝나는 시점에 여기로 넘어간다 */
export function nodeDestination(nodeId: string): string | null {
  switch (nodeOpenKind(nodeId)) {
    case "project":
      return `/projects/${nodeId}`;
    case "post":
      return `/posts/${nodeId}`;
    /* 소개는 그래프 위에서 시트로 열리므로 옮겨 갈 주소가 없다 */
    default:
      return null;
  }
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
