"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** 시트를 어떻게 볼 것인가 — 내용이 아니라 보는 방식이라 노드가 바뀌어도 남는다 */
type SheetView = {
  full: boolean;
  tree: boolean;
  nav: boolean;
  toggle: (which: "full" | "tree" | "nav") => void;
};

const SheetViewContext = createContext<SheetView | null>(null);

/**
 * 시트 보기 설정을 갈래 하나 위에 둔다.
 *
 * 루트 레이아웃에 두는 것이 핵심이다. Next의 클라이언트 이동에서는 레이아웃이
 * 살아 있으므로, 전체 화면으로 켜 둔 채 다음 개념으로 넘어가도 그대로다.
 * 시트 안에 두면 페이지가 바뀔 때마다 접힌 상태로 되돌아간다.
 */
export function SheetViewProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ full: false, tree: true, nav: true });

  const value = useMemo<SheetView>(
    () => ({
      ...state,
      toggle: (which) =>
        setState((current) => ({ ...current, [which]: !current[which] })),
    }),
    [state],
  );

  return (
    <SheetViewContext.Provider value={value}>
      {children}
    </SheetViewContext.Provider>
  );
}

/** 제공자 밖에서도 부를 수 있게 기본값을 돌려준다 — 시트가 없는 화면도 있다 */
export function useSheetView(): SheetView {
  return (
    useContext(SheetViewContext) ?? {
      full: false,
      tree: true,
      nav: true,
      toggle: () => {},
    }
  );
}
