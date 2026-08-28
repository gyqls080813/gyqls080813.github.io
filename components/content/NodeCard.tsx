"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import KindIcon from "../graph/KindIcon";
import type { NodeKind } from "../graph/types";
import Chip from "./Chip";
import PortDot from "./PortDot";
import styles from "./NodeCard.module.css";

/**
 * 노드 하나를 나타내는 카드(=노드 박스). 아이콘 · 제목(+역할) · 설명 · 메타 · 기술 배지 ·
 * 오른쪽 포트 점으로 이뤄진다. 색은 kind에서 나오고, 호버하면 그 색으로 살아난다.
 * href면 Link, onClick이면 button, 둘 다 없으면 정적 div로 렌더된다.
 * 소개의 프로젝트/이론 행, 프로젝트 시트의 "트러블 슈팅" 행을 하나로 통합.
 */
export default function NodeCard({
  kind,
  title,
  role,
  description,
  meta,
  tags,
  href,
  onClick,
}: {
  kind: NodeKind;
  title: string;
  /** 제목 옆 역할 태그 (예: FE Leader) */
  role?: string;
  description?: string;
  /** 하단 한 줄 메타 (예: 날짜 · 분) */
  meta?: string;
  /** 기술 배지 목록 */
  tags?: string[];
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <KindIcon kind={kind} size={16} />
      <span className={styles.text}>
        <span className={styles.head}>
          <span className={styles.title}>{title}</span>
          {role && (
            <Chip kind={kind} variant="role">
              {role}
            </Chip>
          )}
        </span>
        {description && <span className={styles.desc}>{description}</span>}
        {meta && <span className={styles.meta}>{meta}</span>}
        {tags && tags.length > 0 && (
          <span className={styles.tags}>
            {tags.map((tag) => (
              <Chip key={tag} kind={kind} variant="badge">
                {tag}
              </Chip>
            ))}
          </span>
        )}
      </span>
      <PortDot kind={kind} size="sm" className={styles.port} />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles.card} data-kind={kind}>
        {inner}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        className={styles.card}
        data-kind={kind}
        onClick={onClick}
      >
        {inner}
      </button>
    );
  }
  return (
    <div className={styles.card} data-kind={kind}>
      {inner}
    </div>
  );
}
