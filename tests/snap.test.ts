import { describe, expect, it } from "vitest";
import { SNAP_RANGE, snapToNeighbors } from "@/lib/snap";

const rect = (x: number, y: number) => ({ x, y, width: 100, height: 40 });

describe("snapToNeighbors", () => {
  it("범위 안의 가장 가까운 선에 붙는다", () => {
    const result = snapToNeighbors(rect(203, 0), [rect(200, 300)]);
    expect(result.dx).toBe(-3);
    expect(result.guides.some((guide) => guide.axis === "x" && guide.at === 200)).toBe(true);
  });

  it("범위 밖이면 움직이지 않는다", () => {
    const result = snapToNeighbors(rect(200 + SNAP_RANGE + 30, 1000), [rect(200, 0)]);
    expect(result).toEqual({ dx: 0, dy: 0, guides: [] });
  });

  it("이웃이 없으면 그대로다", () => {
    expect(snapToNeighbors(rect(1, 1), [])).toEqual({ dx: 0, dy: 0, guides: [] });
  });
});
