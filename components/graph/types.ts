/**
 * 노드의 종류 — 색과 표식이 여기서 나온다.
 *
 * idea(생각)는 만든 것(project)·배운 것(theory)과 나란한 세 번째 갈래다.
 * 넣을 때의 기준은 하나 — **사실이면 theory, 내 결정이면 idea**.
 *
 * til(기록)은 그 셋과 나란한 갈래가 아니라 생각 안의 TIL이 담는 알맹이다.
 * 프로젝트가 트러블을 담는 것과 같은 관계 — 담는 쪽과 담기는 쪽의 종류가
 * 다르다. 저 셋이 정리해서 쌓는 것이라면 이쪽은 그날 있었던 일이다.
 *
 * 그래서 til만 자기 색이 없다. 색은 갈래가 정하고(생각 = 초록), 종류는
 * 표식으로 갈린다 — 나침반이 개념이면 달력이 그날의 기록이다. 색을 하나
 * 더 만들면 초록 틀 안에 다른 색 노드가 앉아 틀과 알맹이가 다른 말을 한다.
 */
export type NodeKind = "theory" | "project" | "trouble" | "me" | "idea" | "til";

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
  /** 카드 상단 날짜 줄 — 글은 작성 날짜, 프로젝트는 진행 기간 */
  dateLabel?: string;
  /** 카드 하단 집계 줄 ("트러블 4" / "5분 · 섹션 2" / "글 1") */
  meta?: string;
  /** 클릭 시 이동하는 노드 (포인터 커서 + 호버 확대) */
  clickable?: boolean;
};

/** 클러스터를 묶는 백드랍 — asset-pipeline의 "단계를 백드랍으로 나눈다" 문법 */
export type GraphBackdropData = {
  id: string;
  label: string;
  tint: NodeKind;
  /**
   * 처음에 접혀 있는가.
   *
   * 접힘은 데이터가 아니라 뷰다 — 접어도 노드와 간선은 그대로 있고,
   * 무엇을 가리고 선을 어디에 그릴지만 달라진다. 그래서 여기 적는 것은
   * "지금 상태"가 아니라 "처음 보여줄 때의 상태"다.
   */
  collapsed?: boolean;
  /** 이 백드랍이 감싸는 노드 id들 — 프레임 크기는 멤버 위치에서 계산 */
  members: string[];
  /**
   * 정렬 시 함께 묶여 움직일 내부 소그룹 (렌더링과 무관, 레이아웃 전용).
   * 원작 규칙 "한 노드는 최대 한 틀에만" 위에서, 틀 안의 덩어리를 표현한다.
   */
  clusters?: readonly { id: string; members: readonly string[] }[];
};

export type GraphEdgeData = {
  from: string;
  to: string;
  /** 수직 방향 굽힘(px). 양수 = 진행 방향 기준 오른쪽으로 휨 */
  bend?: number;
  /** 관계 이름 (연결 뷰: "발생한 곳" / "원인 개념" / "해결 기법") */
  label?: string;
};
