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
import type { NodeOpenKind } from "@/lib/nodeTarget";

/**
 * 홈에서 노드가 열리는 동안 겹침 화면에 그리는 본문.
 *
 * 본문 모듈과 코드 색칠 결과를 전부 끌고 오므로 홈의 첫 번들에 넣지 않는다 —
 * GraphHome이 React.lazy로 불러오고, 화면이 한가해지면 미리 받아 둔다.
 * 노드를 누르면 카메라가 옮겨 가는 동안(0.5초) 받을 시간도 있다.
 */
export default function ExpandArticle({
  kind,
  nodeId,
  onOpenNode,
}: {
  kind: NodeOpenKind;
  nodeId: string;
  onOpenNode: (nodeId: string) => void;
}) {
  switch (kind) {
    case "project":
      return <ProjectArticle project={getProject(nodeId)!} />;
    case "theory":
      return <TheoryArticle theory={getTheory(nodeId)!} />;
    case "idea":
      return <IdeaArticle idea={getIdea(nodeId)!} />;
    case "post":
      return <PostArticle post={getPost(nodeId)!} />;
    case "til":
      return <TilArticle til={getTil(nodeId)!} />;
    case "dict":
      return <DictArticle dictionary={getDictionary(nodeId)!} />;
    default:
      return <IntroSheet onProjectClick={onOpenNode} onTheoryClick={onOpenNode} />;
  }
}
