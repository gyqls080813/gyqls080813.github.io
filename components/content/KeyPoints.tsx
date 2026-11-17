import InlineText from "./InlineText";
import styles from "./KeyPoints.module.css";

/**
 * 핵심 정리 — 제목 바로 아래, 본문보다 먼저.
 *
 * 긴 장을 끝까지 읽고 나서야 무엇이 중요했는지 알게 하면, 읽는 내내 어디에 힘을
 * 줘야 할지 모른다. 얻어 갈 것을 서너 줄로 먼저 보여 주고, 본문은 그 줄들을 풀어 가는
 * 자리가 된다. 다 읽은 뒤 돌아와 스스로 설명해 볼 체크리스트도 된다.
 */
export default function KeyPoints({ points }: { points: string[] }) {
  return (
    <section className={styles.box} aria-label="핵심 정리">
      <p className={styles.title}>핵심 정리</p>
      <ul className={styles.list}>
        {points.map((point, index) => (
          <li key={index} className={styles.item}>
            <InlineText>{point}</InlineText>
          </li>
        ))}
      </ul>
    </section>
  );
}
