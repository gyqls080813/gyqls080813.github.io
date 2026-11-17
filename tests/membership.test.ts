import { describe, expect, it } from "vitest";
import {
  frameBox,
  membershipKey,
  parseMembershipKey,
  pickDropFrame,
  planClaim,
  type DropFrame,
} from "@/lib/membership";

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

describe("frameBox", () => {
  it("멤버를 감싸고 둘레 여백과 제목 줄을 더한다", () => {
    const box = frameBox(
      [
        { x: 10, y: 20, width: 100, height: 40 },
        { x: 50, y: 100, width: 80, height: 40 },
      ],
      8,
      24,
    );
    expect(box).toEqual({ x: 2, y: -12, width: 136, height: 160 });
  });

  it("최소 크기보다 작아지지 않는다", () => {
    expect(
      frameBox([{ x: 0, y: 0, width: 10, height: 10 }], 0, 0, { width: 200, height: 90 }),
    ).toEqual({ x: 0, y: 0, width: 200, height: 90 });
  });

  it("멤버가 없으면 null", () => {
    expect(frameBox([], 8, 24)).toBeNull();
  });
});

describe("pickDropFrame", () => {
  /* 생각(바깥) › TIL(안쪽), 그리고 옆의 프로젝트 틀 */
  const box = (x: number, y: number, width: number, height: number) => ({ x, y, width, height });
  const layout: DropFrame[] = [
    { id: "idea", members: ["til", "p"], ...box(0, 0, 400, 400) },
    { id: "til", members: ["t1"], ...box(50, 50, 200, 200) },
    { id: "proj", members: ["w"], ...box(500, 0, 200, 200) },
  ];

  it("겹친 틀에서는 안쪽 틀이 임자다", () => {
    expect(pickDropFrame(layout, "w", { x: 100, y: 100 })).toBe("til");
  });

  it("지금 틀 안에서 움직이기만 하면 옮기지 않는다", () => {
    expect(pickDropFrame(layout, "t1", { x: 120, y: 120 })).toBeNull();
  });

  it("자기 틀을 감싸는 바깥 틀로는 저절로 나가지 않는다", () => {
    expect(pickDropFrame(layout, "t1", { x: 350, y: 350 })).toBeNull();
  });

  it("다른 갈래의 틀에 놓으면 그 틀로 간다", () => {
    expect(pickDropFrame(layout, "t1", { x: 600, y: 100 })).toBe("proj");
  });

  it("숨은 틀은 받지 않고, 어느 틀 밖이면 null", () => {
    const hidden = layout.map((frame) => (frame.id === "til" ? { ...frame, hidden: true } : frame));
    expect(pickDropFrame(hidden, "w", { x: 100, y: 100 })).toBe("idea");
    expect(pickDropFrame(layout, "w", { x: 900, y: 900 })).toBeNull();
  });
});

describe("membershipKey", () => {
  it("적은 소속을 그대로 되읽는다 — id에 구분자로 쓰일 법한 글자가 있어도", () => {
    const odd = [
      { id: "a:b|c", members: ["x,y", "p|q:r"] },
      { id: "빈 틀", members: [] },
    ];
    expect(parseMembershipKey(membershipKey(odd))).toEqual(
      new Map([
        ["a:b|c", ["x,y", "p|q:r"]],
        ["빈 틀", []],
      ]),
    );
  });

  it("소속이 다르면 글자도 다르다 — 화면이 이 글자로 다시 계산할지 정한다", () => {
    const before = [{ id: "A", members: ["x", "y"] }];
    expect(membershipKey(before)).toBe(membershipKey([{ id: "A", members: ["x", "y"] }]));
    expect(membershipKey(before)).not.toBe(membershipKey([{ id: "A", members: ["x"] }]));
    /* 이어 붙이기였다면 ["a,b"]와 ["a", "b"]가 같은 글자가 됐다 */
    expect(membershipKey([{ id: "A", members: ["a,b"] }])).not.toBe(
      membershipKey([{ id: "A", members: ["a", "b"] }]),
    );
  });
});
