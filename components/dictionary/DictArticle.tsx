import type { DictEntry, Dictionary } from "@/lib/dictionary";
import { slugify } from "@/lib/slug";
import { CodeBlock, Kicker, SectionHeading, TextBlock } from "../content";
/* 시트 안쪽 폭은 글·프로젝트·이론과 같은 것을 쓴다 */
import sheetStyles from "../content/Sheet.module.css";
import styles from "./DictArticle.module.css";

/** 낱말 하나 — 표제어가 라벨, 풀이가 문단, 필요하면 코드 한 조각 */
function Entry({ entry }: { entry: DictEntry }) {
  return (
    <div className={styles.block} id={slugify(entry.term)}>
      {/* 사전도 생각 갈래라 강조색이 같다 */}
      <TextBlock label={entry.term} accent="idea">
        {entry.body}
      </TextBlock>
      {entry.code && <CodeBlock>{entry.code}</CodeBlock>}
    </div>
  );
}

/** 사전 시트 안쪽 — 노드가 열리는 중에도 같은 내용이 그대로 보여야 해서 따로 뒀다 */
export default function DictArticle({ dictionary }: { dictionary: Dictionary }) {
  return (
    <div className={sheetStyles.articleInner}>
      <Kicker kind="idea">사전</Kicker>

      <h1 className={styles.title}>{dictionary.name}</h1>
      <p className={styles.tagline}>{dictionary.tagline}</p>

      <div className={styles.blocks}>
        <TextBlock label="무엇을 모으나" accent="idea">
          {dictionary.intro}
        </TextBlock>
      </div>

      {dictionary.sections.map((section) => (
        /* id는 오른쪽 목차가 걸어 두는 앵커다 */
        <section key={section.heading} id={slugify(section.heading)}>
          <SectionHeading icon="idea" spaced>
            {section.heading}
          </SectionHeading>
          <div className={`${styles.blocks} ${styles.sectionBlocks}`}>
            {section.entries.map((entry) => (
              <Entry key={entry.term} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
