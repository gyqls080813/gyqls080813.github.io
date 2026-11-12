import type { ReactNode } from "react";
import type { NodeKind } from "../graph/types";
import InlineText from "./InlineText";
import styles from "./TextBlock.module.css";

/**
 * 왼쪽 세로선 + 라벨 + 본문으로 된 텍스트 박스.
 * 라벨 색은 accent를 data-kind로 달아 globals.css의 종류 → 색 표에서 받는다. 소개의 '지향 셋', 프로젝트 시트의 본문 블록을 하나로.
 */
export default function TextBlock({
  label,
  accent = "project",
  children,
}: {
  label: string;
  accent?: NodeKind;
  children: ReactNode;
}) {
  return (
    <section className={styles.block} data-kind={accent}>
      <h3 className={styles.label}>{label}</h3>
      <p className={styles.body}>
        <InlineText>{children}</InlineText>
      </p>
    </section>
  );
}
