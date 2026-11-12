import { getDictionary } from "./dictionary";
import { getIdea } from "./ideas";
import type { NodeOpenKind } from "./nodeKinds";
import { getPost } from "./posts";
import { getProject } from "./projects";
import { getTheory } from "./theories";
import { getTil } from "./tils";

/**
 * 종류마다 본문을 찾는 함수 — 본문 모듈을 전부 부르므로 브라우저 코드는 쓰지 않는다.
 * 빌드 스크립트(sheet-index)와 서버 쪽 계산(lib/sheet·openKind)이 쓴다.
 *
 * 소개(intro)는 본문 모듈이 없다 — 내용이 소개 시트 컴포넌트에 고정돼 있고 노드는 "me" 하나다.
 */
export const CONTENT_OF: Record<NodeOpenKind, (nodeId: string) => boolean> = {
  intro: (id) => id === "me",
  project: (id) => getProject(id) !== undefined,
  post: (id) => getPost(id) !== undefined,
  theory: (id) => getTheory(id) !== undefined,
  idea: (id) => getIdea(id) !== undefined,
  til: (id) => getTil(id) !== undefined,
  dict: (id) => getDictionary(id) !== undefined,
};
