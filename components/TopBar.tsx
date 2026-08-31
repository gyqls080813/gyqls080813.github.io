"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./TopBar.module.css";

function LogoGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="3" stroke="var(--theory)" strokeWidth="1.8" />
      <circle cx="18" cy="9" r="3" stroke="var(--project)" strokeWidth="1.8" />
      <circle cx="10" cy="18" r="3" stroke="var(--trouble)" strokeWidth="1.8" />
      <path
        d="M8.5 7.5 L15.2 8.4 M7.2 8.8 L9.2 15.2 M15.5 11 L12 15.8"
        stroke="var(--border-node-strong)"
        strokeWidth="1.4"
      />
    </svg>
  );
}

interface TopBarProps {
  /** 지금 어느 노드를 열고 있는지 — 연결 뷰의 경로 브레드크럼 */
  breadcrumb?: React.ReactNode;
}

export default function TopBar({ breadcrumb }: TopBarProps) {
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.brand}>
        <LogoGlyph />
        <span className={styles.wordmark}>민엽의 트러블로그</span>
      </Link>

      {breadcrumb}

      <div className={styles.spacer} />

      <ThemeToggle />
    </header>
  );
}
