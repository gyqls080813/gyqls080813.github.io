import type { ReactNode } from "react";
import type { NodeKind } from "../graph/types";
import type { TheoryBlock, TheorySource } from "@/lib/theories";
import { sectionBlockId, slugify } from "@/lib/slug";
import { cx } from "@/lib/util";
import CodeBlock from "./CodeBlock";
import CodePreview from "./CodePreview";
import DataTable from "./DataTable";
import ExternalLink from "./ExternalLink";
import KeyPoints from "./KeyPoints";
import LiveLab from "./LiveLab";
import Quiz from "./Quiz";
import type { SheetHead } from "@/lib/headings";
import { SectionHeading } from "./Prose";
import { SheetArticleHead } from "./ArticleHeads";
import TermNote from "./TermNote";
import TextBlock from "./TextBlock";
import sheetStyles from "./Sheet.module.css";
import styles from "./SheetArticle.module.css";

/** 블록 한 칸 — 이론의 블록이 가장 넓고, TIL·사전은 그 일부만 쓴다 */
export type SheetBlockData = Pick<TheoryBlock, "label" | "body"> &
  Partial<
    Pick<
      TheoryBlock,
      "tables" | "code" | "codeLang" | "preview" | "quiz" | "terms" | "notes" | "lab"
    >
  >;

export type SheetSectionData = { heading: string; blocks: SheetBlockData[] };

/**
 * 한 블록 — 문단, 확인 질문, 낱말 풀이, 참고(위), 표, 코드와 결과, 직접 해 보기, 참고(아래) 순서.
 *
 * 이론·생각·TIL·사전이 이 하나를 쓴다. 갈래마다 따로 두었을 때는 이론만 참고와
 * 표를 그리고 생각은 빠뜨려, 생각 시트에 적어 둔 참고가 화면에 나오지 않았다.
 */
export function SheetBlock({
  block,
  accent,
  id,
}: {
  block: SheetBlockData;
  /** 라벨 색 — 시트의 갈래 */
  accent: NodeKind;
  /** 앵커. 목차가 이 id로 찾아온다 */
  id: string;
}) {
  const topNotes = block.notes?.filter((note) => !note.bottom) ?? [];
  const bottomNotes = block.notes?.filter((note) => note.bottom) ?? [];
  return (
    <div className={styles.block} id={id}>
      <TextBlock label={block.label} accent={accent} lab={Boolean(block.lab)}>
        {block.body}
      </TextBlock>
      {/* 확인 질문 — 본문은 짧은 안내, 질문과 접힌 답이 이어진다 */}
      {block.quiz && block.quiz.length > 0 && <Quiz items={block.quiz} />}
      {block.terms?.map((term) => (
        <TermNote key={term.term} term={term.term}>
          {term.body}
        </TermNote>
      ))}
      {/* 참고는 본문 설명에 이어 붙는 곁가지라, 예제 코드보다 먼저 읽힌다 */}
      {topNotes.map((note) => (
        <TermNote key={note.title} term={note.title} kicker="참고">
          {note.body}
        </TermNote>
      ))}
      {/* 표는 설명과 예제 코드 사이 — 경우를 견주거나 구조를 칸으로 보여 준다 */}
      {block.tables?.map((table, index) => (
        <DataTable key={index} {...table} />
      ))}
      {block.code && <CodeBlock lang={block.codeLang}>{block.code}</CodeBlock>}
      {/* 코드 바로 밑에 그 코드를 브라우저가 그린 모습 — 코드와 결과를 눈으로 오가며 견준다 */}
      {block.code && block.preview && block.codeLang === "html" && (
        <CodePreview html={block.code} />
      )}
      {/* 직접 해 보기 — 읽은 코드를 고쳐서 진짜 작은 창에서 돌려 본다 */}
      {block.lab && <LiveLab lab={block.lab} />}
      {/* 코드까지 다 본 뒤에 읽을 참고 — 블록을 마무리하는 곁가지 */}
      {bottomNotes.map((note) => (
        <TermNote key={note.title} term={note.title} kicker="참고">
          {note.body}
        </TermNote>
      ))}
    </div>
  );
}

/**
 * 시트 본문의 뼈대 — 머리표, 제목, 한 줄 소개, 첫 블록(intro), 블록·절, 출처.
 *
 * 이론·생각·TIL·사전 시트가 같은 뼈대에 내용만 다르게 넣는다. 다른 것은 갈래 색과
 * intro의 라벨, 그리고 갈래에만 있는 칸(TIL의 날짜, 이론의 "이 개념이 나온 글")이다.
 * 날짜는 머리(head)에, 이론의 칸은 children으로 받는다.
 */
export default function SheetArticle({
  head,
  keyPoints,
  introLabel,
  intro,
  blocks,
  sections,
  blockAnchor = sectionBlockId,
  sources,
  children,
  footer,
}: {
  /** 머리 — 갈래(색과 표식), 머리표, 제목, 날짜, 한 줄 소개. lib/headings의 SHEET_HEAD로 만든다 */
  head: SheetHead;
  /** 핵심 정리 — 머리 바로 아래, 첫 블록보다 먼저 */
  keyPoints?: string[];
  introLabel: string;
  intro: string;
  /** 절이 없는 시트의 블록 */
  blocks?: SheetBlockData[];
  sections?: SheetSectionData[];
  /**
   * 절 안 블록의 앵커. 기본은 절 id를 앞에 붙인 것(sectionBlockId)이다.
   * 목차(lib/sheet의 sheetNavItems)가 같은 규칙으로 id를 만들므로 둘이 함께 간다.
   */
  blockAnchor?: (sectionHeading: string, label: string) => string;
  sources?: TheorySource[];
  /** 절 다음, 출처 앞에 붙는 갈래만의 칸 */
  children?: ReactNode;
  /** 출처 다음, 시트의 맨 끝 — 이전·다음 장처럼 다 읽은 뒤에 갈 곳 */
  footer?: ReactNode;
}) {
  const { kind } = head;
  return (
    /* 이 시트의 갈래 색은 data-kind에서 내려온다 (globals.css의 --kind) */
    <div className={sheetStyles.articleInner} data-kind={kind}>
      <SheetArticleHead head={head} />

      {keyPoints && keyPoints.length > 0 && <KeyPoints points={keyPoints} />}

      <div className={styles.blocks}>
        <TextBlock label={introLabel} accent={kind}>
          {intro}
        </TextBlock>
        {blocks?.map((block) => (
          <SheetBlock key={block.label} block={block} accent={kind} id={slugify(block.label)} />
        ))}
      </div>

      {/* 문서를 따라 읽는 시트는 절 제목을 문서의 번호·이름 그대로 세운다.
          id는 오른쪽 목차가 걸어 두는 앵커다 */}
      {sections?.map((section) => (
        <section key={section.heading} id={slugify(section.heading)}>
          <SectionHeading icon={kind} spaced>
            {section.heading}
          </SectionHeading>
          <div className={cx(styles.blocks, styles.sectionBlocks)}>
            {section.blocks.map((block) => (
              <SheetBlock
                key={block.label}
                block={block}
                accent={kind}
                id={blockAnchor(section.heading, block.label)}
              />
            ))}
          </div>
        </section>
      ))}

      {children}

      {sources && sources.length > 0 && (
        <div className={styles.sources}>
          {sources.map((source) => (
            <ExternalLink key={source.href} href={source.href} className={styles.source}>
              {source.label}
              <span className={styles.sourceArrow}>↗</span>
            </ExternalLink>
          ))}
        </div>
      )}

      {footer}
    </div>
  );
}
