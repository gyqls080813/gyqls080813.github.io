"use client";

import { useSyncExternalStore } from "react";
import { TEXT_SIZE_KEY, TEXT_SIZES, type TextSize } from "@/lib/site";

/**
 * 읽는 글자 크기는 <html data-text-size>가 쥐고 있다 — 판(useTheme)과 같은 방식이다.
 * 보통(m)은 표식이 없는 상태다. 크기는 globals.css의 --reading-scale이 정한다.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-text-size"],
  });
  return () => observer.disconnect();
}

const read = (): TextSize => {
  const value = document.documentElement.dataset.textSize;
  return TEXT_SIZES.find((size) => size === value) ?? "m";
};

export function useTextSize(): TextSize {
  return useSyncExternalStore(subscribe, read, () => "m");
}

/** 글자 크기를 바꾸고 저장한다. 처음 값은 layout.tsx의 인라인 스크립트가 같은 키로 읽는다 */
export function setTextSize(next: TextSize) {
  const root = document.documentElement;
  if (next === "m") delete root.dataset.textSize;
  else root.dataset.textSize = next;
  try {
    window.localStorage.setItem(TEXT_SIZE_KEY, next);
  } catch {
    /* 저장소가 막힌 브라우저에서는 이번 방문에만 적용된다 */
  }
}
