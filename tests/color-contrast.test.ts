import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * 색 대비 — 두 판(어두운, 밝은)에서 글자가 바탕 위에 읽히는지 잰다 (WCAG 2.x 상대 휘도).
 *
 * 색을 고칠 때 눈으로만 보면 내 화면, 내 눈에서만 맞는다. 글자 역할마다 올라가는 판을 정해 두고
 * 4.5:1(AA, 보통 글자)을 밑돌면 실패하게 한다. 흐린 글자(--faint)도 트리의 개수처럼 읽어야 하는
 * 글자에 쓰므로 같은 기준이다.
 */

const css = readFileSync(join(__dirname, "..", "app", "globals.css"), "utf8").replace(
  /\/\*[\s\S]*?\*\//g,
  "",
);

/** 선택자 블록의 토큰 — 같은 판의 var(--x)는 그 판 안에서 푼다 */
function tokensOf(selector: RegExp): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of css.matchAll(/(^|\n)([^{}\n][^{}]*)\{([^{}]*)\}/g)) {
    if (!selector.test(m[2].trim())) continue;
    for (const d of m[3].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) map.set(d[1], d[2].trim());
  }
  return map;
}

const shared = tokensOf(/^:root$/);
const themes = {
  dark: new Map([...shared, ...tokensOf(/^:root$/)]),
  light: new Map([...shared, ...tokensOf(/^:root\[data-theme="light"\]$/)]),
};

function resolve(theme: Map<string, string>, name: string): string {
  let value = theme.get(name);
  for (let i = 0; value?.startsWith("var(") && i < 5; i++) value = theme.get(value.slice(4, -1));
  if (!value || !/^#[0-9a-f]{6}$/i.test(value))
    throw new Error(`${name}을(를) 색으로 풀지 못함: ${value}`);
  return value;
}

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const luminance = (c: number[]) => {
  const [r, g, b] = c.map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: number[], b: number[]) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
/** 옅은 칠(갈래 색 alpha)을 바탕에 얹은 색 */
const over = (top: number[], alpha: number, base: number[]) =>
  top.map((v, i) => v * alpha + base[i] * (1 - alpha));

const TEXT = ["--text-strong", "--text", "--text-body", "--text-soft", "--muted", "--faint"];
const SURFACES = [
  "--bg",
  "--bg-elevated",
  "--panel-deep",
  "--panel",
  "--surface-inset",
  "--surface-node",
];
const KINDS = ["theory", "project", "trouble", "me", "idea"];
const AA = 4.5;

describe.each(Object.entries(themes))("%s 판", (_, theme) => {
  const color = (name: string) => rgb(resolve(theme, name));

  it("글자 역할은 모든 판 위에서 4.5:1 이상이다", () => {
    const low = TEXT.flatMap((t) =>
      SURFACES.map((s) => [t, s, ratio(color(t), color(s))] as const).filter(([, , r]) => r < AA),
    ).map(([t, s, r]) => `${t} / ${s} = ${r.toFixed(2)}`);
    expect(low).toEqual([]);
  });

  it("갈래 글자는 바탕, 시트, 칸, 그리고 갈래 상자(옅은 칠) 위에서 4.5:1 이상이다", () => {
    const low = KINDS.flatMap((k) => {
      const text = color(`--${k}-text`);
      const box = over(color(`--${k}`), 0.07, color("--bg-elevated"));
      return [
        ...["--bg", "--bg-elevated", "--panel-deep"].map(
          (s) => [k, s, ratio(text, color(s))] as const,
        ),
        [k, "갈래 상자", ratio(text, box)] as const,
      ].filter(([, , r]) => r < AA);
    }).map(([k, s, r]) => `${k}-text / ${s} = ${r.toFixed(2)}`);
    expect(low).toEqual([]);
  });
});

describe("작은 창(흰 종이)", () => {
  it("글자, 흐린 글자, 성공 글자가 4.5:1 이상이다", () => {
    const bg = rgb(resolve(shared, "--preview-bg"));
    const low = ["--preview-text", "--preview-muted", "--preview-ok"]
      .map((t) => [t, ratio(rgb(resolve(shared, t)), bg)] as const)
      .filter(([, r]) => r < AA)
      .map(([t, r]) => `${t} = ${r.toFixed(2)}`);
    expect(low).toEqual([]);
  });
});
