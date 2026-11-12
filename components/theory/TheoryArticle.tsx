import type { Theory } from "@/lib/theories";
import { postSummaries } from "@/lib/catalog";
import { PostCard, SectionHeading } from "../content";
import SheetArticle from "../content/SheetArticle";
import styles from "../content/SheetArticle.module.css";

/**
 * 개념 시트 안쪽 — 노드가 열리는 중에도 같은 내용이 그대로 보여야 해서 따로 뒀다.
 * 뼈대는 SheetArticle이 쥐고, 여기는 이론에만 있는 칸("이 개념이 나온 글")만 더한다.
 */
export default function TheoryArticle({ theory }: { theory: Theory }) {
  /* 그래프에서 이 개념 노드에 다리로 이어진 트러블 글들과 같은 목록 */
  const related = postSummaries.filter((post) =>
    post.theories.some((item) => item.id === theory.id),
  );

  return (
    <SheetArticle
      kind="theory"
      kicker="이론"
      title={theory.name}
      tagline={theory.tagline}
      introLabel="무엇을 푸는가"
      intro={theory.intro}
      blocks={theory.blocks}
      sections={theory.sections}
      sources={theory.sources}
    >
      {related.length > 0 && (
        <>
          <SectionHeading icon="trouble" spaced>
            이 개념이 나온 글
          </SectionHeading>
          <div className={styles.cards}>
            {related.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </SheetArticle>
  );
}
