"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY } from "@/lib/site";
import { MoonIcon, SunIcon } from "./icons";
import styles from "./ThemeToggle.module.css";

type Theme = "dark" | "light";

/* 지금 판은 <html data-theme>이 쥐고 있다 — 리액트 상태로 옮겨 적지 않고 거기서 읽는다.
   표식이 바뀌면(이 버튼이든 다른 탭이든) 관찰자가 알려 준다 */
function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/* 서버에는 <html>이 없다 — 첫 칠 스크립트의 기본값과 같은 어두운 판으로 둔다 */
const serverTheme = (): Theme => "dark";

/**
 * 어두운 판 / 밝은 판.
 *
 * 실제 색은 전부 globals.css의 토큰이 쥐고 있고, 여기서는 <html>에 표식만
 * 바꾼다. 그래서 이 버튼은 무슨 색인지 하나도 모른다 — 토큰을 고치면 이 파일은
 * 손댈 것이 없다.
 *
 * 처음 값은 layout.tsx의 인라인 스크립트가 이미 정해 뒀다. 여기서 다시
 * 읽기만 하는 이유는, 리액트가 붙기 전에 칠이 끝나야 화면이 한 번 번쩍이지
 * 않기 때문이다. 저장 키는 그 스크립트와 같은 상수(lib/site의 THEME_KEY)다.
 */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);

  const change = (next: Theme) => {
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
        aria-label="어두운 모드"
      >
        <MoonIcon />
      </button>
      <button
        type="button"
        className={styles.option}
        data-active={theme === "light"}
        onClick={() => change("light")}
        aria-pressed={theme === "light"}
        title="밝은 모드"
        aria-label="밝은 모드"
      >
        <SunIcon />
      </button>
    </div>
  );
}
