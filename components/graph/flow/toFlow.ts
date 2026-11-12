import type { Edge } from "@xyflow/react";
import { LAYOUT_GAP, layoutTree, type LayoutItem, type TreeLayout } from "@/lib/layout";
import { descendantsOf } from "@/lib/topology";
import { isDefined } from "@/lib/util";
import type { GraphBackdropData, GraphEdgeData, GraphNodeData, NodeKind } from "../types";
import type { BackdropFlowNode } from "./BackdropNode";
import type { KnowledgeFlowNode } from "./KnowledgeNode";
import {
  BACKDROP_PAD,
  BACKDROP_TITLE,
  cardHeight,
  cardWidth,
  collapsedWidth,
  type GraphFlowNode,
} from "./sizes";

/**
 * 그래프 계산 — 처음 배치(buildFlowGraph)와 "정렬"·접기 뒤의 재배치(KnowledgeGraph)가
 * 같은 함수를 쓴다. 둘이 다른 것은 크기와 접힘을 어디서 읽는가뿐이라 그것만 인자로 받는다.
 * 한쪽만 고치면 처음 화면과 정렬 뒤 화면이 다른 규칙으로 서게 된다.
 */

/* 선은 한 종류다. 굵기나 점선으로 갈래를 나누면 그 차이가 무슨 뜻인지 따로
   설명해야 하는데, 무엇과 무엇이 이어져 있는지는 노드 색과 자리로 이미 읽힌다 */
const EDGE_STYLE: React.CSSProperties = {
  stroke: "var(--edge)",
  strokeWidth: 1.6,
};

// ── 틀의 계층 ──────────────────────────────────────────────

/** 틀 → 직속 멤버 간선 — 틀 안으로 내려가는 것은 topology.descendantsOf가 한다 */
function membershipEdges(frames: readonly GraphBackdropData[]) {
  return frames.flatMap((frame) =>
    frame.members.map((member) => ({ source: frame.id, target: member })),
  );
}

/**
 * 이 틀이 담고 있는 것 전부 — 안에 틀이 있으면 그 틀과 그 안까지 펼쳐 내려간다.
 * 자기를 담는 고리가 생겨도 한 번 본 것은 다시 보지 않는다.
 */
export function frameDescendants(frameId: string, frames: readonly GraphBackdropData[]): string[] {
  return [...descendantsOf(frameId, membershipEdges(frames))].filter((id) => id !== frameId);
}

/** 어느 틀에도 담기지 않은 틀 — 배치의 맨 바깥에 서는 것들 */
export function outerFrames(frames: readonly GraphBackdropData[]): GraphBackdropData[] {
  const ids = new Set(frames.map((frame) => frame.id));
  const nested = new Set(frames.flatMap((frame) => frame.members.filter((id) => ids.has(id))));
  return frames.filter((frame) => !nested.has(frame.id));
}

/**
 * 접힌 틀이 가리는 노드 → 그 틀 id.
 *
 * 바깥부터 정한다. 겉의 틀을 접으면 안쪽 틀과 그 내용이 함께 사라져야 하고,
 * 그때 붙어 있던 선은 **가장 바깥의** 접힌 틀로 옮겨 그려야 한다 —
 * 안쪽 틀에 붙이면 그 틀 자체가 숨어 있어 선이 갈 곳이 없다.
 */
export function hiddenByOf(
  frames: readonly GraphBackdropData[],
  isCollapsed: (id: string) => boolean,
): Map<string, string> {
  const inside = new Map(frames.map((frame) => [frame.id, frameDescendants(frame.id, frames)]));
  const depthOf = (frame: GraphBackdropData) =>
    frames.filter((candidate) => inside.get(candidate.id)?.includes(frame.id)).length;

  const map = new Map<string, string>();
  for (const frame of [...frames].sort((a, b) => depthOf(a) - depthOf(b))) {
    if (!isCollapsed(frame.id)) continue;
    for (const member of inside.get(frame.id) ?? []) {
      if (!map.has(member)) map.set(member, frame.id);
    }
  }
  return map;
}

/**
 * 접힌 틀에 가려진 끝을 그 틀로 옮긴다 — 정렬이 볼 간선, 갈래를 따질 간선,
 * 화면에 그릴 간선이 모두 이 하나를 거친다.
 *
 * - 양끝이 같은 틀로 들어가면 밖에서 볼 일이 없는 연결이라 버린다
 *   (정렬에 쓰면 자기 자신에게 걸려 순환이 된다)
 * - 같은 두 끝으로 모인 선은 하나만 남긴다. 틀에는 포트가 하나라 전부 한 점으로
 *   모이고, 겹쳐 그려 봐야 같은 자리에 포개질 뿐이다
 * - 나머지 칸(id·스타일)은 그대로 둔다. 접었다 펴도 같은 선이라야 React Flow가
 *   새로 만들지 않는다
 *
 * (원작 asset-pipeline의 useCanvasView, autoLayout.test의 「접힌 백드랍도 안쪽의
 * 연결로 열이 정해진다」와 같은 규칙이다)
 */
export function rerouteEdges<E extends { source: string; target: string }>(
  edges: readonly E[],
  hiddenBy: ReadonlyMap<string, string>,
): E[] {
  const seen = new Set<string>();
  const result: E[] = [];
  for (const edge of edges) {
    const source = hiddenBy.get(edge.source) ?? edge.source;
    const target = hiddenBy.get(edge.target) ?? edge.target;
    if (source === target) continue;
    const key = `${source}->${target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ ...edge, source, target });
  }
  return result;
}

/** 데이터의 간선(from/to)을 계산용(source/target)으로 */
export function sourceTarget(edges: readonly GraphEdgeData[]) {
  return edges.map((edge) => ({ source: edge.from, target: edge.to }));
}

/** 틀 제목의 개수 단위 — 틀의 갈래가 정한다 */
const COUNT_UNIT: Record<NodeKind, string> = {
  project: "프로젝트",
  trouble: "글",
  idea: "항목",
  til: "항목",
  theory: "개념",
  me: "개념",
};

/**
 * 틀 제목의 개수 — 안쪽 틀까지 펼쳐 내려가 진짜 노드만 센다.
 * 처음 그릴 때와 노드를 끌어 넣은 뒤가 같은 함수를 써야 같은 뜻의 숫자가 나온다.
 */
export function frameCountLabel(
  frame: GraphBackdropData,
  frames: readonly GraphBackdropData[],
  isNode: (id: string) => boolean,
): string {
  const count = frameDescendants(frame.id, frames).filter(isNode).length;
  return `${COUNT_UNIT[frame.tint]} ${count}`;
}

// ── 배치 ───────────────────────────────────────────────────

/**
 * 배치할 항목 — 틀은 하나의 덩어리, 어떤 틀에도 안 담긴 노드는 잎.
 *
 * 접힌 틀은 덩어리가 아니라 **잎 하나**로 들어간다. 안쪽이 숨어 있으니 자리도
 * 카드 한 장만 차지해야 한다.
 *
 * 틀에 덩어리(clusters)가 적혀 있으면 덩어리째 움직인다. 덩어리는 처음 소속으로
 * 적힌 것이라, 지금 그 틀에 없는 노드는 빼고, 덩어리에 없는 새 멤버(끌어 넣은 노드)는
 * 따로 잎으로 넣는다 — 안 그러면 옮긴 노드가 옛 틀 자리로 돌아가거나 자리를 못 받는다.
 */
export function buildLayoutItems({
  nodeIds,
  frames,
  isFolded,
  leafOf,
  frameY,
}: {
  nodeIds: readonly string[];
  frames: readonly GraphBackdropData[];
  isFolded: (frameId: string) => boolean;
  /** 노드 하나의 크기와 위아래 자리. 그릴 수 없는 노드면 null */
  leafOf: (id: string) => LayoutItem | null;
  /** 틀의 위아래 자리 — 안쪽의 가장 위(minY)를 기본으로 받아 고를 수 있다 */
  frameY: (frame: GraphBackdropData, minY: number) => number;
}): LayoutItem[] {
  const frameById = new Map(frames.map((frame) => [frame.id, frame]));
  const topOf = (items: readonly { y: number }[]) =>
    items.length > 0 ? Math.min(...items.map((item) => item.y)) : 0;

  const frameItem = (frame: GraphBackdropData): LayoutItem | null => {
    if (isFolded(frame.id)) {
      const inside = frameDescendants(frame.id, frames).map(leafOf).filter(isDefined);
      return {
        id: frame.id,
        width: collapsedWidth(frame.tint),
        height: BACKDROP_TITLE,
        y: frameY(frame, topOf(inside)),
      };
    }
    const memberItem = (id: string) => {
      const inner = frameById.get(id);
      return inner ? frameItem(inner) : leafOf(id);
    };
    const members = new Set(frame.members);
    const clustered = new Set<string>();
    const clusterItems = (frame.clusters ?? []).map((cluster): LayoutItem | null => {
      const inner = cluster.members.filter((id) => members.has(id));
      inner.forEach((id) => clustered.add(id));
      const leaves = inner.map(leafOf).filter(isDefined);
      if (leaves.length === 0) return null;
      return { id: cluster.id, width: 0, height: 0, y: topOf(leaves), children: leaves };
    });
    const strays = frame.members.filter((id) => !clustered.has(id)).map(memberItem);
    const children = [...clusterItems, ...strays].filter(isDefined);
    if (children.length === 0) return null;
    return { id: frame.id, width: 0, height: 0, y: frameY(frame, topOf(children)), children };
  };

  /* 어떤 틀에도 안 담긴 노드만 잎으로 — 안쪽 틀을 거쳐 담긴 것까지 센다 */
  const framed = new Set(frames.flatMap((frame) => frameDescendants(frame.id, frames)));
  return [
    ...nodeIds
      .filter((id) => !framed.has(id))
      .map(leafOf)
      .filter(isDefined),
    ...outerFrames(frames).map(frameItem).filter(isDefined),
  ];
}

/**
 * 원작의 layoutTree로 늘어놓는다 — 깊이(최장 경로)가 열을 정하고, 열 안의 순서는
 * 항목의 y 순서를 따른다. 정렬이 볼 간선은 접힌 틀로 옮긴 것이고, 가로지르는
 * 다리(skipLayout)는 그려지되 깊이에는 끼지 않는다.
 */
export function placeItems(
  items: readonly LayoutItem[],
  edges: readonly GraphEdgeData[],
  hiddenBy: ReadonlyMap<string, string>,
): TreeLayout | null {
  const layoutEdges = rerouteEdges(
    sourceTarget(edges.filter((edge) => !edge.skipLayout)),
    hiddenBy,
  );
  return layoutTree(items, layoutEdges, LAYOUT_GAP, {
    top: BACKDROP_PAD + BACKDROP_TITLE,
    side: BACKDROP_PAD,
  });
}

// ── 처음 그리기 ────────────────────────────────────────────

/**
 * 초기 배치부터 정렬과 같은 규칙으로 계산한다. 데이터 좌표는 순서를 정할 뿐,
 * 실제 자리는 여기서 나온다. 처음 접혀 있는 틀은 백드랍 객체가 안다(collapsed).
 */
export function buildFlowGraph(
  nodes: GraphNodeData[],
  edges: GraphEdgeData[],
  backdrops: GraphBackdropData[],
): GraphFlowNode[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const isFolded = (id: string) => Boolean(backdrops.find((frame) => frame.id === id)?.collapsed);

  const items = buildLayoutItems({
    nodeIds: nodes.map((node) => node.id),
    frames: backdrops,
    isFolded,
    leafOf: (id) => {
      const node = byId.get(id);
      return node ? { id, width: cardWidth(node), height: cardHeight(node), y: node.y } : null;
    },
    frameY: (_, minY) => minY,
  });
  const tree = placeItems(items, edges, hiddenByOf(backdrops, isFolded));

  const backdropNodes: BackdropFlowNode[] = backdrops.flatMap((backdrop) => {
    const at = tree?.positions.get(backdrop.id);
    /* layoutTree는 자식을 가진 항목에만 크기를 돌려준다. 접힌 틀은 잎으로
       넣었으니 크기가 없다 — 그때는 카드 한 장 크기가 곧 그 크기다.
       (이걸 놓치면 접힌 틀이 통째로 안 그려진다) */
    const size =
      tree?.sizes.get(backdrop.id) ??
      (backdrop.collapsed
        ? { width: collapsedWidth(backdrop.tint), height: BACKDROP_TITLE }
        : undefined);
    if (!at || !size) return [];
    return [
      {
        id: backdrop.id,
        type: "backdrop",
        position: at,
        data: {
          label: backdrop.label,
          tint: backdrop.tint,
          countLabel: frameCountLabel(backdrop, backdrops, (id) => byId.has(id)),
          memberIds: backdrop.members,
        },
        style: { width: size.width, height: size.height },
        zIndex: -1,
        selectable: false,
        draggable: true,
        dragHandle: ".backdrop-drag-handle",
        focusable: false,
      },
    ];
  });

  const knowledgeNodes: KnowledgeFlowNode[] = nodes.map((node) => ({
    id: node.id,
    type: "knowledge",
    /* 순환 등으로 배치를 못 정하면 데이터 좌표를 그대로 쓴다 */
    position: tree?.positions.get(node.id) ?? { x: node.x, y: node.y },
    data: node,
  }));

  return [...backdropNodes, ...knowledgeNodes];
}

export function toFlowEdges(edges: GraphEdgeData[]): Edge[] {
  return edges.map((edge): Edge => ({
    id: `${edge.from}-${edge.to}`,
    source: edge.from,
    target: edge.to,
    type: "default",
    style: EDGE_STYLE,
    focusable: false,
    label: edge.label,
    labelStyle: { fill: "var(--muted)", fontSize: 11, fontWeight: 500 },
    labelBgStyle: { fill: "var(--bg)", fillOpacity: 0.85 },
    labelBgPadding: [6, 3],
    labelBgBorderRadius: 4,
  }));
}
