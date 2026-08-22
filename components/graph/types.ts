export type NodeKind = "theory" | "project" | "trouble" | "me";

export type LabelPlacement = "top" | "bottom" | "left" | "right" | "inside";

/** React Flow의 Node<T> 제약(Record<string, unknown>)을 만족하도록 interface가 아닌 type으로 선언 */
export type GraphNodeData = {
  id: string;
  label: string;
  /** 두 번째 줄 (프로젝트 허브 등) */
  sublabel?: string;
  kind: NodeKind;
  x: number;
  y: number;
  r: number;
  /** 허브 노드: 색 그라디언트 채움 + 점선 궤도 링 */
  hub?: boolean;
  labelPlacement?: LabelPlacement;
  /** 이 노드를 참조하는 글 수 — 우상단 코럴 뱃지로 표시 */
  badge?: number;
  /** 허브 내부 집계 라인 ("트러블 4" / "개념 3") */
  meta?: string;
  /** 클릭 시 이동하는 노드 (포인터 커서 + 호버 확대) */
  clickable?: boolean;
};

export type EdgeKind = "link" | "bridge" | "cross";

/** 클러스터를 묶는 백드랍 — asset-pipeline의 "단계를 백드랍으로 나눈다" 문법 */
export type GraphBackdropData = {
  id: string;
  label: string;
  tint: NodeKind;
  /** 이 백드랍이 감싸는 노드 id들 — 프레임 크기는 멤버 위치에서 계산 */
  members: string[];
};

export type GraphEdgeData = {
  from: string;
  to: string;
  /** link: 클러스터 내부 / bridge: 트러블-이론 다리 / cross: 점선 크로스 연결 */
  kind?: EdgeKind;
  /** 수직 방향 굽힘(px). 양수 = 진행 방향 기준 오른쪽으로 휨 */
  bend?: number;
  /** 관계 이름 (연결 뷰: "발생한 곳" / "원인 개념" / "해결 기법") */
  label?: string;
};
