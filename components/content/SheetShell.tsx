"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/util";
import SheetColumns from "./SheetColumns";
import { useSheetView } from "./SheetView";
import sheetStyles from "./Sheet.module.css";

/**
 * 시트의 틀 — 세 열(트리 · 본문 · 목차)과 보기 조작을 함께 쥔다.
 *
 * 보기 상태는 자기가 갖지 않고 SheetViewProvider에서 받는다. 전체 화면으로
 * 켜 둔 채 다음 개념으로 넘어가도 그대로여야 하는데, 여기서 쥐면 페이지가
 * 바뀔 때마다 접힌 상태로 되돌아간다.
 *
 * 안에 들어가는 것들(트리·본문·목차)은 서버에서 그려도 되는 것들이라 자식으로
 * 받는다 — 서버 컴포넌트를 클라이언트 컴포넌트에 넘기는 그 방식이다.
 * 세 열 자체는 홈의 겹침 화면과 같은 컴포넌트(SheetColumns)다.
 */
export default function SheetShell({
  nodeId,
  tree,
  nav,
  children,
}: {
  /** 지금 열린 노드 — 바뀌면 본문을 맨 위로 되돌린다 */
  nodeId: string;
  tree: ReactNode;
  nav: ReactNode;
  children: ReactNode;
}) {
  const { full, toggle } = useSheetView();
  const articleRef = useRef<HTMLElement>(null);

  /* 이 틀은 레이아웃에 있어 주소가 바뀌어도 살아 있다 — 트리 스크롤을
     지키려고 그렇게 만든 것인데, 그 덕에 본문 스크롤까지 남는다.
     다른 글로 갔는데 중간부터 보이면 안 되므로 여기서 되돌린다.
     그리기 전에(useLayoutEffect) 옮겨야 이전 위치가 한 프레임 비치지 않는다. */
  useLayoutEffect(() => {
    articleRef.current?.scrollTo({ top: 0 });
  }, [nodeId]);

  /* Esc로 전체 화면을 푼다. 시트 자체를 닫는 것과 헷갈리지 않게, 펼쳐져 있을
     때만 가로챈다 — 아니면 평소의 "그래프로 돌아가기"를 막아 버린다 */
  useEffect(() => {
    if (!full) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        toggle("full");
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [full, toggle]);

  return (
    <div className={cx(sheetStyles.sheet, full && sheetStyles.sheetFull)}>
      <SheetColumns tree={tree} nav={nav} articleRef={articleRef} scrollRoot>
        {children}
      </SheetColumns>
    </div>
  );
}
