import type { ReactNode } from "react";
import type { NodeKind } from "../graph/types";
import RichText from "./RichText";
import styles from "./TextBlock.module.css";

/**
 * 왼쪽 세로선 + 라벨 + 본문으로 된 텍스트 박스.
 * 라벨 색은 accent를 data-kind로 달아 globals.css의 종류 → 색 표에서 받는다. 소개의 '지향 셋', 프로젝트 시트의 본문 블록을 하나로.
 */
export default function TextBlock({
  label,
  accent = "project",
  lab = false,
  children,
}: {
  label: string;
  accent?: NodeKind;
  /** 직접 해 보기 블록 — 제목 앞에 재생 표시를 달아 읽는 블록과 손대는 블록을 가른다 */
  lab?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={styles.block} data-kind={accent}>
      <h3 className={lab ? `${styles.label} ${styles.labLabel}` : styles.label}>{label}</h3>
      {/* 문자열이면 문단과 목록으로 나눠 그린다. 이미 그려진 것(소개의 목록)은 그대로 */}
      {typeof children === "string" ? (
        <RichText className={styles.body}>{children}</RichText>
      ) : (
        <div className={styles.body}>{children}</div>
      )}
    </section>
  );
}
