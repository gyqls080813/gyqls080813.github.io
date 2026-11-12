import { labelOf } from "@/lib/graphData";
import { cx } from "@/lib/util";
import type { PostSummary } from "@/lib/catalog";
import Chip from "./Chip";
import styles from "./PostMeta.module.css";

/**
 * 글 한 편의 메타 줄 — 발생한 프로젝트, 이어진 개념, 날짜·읽는 시간.
 * 글 시트의 머리와 전체 글 목록의 카드가 같은 줄을 쓴다.
 */
export default function PostMeta({
  post,
  className,
}: {
  post: Pick<PostSummary, "project" | "theories" | "date" | "readMinutes">;
  className?: string;
}) {
  return (
    <div className={cx(styles.meta, className)}>
      <Chip kind="project" variant="soft">
        {labelOf(post.project)}
      </Chip>
      {post.theories.map((theory) => (
        <Chip key={theory.id} kind="theory" variant="soft">
          {labelOf(theory.id)}
        </Chip>
      ))}
      <span className={styles.date}>
        {post.date}, {post.readMinutes}분
      </span>
    </div>
  );
}
