import type {
  GraphBackdropData,
  GraphEdgeData,
  GraphNodeData,
} from "@/components/graph/types";

/**
 * 전체 그래프(랜딩) 데이터. 좌표는 카드 중심 기준 (toFlow에서 SPREAD 배율 적용).
 * 흐름: 민엽 → (프로젝트 · 기술) → 트러블슈팅.
 * 계층(개념 → 챕터)은 간선이, 시각적 묶음은 백드랍(디자인 전용)이 맡는다.
 */
export const fullGraphNodes: GraphNodeData[] = [
  // 1열: 그래프의 시작점 — 나
  { id: "me", label: "민엽", kind: "me", x: 95, y: 300, r: 30, hub: true },

  // 2열 상단: 프로젝트 (가로 배치)
  {
    id: "withy",
    label: "withy",
    kind: "project",
    x: 330,
    y: 140,
    r: 44,
    hub: true,
    dateLabel: "2026.06 – 2026.08",
  },

  // 2열 하단: 기술 — 개념(허브) 노드와 그 하위 챕터 노드.
  // 계층은 백드랍이 아니라 허브 → 챕터 간선이 표현한다
  { id: "react", label: "React", kind: "theory", x: 330, y: 300, r: 20, hub: true },
  { id: "render", label: "렌더링", kind: "theory", x: 330, y: 390, r: 17 },
  { id: "state", label: "상태 관리", kind: "theory", x: 330, y: 475, r: 16 },
  { id: "hooks", label: "훅", kind: "theory", x: 330, y: 560, r: 14 },

  { id: "browser", label: "브라우저", kind: "theory", x: 545, y: 300, r: 20, hub: true },
  { id: "loading", label: "로딩 파이프라인", kind: "theory", x: 545, y: 390, r: 19 },
  { id: "eventloop", label: "이벤트 루프", kind: "theory", x: 545, y: 475, r: 16 },
  { id: "repaint", label: "리페인트·리플로우", kind: "theory", x: 545, y: 560, r: 16 },

  { id: "css", label: "CSS", kind: "theory", x: 760, y: 300, r: 20, hub: true },
  { id: "flexbox", label: "Flexbox", kind: "theory", x: 760, y: 390, r: 16 },
  { id: "stacking", label: "쌓임 맥락", kind: "theory", x: 760, y: 475, r: 14 },

  { id: "network", label: "네트워크", kind: "theory", x: 975, y: 300, r: 20, hub: true },
  { id: "caching", label: "HTTP 캐싱", kind: "theory", x: 975, y: 390, r: 15 },
  { id: "cors", label: "CORS", kind: "theory", x: 975, y: 475, r: 13 },
  { id: "routing", label: "SPA 라우팅", kind: "theory", x: 975, y: 560, r: 14 },

  // 3열: 트러블슈팅 — 프로젝트와 기술이 만나는 곳
  { id: "t-modal", label: "모달 상태 꼬임", kind: "trouble", x: 1240, y: 180, r: 13 },
  { id: "t-iframe", label: "YouTube iframe 무한 로딩", kind: "trouble", x: 1240, y: 330, r: 14 },
  { id: "t-header", label: "헤더 레이아웃 깨짐", kind: "trouble", x: 1240, y: 480, r: 13 },
  { id: "t-poster", label: "포스터 이미지 최적화", kind: "trouble", x: 1240, y: 630, r: 13 },
];

/** 기술 계층 — 개념(허브)과 그 하위 챕터. 간선과 트리가 여기서 유도된다 */
export const theoryClusters = [
  { hub: "react", chapters: ["render", "state", "hooks"] },
  { hub: "browser", chapters: ["loading", "eventloop", "repaint"] },
  { hub: "css", chapters: ["flexbox", "stacking"] },
  { hub: "network", chapters: ["caching", "cors", "routing"] },
] as const;

export const fullGraphEdges: GraphEdgeData[] = [
  // 나 → 프로젝트
  { from: "me", to: "withy" },

  // 나 ⇢ 기술 개념 노드 (점선: 이 기술들을 공부함)
  { from: "me", to: "react", kind: "cross" },
  { from: "me", to: "browser", kind: "cross" },
  { from: "me", to: "css", kind: "cross" },
  { from: "me", to: "network", kind: "cross" },

  // 개념 → 챕터 (계층: 하위 내용)
  ...theoryClusters.flatMap((cluster) =>
    cluster.chapters.map((chapter) => ({ from: cluster.hub, to: chapter })),
  ),

  // 프로젝트 → 트러블
  { from: "withy", to: "t-modal" },
  { from: "withy", to: "t-iframe" },
  { from: "withy", to: "t-header" },
  { from: "withy", to: "t-poster" },

  // 기술 → 트러블 (다리): 프로젝트와 기술이 만나 트러블이 된다
  { from: "state", to: "t-modal", kind: "bridge" },
  { from: "loading", to: "t-iframe", kind: "bridge" },
  { from: "eventloop", to: "t-iframe", kind: "bridge" },
  { from: "flexbox", to: "t-header", kind: "bridge" },
  { from: "caching", to: "t-poster", kind: "bridge" },
];

/** 클러스터 백드랍 — 멤버 카드들의 위치에서 프레임이 계산된다 */
export const fullGraphBackdrops: GraphBackdropData[] = [
  { id: "bd-projects", label: "프로젝트", tint: "project", members: ["withy"] },
  {
    id: "bd-troubles",
    label: "트러블슈팅",
    tint: "trouble",
    members: ["t-modal", "t-iframe", "t-header", "t-poster"],
  },
  {
    id: "bd-tech",
    label: "기술",
    tint: "theory",
    /* 정렬 시 개념+챕터가 한 덩어리로 움직인다 */
    clusters: theoryClusters.map((cluster) => ({
      id: `grp-${cluster.hub}`,
      members: [cluster.hub, ...cluster.chapters],
    })),
    members: [
      "react",
      "state",
      "render",
      "hooks",
      "browser",
      "loading",
      "eventloop",
      "repaint",
      "css",
      "flexbox",
      "stacking",
      "network",
      "caching",
      "cors",
      "routing",
    ],
  },
];
