/**
 * 화면 곳곳의 선 아이콘 — 파일마다 SVG를 직접 그리던 것을 모았다.
 *
 * 전부 24×24 판에 선으로만 그리고, 색은 글자색(currentColor)을 따른다.
 * 노드 종류 표식은 따로다(graph/KindIcon) — 그쪽은 종류마다 색이 정해져 있다.
 */
import type { ReactNode } from "react";

function Icon({
  size,
  strokeWidth = 1.9,
  color = "currentColor",
  children,
}: {
  size: number;
  strokeWidth?: number;
  color?: string;
  children: ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** 오른쪽을 가리키는 꺾쇠 — 펼침(돌려서 아래)과 머리말의 길 구분에 쓴다 */
export function ChevronIcon({ size = 10, color }: { size?: number; color?: string }) {
  return (
    <Icon size={size} strokeWidth={2.5} color={color}>
      <path d="M9 5.5 L15.5 12 L9 18.5" />
    </Icon>
  );
}

/**
 * 점 셋과 선 — 그래프. 로고는 갈래 색으로(colored), 트리의 "그래프로 돌아가기"는
 * 글자색으로 그린다. 같은 그림이라 한 벌이다.
 */
export function GraphIcon({ size = 14, colored = false }: { size?: number; colored?: boolean }) {
  return (
    <Icon size={size} strokeWidth={1.8}>
      <circle cx="6" cy="6" r="2.8" stroke={colored ? "var(--theory)" : undefined} />
      <circle cx="18" cy="9" r="2.8" stroke={colored ? "var(--project)" : undefined} />
      <circle cx="10" cy="18" r="2.8" stroke={colored ? "var(--trouble)" : undefined} />
      <path
        d="M8.5 7.5 L15.2 8.4 M7.2 8.8 L9.2 15.2 M15.5 11 L12 15.8"
        strokeWidth={1.4}
        stroke={colored ? "var(--border-node-strong)" : undefined}
      />
    </Icon>
  );
}

/** 한쪽 기둥이 서 있는 판 — 그 쪽 패널을 뜻한다 */
export function PanelIcon({ side }: { side: "left" | "right" }) {
  return (
    <Icon size={14}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d={side === "left" ? "M9.5 4.5 V19.5" : "M14.5 4.5 V19.5"} />
    </Icon>
  );
}

export function CloseIcon() {
  return (
    <Icon size={13} strokeWidth={2.2}>
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </Icon>
  );
}

export function ExpandIcon() {
  return (
    <Icon size={13} strokeWidth={2.2}>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </Icon>
  );
}

export function ShrinkIcon() {
  return (
    <Icon size={13} strokeWidth={2.2}>
      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
    </Icon>
  );
}

export function MoonIcon() {
  return (
    <Icon size={15}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
    </Icon>
  );
}

export function SunIcon() {
  return (
    <Icon size={15}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
    </Icon>
  );
}

/** 네 칸 — 정렬 */
export function GridIcon() {
  return (
    <Icon size={14} strokeWidth={1.8}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </Icon>
  );
}
