"use client";

import { MenuIcon } from "./icons";
import { useSheetView } from "./content/SheetView";
import styles from "./TopBar.module.css";

/**
 * 상단 바의 메뉴 버튼 — 좁은 화면에서만 보인다(TopBar.module.css).
 *
 * 넓은 화면은 시트 왼쪽에 노드 탐색기가 붙박이로 있고, 홈은 그래프 자체가
 * 길이다. 휴대폰에서는 둘 다 쓰기 어려워서, 어느 화면에서든 같은 탐색기를
 * 서랍으로 띄운다(SheetDrawers).
 */
export default function MenuButton() {
  const { drawer, setDrawer } = useSheetView();
  const open = drawer === "menu";
  return (
    <button
      type="button"
      className={styles.menu}
      onClick={() => setDrawer(open ? null : "menu")}
      aria-expanded={open}
      aria-label="메뉴 열기"
    >
      <MenuIcon />
    </button>
  );
}
