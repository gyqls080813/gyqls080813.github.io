import type { ReactNode } from "react";
import InlineText from "./InlineText";
import styles from "./TermNote.module.css";

/**
 * 낱말 풀이 — 본문에 나온 말 하나를 한 단 들여 따로 세운다.
 *
 * 문단 안에서 풀면 읽던 흐름이 끊긴다. 아는 사람은 지나치고 모르는 사람만
 * 들르도록, 본문과 다른 표면에 얹어 "여기는 곁길"이라는 걸 모양으로 알린다.
 */
export default function TermNote({
  term,
  kicker = "낱말",
  children,
}: {
  term: string;
  /** 박스 머리글. 낱말 풀이가 아니라 곁가지 설명이면 "참고" */
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <aside className={styles.note}>
      <span className={styles.kicker}>{kicker}</span>
      <p className={styles.term}>{term}</p>
      <p className={styles.body}>
        <InlineText>{children}</InlineText>
      </p>
    </aside>
  );
}
