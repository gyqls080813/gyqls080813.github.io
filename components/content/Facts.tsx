import type { ReactNode } from "react";
import type { NodeKind } from "../graph/types";
import styles from "./Facts.module.css";

/**
 * 라벨-값 한 줄 (예: 기간 / 팀 / 역할). 라벨 색은 accent에서.
 * 여러 줄을 묶는 테두리 상자는 부모가 맡는다.
 */
export function FactRow({
  label,
  accent = "project",
  children,
}: {
  label: string;
  accent?: NodeKind;
  children: ReactNode;
}) {
  return (
    <div className={styles.factRow} data-accent={accent}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{children}</span>
    </div>
  );
}

/**
 * 불릿 + 내용 + 오른쪽 날짜 한 줄 (예: 이력·수상). 호버하면 옅게 강조된다.
 */
export function EntryRow({
  date,
  children,
}: {
  date?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.entryRow}>
      <span className={styles.entryBullet} />
      <span className={styles.entryText}>{children}</span>
      {date && <span className={styles.entryDate}>{date}</span>}
    </div>
  );
}
