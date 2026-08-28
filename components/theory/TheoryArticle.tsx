import type { Theory } from "@/lib/theories";
import { posts } from "@/lib/posts";
import { nodeHref } from "@/lib/nodeTarget";
import {
  CodeBlock,
  Kicker,
  NodeCard,
  SectionHeading,
  TextBlock,
} from "../content";
/* 시트 안쪽 폭은 글·프로젝트와 같은 것을 쓴다 */
import sheetStyles from "../post/PostView.module.css";
import styles from "./TheoryArticle.module.css";

/** 개념 시트 안쪽 — 노드가 열리는 중에도 같은 내용이 그대로 보여야 해서 따로 뒀다 */
export default function TheoryArticle({ theory }: { theory: Theory }) {
  /* 그래프에서 이 개념 노드에 다리로 이어진 트러블 글들과 같은 목록 */
  const related = posts.filter((post) =>
    post.theories.some((item) => item.id === theory.id),
  );

  return (
    <div className={sheetStyles.articleInner}>
      <Kicker kind="theory">이론</Kicker>

      <h1 className={styles.title}>{theory.name}</h1>
      <p className={styles.tagline}>{theory.tagline}</p>

      <div className={styles.blocks}>
        <TextBlock label="무엇을 푸는가" accent="theory">
          {theory.intro}
        </TextBlock>

        {theory.blocks.map((block) => (
          <div key={block.label} className={styles.block}>
            <TextBlock label={block.label} accent="theory">
              {block.body}
            </TextBlock>
            {block.code && <CodeBlock>{block.code}</CodeBlock>}
          </div>
        ))}
      </div>

      {related.length > 0 && (
        <>
          <SectionHeading icon="trouble" spaced>
            이 개념이 나온 글
          </SectionHeading>
          <div className={styles.posts}>
            {related.map((post) => (
              <NodeCard
                key={post.id}
                kind="trouble"
                title={post.title}
                meta={`${post.date} · ${post.readMinutes}분`}
                href={nodeHref(post.id)}
              />
            ))}
          </div>
        </>
      )}

      {theory.sources && theory.sources.length > 0 && (
        <div className={styles.sources}>
          {theory.sources.map((source) => (
            <a
              key={source.href}
              className={styles.source}
              href={source.href}
              target="_blank"
              rel="noreferrer"
            >
              {source.label}
              <span className={styles.sourceArrow}>↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
