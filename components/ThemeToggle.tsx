"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export type Theme = "dark" | "light";

/** localStorage 키 — layout.tsx의 첫 칠 방지 스크립트와 반드시 같아야 한다 */
export const THEME_KEY = "theme";

/**
 * 어두운 판 / 밝은 판.
 *
 * 실제 색은 전부 globals.css의 토큰이 쥐고 있고, 여기서는 <html>에 표식만
 * 바꾼다. 그래서 이 버튼은 무슨 색인지 하나도 모른다 — 토큰을 고치면 이 파일은
 * 손댈 것이 없다.
 *
 * 처음 값은 layout.tsx의 인라인 스크립트가 이미 정해 뒀다. 여기서 다시
 * 읽기만 하는 이유는, 리액트가 붙기 전에 칠이 끝나야 화면이 한 번 번쩍이지
 * 않기 때문이다.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const change = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* 저장소가 막힌 브라우저에서는 이번 방문에만 적용된다 */
    }
  };

  return (
    <div className={styles.group} role="group" aria-label="화면 모드">
      <button
        type="button"
        className={styles.option}
        data-active={theme === "dark"}
        onClick={() => change("dark")}
        aria-pressed={theme === "dark"}
        title="어두운 모드"
      >
        <Moon />
      </button>
      <button
        type="button"
        className={styles.option}
        data-active={theme === "light"}
        onClick={() => change("light")}
        aria-pressed={theme === "light"}
        title="밝은 모드"
      >
        <Sun />
      </button>
    </div>
  );
}

function Moon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sun() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}
