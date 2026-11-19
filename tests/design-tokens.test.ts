import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * 모든 디자인 값은 토큰(app/globals.css)으로만 쓴다 — 토큰이 아니면 쓸 수 없다.
 *
 * 숫자를 바로 적으면 처음에는 한 칸 차이라 티가 안 나지만, 쌓이면 12px, 12.5px, 13px이 한
 * 화면에 섞여 위계와 리듬이 흐려진다(이 테스트를 넣기 전 간격만 30가지였다). 색도 같다.
 * rgba(var(--theory-rgb), 0.28)처럼 진하기를 그 자리에서 정하면 같은 '옅은 칠'이 곳마다 달라진다.
 *
 * 그래서 컴포넌트 CSS에서는 아래만 숫자 그대로 쓸 수 있다.
 *   0, 100%, 50%, -50%(가운데 맞춤), 1fr, calc() 안의 곱셈 수(* -1, / 2), flex와 줄 수 같은 개수
 * 색은 transparent, currentColor, inherit 말고는 전부 토큰이다.
 * 토큰을 정의하는 app/globals.css와, 글이 가르치는 예제 코드(lib/theories의 실험)는 대상이 아니다.
 */

const ROOT = join(__dirname, "..");
const GLOBALS = "app/globals.css";

const filesIn = (dirs: string[], ext: RegExp) =>
  dirs
    .flatMap((dir) =>
      (readdirSync(join(ROOT, dir), { recursive: true }) as string[]).map((f) => `${dir}/${f}`),
    )
    .filter((f) => ext.test(f));

const cssFiles = filesIn(["app", "components"], /\.css$/).filter((f) => f !== GLOBALS);
const read = (f: string) => readFileSync(join(ROOT, f), "utf8");
const noComments = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));

type Decl = { file: string; line: number; prop: string; value: string };

/** 선언 하나 = 속성: 값; — 여러 줄에 걸친 값(box-shadow 등)도 한 덩어리로 읽는다 */
function declsOf(file: string, src = read(file)): Decl[] {
  const code = noComments(src);
  const out: Decl[] = [];
  for (const m of code.matchAll(/(^|[{;\s])([a-z-]+)\s*:\s*([^;{}]+);/g)) {
    const before = code.slice(0, m.index);
    if (/@(media|container)[^{]*$/.test(before)) continue;
    out.push({
      file,
      line: before.split("\n").length,
      prop: m[2],
      value: m[3].trim().replace(/\s+/g, " "),
    });
  }
  return out;
}

/** var(...)를 안쪽부터 걷어 낸다 — 남는 것이 그 자리에서 정한 값이다 */
function withoutVars(value: string) {
  let s = value;
  for (let prev = ""; prev !== s;) {
    prev = s;
    s = s.replace(/var\([^()]*\)/g, "");
  }
  return s;
}

const ALLOWED_LITERAL = /^(0|100%|50%|-50%|1fr)$/;
const UNITLESS_DESIGN = /^(opacity|font-weight|z-index|line-height|tab-size)$/;
const COLOR_NAMES =
  /\b(white|black|red|green|blue|gray|grey|yellow|orange|purple|pink|silver|navy|teal|aqua|lime|maroon|olive|fuchsia)\b/;

/** 선언 하나에서 토큰이 아닌 디자인 값을 찾는다 */
function rawValues(d: Decl): string[] {
  if (d.prop.startsWith("--")) return [];
  const v = withoutVars(d.value);
  const found: string[] = [];
  for (const m of v.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) found.push(m);
  for (const m of v.match(/\b(rgba?|hsla?|hwb|oklch|oklab|lab|lch|color-mix|color)\(/g) ?? [])
    found.push(m);
  if (!/^(content|animation-name|grid-area|transition-property|will-change)$/.test(d.prop))
    for (const m of v.match(COLOR_NAMES) ?? []) found.push(m);
  for (const m of v.match(
    /-?\d*\.?\d+(px|rem|em|ex|ch|vw|vh|svh|dvh|lvh|vmin|vmax|cqi|cqw|cqh|ms|s|deg|turn|%|fr)\b/g,
  ) ?? [])
    if (!ALLOWED_LITERAL.test(m)) found.push(m);
  /* 투명도 0과 1은 숨김과 보임이라는 상태다 — 진하기를 정하는 값만 막는다 */
  if (
    UNITLESS_DESIGN.test(d.prop) &&
    /\d/.test(v) &&
    !(d.prop === "opacity" && /^[01]$/.test(v.trim()))
  )
    found.push(v.trim());
  if (d.prop === "font-family")
    found.push(...(v.trim() && v.trim() !== "inherit" ? [v.trim()] : []));
  if (/^(transition|animation)/.test(d.prop))
    for (const m of v.match(/\b(ease(-in|-out|-in-out)?|linear|cubic-bezier|steps)\b/g) ?? [])
      found.push(m);
  return found;
}

const decls = cssFiles.flatMap((f) => declsOf(f));
const where = (d: Decl) => `${d.file}:${d.line} ${d.prop}: ${d.value}`;

const globals = read(GLOBALS);
const defined = new Set([...globals.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)].map((m) => m[1]));

describe("디자인 토큰 — 토큰이 아니면 쓸 수 없다", () => {
  it("CSS 파일을 찾았다", () => {
    expect(decls.length).toBeGreaterThan(1000);
  });

  it("컴포넌트 CSS에 색, 길이, 시간, 투명도, 굵기, 글꼴을 숫자나 이름으로 직접 쓰지 않는다", () => {
    const raw = decls.flatMap((d) => rawValues(d).map((r) => `${where(d)}  ← ${r}`));
    expect(raw).toEqual([]);
  });

  it("화면 폭 기준은 globals.css의 표에 있는 값만 쓴다", () => {
    const MEDIA = [480, 520, 600, 720, 860];
    const CONTAINER = [520, 640, 760, 1000];
    const wrong = cssFiles.flatMap((file) =>
      [...noComments(read(file)).matchAll(/@(media|container)([^{]*)\{/g)].flatMap((m) =>
        [...m[2].matchAll(/(\d+)px/g)]
          .map((n) => Number(n[1]))
          .filter((n) => !(m[1] === "media" ? MEDIA : CONTAINER).includes(n))
          .map((n) => `${file}: @${m[1]} ${n}px`),
      ),
    );
    expect(wrong).toEqual([]);
  });

  it("쓰는 토큰은 모두 globals.css에 정의돼 있다 (칠 토큰과 갈래 색 포함)", () => {
    /* TSX가 넣는 값(--expand-ms, --fig-max)과 shiki가 코드 조각에 심는 색(--shiki-*) */
    const local = new Set(["--expand-ms", "--fig-max", "--shiki-dark", "--shiki-light"]);
    const missing = decls
      .flatMap((d) => [...d.value.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => [d, m[1]] as const))
      .filter(([, name]) => !defined.has(name) && !local.has(name))
      .map(([d, name]) => `${where(d)} → ${name}`);
    expect(missing).toEqual([]);
  });

  it("컴포넌트는 원색(--gray-N, -rgb)을 직접 쓰지 않고 역할 토큰을 쓴다", () => {
    const wrong = decls.filter((d) => /var\(--(gray-\d+|[a-z]+-rgb)\)/.test(d.value)).map(where);
    expect(wrong).toEqual([]);
  });

  it("TSX는 색을 숫자로 쓰지 않고, 인라인 style에 디자인 값을 적지 않는다", () => {
    const tsx = filesIn(["app", "components"], /\.tsx?$/);
    const wrong = tsx.flatMap((file) => {
      const src = read(file);
      const out: string[] = [];
      for (const m of src.matchAll(/["'`]#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d/g))
        out.push(`${file}: ${m[0]}`);
      for (const m of src.matchAll(/style=\{\{([^}]*)\}\}/g))
        for (const k of m[1].matchAll(
          /\b(color|background|opacity|font\w*|lineHeight|letterSpacing|margin\w*|padding\w*|border\w*|boxShadow|zIndex|gap)\s*:\s*([^,}]+)/g,
        ))
          out.push(`${file}: style ${k[1]}: ${k[2].trim()}`);
      return out;
    });
    expect(wrong).toEqual([]);
  });

  it("작은 창 문서(public/labs, 결과 미리보기)도 토큰만 쓴다", () => {
    const pages = filesIn(["public/labs"], /\.html$/).map((f) => [f, read(f)] as const);
    const preview = read("components/content/CodePreview.tsx");
    const head = preview.match(/const HEAD =([\s\S]*?);\n/)?.[1] ?? "";
    const styles = [
      ...pages.flatMap(([f, src]) =>
        [...src.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => [f, m[1]] as const),
      ),
      ["components/content/CodePreview.tsx HEAD", head.replace(/["'+\s]+\n?\s*/g, " ")] as const,
    ];
    const raw = styles.flatMap(([f, css]) =>
      declsOf(f, css)
        .filter((d) => d.prop !== "color-scheme")
        .flatMap((d) => rawValues(d).map((r) => `${f} ${d.prop}: ${d.value} ← ${r}`)),
    );
    expect(raw).toEqual([]);
  });

  it("실험 문서는 쓰는 토큰을 자기 <style>에 모두 갖고 있다 (scripts/tokens-css.mjs가 적는다)", () => {
    /* 실험이 document.styleSheets 수를 재므로 <link>로 토큰 파일을 붙일 수 없다 */
    const missing = filesIn(["public/labs"], /\.html$/).flatMap((f) => {
      const css = read(f).match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
      const has = new Set([...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
      return [...css.matchAll(/var\((--[a-z0-9-]+)/g)]
        .map((m) => m[1])
        .filter((n) => !has.has(n))
        .map((n) => `${f}: ${n}`);
    });
    expect(missing).toEqual([]);
    for (const f of filesIn(["public/labs"], /\.html$/))
      expect(
        read(f),
        `${f}에 <link rel="stylesheet">를 더하면 실험의 시트 수가 바뀐다`,
      ).not.toMatch(/<link[^>]+tokens\.css/);
  });
});
