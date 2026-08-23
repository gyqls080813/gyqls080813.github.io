import { topologicalSort, type GraphEdge } from "./topology";

/**
 * 그래프를 흐름대로 늘어놓는다. (asset-pipeline graph/layout.ts에서)
 *
 * ## 깊이가 열을 정한다
 * 어떤 노드의 깊이는 자기를 만드는 데 필요한 것들 중 가장 깊은 것 + 1이다.
 * 들어오는 것이 없으면 0. 왼쪽에서 오른쪽으로 갈수록 나중에 만들어지는
 * 것이 오고, 선이 뒤로 돌아가지 않는다.
 *
 * ## 열 안의 순서는 지금 순서를 따른다
 * 정돈은 바뀐 것을 최소로 해야 사용자가 자기 그래프를 다시 알아본다.
 *
 * ## 순환이 있으면 하지 않는다
 * 깊이를 정할 수 없다. 아무렇게나 늘어놓는 것보다 손대지 않는 편이 낫다.
 */

export interface LayoutNode {
  id: string;
  width: number;
  height: number;
  /** 지금 위치. 열 안의 순서를 정하는 데 쓴다. */
  y: number;
}

export interface LayoutGap {
  /** 열 사이 */
  column: number;
  /** 같은 열 안에서 위아래 */
  row: number;
}

export const LAYOUT_GAP: LayoutGap = { column: 80, row: 80 };

/** 늘어놓은 결과. 순환이 있어 정할 수 없으면 null. 좌표를 돌려주기만 한다. */
export function layoutGraph(
  nodes: readonly LayoutNode[],
  edges: readonly GraphEdge[],
  gap: LayoutGap = LAYOUT_GAP,
): Map<string, { x: number; y: number }> | null {
  if (nodes.length === 0) return new Map();

  const ids = nodes.map((node) => node.id);
  const known = new Set(ids);
  const inside = edges.filter(
    (edge) => known.has(edge.source) && known.has(edge.target),
  );

  const order = topologicalSort(ids, inside);
  if (!order) return null;

  const depth = new Map<string, number>(ids.map((id) => [id, 0]));
  for (const id of order) {
    const own = depth.get(id) ?? 0;
    for (const edge of inside) {
      if (edge.source !== id) continue;
      depth.set(edge.target, Math.max(depth.get(edge.target) ?? 0, own + 1));
    }
  }

  const columns = new Map<number, LayoutNode[]>();
  for (const node of nodes) {
    const at = depth.get(node.id) ?? 0;
    const column = columns.get(at);
    if (column) column.push(node);
    else columns.set(at, [node]);
  }

  const widest = new Map<number, number>();
  for (const [at, column] of columns) {
    widest.set(at, Math.max(...column.map((node) => node.width)));
  }

  const placed = new Map<string, { x: number; y: number }>();
  let x = 0;

  for (const at of [...columns.keys()].sort((a, b) => a - b)) {
    const column = columns.get(at);
    const columnWidth = widest.get(at);
    if (!column || columnWidth === undefined) continue;
    /* 지금 위아래 순서를 그대로 쓴다 */
    column.sort((a, b) => a.y - b.y);

    const total =
      column.reduce((sum, node) => sum + node.height, 0) +
      gap.row * (column.length - 1);
    let y = -total / 2;

    for (const node of column) {
      /* 열 안에서 가운데 정렬 — 폭이 달라도 선이 가운데로 모인다 */
      placed.set(node.id, { x: x + (columnWidth - node.width) / 2, y });
      y += node.height + gap.row;
    }

    x += columnWidth + gap.column;
  }

  return placed;
}

// ── 중첩된 것을 늘어놓기 ─────────────────────────────────

/**
 * 묶음을 무시하고 늘어놓으면 틀 여럿이 서로 겹친다. 묶음은 늘어놓을 때
 * 하나의 덩어리여야 한다 — 그래서 층마다 따로 늘어놓는다.
 *
 * ① 안쪽부터 늘어놓아 상자의 크기를 정한다
 * ② 그 크기를 가진 덩어리로 이 층을 늘어놓는다 (잎끼리의 연결은 덩어리
 *    사이의 연결로 끌어올린다)
 * ③ 안쪽 자리를 상자 자리 + 여백만큼 옮겨 확정한다
 */
export interface LayoutItem {
  id: string;
  /** 잎일 때의 크기. 상자면 ①에서 다시 정해진다. */
  width: number;
  height: number;
  /** 지금 위아래 자리. 열 안의 순서를 정하는 데 쓴다. */
  y: number;
  /** 상자가 직접 담고 있는 것. 없거나 비면 잎으로 본다. */
  children?: LayoutItem[];
}

/** 상자가 담고 있는 것 주위에 두는 여백. 제목 줄이 들어갈 위쪽이 더 넓다. */
export interface LayoutInset {
  top: number;
  side: number;
}

export interface TreeLayout {
  /** id → 왼쪽 위 좌표. 전체가 원점에서 시작한다. */
  positions: Map<string, { x: number; y: number }>;
  /** 안쪽을 늘어놓아 정해진 상자 크기 */
  sizes: Map<string, { width: number; height: number }>;
}

/** 중첩된 것을 층마다 늘어놓는다. 순환이 있으면 null이다. */
export function layoutTree(
  items: readonly LayoutItem[],
  edges: readonly GraphEdge[],
  gap: LayoutGap,
  inset: LayoutInset,
): TreeLayout | null {
  const arranged = arrange(items, edges, gap, inset);
  return arranged && { positions: arranged.positions, sizes: arranged.sizes };
}

interface Arranged extends TreeLayout {
  size: { width: number; height: number };
}

function arrange(
  items: readonly LayoutItem[],
  edges: readonly GraphEdge[],
  gap: LayoutGap,
  inset: LayoutInset,
): Arranged | null {
  const positions = new Map<string, { x: number; y: number }>();
  const sizes = new Map<string, { width: number; height: number }>();
  if (items.length === 0) {
    return { size: { width: 0, height: 0 }, positions, sizes };
  }

  /* ① 안쪽부터. 담고 있는 것을 늘어놓아야 상자의 크기를 알 수 있다. */
  const held = new Map<string, Arranged>();
  const nodes: LayoutNode[] = [];

  for (const item of items) {
    if (item.children?.length) {
      const inside = arrange(item.children, edges, gap, inset);
      if (!inside) return null;
      held.set(item.id, inside);
      nodes.push({
        id: item.id,
        width: inside.size.width + inset.side * 2,
        height: inside.size.height + inset.top + inset.side,
        y: item.y,
      });
      continue;
    }
    nodes.push({ id: item.id, width: item.width, height: item.height, y: item.y });
  }

  /* ② 이 층을 늘어놓는다 */
  const placed = layoutGraph(nodes, liftEdges(items, edges), gap);
  if (!placed) return null;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const node of nodes) {
    const at = placed.get(node.id);
    if (!at) continue;
    positions.set(node.id, at);
    minX = Math.min(minX, at.x);
    minY = Math.min(minY, at.y);
    maxX = Math.max(maxX, at.x + node.width);
    maxY = Math.max(maxY, at.y + node.height);

    /* ③ 안쪽 자리를 이 상자 안으로 옮긴다 */
    const inside = held.get(node.id);
    if (!inside) continue;
    sizes.set(node.id, { width: node.width, height: node.height });
    for (const [id, spot] of inside.positions) {
      positions.set(id, {
        x: at.x + inset.side + spot.x,
        y: at.y + inset.top + spot.y,
      });
    }
    for (const [id, size] of inside.sizes) sizes.set(id, size);
  }

  /* 원점을 왼쪽 위로 옮긴다 — 부모가 자기 안쪽에 그대로 얹을 수 있어야 한다 */
  for (const [id, spot] of positions) {
    positions.set(id, { x: spot.x - minX, y: spot.y - minY });
  }

  return { size: { width: maxX - minX, height: maxY - minY }, positions, sizes };
}

/** 잎끼리의 연결을 이 층의 덩어리 사이 연결로 끌어올린다. */
function liftEdges(
  items: readonly LayoutItem[],
  edges: readonly GraphEdge[],
): GraphEdge[] {
  const owner = new Map<string, string>();
  const claim = (item: LayoutItem, top: string) => {
    owner.set(item.id, top);
    for (const child of item.children ?? []) claim(child, top);
  };
  for (const item of items) claim(item, item.id);

  const lifted: GraphEdge[] = [];
  for (const edge of edges) {
    const source = owner.get(edge.source);
    const target = owner.get(edge.target);
    /* 같은 덩어리 안에서 오가는 선은 이 층의 순서와 상관이 없다 */
    if (!source || !target || source === target) continue;
    lifted.push({ source, target });
  }
  return lifted;
}
