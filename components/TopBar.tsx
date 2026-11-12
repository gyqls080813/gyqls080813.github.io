import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { GraphIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";
import styles from "./TopBar.module.css";

interface TopBarProps {
  /** 지금 어느 노드를 열고 있는지 — 연결 뷰의 경로 브레드크럼 */
  breadcrumb?: React.ReactNode;
}

export default function TopBar({ breadcrumb }: TopBarProps) {
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.brand}>
        {/* 로고는 그래프 그림을 갈래 색으로 — 트리의 "그래프로 돌아가기"와 같은 그림이다 */}
        <GraphIcon size={24} colored />
        <span className={styles.wordmark}>{SITE_NAME}</span>
      </Link>

      {breadcrumb}

      <div className={styles.spacer} />

      <ThemeToggle />
    </header>
  );
}
