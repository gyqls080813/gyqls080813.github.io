import type { Edge, Node } from "@xyflow/react";
import { LAYOUT_GAP, layoutTree, type LayoutItem } from "@/lib/layout";
import type {
  GraphBackdropData,
  GraphEdgeData,
  GraphNodeData,
  NodeKind,
} from "../types";
import type { BackdropFlowNode } from "./BackdropNode";
import { cardWidth, type KnowledgeFlowNode } from "./KnowledgeNode";

/* 선은 한 종류다. 굵기나 점선으로 갈래를 나누면 그 차이가 무슨 뜻인지 따로
   설명해야 하는데, 무엇과 무엇이 이어져 있는지는 노드 색과 자리로 이미 읽힌다 */
const EDGE_STYLE: React.CSSProperties = {
  stroke: "var(--edge)",
  strokeWidth: 1.6,
};

export const BACKDROP_PAD = 26;
export const BACKDROP_TITLE = 30;

/**
 * 접힌 틀의 폭 — 같은 갈래의 노드 카드와 같은 폭이다.
 *
 * 접히면 카드 한 장처럼 서므로 폭도 카드와 같아야 한 줄로 읽힌다.
 * 값은 KnowledgeNode의 cardWidth와 반드시 함께 맞춘다.
 */
export function collapsedWidth(tint: NodeKind): number {
  if (tint === "trouble") return 196;
  if (tint === "project" || tint === "me") return 176;
  return 174;
}

/** 카드 높이 추정치 — 초기 배치 계산용 (제목 한 줄 ≈ 37px) */
export function cardHeight(node: GraphNodeData): number {
  const twoLineTitle = node.kind === "trouble" && node.label.length > 13;
  let height = twoLineTitle ? 52 : 37;
  if (node.dateLabel) height += 15;
  if (node.meta) height += 19;
  return height;
}

/**
 * 이 틀이 담고 있는 것 전부 — 안에 틀이 있으면 그 틀과 그 안까지 펼쳐 내려간다.
 * 자기를 담는 고리가 생겨도 여기서 끊긴다.
 */
export function frameDescendants(
  backdrop: GraphBackdropData,
  byFrame: ReadonlyMap<string, GraphBackdropData>,
): string[] {
  const seen = new Set<string>([backdrop.id]);
  const found: string[] = [];
  const walk = (frame: GraphBackdropData) => {
    for (const member of frame.members) {
      if (seen.has(member)) continue;
      seen.add(member);
      found.push(member);
      const inner = byFrame.get(member);
      if (inner) walk(inner);
    }
  };
  walk(backdrop);
  return found;
}

/** 어느 틀에도 담기지 않은 틀 — 배치의 맨 바깥에 서는 것들 */
export function outerFrames(
  backdrops: readonly GraphBackdropData[],
): GraphBackdropData[] {
  const nested = new Set(
    backdrops.flatMap((frame) =>
      frame.members.filter((member) =>
        backdrops.some((candidate) => candidate.id === member),
      ),
    ),
  );
  return backdrops.filter((frame) => !nested.has(frame.id));
}

/**
 * 접힌 틀이 가리는 노드 → 그 틀 id.
 *
 * 바깥부터 정한다. 겉의 틀을 접으면 안쪽 틀과 그 내용이 함께 사라져야 하고,
 * 그때 붙어 있던 선은 **가장 바깥의** 접힌 틀로 옮겨 그려야 한다 —
 * 안쪽 틀에 붙이면 그 틀 자체가 숨어 있어 선이 갈 곳이 없다.
 */
export function hiddenByOf(
  backdrops: readonly GraphBackdropData[],
  isCollapsed: (id: string) => boolean,
): Map<string, string> {
  const byFrame = new Map(backdrops.map((frame) => [frame.id, frame]));
  const depthOf = (frame: GraphBackdropData) =>
    backdrops.filter((candidate) =>
      frameDescendants(candidate, byFrame).includes(frame.id),
    ).length;

  const map = new Map<string, string>();
  for (const frame of [...backdrops].sort((a, b) => depthOf(a) - depthOf(b))) {
    if (!isCollapsed(frame.id)) continue;
    for (const member of frameDescendants(frame, byFrame)) {
      if (!map.has(member)) map.set(member, frame.id);
    }
  }
  return map;
}

/**
 * 정렬이 볼 간선 — 안쪽을 가리키는 끝을 접힌 틀의 것으로 읽는다.
 *
 * 이걸 안 하면 접힌 상자에 들어오고 나가는 선이 하나도 없는 것으로 보여
 * 깊이가 0이 되고, 상자와 그 이웃들이 한 열에 세로로 쌓인다.
 * (원작 autoLayout.test의 「접힌 백드랍도 안쪽의 연결로 열이 정해진다」)
 */
export function layoutEdges(
  edges: readonly GraphEdgeData[],
  hiddenBy: ReadonlyMap<string, string>,
): { source: string; target: string }[] {
  const seen = new Set<string>();
  const result: { source: string; target: string }[] = [];
  for (const edge of edges) {
    const source = hiddenBy.get(edge.from) ?? edge.from;
    const target = hiddenBy.get(edge.to) ?? edge.to;
    /* 같은 상자 안끼리 — 깊이를 정하는 데 쓰면 자기 자신에게 걸려 순환이 된다 */
    if (source === target) continue;
    const key = `${source}->${target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ source, target });
  }
  return result;
}

/**
 * 초기 배치부터 원작의 layoutTree로 계산한다 — 틀은 하나의 덩어리,
 * 깊이(최장 경로)가 열을 정하고, 열 안의 순서는 데이터의 y 순서를 따른다.
 * 데이터 좌표는 순서를 정할 뿐, 실제 자리는 여기서 나온다.
 *
 * 접힌 틀은 덩어리가 아니라 **잎 하나**로 들어간다. 안쪽이 숨어 있으니
 * 자리도 카드 한 장만 차지해야 한다.
 */
export function buildFlowGraph(
  nodes: GraphNodeData[],
  edges: GraphEdgeData[],
  backdrops: GraphBackdropData[],
): Node[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));

  const leafItem = (id: string): LayoutItem | null => {
    const node = byId.get(id);
    if (!node) return null;
    return { id, width: cardWidth(node), height: cardHeight(node), y: node.y };
  };
  const leafItems = (ids: readonly string[]): LayoutItem[] =>
    ids.map(leafItem).filter((item): item is LayoutItem => item !== null);

  /* 처음 접혀 있는 틀은 백드랍 객체가 안다 */
  const hiddenBy = hiddenByOf(backdrops, (id) =>
    Boolean(backdrops.find((frame) => frame.id === id)?.collapsed),
  );

  const byFrame = new Map(backdrops.map((frame) => [frame.id, frame]));

  /** 틀 하나를 배치 항목으로. 안에 틀이 있으면 그것도 항목으로 내려간다 */
  const frameItem = (backdrop: GraphBackdropData): LayoutItem | null => {
    /* 접힌 틀은 안쪽을 데리고 들어가지 않는다 — 잎 하나로 선다 */
    if (backdrop.collapsed) {
      const ys = frameDescendants(backdrop, byFrame)
        .map((id) => byId.get(id)?.y)
        .filter((y): y is number => typeof y === "number");
      return {
        id: backdrop.id,
        width: collapsedWidth(backdrop.tint),
        height: BACKDROP_TITLE,
        y: ys.length > 0 ? Math.min(...ys) : 0,
      };
    }
    const children = backdrop.clusters
      ? backdrop.clusters
          .map((cluster): LayoutItem | null => {
            const inner = leafItems(cluster.members);
            if (inner.length === 0) return null;
            return {
              id: cluster.id,
              width: 0,
              height: 0,
              y: Math.min(...inner.map((item) => item.y)),
              children: inner,
            };
          })
          .filter((item): item is LayoutItem => item !== null)
      : backdrop.members
          .map((id) => {
            const inner = byFrame.get(id);
            return inner ? frameItem(inner) : leafItem(id);
          })
          .filter((item): item is LayoutItem => item !== null);
    if (children.length === 0) return null;
    return {
      id: backdrop.id,
      width: 0,
      height: 0,
      y: Math.min(...children.map((item) => item.y)),
      children,
    };
  };

  /* 어떤 틀에도 안 담긴 노드만 잎으로 — 안쪽 틀을 거쳐 담긴 것까지 센다 */
  const framed = new Set(
    backdrops.flatMap((frame) => frameDescendants(frame, byFrame)),
  );
  const items: LayoutItem[] = [
    ...leafItems(nodes.map((node) => node.id).filter((id) => !framed.has(id))),
    ...outerFrames(backdrops)
      .map(frameItem)
      .filter((item): item is LayoutItem => item !== null),
  ];

  const tree = layoutTree(items, layoutEdges(edges, hiddenBy), LAYOUT_GAP, {
    top: BACKDROP_PAD + BACKDROP_TITLE,
    side: BACKDROP_PAD,
  });

  const backdropNodes: BackdropFlowNode[] = [];
  for (const backdrop of backdrops) {
    const at = tree?.positions.get(backdrop.id);
    /* layoutTree는 자식을 가진 항목에만 크기를 돌려준다. 접힌 틀은 잎으로
       넣었으니 크기가 없다 — 그때는 카드 한 장 크기가 곧 그 크기다.
       (이걸 놓치면 접힌 틀이 통째로 안 그려진다) */
    const size =
      tree?.sizes.get(backdrop.id) ??
      (backdrop.collapsed
        ? { width: collapsedWidth(backdrop.tint), height: BACKDROP_TITLE }
        : undefined);
    if (!at || !size) continue;
    /* 안쪽에 틀이 있으면 멤버가 틀 id다 — 펼쳐 내려가 진짜 노드만 센다 */
    const present = frameDescendants(backdrop, byFrame).filter((id) =>
      byId.has(id),
    );
    const unit =
      backdrop.tint === "project"
        ? "프로젝트"
        : backdrop.tint === "trouble"
          ? "글"
          : "개념";
    backdropNodes.push({
      id: backdrop.id,
      type: "backdrop",
      position: at,
      data: {
        label: backdrop.label,
        tint: backdrop.tint,
        countLabel: `${unit} ${present.length}`,
        memberIds: backdrop.members,
      },
      style: { width: size.width, height: size.height },
      zIndex: -1,
      selectable: false,
      draggable: true,
      dragHandle: ".backdrop-drag-handle",
      focusable: false,
    });
  }

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
  return edges.map((edge) => {
    return {
      id: `${edge.from}-${edge.to}`,
      source: edge.from,
      target: edge.to,
      type: "default",
      style: EDGE_STYLE,
      focusable: false,
      label: edge.label,
      labelStyle: { fill: "var(--muted)", fontSize: 11, fontWeight: 500 },
      labelBgStyle: { fill: "var(--bg)", fillOpacity: 0.85 },
      labelBgPadding: [6, 3] as [number, number],
      labelBgBorderRadius: 4,
    };
  });
}
