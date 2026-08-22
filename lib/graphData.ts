import type {
  GraphBackdropData,
  GraphEdgeData,
  GraphNodeData,
} from "@/components/graph/types";

/**
 * 전체 그래프(랜딩) 데이터. 좌표는 카드 중심 기준 (toFlow에서 SPREAD 배율 적용).
 * 왼쪽 = 프로젝트(앰버), 가운데 = 트러블슈팅(코럴), 오른쪽 = 이론(청록).
 * 클러스터 묶음은 허브 노드가 아니라 백드랍이 맡는다.
 */
export const fullGraphNodes: GraphNodeData[] = [
  // 그래프의 시작점 — 나
  { id: "me", label: "민엽", kind: "me", x: 120, y: 420, r: 30, hub: true },

  // 프로젝트
  { id: "withy", label: "withy", kind: "project", x: 270, y: 280, r: 44, hub: true },
  {
    id: "blog",
    label: "트러블로그",
    kind: "project",
    x: 290,
    y: 560,
    r: 34,
    hub: true,
  },

  // 트러블슈팅 (다리 노드) — 백드랍 안에 한 열로 정렬. 세로 순서는 이론 목적지 높이 순
  { id: "t-modal", label: "모달 상태 꼬임", kind: "trouble", x: 515, y: 130, r: 13 },
  { id: "t-iframe", label: "YouTube iframe 무한 로딩", kind: "trouble", x: 515, y: 265, r: 14 },
  { id: "t-header", label: "헤더 레이아웃 깨짐", kind: "trouble", x: 515, y: 400, r: 13 },
  { id: "t-poster", label: "포스터 이미지 최적화", kind: "trouble", x: 515, y: 535, r: 13 },
  { id: "t-jank", label: "그래프 렌더링 버벅임", kind: "trouble", x: 515, y: 670, r: 13 },
  { id: "t-404", label: "GitHub Pages 404", kind: "trouble", x: 515, y: 805, r: 13 },

  // 이론 클러스터 — 트러블 열과 같은 문법: 클러스터마다 한 열로 정렬
  // React
  { id: "state", label: "상태 관리", kind: "theory", x: 780, y: 100, r: 16 },
  { id: "render", label: "렌더링", kind: "theory", x: 780, y: 185, r: 17 },
  { id: "hooks", label: "훅", kind: "theory", x: 780, y: 270, r: 14 },

  // 브라우저
  { id: "loading", label: "로딩 파이프라인", kind: "theory", x: 1000, y: 330, r: 19 },
  { id: "eventloop", label: "이벤트 루프", kind: "theory", x: 1000, y: 415, r: 16 },
  { id: "repaint", label: "리페인트·리플로우", kind: "theory", x: 1000, y: 500, r: 16 },

  // CSS
  { id: "flexbox", label: "Flexbox", kind: "theory", x: 680, y: 500, r: 16 },
  { id: "stacking", label: "쌓임 맥락", kind: "theory", x: 680, y: 585, r: 14 },

  // 네트워크
  { id: "caching", label: "HTTP 캐싱", kind: "theory", x: 880, y: 610, r: 15 },
  { id: "cors", label: "CORS", kind: "theory", x: 880, y: 695, r: 13 },
  { id: "routing", label: "SPA 라우팅", kind: "theory", x: 880, y: 780, r: 14 },
];

export const fullGraphEdges: GraphEdgeData[] = [
  // 나 → 프로젝트
  { from: "me", to: "withy" },
  { from: "me", to: "blog" },

  // 프로젝트 → 트러블
  { from: "withy", to: "t-modal" },
  { from: "withy", to: "t-iframe" },
  { from: "withy", to: "t-header" },
  { from: "withy", to: "t-poster" },
  { from: "blog", to: "t-jank" },
  { from: "blog", to: "t-404" },

  // 트러블 → 이론 (다리)
  { from: "t-modal", to: "state", kind: "bridge", bend: -14 },
  { from: "t-iframe", to: "loading", kind: "bridge", bend: 14 },
  { from: "t-iframe", to: "eventloop", kind: "bridge", bend: -24 },
  { from: "t-header", to: "flexbox", kind: "bridge", bend: 10 },
  { from: "t-poster", to: "caching", kind: "bridge", bend: -26 },
  { from: "t-jank", to: "repaint", kind: "bridge", bend: 60 },
  { from: "t-404", to: "routing", kind: "bridge", bend: 12 },
];

/** 클러스터 백드랍 — 멤버 카드들의 위치에서 프레임이 계산된다 */
export const fullGraphBackdrops: GraphBackdropData[] = [
  { id: "bd-projects", label: "프로젝트", tint: "project", members: ["withy", "blog"] },
  {
    id: "bd-troubles",
    label: "트러블슈팅",
    tint: "trouble",
    members: ["t-modal", "t-iframe", "t-header", "t-poster", "t-jank", "t-404"],
  },
  { id: "bd-react", label: "React", tint: "theory", members: ["state", "render", "hooks"] },
  {
    id: "bd-browser",
    label: "브라우저",
    tint: "theory",
    members: ["loading", "eventloop", "repaint"],
  },
  { id: "bd-css", label: "CSS", tint: "theory", members: ["flexbox", "stacking"] },
  {
    id: "bd-network",
    label: "네트워크",
    tint: "theory",
    members: ["caching", "cors", "routing"],
  },
];
