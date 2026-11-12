"use client";

import type { ReactNode, Ref } from "react";
import { useRouter } from "next/navigation";
import { cx } from "@/lib/util";
import { CloseIcon, ExpandIcon, PanelIcon, ShrinkIcon } from "../icons";
import { useSheetView } from "./SheetView";
import { SHEET_SCROLL_ATTR } from "./sheetScroll";
import styles from "./SheetShell.module.css";
import sheetStyles from "./Sheet.module.css";

/**
 * 시트 안쪽의 세 열 — 트리 · 본문(맨 위에 보기 조작) · 목차.
 *
 * 주소가 있는 시트(SheetShell)와 홈에서 노드가 열리는 동안의 겹침 화면(GraphHome)이
 * 이 하나를 쓴다. 따로 짜면 한쪽에만 조작 줄이 있어, 겹침 화면이 진짜 시트로
 * 바뀌는 순간 본문이 한 번 밀린다.
 */
export default function SheetColumns({
  tree,
  nav,
  children,
  articleRef,
  scrollRoot = false,
}: {
  tree: ReactNode;
  nav: ReactNode;
  children: ReactNode;
  articleRef?: Ref<HTMLElement>;
  /** 이 본문이 목차가 듣는 스크롤 영역인가 — 진짜 시트만 그렇다 */
  scrollRoot?: boolean;
}) {
  const router = useRouter();
  const { full, tree: treeOpen, nav: navOpen, toggle } = useSheetView();

  return (
    <>
      {treeOpen && <aside className={sheetStyles.treePanel}>{tree}</aside>}

      {/* 목차가 스크롤을 들으려면 어느 요소가 스크롤하는지 표식이 있어야 한다 */}
      <article
        ref={articleRef}
        className={sheetStyles.article}
        {...(scrollRoot ? { [SHEET_SCROLL_ATTR]: true } : {})}
      >
        {/* 조작은 본문 안에 붙어 다닌다 — 양옆 패널이 닫히면 그 자리가 없어진다 */}
        <div className={styles.toolbar}>
          <button
            type="button"
            className={cx(styles.control, treeOpen && styles.on)}
            onClick={() => toggle("tree")}
            aria-pressed={treeOpen}
            title={treeOpen ? "노드 탐색기 닫기" : "노드 탐색기 열기"}
            aria-label={treeOpen ? "노드 탐색기 닫기" : "노드 탐색기 열기"}
          >
            <PanelIcon side="left" />
          </button>
          <button
            type="button"
            className={cx(styles.control, navOpen && styles.on)}
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
            {full ? <ShrinkIcon /> : <ExpandIcon />}
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
            <CloseIcon />
          </button>
        </div>

        {children}
      </article>

      {navOpen && <aside className={sheetStyles.navPanel}>{nav}</aside>}
    </>
  );
}
