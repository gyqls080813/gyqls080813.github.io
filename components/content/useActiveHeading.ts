"use client";

import { useEffect, useState } from "react";

import { SHEET_SCROLL_ATTR } from "./sheetScroll";

/**
 * 본문 위쪽에서 이만큼 내려온 선을 지나면 "지금 읽는 절"로 친다.
 *
 * 작아야 한다. 절 사이 간격보다 선이 아래에 있으면 두 절이 동시에 선을 지나
 * 늘 다음 절이 잡힌다 — 목차를 눌러 그 절을 맨 위에 붙여도 아래 것이 밝혀진다.
 */
const HEADING_LINE = 32;

/**
 * 지금 읽고 있는 절이 무엇인가.
 *
 * IntersectionObserver 대신 스크롤 위치를 직접 잰다. 시트 본문은 창이 아니라
 * 자기가 스크롤하므로 관찰자에게 root를 따로 물려줘야 하는데, 목차는 그
 * 요소의 자식이 아니라 형제라 참조를 받을 길이 없다. 표식으로 찾아 스크롤을
 * 듣는 편이 짧고 어긋날 데가 없다.
 *
 * ids를 배열 그대로 의존성에 두면 매 렌더마다 새 배열이라 효과가 다시 붙는다.
 * 그래서 문자열 하나로 눌러 두고 안에서 되돌린다.
 */
export function useActiveHeading(ids: string[]): string | null {
  const key = ids.join("\n");

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const list = key ? key.split("\n") : [];
    const root = document.querySelector<HTMLElement>(`[${SHEET_SCROLL_ATTR}]`);
    if (!root || list.length === 0) return;

    const pick = () => {
      /* 끝까지 내려왔으면 마지막 절이다. 짧은 글에서는 뒤쪽 절이 1/3 선에
         닿을 만큼 올라오지 못해, 이 규칙이 없으면 영영 안 밝혀진다 */
      if (root.scrollTop + root.clientHeight >= root.scrollHeight - 2) {
        setActive(list[list.length - 1]);
        return;
      }
      /* 위에서 조금 내려온 선을 이미 지난 것 중 가장 아래.
         비율(1/3 등)로 잡으면 안 된다 — 목차를 눌러 그 절을 맨 위에 붙여도
         선이 한참 아래라 다음 절이 잡힌다. 누른 것이 안 밝혀지면 목차가 아니다. */
      const line = root.getBoundingClientRect().top + HEADING_LINE;
      let current = list[0];
      for (const id of list) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    pick();
    root.addEventListener("scroll", pick, { passive: true });
    return () => root.removeEventListener("scroll", pick);
  }, [key]);

  return active;
}
