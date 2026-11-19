"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY } from "@/lib/site";

export type Theme = "dark" | "light";

/**
 * 지금 판은 <html data-theme>이 쥐고 있다 — 리액트 상태로 옮겨 적지 않고 거기서 읽는다.
 * 표식이 바뀌면 관찰자가 알려 준다. 듣기만 한다 — 다른 탭에서 바꾼 판을 이 문서의
 * 표식에 옮겨 적는 일은 레이아웃의 첫 칠 스크립트(app/layout.tsx)가 한 번만 붙여 둔다.
 * 여기서 붙이면 구독하는 컴포넌트마다 붙고, 구독하는 쪽이 없으면 아예 멈춘다.
 */
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

/* 서버에는 <html>이 없다 — <html>의 기본 표식(data-theme="dark")과 같게 둔다.
   실제 판은 첫 칠 스크립트가 저장된 값이나 운영체제 설정으로 이미 정해 뒀다 */
const serverTheme = (): Theme => "dark";

/** 지금 판 — 판 스위치와 그래프(React Flow의 colorMode)가 같이 쓴다 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, readTheme, serverTheme);
}

/** 판을 바꾸고 저장한다. 처음 값은 layout.tsx의 인라인 스크립트가 같은 키로 읽는다 */
export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    window.localStorage.setItem(THEME_KEY, next);
  } catch {
    /* 저장소가 막힌 브라우저에서는 이번 방문에만 적용된다 */
  }
}
