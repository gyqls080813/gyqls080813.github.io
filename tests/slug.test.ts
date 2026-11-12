import { describe, expect, it } from "vitest";
import { sectionBlockId, slugify } from "@/lib/slug";

describe("slugify", () => {
  it("한글은 그대로, 기호와 공백은 하이픈 하나로", () => {
    expect(slugify("  문제의 구조: 두 장부 ")).toBe("문제의-구조-두-장부");
    expect(slugify("React · Vue")).toBe("react-vue");
  });

  it("앞뒤 하이픈은 남기지 않는다", () => {
    expect(slugify("— 끝 —")).toBe("끝");
  });
});

describe("sectionBlockId", () => {
  it("절 이름을 앞에 붙여 같은 라벨이 겹치지 않는다", () => {
    expect(sectionBlockId("1단계", "도구")).not.toBe(sectionBlockId("2단계", "도구"));
    expect(sectionBlockId("1단계", "도구")).toBe("1단계--도구");
  });
});
