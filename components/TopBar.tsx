"use client";

"use client";

import Link from "next/link";
import styles from "./TopBar.module.css";

export type GraphFilter = "all" | "theory" | "project" | "trouble";

const FILTERS: { key: GraphFilter; label: string; chipClass: string }[] = [
  { key: "all", label: "전체", chipClass: styles.chipAll },
  { key: "theory", label: "이론", chipClass: styles.chipTheory },
  { key: "project", label: "프로젝트", chipClass: styles.chipProject },
  { key: "trouble", label: "트러블슈팅", chipClass: styles.chipTrouble },
];

function LogoGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="3" stroke="var(--theory)" strokeWidth="1.8" />
      <circle cx="18" cy="9" r="3" stroke="var(--project)" strokeWidth="1.8" />
      <circle cx="10" cy="18" r="3" stroke="var(--trouble)" strokeWidth="1.8" />
      <path
        d="M8.5 7.5 L15.2 8.4 M7.2 8.8 L9.2 15.2 M15.5 11 L12 15.8"
        stroke="#3A4456"
        strokeWidth="1.4"
      />
    </svg>
  );
}

interface TopBarProps {
  activeFilter?: GraphFilter;
  onFilterChange?: (filter: GraphFilter) => void;
  /** 필터 대신 표시할 내용 (연결 뷰의 경로 브레드크럼) */
  breadcrumb?: React.ReactNode;
  /** 홈에서는 제자리에서 소개를 연다. 없으면 홈으로 이동하며 소개를 요청 */
  onIntroClick?: () => void;
}

export default function TopBar({
  activeFilter,
  onFilterChange,
  breadcrumb,
  onIntroClick,
}: TopBarProps) {
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.brand}>
        <LogoGlyph />
        <span className={styles.wordmark}>민엽의 트러블로그</span>
      </Link>

      {breadcrumb}

      {activeFilter && (
        <nav className={styles.filters} aria-label="그래프 필터">
          {FILTERS.map(({ key, label, chipClass }) => (
            <button
              key={key}
              type="button"
              className={`${styles.chip} ${chipClass}`}
              data-active={activeFilter === key}
              onClick={() => onFilterChange?.(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      )}

      <div className={styles.spacer} />

      {onIntroClick ? (
        <button type="button" className={styles.introLink} onClick={onIntroClick}>
          소개
        </button>
      ) : (
        <Link
          href="/"
          className={styles.introLink}
          onClick={() => {
            try {
              sessionStorage.setItem("introRequest", "1");
            } catch {
              /* 무시 */
            }
          }}
        >
          소개
        </Link>
      )}

      <button type="button" className={styles.search} aria-label="노드·글 검색">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M15.5 15.5 L20 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className={styles.searchLabel}>노드·글 검색</span>
        <span className={styles.kbd}>Ctrl K</span>
      </button>

      <Link href="/posts" className={styles.listButton} aria-label="전체 글 목록">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 6 H20 M4 12 H20 M4 18 H20"
            stroke="var(--muted)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </header>
  );
}
