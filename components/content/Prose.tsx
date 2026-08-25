import type { ReactNode } from "react";
import KindIcon from "../graph/KindIcon";
import type { NodeKind } from "../graph/types";
import styles from "./Prose.module.css";

/** 시트 상단 아이라인 — 아이콘 + 라벨 (예: "프로젝트", "자기소개") */
export function Kicker({
  kind,
  children,
}: {
  kind: NodeKind;
  children: ReactNode;
}) {
  return (
    <div className={styles.kicker} data-kind={kind}>
      <KindIcon kind={kind} size={15} />
      {children}
    </div>
  );
}

/**
 * 섹션 제목. 앞에 표식이 붙는다:
 * - tone: 증상/원인을 나타내는 색 불릿 (글 본문)
 * - icon: 종류 아이콘 (프로젝트·소개의 하위 섹션)
 * spaced를 주면 위 간격을 크게 벌린다.
 */
export function SectionHeading({
  tone,
  icon,
  spaced = false,
  children,
}: {
  tone?: "trouble" | "theory";
  icon?: NodeKind;
  spaced?: boolean;
  children: ReactNode;
}) {
  return (
    <h2 className={`${styles.heading} ${spaced ? styles.spaced : ""}`}>
      {icon ? (
        <KindIcon kind={icon} size={15} />
      ) : (
        <span className={styles.bullet} data-tone={tone} />
      )}
      {children}
    </h2>
  );
}
