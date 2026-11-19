import Link from "next/link";
import type { TheoryQuiz } from "@/lib/theories";
import InlineText from "./InlineText";
import Quiz from "./Quiz";
import RichText from "./RichText";
import styles from "./BeforeReading.module.css";

/** 읽기 전 질문은 이만큼만 보인다 — 더 많으면 상자가 본문을 밀어낸다 */
const SHOWN = 3;

/**
 * 읽기 전에 — 지난 장 질문 하나를 다시 떠올리고, 이 장에서 답할 질문을 먼저 본다.
 *
 * 둘 다 학습 연구에서 효과가 확인된 순서다.
 * - 지난 장 다시 떠올리기: 배운 것을 시간을 두고 다시 꺼내면 한 번에 몰아 볼 때보다 오래 남는다
 *   (간격 두기, 인출 연습). 새 내용 앞에서 지난 내용을 떠올리면 새 내용도 더 잘 배운다(전진 시험 효과).
 * - 이 장에서 답할 질문: 읽기 전에 질문을 보면 읽는 동안 그 자리에 주의가 모인다(사전 질문 효과).
 *   답은 장 끝의 확인 질문에 접혀 있다. 여기서는 질문만 보여 준다.
 */
export default function BeforeReading({
  review,
  lead,
  questions,
  quizHref,
}: {
  /** 지난 장의 질문 하나 — 지난 장이 없거나 질문이 없으면 비운다 */
  review?: { href: string; name: string; item: TheoryQuiz };
  /** 질문들이 기대는 상황 설명 — 있으면 질문 위에 둔다 */
  lead?: string;
  /** 이 장의 확인 질문들(답 없이) */
  questions: string[];
  /** 장 끝 확인 질문의 앵커 */
  quizHref: string;
}) {
  if (!review && questions.length === 0) return null;
  const rest = questions.length - SHOWN;
  return (
    <section className={styles.box} aria-label="읽기 전에">
      {review && (
        <div className={styles.part}>
          <p className={styles.title}>
            지난 장 다시 떠올리기
            <Link href={review.href} className={styles.from}>
              {review.name}
            </Link>
          </p>
          <Quiz items={[review.item]} marker={() => "복습"} />
        </div>
      )}
      {questions.length > 0 && (
        <div className={styles.part}>
          <p className={styles.title}>이 장을 읽고 답할 질문</p>
          {lead && <RichText className={styles.lead}>{lead}</RichText>}
          <ol className={styles.questions}>
            {questions.slice(0, SHOWN).map((q, index) => (
              <li key={index}>
                <InlineText>{q}</InlineText>
              </li>
            ))}
          </ol>
          <a href={quizHref} className={styles.toQuiz}>
            {rest > 0
              ? `질문 ${rest}개 더, 답은 장 끝에서 맞춰 보기 ↓`
              : "답은 장 끝에서 맞춰 보기 ↓"}
          </a>
        </div>
      )}
    </section>
  );
}
