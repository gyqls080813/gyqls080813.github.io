/**
 * 이웃에 맞춰 붙이기 — Shift를 누른 채 끌면 옆 노드의 선에 달라붙는다.
 * (asset-pipeline의 graph/snap.ts를 그대로 가져옴)
 *
 * 사각형 하나는 축마다 세 개의 선을 갖는다 — 시작 · 가운데 · 끝.
 * 끄는 사각형의 세 선과 상대의 세 선 조합 중 가장 가까운 것이 이긴다.
 * 자석이 늘 켜져 있으면 일부러 살짝 어긋나게 두는 것이 불가능해지므로,
 * 붙이고 싶을 때만 Shift를 누른다.
 */

export interface SnapRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** 맞춰진 자리에 그어 주는 선 — from~to는 맞물린 두 사각형을 함께 지나는 구간 */
export interface Guide {
  /** 'x'면 세로선(가로 위치를 맞춘 것), 'y'면 가로선 */
  axis: Axis;
  at: number;
  from: number;
  to: number;
}

export interface SnapResult {
  /** 끌던 자리에서 얼마나 당겨졌는지. 붙을 것이 없으면 0이다. */
  dx: number;
  dy: number;
  guides: Guide[];
}

type Axis = "x" | "y";

/** 이만큼 안에 들어오면 붙는다. 캔버스 좌표 기준 — 줌 배율과 무관하게 일정 */
export const SNAP_RANGE = 8;

/** 한 축에서 이 사각형이 갖는 세 선 — 시작 · 가운데 · 끝 */
function marks(rect: SnapRect, axis: Axis): [number, number, number] {
  const start = axis === "x" ? rect.x : rect.y;
  const size = axis === "x" ? rect.width : rect.height;
  return [start, start + size / 2, start + size];
}

/** 이 축에서 얼마나 당겨야 가장 가까운 선에 붙는가 */
function pull(
  moving: SnapRect,
  others: readonly SnapRect[],
  axis: Axis,
  range: number,
): number {
  const mine = marks(moving, axis);
  let best = 0;
  let closest = Infinity;

  for (const other of others) {
    for (const theirs of marks(other, axis)) {
      for (const own of mine) {
        const delta = theirs - own;
        const distance = Math.abs(delta);
        if (distance > range || distance >= closest) continue;
        closest = distance;
        best = delta;
      }
    }
  }

  return best;
}

/** 소수점 오차를 감안한 같음. 가운데선은 나누기에서 나온 값이다. */
const TOUCHING = 0.5;

/** 옮겨 놓은 뒤 실제로 맞물린 선들 — 셋이 한 줄에 서면 선도 셋을 지난다 */
function guidesFor(
  placed: SnapRect,
  others: readonly SnapRect[],
  axis: Axis,
): Guide[] {
  const mine = marks(placed, axis);
  const found = new Map<number, Guide>();

  for (const other of others) {
    for (const at of marks(other, axis)) {
      if (!mine.some((own) => Math.abs(own - at) < TOUCHING)) continue;

      const [low, high] =
        axis === "x"
          ? [
              Math.min(placed.y, other.y),
              Math.max(placed.y + placed.height, other.y + other.height),
            ]
          : [
              Math.min(placed.x, other.x),
              Math.max(placed.x + placed.width, other.x + other.width),
            ];

      const already = found.get(at);
      found.set(
        at,
        already
          ? {
              axis,
              at,
              from: Math.min(already.from, low),
              to: Math.max(already.to, high),
            }
          : { axis, at, from: low, to: high },
      );
    }
  }

  return [...found.values()];
}

/** 끄는 사각형을 이웃의 선에 붙인다. 좌표가 아니라 당길 거리를 돌려준다. */
export function snapToNeighbors(
  moving: SnapRect,
  others: readonly SnapRect[],
  range: number = SNAP_RANGE,
): SnapResult {
  if (others.length === 0) return { dx: 0, dy: 0, guides: [] };

  const dx = pull(moving, others, "x", range);
  const dy = pull(moving, others, "y", range);

  const placed: SnapRect = { ...moving, x: moving.x + dx, y: moving.y + dy };
  return {
    dx,
    dy,
    guides: [...guidesFor(placed, others, "x"), ...guidesFor(placed, others, "y")],
  };
}
