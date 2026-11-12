import { describe, expect, it } from "vitest";
import { LAYOUT_GAP, layoutGraph, layoutTree } from "@/lib/layout";

const node = (id: string, y = 0) => ({ id, width: 100, height: 40, y });

describe("layoutGraph", () => {
  it("깊이가 열을 정한다 — 선이 뒤로 돌아가지 않는다", () => {
    const at = layoutGraph(
      [node("a"), node("b"), node("c")],
      [
        { source: "a", target: "b" },
        { source: "b", target: "c" },
      ],
    )!;
    expect(at.get("a")!.x).toBeLessThan(at.get("b")!.x);
    expect(at.get("b")!.x).toBeLessThan(at.get("c")!.x);
  });

  it("같은 열 안의 순서는 지금 y 순서를 따른다", () => {
    const at = layoutGraph([node("low", 500), node("high", 10)], [])!;
    expect(at.get("high")!.y).toBeLessThan(at.get("low")!.y);
  });

  it("순환이 있으면 손대지 않는다", () => {
    expect(
      layoutGraph(
        [node("a"), node("b")],
        [
          { source: "a", target: "b" },
          { source: "b", target: "a" },
        ],
      ),
    ).toBeNull();
  });
});

describe("layoutTree", () => {
  it("틀은 한 덩어리로 늘어놓여 다른 것과 겹치지 않는다", () => {
    const tree = layoutTree(
      [
        node("outside", 0),
        { id: "frame", width: 0, height: 0, y: 0, children: [node("in1", 0), node("in2", 100)] },
      ],
      [{ source: "outside", target: "in1" }],
      LAYOUT_GAP,
      { top: 56, side: 26 },
    )!;
    const frame = { ...tree.positions.get("frame")!, ...tree.sizes.get("frame")! };
    const outside = tree.positions.get("outside")!;
    /* 바깥 노드는 틀 상자 밖에 선다 */
    expect(outside.x + 100 <= frame.x || outside.x >= frame.x + frame.width).toBe(true);
    /* 안쪽 노드는 틀 상자 안(여백 안쪽)에 선다 */
    for (const id of ["in1", "in2"]) {
      const at = tree.positions.get(id)!;
      expect(at.x).toBeGreaterThanOrEqual(frame.x + 26);
      expect(at.y).toBeGreaterThanOrEqual(frame.y + 56);
    }
  });
});
