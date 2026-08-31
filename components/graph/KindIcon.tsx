import type { NodeKind } from "./types";

const KIND_COLOR: Record<NodeKind, string> = {
  theory: "var(--theory)",
  project: "var(--project)",
  trouble: "var(--trouble)",
  me: "var(--me)",
  idea: "var(--idea)",
};

const KIND_PATH: Record<NodeKind, React.ReactNode> = {
  /* 폴더 — 글이 모이는 곳 */
  project: (
    <path d="M3.5 7c0-1.1.9-2 2-2h4.2l2 2.2h7.8c1.1 0 2 .9 2 2V17c0 1.1-.9 2-2 2h-14c-1.1 0-2-.9-2-2V7z" />
  ),
  /* 번개 — 부딪힌 순간 */
  trouble: <path d="M13 3 6 13.5h5L10.4 21 18 10.2h-5.2L13 3z" />,
  /* 전구 — 이해한 개념 */
  theory: (
    <>
      <path d="M12 3.5a5.8 5.8 0 0 0-3.9 10.1c.8.75 1.4 1.6 1.4 2.4h5c0-.8.6-1.65 1.4-2.4A5.8 5.8 0 0 0 12 3.5z" />
      <path d="M9.5 18.5h5M10.5 21h3" />
    </>
  ),
  /* 나침반 — 무엇을 물을지, 어느 쪽으로 갈지 정하는 것 */
  idea: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.4 8.6 L10.9 10.9 L8.6 15.4 L13.1 13.1 Z" />
    </>
  ),
  /* 사람 — 이 그래프의 시작점 */
  me: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6" />
    </>
  ),
};

interface KindIconProps {
  kind: NodeKind;
  size?: number;
  /** 생략하면 종류 색 */
  color?: string;
}

/** 노드 종류 아이콘 — 카드·백드랍·트리·범례가 공유하는 표식 */
export default function KindIcon({ kind, size = 14, color }: KindIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? KIND_COLOR[kind]}
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      {KIND_PATH[kind]}
    </svg>
  );
}
