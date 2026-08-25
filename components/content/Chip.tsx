import type { ReactNode } from "react";
import type { NodeKind } from "../graph/types";
import styles from "./Chip.module.css";

/** 칩 종류 — soft: 채운 메타 칩 · outline: 스택 칩 · badge: 카드 안 작은 배지 · role: 역할 태그 */
export type ChipVariant = "soft" | "outline" | "badge" | "role";

/**
 * 의미 색을 입은 라벨 칩. 색은 kind에서 나온다(포트·노드와 같은 색 체계).
 * 흩어져 있던 chipProject·chipTheory·stackChip·techBadge·roleTag를 하나로.
 */
export default function Chip({
  kind = "theory",
  variant = "soft",
  children,
}: {
  kind?: NodeKind;
  variant?: ChipVariant;
  children: ReactNode;
}) {
  return (
    <span className={`${styles.chip} ${styles[variant]}`} data-kind={kind}>
      {children}
    </span>
  );
}
