"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSheetView } from "./SheetView";
import { SHEET_SCROLL_ATTR } from "./sheetScroll";
import styles from "./SheetShell.module.css";
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
 */
export default function SheetShell({
  nodeId,
  tree,
  nav,
  children,
}: {
  /** 지금 열린 노드 — 바뀌면 본문을 맨 위로 되돌린다 */
  nodeId?: string;
  tree: ReactNode;
  nav: ReactNode;
  children: ReactNode;
}) {
  const router = useRouter();
  const { full, tree: treeOpen, nav: navOpen, toggle } = useSheetView();
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
    <div className={`${sheetStyles.sheet} ${full ? sheetStyles.sheetFull : ""}`}>
      {treeOpen && <aside className={sheetStyles.treePanel}>{tree}</aside>}

      {/* 목차가 스크롤을 들으려면 어느 요소가 스크롤하는지 표식이 있어야 한다 */}
      <article
        ref={articleRef}
        className={sheetStyles.article}
        {...{ [SHEET_SCROLL_ATTR]: true }}
      >
        {/* 조작은 본문 안에 붙어 다닌다 — 양옆 패널이 닫히면 그 자리가 없어진다 */}
        <div className={styles.toolbar}>
          <button
            type="button"
            className={`${styles.control} ${treeOpen ? styles.on : ""}`}
            onClick={() => toggle("tree")}
            aria-pressed={treeOpen}
            title={treeOpen ? "노드 탐색기 닫기" : "노드 탐색기 열기"}
            aria-label={treeOpen ? "노드 탐색기 닫기" : "노드 탐색기 열기"}
          >
            <PanelIcon side="left" />
          </button>
          <button
            type="button"
            className={`${styles.control} ${navOpen ? styles.on : ""}`}
            onClick={() => toggle("nav")}
            aria-pressed={navOpen}
            title={navOpen ? "목차 닫기" : "목차 열기"}
            aria-label={navOpen ? "목차 닫기" : "목차 열기"}
          >
            <PanelIcon side="right" />
          </button>
          <span className={styles.divider} />
          <button
            type="button"
            className={styles.control}
            onClick={() => toggle("full")}
            aria-pressed={full}
            title={full ? "원래 크기로 (Esc)" : "전체 화면"}
            aria-label={full ? "원래 크기로" : "전체 화면"}
          >
            {full ? <Shrink /> : <Expand />}
          </button>
          <span className={styles.divider} />
          {/* 닫기는 어느 시트에서든 뜻이 하나다 — 그래프로 돌아간다.
              바깥(스크림)을 눌러도 같은 일이 일어나지만, 전체 화면에서는
              누를 바깥이 없어서 이 버튼이 유일한 길이 된다 */}
          <button
            type="button"
            className={styles.control}
            onClick={() => router.push("/")}
            title="닫고 그래프로"
            aria-label="닫고 그래프로"
          >
            <Close />
          </button>
        </div>

        {children}
      </article>

      {navOpen && <aside className={sheetStyles.navPanel}>{nav}</aside>}
    </div>
  );
}

/** 한쪽 기둥이 서 있는 판 — 그 쪽 패널을 뜻한다 */
function PanelIcon({ side }: { side: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d={side === "left" ? "M9.5 4.5 V19.5" : "M14.5 4.5 V19.5"}
        stroke="currentColor"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function Close() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6 L18 18 M18 6 L6 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Expand() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Shrink() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
