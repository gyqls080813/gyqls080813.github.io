import type { PostSummary, ProjectSummary } from "@/lib/catalog";
import { SHEET_KICKER, type SheetHead } from "@/lib/headings";
import PostMeta from "./PostMeta";
import { Kicker } from "./Prose";
import sheetStyles from "./Sheet.module.css";
import styles from "./SheetArticle.module.css";

/*
 * 시트의 머리 — 시트 본문과, 홈에서 노드가 열리는 동안의 겹침 화면(ExpandShell)이 같이 쓴다.
 *
 * 겹침 화면은 0.5초 뒤 진짜 페이지로 바뀐다. 두 쪽이 머리를 따로 그리면 한쪽만 고쳤을 때
 * 바뀌는 순간에 제목이 튄다. 그래서 머리는 여기 한 벌만 두고, 본문은 진짜 페이지만 그린다.
 * 본문 모듈을 부르지 않는다 — 겹침 화면은 홈 번들에 실린다. 갈래 쪽 스타일도 부르지 않는다:
 * 프로젝트 머리도 이론과 같은 제목, 한 줄 소개 모양(SheetArticle.module.css)을 쓴다.
 *
 * 파일 이름이 lib/headings의 타입 SheetHead와 겹치지 않게 ArticleHeads다 — 타입은 머리의 데이터,
 * 여기는 그 데이터를 그리는 컴포넌트들이다.
 */

/** 이론, 생각, TIL, 사전 — 머리표, 제목, (날짜), 한 줄 소개 */
export function SheetArticleHead({ head }: { head: SheetHead }) {
  return (
    <>
      <Kicker kind={head.kind}>{head.kicker}</Kicker>
      <h1 className={styles.title}>{head.title}</h1>
      {head.date && <p className={styles.afterTitle}>{head.date}</p>}
      <p className={styles.tagline}>{head.tagline}</p>
    </>
  );
}

/** 프로젝트 — 머리표, 이름, 한 줄 소개 */
export function ProjectHead({ project }: { project: Pick<ProjectSummary, "name" | "tagline"> }) {
  return (
    <>
      <Kicker kind="project">{SHEET_KICKER.project}</Kicker>
      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.tagline}>{project.tagline}</p>
    </>
  );
}

/** 트러블 글 — 머리표 대신 메타 줄(프로젝트, 개념, 날짜), 그리고 제목 */
export function PostHead({ post }: { post: PostSummary }) {
  return (
    <>
      <PostMeta post={post} className={sheetStyles.meta} />
      <h1 className={sheetStyles.title}>{post.title}</h1>
    </>
  );
}
