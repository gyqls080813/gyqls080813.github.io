import { describe, expect, it } from "vitest";
import {
  ancestorChain,
  ancestorsOf,
  descendantsOf,
  lineageOf,
  topologicalSort,
} from "@/lib/topology";

const edges = [
  { source: "a", target: "b" },
  { source: "b", target: "c" },
  { source: "a", target: "d" },
];

describe("topologicalSort", () => {
  it("앞선 것이 먼저 온다", () => {
    const order = topologicalSort(["c", "b", "a", "d"], edges);
    expect(order).not.toBeNull();
    const at = (id: string) => order!.indexOf(id);
    expect(at("a")).toBeLessThan(at("b"));
    expect(at("b")).toBeLessThan(at("c"));
    expect(at("a")).toBeLessThan(at("d"));
  });

  it("순환이 있으면 null", () => {
    expect(topologicalSort(["a", "b"], [...edges, { source: "b", target: "a" }])).toBeNull();
  });

  it("목록 밖의 노드를 가리키는 간선은 무시한다", () => {
    expect(topologicalSort(["a", "b"], edges)).toEqual(["a", "b"]);
  });
});

describe("ancestorsOf / descendantsOf / lineageOf", () => {
  it("상류·하류는 자신을 포함한다", () => {
    expect([...ancestorsOf("c", edges)].sort()).toEqual(["a", "b", "c"]);
    expect([...descendantsOf("a", edges)].sort()).toEqual(["a", "b", "c", "d"]);
  });

  it("갈래는 위아래만 — 옆 갈래(d)는 들어오지 않는다", () => {
    expect([...lineageOf("b", edges)].sort()).toEqual(["a", "b", "c"]);
  });

  it("고리가 있어도 멈춘다", () => {
    const loop = [...edges, { source: "c", target: "a" }];
    expect([...descendantsOf("a", loop)].sort()).toEqual(["a", "b", "c", "d"]);
  });
});

describe("ancestorChain", () => {
  it("가까운 부모부터 뿌리까지, 자신은 빼고", () => {
    const parentOf = new Map([
      ["c", "b"],
      ["b", "a"],
    ]);
    expect(ancestorChain("c", parentOf)).toEqual(["b", "a"]);
    expect(ancestorChain("a", parentOf)).toEqual([]);
  });

  it("고리가 있어도 멈춘다", () => {
    const parentOf = new Map([
      ["a", "b"],
      ["b", "a"],
    ]);
    expect(ancestorChain("a", parentOf)).toEqual(["b"]);
  });
});
