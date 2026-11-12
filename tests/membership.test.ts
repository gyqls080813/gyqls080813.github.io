import { describe, expect, it } from "vitest";
import { planClaim } from "@/lib/membership";

const frames = [
  { id: "A", members: ["x", "y"] },
  { id: "B", members: ["z"] },
];

describe("planClaim", () => {
  it("새 틀에 적고 옛 틀에서 지운다 — 한 노드는 한 틀에만", () => {
    expect(planClaim(frames, "B", ["x"])).toEqual([
      { frameId: "A", members: ["y"] },
      { frameId: "B", members: ["z", "x"] },
    ]);
  });

  it("이미 그 틀에 있으면 쓸 것이 없다", () => {
    expect(planClaim(frames, "B", ["z"])).toEqual([]);
  });

  it("빈 목록이면 아무것도 하지 않는다", () => {
    expect(planClaim(frames, "A", [])).toEqual([]);
  });
});
