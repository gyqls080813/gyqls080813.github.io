import { describe, expect, it } from "vitest";
import { cx, isDefined, toggled } from "@/lib/util";
import { monthSpan, roleTitle } from "@/lib/catalog";

describe("util", () => {
  it("cx는 거짓 값을 건너뛴다", () => {
    expect(cx("a", false, undefined, null, "b")).toBe("a b");
  });

  it("isDefined는 null·undefined만 거른다", () => {
    expect([0, null, "", undefined, 1].filter(isDefined)).toEqual([0, "", 1]);
  });

  it("toggled는 원본을 건드리지 않는다", () => {
    const set = new Set(["a"]);
    expect([...toggled(set, "a")]).toEqual([]);
    expect([...toggled(set, "b")].sort()).toEqual(["a", "b"]);
    expect([...set]).toEqual(["a"]);
  });
});

describe("catalog", () => {
  it("monthSpan은 기간에서 월만 남긴다", () => {
    expect(monthSpan("2026.01.12 – 2026.02.09, 5주")).toBe("2026.01 – 2026.02");
  });

  it("roleTitle은 ' — ' 앞의 직함", () => {
    expect(roleTitle("프론트엔드 리더 — API 계층과 에러 처리")).toBe("프론트엔드 리더");
    expect(roleTitle("프론트엔드")).toBe("프론트엔드");
  });
});
