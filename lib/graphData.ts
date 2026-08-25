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

  // 2열 상단: 프로젝트 (가로 배치, 진행 순서대로)
  {
    id: "withy",
    label: "WITHY",
    kind: "project",
    x: 330,
    y: 140,
    r: 44,
    hub: true,
    dateLabel: "2026.01 – 2026.02",
  },
  {
    id: "petfolio",
    label: "Petfolio",
    kind: "project",
    x: 545,
    y: 140,
    r: 44,
    hub: true,
    dateLabel: "2026.02 – 2026.03",
  },
  {
    id: "tickle",
    label: "Tickle",
    kind: "project",
    x: 760,
    y: 140,
    r: 44,
    hub: true,
    dateLabel: "2026.04 – 2026.05",
  },

  // 2열 하단: 기술 — 개념(허브) 노드와 그 하위 챕터 노드.
  // 계층은 백드랍이 아니라 허브 → 챕터 간선이 표현한다
  { id: "react", label: "React", kind: "theory", x: 330, y: 300, r: 20, hub: true },
  { id: "render", label: "렌더링", kind: "theory", x: 330, y: 390, r: 17 },
  { id: "state", label: "상태 관리", kind: "theory", x: 330, y: 475, r: 16 },
  { id: "hooks", label: "훅", kind: "theory", x: 330, y: 560, r: 14 },

  { id: "browser", label: "브라우저", kind: "theory", x: 545, y: 300, r: 20, hub: true },
  { id: "eventloop", label: "이벤트 루프", kind: "theory", x: 545, y: 390, r: 16 },
  { id: "repaint", label: "리페인트·리플로우", kind: "theory", x: 545, y: 475, r: 16 },
  { id: "propagation", label: "이벤트 전파", kind: "theory", x: 545, y: 560, r: 15 },
  { id: "isolation", label: "실행 컨텍스트 격리", kind: "theory", x: 545, y: 645, r: 16 },

  { id: "ts", label: "TypeScript", kind: "theory", x: 760, y: 300, r: 20, hub: true },
  { id: "types", label: "타입 시스템", kind: "theory", x: 760, y: 390, r: 16 },
  { id: "runtime", label: "런타임 검증", kind: "theory", x: 760, y: 475, r: 15 },

  { id: "network", label: "네트워크", kind: "theory", x: 975, y: 300, r: 20, hub: true },
  { id: "realtime", label: "실시간 통신", kind: "theory", x: 975, y: 390, r: 16 },
  { id: "caching", label: "HTTP 캐싱", kind: "theory", x: 975, y: 475, r: 15 },
  { id: "cors", label: "CORS", kind: "theory", x: 975, y: 560, r: 13 },

  // 3열: 트러블슈팅 — 프로젝트와 기술이 만나는 곳 (프로젝트 진행 순서대로)
  { id: "t-isolated", label: "넷플릭스 플레이어 제어", kind: "trouble", x: 1240, y: 100, r: 14 },
  { id: "t-sync", label: "영상 동기화 불감대", kind: "trouble", x: 1240, y: 205, r: 13 },
  { id: "t-schema", label: "런타임 스키마 검증", kind: "trouble", x: 1240, y: 310, r: 13 },
  { id: "t-tagged", label: "타입 안전 예외 처리", kind: "trouble", x: 1240, y: 415, r: 13 },
  { id: "t-canvas", label: "Canvas 좌석 렌더링", kind: "trouble", x: 1240, y: 520, r: 13 },
  { id: "t-webdriver", label: "WebDriver 봇 필터링", kind: "trouble", x: 1240, y: 625, r: 13 },
  { id: "t-buffer", label: "비동기 이벤트 버퍼링", kind: "trouble", x: 1240, y: 730, r: 14 },
];

/** 기술 계층 — 개념(허브)과 그 하위 챕터. 간선과 트리가 여기서 유도된다 */
export const theoryClusters = [
  { hub: "react", chapters: ["render", "state", "hooks"] },
  { hub: "browser", chapters: ["eventloop", "repaint", "propagation", "isolation"] },
  { hub: "ts", chapters: ["types", "runtime"] },
  { hub: "network", chapters: ["realtime", "caching", "cors"] },
] as const;

export const fullGraphEdges: GraphEdgeData[] = [
  // 나 → 프로젝트
  { from: "me", to: "withy" },
  { from: "me", to: "petfolio" },
  { from: "me", to: "tickle" },

  // 나 ⇢ 기술 개념 노드 (점선: 이 기술들을 공부함)
  { from: "me", to: "react", kind: "cross" },
  { from: "me", to: "browser", kind: "cross" },
  { from: "me", to: "ts", kind: "cross" },
  { from: "me", to: "network", kind: "cross" },

  // 개념 → 챕터 (계층: 하위 내용)
  ...theoryClusters.flatMap((cluster) =>
    cluster.chapters.map((chapter) => ({ from: cluster.hub, to: chapter })),
  ),

  // 프로젝트 → 트러블
  { from: "withy", to: "t-isolated" },
  { from: "withy", to: "t-sync" },
  { from: "petfolio", to: "t-schema" },
  { from: "petfolio", to: "t-tagged" },
  { from: "tickle", to: "t-canvas" },
  { from: "tickle", to: "t-webdriver" },
  { from: "tickle", to: "t-buffer" },

  // 기술 → 트러블 (다리): 프로젝트와 기술이 만나 트러블이 된다
  { from: "isolation", to: "t-isolated", kind: "bridge" },
  { from: "propagation", to: "t-isolated", kind: "bridge" },
  { from: "realtime", to: "t-sync", kind: "bridge" },
  { from: "runtime", to: "t-schema", kind: "bridge" },
  { from: "types", to: "t-schema", kind: "bridge" },
  { from: "types", to: "t-tagged", kind: "bridge" },
  { from: "repaint", to: "t-canvas", kind: "bridge" },
  { from: "browser", to: "t-webdriver", kind: "bridge" },
  { from: "eventloop", to: "t-buffer", kind: "bridge" },
  { from: "render", to: "t-buffer", kind: "bridge" },
  { from: "hooks", to: "t-buffer", kind: "bridge" },
];

/** 클러스터 백드랍 — 멤버 카드들의 위치에서 프레임이 계산된다 */
export const fullGraphBackdrops: GraphBackdropData[] = [
  {
    id: "bd-projects",
    label: "프로젝트",
    tint: "project",
    members: ["withy", "petfolio", "tickle"],
  },
  {
    id: "bd-troubles",
    label: "트러블슈팅",
    tint: "trouble",
    members: [
      "t-isolated",
      "t-sync",
      "t-schema",
      "t-tagged",
      "t-canvas",
      "t-webdriver",
      "t-buffer",
    ],
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
    members: theoryClusters.flatMap((cluster) => [cluster.hub, ...cluster.chapters]),
  },
];
