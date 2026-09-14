import type { Idea } from "@/lib/ideas";
import type { TheoryBlock } from "@/lib/theories";
import { slugify } from "@/lib/slug";
import { CodeBlock, Kicker, SectionHeading, TermNote, TextBlock } from "../content";
import sheetStyles from "../content/Sheet.module.css";
/* 생각 시트는 이론 시트와 같은 뼈대를 쓴다 — 색만 갈래를 따라 초록이다 */
import styles from "../theory/TheoryArticle.module.css";

function Block({ block }: { block: TheoryBlock }) {
  return (
    <div className={styles.block} id={slugify(block.label)}>
      <TextBlock label={block.label} accent="idea">
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

/**
 * 생각 시트 안쪽.
 *
 * 이론 시트와 다른 점은 둘이다 — 머리 표식이 '생각'이고, "이 개념이 나온 글"
 * 목록이 없다. 트러블 글은 이론에 다리를 놓지 생각에는 놓지 않는다. 생각이
 * 프로젝트에서 나온 자리는 본문의 마지막 절("실제로 부딪힌 곳")이 직접 말한다.
 */
export default function IdeaArticle({ idea }: { idea: Idea }) {
  return (
    <div className={sheetStyles.articleInner}>
      <Kicker kind="idea">생각</Kicker>

      <h1 className={styles.title}>{idea.name}</h1>
      <p className={styles.tagline}>{idea.tagline}</p>

      <div className={styles.blocks}>
        <TextBlock label="무엇을 정하는가" accent="idea">
          {idea.intro}
        </TextBlock>

        {idea.blocks?.map((block) => (
          <Block key={block.label} block={block} />
        ))}
      </div>

      {idea.sections?.map((section) => (
        <section key={section.heading} id={slugify(section.heading)}>
          <SectionHeading icon="idea" spaced>
            {section.heading}
          </SectionHeading>
          <div className={`${styles.blocks} ${styles.sectionBlocks}`}>
            {section.blocks.map((block) => (
              <Block key={block.label} block={block} />
            ))}
          </div>
        </section>
      ))}

      {idea.sources && idea.sources.length > 0 && (
        <div className={styles.sources}>
          {idea.sources.map((source) => (
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
