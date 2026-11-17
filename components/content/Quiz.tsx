import type { TheoryQuiz } from "@/lib/theories";
import InlineText from "./InlineText";
import RichText from "./RichText";
import styles from "./Quiz.module.css";

/**
 * 확인 질문 — 질문마다 답을 접어 둔다.
 *
 * 질문만 있으면 맞게 떠올렸는지 알 길이 없고, 답이 바로 보이면 떠올려 볼 틈이 없다.
 * 먼저 답을 생각하고 펼쳐서 맞춰 보는 순서를 모양으로 만든다.
 */
export default function Quiz({ items }: { items: TheoryQuiz[] }) {
  return (
    <ol className={styles.quiz}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          <p className={styles.question}>
            <span className={styles.number}>Q{index + 1}</span>
            <span>
              <InlineText>{item.q}</InlineText>
            </span>
          </p>
          <details className={styles.answer}>
            <summary className={styles.summary}>답 보기</summary>
            <RichText className={styles.answerText}>{item.a}</RichText>
          </details>
        </li>
      ))}
    </ol>
  );
}
