import type { Til } from "@/lib/tils";
import { slugify } from "@/lib/slug";
import SheetArticle from "../content/SheetArticle";
import styles from "../content/SheetArticle.module.css";

/**
 * TIL 시트 안쪽 — 이론 시트와 같은 뼈대에 출처 대신 날짜를 세운다.
 *
 * 블록 앵커는 라벨만으로 짓는다. 목차가 절만 세우므로(lib/sheet) 블록까지
 * 절 이름을 붙일 까닭이 없고, 이미 걸린 앵커를 바꾸지 않으려는 것도 있다.
 */
export default function TilArticle({ til }: { til: Til }) {
  return (
    <SheetArticle
      kind="til"
      kicker="TIL"
      title={til.title}
      afterTitle={<p className={styles.afterTitle}>{til.date}</p>}
      tagline={til.tagline}
      introLabel="무엇을 붙들고 있었나"
      intro={til.intro}
      sections={til.sections}
      blockAnchor={(_, label) => slugify(label)}
    />
  );
}
