"use client";

import { useActiveHeading } from "./useActiveHeading";
import styles from "./SheetNav.module.css";
/* 목차를 만드는 쪽이 lib/sheet.ts로 내려가서 타입도 거기 산다 —
   서버·클라이언트 어느 쪽에서도 쓰이므로 컴포넌트에 두면 방향이 거꾸로다 */
import type { NavItem } from "@/lib/sheet";

export type { NavItem };

/** 지금 읽는 줄을 찾으려면 층을 눌러 한 줄로 봐야 한다 */
function flatIds(items: NavItem[]): string[] {
  return items.flatMap((item) => [item.id, ...flatIds(item.children ?? [])]);
}

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/**
 * 목차 한 줄. 파일 최상위에 둔다 — 목차 안에서 정의하면 그릴 때마다 새 컴포넌트가
 * 되어 버튼이 통째로 다시 만들어지고, 읽는 위치가 바뀔 때마다 포커스가 날아간다.
 */
function Row({ item, active, sub }: { item: NavItem; active: string | null; sub?: boolean }) {
  const current = item.id === active;
  return (
    <button
      type="button"
      className={`${styles.item} ${sub ? styles.sub : ""} ${current ? styles.active : ""}`}
      onClick={() => goTo(item.id)}
      aria-current={current ? "true" : undefined}
    >
      {item.label}
    </button>
  );
}

/**
 * 시트 오른쪽의 목차 — 지금 열린 노드 **안에서** 옮겨 다니는 길.
 *
 * 왼쪽 트리와 층위가 다르다. 트리는 노드 사이를 옮기고 이쪽은 노드 안을 옮긴다.
 * 그래서 섞지 않고 반대편에 따로 세운다.
 *
 * 링크가 아니라 버튼인 것은 주소를 건드리지 않기 위해서다. 이 사이트에서 주소는
 * "어느 노드를 열었나"를 뜻하는데, 절로 이동할 때마다 #가 붙으면 뒤로가기가
 * 노드 사이가 아니라 문단 사이를 오가게 된다.
 *
 * 두 층까지 세우되, 아래층은 **지금 보고 있는 절의 것만** 편다. 절이 열 개인
 * 문서에서 모든 블록을 늘어놓으면 목차가 본문만큼 길어져 목차 구실을 못 한다.
 *
 * 갈 곳이 하나도 없으면 그리지 않는다.
 */
export default function SheetNav({ items }: { items: NavItem[] }) {
  const active = useActiveHeading(flatIds(items));

  if (items.length === 0) return null;


  return (
    <nav className={styles.nav} aria-label="이 글 안에서">
      <p className={styles.label}>이 글 안에서</p>
      <ol className={styles.list}>
        {items.map((item) => {
          const children = item.children ?? [];
          const inside =
            item.id === active || children.some((child) => child.id === active);
          return (
            <li key={item.id}>
              <Row item={item} active={active} />
              {inside && children.length > 0 && (
                <ol className={styles.list}>
                  {children.map((child) => (
                    <li key={child.id}>
                      <Row item={child} active={active} sub />
                    </li>
                  ))}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
