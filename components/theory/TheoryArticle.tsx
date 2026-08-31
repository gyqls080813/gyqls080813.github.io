import type { Theory, TheoryBlock } from "@/lib/theories";
import { posts } from "@/lib/posts";
import { nodeHref } from "@/lib/nodeTarget";
import { slugify } from "@/lib/slug";
import {
  CodeBlock,
  Kicker,
  NodeCard,
  SectionHeading,
  TermNote,
  TextBlock,
  type NavItem,
} from "../content";
/* 시트 안쪽 폭은 글·프로젝트와 같은 것을 쓴다 */
import sheetStyles from "../post/PostView.module.css";
import styles from "./TheoryArticle.module.css";

/**
 * 오른쪽 목차에 세울 것 — 제목을 가진 쪽이 목록도 만든다.
 *
 * 절이 있으면 절 제목을, 없으면(길잡이 시트) 블록 라벨을 세운다.
 * 절이 있을 때는 그 아래 블록까지 두 층으로 넘긴다 — 펴는 판단은 목차가 한다.
 */
export function theoryNavItems(theory: Theory): NavItem[] {
  const item = (label: string): NavItem => ({ id: slugify(label), label });
  if (theory.sections) {
    return theory.sections.map((section) => ({
      ...item(section.heading),
      children: section.blocks.map((block) => item(block.label)),
    }));
  }
  return (theory.blocks ?? []).map((block) => item(block.label));
}

/** 한 블록 — 문단, 낱말 풀이, 코드 순서. 절이 있든 없든 모양이 같아야 한다 */
function Block({ block }: { block: TheoryBlock }) {
  return (
    <div className={styles.block} id={slugify(block.label)}>
      <TextBlock label={block.label} accent="theory">
        {block.body}
      </TextBlock>
      {block.terms?.map((term) => (
        <TermNote key={term.term} term={term.term}>
          {term.body}
        </TermNote>
      ))}
      {block.code && <CodeBlock>{block.code}</CodeBlock>}
    </div>
  );
}

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

        {theory.blocks?.map((block) => (
          <Block key={block.label} block={block} />
        ))}
      </div>

      {/* 문서를 따라 읽는 시트는 절 제목을 문서의 번호·이름 그대로 세운다 */}
      {theory.sections?.map((section) => (
        /* id는 오른쪽 목차가 걸어 두는 앵커다 */
        <section key={section.heading} id={slugify(section.heading)}>
          <SectionHeading icon="theory" spaced>
            {section.heading}
          </SectionHeading>
          <div className={`${styles.blocks} ${styles.sectionBlocks}`}>
            {section.blocks.map((block) => (
              <Block key={block.label} block={block} />
            ))}
          </div>
        </section>
      ))}

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
