import type { Til, TilBlock } from "@/lib/tils";
import { slugify } from "@/lib/slug";
import { CodeBlock, Kicker, SectionHeading, TextBlock } from "../content";
/* 시트 안쪽 폭은 글·프로젝트·이론과 같은 것을 쓴다 */
import sheetStyles from "../content/Sheet.module.css";
import styles from "./TilArticle.module.css";

/** 한 블록 — 문단, 그 아래 코드 한 조각. 이론 시트의 Block과 같은 모양이다 */
function Block({ block }: { block: TilBlock }) {
  return (
    <div className={styles.block} id={slugify(block.label)}>
      {/* 기록도 생각 갈래라 강조색이 같다 — 종류는 위 Kicker의 달력이 말한다 */}
      <TextBlock label={block.label} accent="til">
        {block.body}
      </TextBlock>
      {block.code && <CodeBlock>{block.code}</CodeBlock>}
    </div>
  );
}

/** TIL 시트 안쪽 — 노드가 열리는 중에도 같은 내용이 그대로 보여야 해서 따로 뒀다 */
export default function TilArticle({ til }: { til: Til }) {
  return (
    <div className={sheetStyles.articleInner}>
      <Kicker kind="til">TIL</Kicker>

      <h1 className={styles.title}>{til.title}</h1>
      <p className={styles.date}>{til.date}</p>
      <p className={styles.tagline}>{til.tagline}</p>

      <div className={styles.blocks}>
        <TextBlock label="무엇을 붙들고 있었나" accent="til">
          {til.intro}
        </TextBlock>
      </div>

      {til.sections.map((section) => (
        /* id는 오른쪽 목차가 걸어 두는 앵커다 */
        <section key={section.heading} id={slugify(section.heading)}>
          <SectionHeading icon="til" spaced>
            {section.heading}
          </SectionHeading>
          <div className={`${styles.blocks} ${styles.sectionBlocks}`}>
            {section.blocks.map((block) => (
              <Block key={block.label} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
