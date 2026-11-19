import { getTheory, quizOf, type Theory } from "@/lib/theories";
import { labelOf } from "@/lib/graphData";
import { routeOf } from "@/lib/nodeKinds";
import { sheetNeighbors } from "@/lib/sheetNeighbors";
import { sectionBlockId, slugify } from "@/lib/slug";
import BeforeReading from "../content/BeforeReading";
import { postSummaries } from "@/lib/catalog";
import PostCard from "../content/PostCard";
import { SectionHeading } from "../content/Prose";
import SheetArticle from "../content/SheetArticle";
import SheetPager from "../content/SheetPager";
import styles from "../content/SheetArticle.module.css";
import { SHEET_HEAD } from "@/lib/headings";

/**
 * 개념 시트 안쪽 — 노드가 열리는 중에도 같은 내용이 그대로 보여야 해서 따로 뒀다.
 * 뼈대는 SheetArticle이 쥐고, 여기는 이론에만 있는 칸("이 개념이 나온 글")만 더한다.
 */
/**
 * 읽기 전에 칸의 재료 — 지난 장의 첫 확인 질문과 이 장의 질문들.
 * 지난 장 질문이 상황 설명(lead)에 기대면 그 질문만 떼어 보여 줄 수 없어 건너뛴다.
 * 이 장의 질문은 상황 설명과 함께 보여 준다.
 */
function beforeReadingOf(theory: Theory) {
  const quiz = quizOf(theory);
  const { prev } = sheetNeighbors(theory.id, "theory");
  const prevQuiz = prev ? quizOf(getTheory(prev)!) : undefined;
  const review =
    prev && prevQuiz && !prevQuiz.lead
      ? { href: routeOf("theory", prev), name: labelOf(prev), item: prevQuiz.items[0] }
      : undefined;
  if (!quiz && !review) return null;
  const anchor = quiz
    ? quiz.section
      ? sectionBlockId(quiz.section, quiz.label)
      : slugify(quiz.label)
    : "";
  return (
    <BeforeReading
      review={review}
      lead={quiz?.lead}
      questions={quiz ? quiz.items.map((item) => item.q) : []}
      quizHref={`#${anchor}`}
    />
  );
}

export default function TheoryArticle({ theory }: { theory: Theory }) {
  /* 그래프에서 이 개념 노드에 다리로 이어진 트러블 글들과 같은 목록 */
  const related = postSummaries.filter((post) =>
    post.theories.some((item) => item.id === theory.id),
  );

  return (
    <SheetArticle
      head={SHEET_HEAD.theory(theory)}
      beforeReading={beforeReadingOf(theory)}
      keyPoints={theory.keyPoints}
      introLabel="무엇을 푸는가"
      intro={theory.intro}
      blocks={theory.blocks}
      sections={theory.sections}
      sources={theory.sources}
      footer={<SheetPager nodeId={theory.id} kind="theory" />}
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
