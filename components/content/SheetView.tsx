"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/** 시트를 어떻게 볼 것인가 — 내용이 아니라 보는 방식이라 노드가 바뀌어도 남는다 */
type SheetView = {
  full: boolean;
  tree: boolean;
  nav: boolean;
  toggle: (which: "full" | "tree" | "nav") => void;
};

/** 처음 보는 방식 — 전체 화면은 끄고 양옆 패널은 켠다 */
const INITIAL_VIEW = { full: false, tree: true, nav: true };

const SheetViewContext = createContext<SheetView | null>(null);

/**
 * 시트 보기 설정을 갈래 하나 위에 둔다.
 *
 * 루트 레이아웃에 두는 것이 핵심이다. Next의 클라이언트 이동에서는 레이아웃이
 * 살아 있으므로, 전체 화면으로 켜 둔 채 다음 개념으로 넘어가도 그대로다.
 * 시트 안에 두면 페이지가 바뀔 때마다 접힌 상태로 되돌아간다.
 */
export function SheetViewProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(INITIAL_VIEW);

  const value = useMemo<SheetView>(
    () => ({
      ...state,
      toggle: (which) => setState((current) => ({ ...current, [which]: !current[which] })),
    }),
    [state],
  );

  return <SheetViewContext.Provider value={value}>{children}</SheetViewContext.Provider>;
}

/**
 * 지금 보기 설정. 루트 레이아웃이 늘 SheetViewProvider로 감싸므로 제공자 밖에서
 * 부를 일이 없다 — 그런 일이 생기면 조용히 기본값으로 그리지 않고 바로 알린다.
 */
export function useSheetView(): SheetView {
  const view = useContext(SheetViewContext);
  if (!view) throw new Error("useSheetView는 SheetViewProvider 안에서만 쓴다");
  return view;
}
