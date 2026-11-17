import { postSummaries, projectSummaries } from "@/lib/catalog";
import type { SheetHead } from "@/lib/headings";
import type { NodeOpenKind } from "@/lib/nodeKinds";
import IntroSheet from "./IntroSheet";
import { PostHead, ProjectHead, SheetArticleHead } from "./content/ArticleHeads";
import sheetStyles from "./content/Sheet.module.css";

/**
 * 홈에서 노드가 열리는 동안 겹침 화면에 그리는 머리말 — 머리표, 제목, 한 줄 소개.
 *
 * 본문은 그리지 않는다. 예전에는 모든 종류의 본문 모듈과 코드 색칠 결과를 한 덩어리로
 * 불러와(압축해도 수 MB) 홈에 들어온 모든 방문자가 미리 받았다. 이론이 늘수록 커지는
 * 비용이다. 열림은 0.5초짜리 지나가는 화면이고 본문은 도착한 페이지가 그린다.
 *
 * 머리는 진짜 시트와 같은 컴포넌트(content/SheetHead)로 그린다 — 따로 그리면 한쪽만
 * 고쳤을 때 겹침 화면이 진짜 페이지로 바뀌는 순간 제목이 튄다. 글과 프로젝트의 머리는
 * 요약 목록(lib/catalog)에, 이론, 생각, TIL, 사전의 머리는 누른 노드의 요약 파일
 * (lib/outline의 loadOutline)에 있다. 그 파일이 아직 안 왔으면 머리 없이 열린다.
 * 소개 시트는 본문 모듈을 부르지 않는 가벼운 컴포넌트라 그대로 그린다.
 */
export default function ExpandShell({
  kind,
  nodeId,
  head,
}: {
  kind: NodeOpenKind;
  nodeId: string;
  head?: SheetHead;
}) {
  if (kind === "intro") return <IntroSheet />;

  if (kind === "post") {
    const post = postSummaries.find((item) => item.id === nodeId);
    return post ? (
      <div className={sheetStyles.articleInner}>
        <PostHead post={post} />
      </div>
    ) : null;
  }

  if (kind === "project") {
    const project = projectSummaries.find((item) => item.id === nodeId);
    return project ? (
      <div className={sheetStyles.articleInner}>
        <ProjectHead project={project} />
      </div>
    ) : null;
  }

  return head ? (
    <div className={sheetStyles.articleInner} data-kind={head.kind}>
      <SheetArticleHead head={head} />
    </div>
  ) : null;
}
