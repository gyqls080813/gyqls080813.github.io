import { describe, expect, it } from "vitest";
import { OPEN_KINDS, parseRoute, routeOf } from "@/lib/nodeKinds";

describe("routeOf / parseRoute", () => {
  it("모든 종류가 주소 → 노드 → 주소로 되돌아온다", () => {
    for (const kind of OPEN_KINDS) {
      const nodeId = kind === "intro" ? "me" : kind === "dict" ? "dict" : "some-id";
      expect(parseRoute(routeOf(kind, nodeId))).toEqual({ kind, nodeId });
    }
  });

  it("끝의 /는 붙든 안 붙든 같다 (trailingSlash)", () => {
    expect(parseRoute("/theories/react/")).toEqual({ kind: "theory", nodeId: "react" });
    expect(parseRoute("/about/")).toEqual({ kind: "intro", nodeId: "me" });
  });

  it("목록과 시트가 아닌 주소는 null", () => {
    expect(parseRoute("/posts")).toBeNull();
    expect(parseRoute("/")).toBeNull();
    expect(parseRoute("/posts/a/b")).toBeNull();
  });

  it("주소에 인코딩된 id를 풀어 준다", () => {
    expect(parseRoute("/ideas/%ED%95%9C")?.nodeId).toBe("한");
  });
});
