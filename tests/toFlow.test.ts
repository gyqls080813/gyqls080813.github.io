import { describe, expect, it } from "vitest";
import type { GraphBackdropData } from "@/components/graph/types";
import {
  buildLayoutItems,
  frameCountLabel,
  frameDescendants,
  hiddenByOf,
  rerouteEdges,
} from "@/components/graph/flow/toFlow";

/* 바깥 틀(outer) 안에 안쪽 틀(inner), 그 안에 노드 둘. 따로 선 틀(side) 하나 */
const frames: GraphBackdropData[] = [
  { id: "outer", label: "바깥", tint: "idea", members: ["inner", "n1"] },
  { id: "inner", label: "안쪽", tint: "idea", members: ["n2", "n3"] },
  {
    id: "side",
    label: "옆",
    tint: "theory",
    members: ["s1", "s2"],
    clusters: [{ id: "grp", members: ["s1", "s2"] }],
  },
];

describe("frameDescendants", () => {
  it("안쪽 틀까지 펼쳐 내려간다", () => {
    expect(frameDescendants("outer", frames).sort()).toEqual(["inner", "n1", "n2", "n3"]);
  });
});

describe("hiddenByOf", () => {
  it("둘 다 접히면 가장 바깥 틀이 가린다", () => {
    const hidden = hiddenByOf(frames, () => true);
    expect(hidden.get("n2")).toBe("outer");
    expect(hidden.get("inner")).toBe("outer");
    expect(hidden.get("s1")).toBe("side");
  });

  it("안쪽만 접히면 안쪽이 가린다", () => {
    const hidden = hiddenByOf(frames, (id) => id === "inner");
    expect(hidden.get("n2")).toBe("inner");
    expect(hidden.has("n1")).toBe(false);
  });
});

describe("rerouteEdges", () => {
  it("가려진 끝을 틀로 옮기고, 같은 두 끝은 하나만, 같은 틀 안은 버린다", () => {
    const hidden = new Map([
      ["n2", "inner"],
      ["n3", "inner"],
    ]);
    const edges = [
      { source: "x", target: "n2", id: "1" },
      { source: "x", target: "n3", id: "2" },
      { source: "n2", target: "n3", id: "3" },
      { source: "x", target: "y", id: "4" },
    ];
    expect(rerouteEdges(edges, hidden)).toEqual([
      { source: "x", target: "inner", id: "1" },
      { source: "x", target: "y", id: "4" },
    ]);
  });
});

describe("frameCountLabel", () => {
  it("안쪽 틀은 세지 않고 진짜 노드만 센다", () => {
    const isNode = (id: string) => id.startsWith("n") || id.startsWith("s");
    expect(frameCountLabel(frames[0], frames, isNode)).toBe("항목 3");
    expect(frameCountLabel(frames[2], frames, isNode)).toBe("개념 2");
  });
});

describe("buildLayoutItems", () => {
  const leafOf = (id: string) => ({ id, width: 100, height: 40, y: 0 });

  it("접힌 틀은 잎 하나, 어떤 틀에도 없는 노드는 그대로 잎", () => {
    const items = buildLayoutItems({
      nodeIds: ["loose", "n1", "n2", "n3", "s1", "s2"],
      frames,
      isFolded: (id) => id === "outer",
      leafOf,
      frameY: (_, minY) => minY,
    });
    expect(items.map((item) => item.id).sort()).toEqual(["loose", "outer", "side"]);
    expect(items.find((item) => item.id === "outer")?.children).toBeUndefined();
  });

  it("다른 틀로 옮긴 노드는 덩어리에 없어도 새 틀 안에 자리를 받는다", () => {
    /* s1을 outer로 끌어 넣은 뒤 — side의 덩어리(grp)는 처음 소속 그대로다 */
    const moved: GraphBackdropData[] = [
      { ...frames[0], members: ["inner", "n1", "s1"] },
      frames[1],
      { ...frames[2], members: ["s2"] },
    ];
    const items = buildLayoutItems({
      nodeIds: ["n1", "n2", "n3", "s1", "s2"],
      frames: moved,
      isFolded: () => false,
      leafOf,
      frameY: (_, minY) => minY,
    });
    const ids = (item: { id: string; children?: { id: string }[] }): string[] => [
      item.id,
      ...(item.children ?? []).flatMap(ids),
    ];
    const outer = items.find((item) => item.id === "outer")!;
    const side = items.find((item) => item.id === "side")!;
    expect(ids(outer)).toContain("s1");
    expect(ids(side)).not.toContain("s1");
    expect(ids(side)).toContain("s2");
  });
});
