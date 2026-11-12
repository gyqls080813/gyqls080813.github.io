import type { ReactNode } from "react";
import IntroSheet from "./IntroSheet";
import PostArticle from "./post/PostArticle";
import ProjectArticle from "./project/ProjectArticle";
import TheoryArticle from "./theory/TheoryArticle";
import IdeaArticle from "./idea/IdeaArticle";
import TilArticle from "./til/TilArticle";
import DictArticle from "./dictionary/DictArticle";
import { getPost } from "@/lib/posts";
import { getProject } from "@/lib/projects";
import { getTheory } from "@/lib/theories";
import { getIdea } from "@/lib/ideas";
import { getTil } from "@/lib/tils";
import { getDictionary } from "@/lib/dictionary";
import type { NodeOpenKind } from "@/lib/nodeKinds";

/**
 * 종류 → 본문. 찾은 것이 없으면 아무것도 그리지 않는다 — 열림 판단(색인)과
 * 본문이 어긋나도 겹침 화면이 터지지 않고 빈 시트로 열린다.
 */
const ARTICLE: Record<NodeOpenKind, (nodeId: string) => ReactNode> = {
  intro: () => <IntroSheet />,
  project: (id) => {
    const project = getProject(id);
    return project && <ProjectArticle project={project} />;
  },
  post: (id) => {
    const post = getPost(id);
    return post && <PostArticle post={post} />;
  },
  theory: (id) => {
    const theory = getTheory(id);
    return theory && <TheoryArticle theory={theory} />;
  },
  idea: (id) => {
    const idea = getIdea(id);
    return idea && <IdeaArticle idea={idea} />;
  },
  til: (id) => {
    const til = getTil(id);
    return til && <TilArticle til={til} />;
  },
  dict: (id) => {
    const dictionary = getDictionary(id);
    return dictionary && <DictArticle dictionary={dictionary} />;
  },
};

/**
 * 홈에서 노드가 열리는 동안 겹침 화면에 그리는 본문.
 *
 * 본문 모듈과 코드 색칠 결과를 전부 끌고 오므로 홈의 첫 번들에 넣지 않는다 —
 * GraphHome이 React.lazy로 불러오고, 화면이 한가해지면 미리 받아 둔다.
 * 노드를 누르면 카메라가 옮겨 가는 동안(0.5초) 받을 시간도 있다.
 */
export default function ExpandArticle({ kind, nodeId }: { kind: NodeOpenKind; nodeId: string }) {
  return ARTICLE[kind](nodeId);
}
