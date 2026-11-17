"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import NodeTree from "../post/NodeTree";
import { CloseIcon } from "../icons";
import { OutlinePart } from "./SheetOutline";
import { useSheetView } from "./SheetView";
import { sheetNodeId } from "@/lib/outline";
import { cx } from "@/lib/util";
import styles from "./SheetDrawers.module.css";

/**
 * 좁은 화면의 서랍 — 왼쪽은 메뉴(노드 탐색기), 오른쪽은 목차.
 *
 * 넓은 화면에서는 둘 다 시트 양옆에 붙박이로 선다. 휴대폰처럼 그 폭이 없으면
 * 붙박이 패널은 접히고(Sheet.module.css의 @container), 같은 내용을 여기서
 * 화면 위에 띄운다. 상단 바의 메뉴 버튼과 시트 조작 줄의 두 패널 버튼이 연다.
 *
 * 루트 레이아웃에 하나만 둔다. 홈(그래프), 글 목록처럼 시트가 아닌 곳에서도
 * 메뉴는 열려야 하고, 시트 안에 두면 홈에서는 열 길이 없다.
 *
 * 닫히는 때: 바깥(어둡게 덮은 곳)을 누를 때, 닫기 버튼, Esc, 그리고 메뉴에서
 * 다른 노드로 갔을 때(주소가 바뀜)와 목차에서 한 절을 골랐을 때.
 */
export default function SheetDrawers({
  outline,
}: {
  /** 열린 노드의 목차 — 껍데기와 같은 @outline 슬롯 (SheetChrome 참고) */
  outline: ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const nodeId = sheetNodeId(pathname);
  const { drawer, setDrawer } = useSheetView();
  const closeRef = useRef<HTMLButtonElement>(null);

  /* 주소가 바뀌면(뒤로 가기 등) 닫는다. 서랍 상태는 레이아웃의 제공자에 있어서
     그리는 중에 바꾸면 다른 컴포넌트를 그리는 도중의 갱신이 된다 — 이펙트로 한다 */
  useEffect(() => {
    setDrawer(null);
  }, [pathname, setDrawer]);

  /* 열리면 닫기 버튼으로 포커스를 옮기고, Esc로 닫는다. 닫히면 연 버튼으로 포커스가 돌아간다 */
  useEffect(() => {
    if (!drawer) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setDrawer(null);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      /* 스크롤하지 않고 돌려준다 — 목차에서 고른 절로 옮겨 가는 중에 포커스가 맨 위
         버튼으로 가면서 본문을 도로 끌어올리면 안 된다 */
      opener?.focus?.({ preventScroll: true });
    };
  }, [drawer, setDrawer]);

  /* 목차는 시트 안에서만 뜻이 있다 */
  const open = drawer === "menu" || (drawer === "toc" && nodeId !== null);
  if (!open) return null;

  const isMenu = drawer === "menu";
  const title = isMenu ? "메뉴" : "이 글 안에서";

  return (
    <div className={styles.layer}>
      <button
        type="button"
        className={styles.scrim}
        onClick={() => setDrawer(null)}
        aria-label={`${title} 닫기`}
        tabIndex={-1}
      />
      <div
        className={cx(styles.panel, isMenu ? styles.left : styles.right)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        /* 메뉴에서 링크를 누르거나 목차에서 절을 고르면 서랍을 닫는다.
           같은 주소의 링크(홈에서 '그래프로')는 주소가 안 바뀌니 여기서 닫아야 한다 */
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("a") || (!isMenu && target.closest("nav button"))) setDrawer(null);
        }}
      >
        <div className={styles.head}>
          <span className={styles.title}>{title}</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={() => setDrawer(null)}
            aria-label={`${title} 닫기`}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles.body}>
          {isMenu ? (
            <NodeTree activeNodeId={nodeId ?? ""} compact />
          ) : (
            <OutlinePart part="nav">{outline}</OutlinePart>
          )}
        </div>
      </div>
    </div>
  );
}
