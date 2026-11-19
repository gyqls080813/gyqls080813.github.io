/**
 * app/globals.css의 토큰을 블로그 밖 문서로 옮긴다. 원본은 globals.css 하나다.
 *
 * 1) public/tokens.css — 결과 미리보기(CodePreview)의 작은 창이 <link>로 읽는다. git에 올리지 않는다.
 * 2) public/labs/html/*.html — 직접 해 보기의 작은 창 문서들. 이 문서들은 <link>를 더할 수 없다.
 *    실험이 document.styleSheets 수와 load 기록을 재기 때문에(시트가 하나 늘면 답이 바뀐다),
 *    이미 있는 <style> 안의 표시 사이에 그 문서가 쓰는 토큰만 적어 넣는다.
 * dev와 build가 매번 다시 만든다(npm run generate).
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const src = readFileSync(join(ROOT, "app", "globals.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const rootBlocks = [...src.matchAll(/(^|\n)(:root[^{]*)\{([^{}]*)\}/g)].map((m) => [
  m[2].trim(),
  m[3].match(/^\s*--[a-z0-9-]+\s*:[^;]+;/gm) ?? [],
]);

// 1) tokens.css — 토큰(--이름)만. color-scheme 같은 블로그 판의 설정은 넘기지 않는다
const blocks = rootBlocks
  .filter(([, decls]) => decls.length)
  .map(
    ([selector, decls]) =>
      `${selector} {\n${decls.map((d) => `  ${d.trim().replace(/\s+/g, " ")}`).join("\n")}\n}`,
  );
writeFileSync(
  join(ROOT, "public", "tokens.css"),
  `/* 자동 생성 — scripts/tokens-css.mjs가 app/globals.css의 토큰을 옮겨 적는다. 직접 고치지 말 것. */\n${blocks.join("\n\n")}\n`,
);

// 2) 실험 문서 — 판과 상관없는 :root 블록의 토큰 가운데, 그 문서가 쓰는 것과 그것이 기대는 것만
const shared = new Map();
for (const [selector, decls] of rootBlocks)
  if (selector === ":root")
    for (const d of decls) {
      const [, name, value] = d.trim().match(/^(--[a-z0-9-]+)\s*:\s*([\s\S]+);$/);
      shared.set(name, value.replace(/\s+/g, " ").trim());
    }
const START = "/* 토큰: scripts/tokens-css.mjs가 app/globals.css에서 옮겨 적는다 — 고치지 말 것 */";
const END = "/* 토큰 끝 */";
const LAB_DIR = join(ROOT, "public", "labs", "html");
let pages = 0;
for (const file of readdirSync(LAB_DIR).filter((f) => f.endsWith(".html"))) {
  const path = join(LAB_DIR, file);
  const html = readFileSync(path, "utf8");
  const style = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!style || !html.includes(START)) continue;
  const own = style[1].replace(new RegExp(`${escape(START)}[\\s\\S]*?${escape(END)}`), "");
  const need = new Set();
  const visit = (text) => {
    for (const m of text.matchAll(/var\((--[a-z0-9-]+)/g))
      if (!need.has(m[1])) {
        if (!shared.has(m[1])) throw new Error(`${file}: globals.css에 없는 토큰 ${m[1]}`);
        need.add(m[1]);
        visit(shared.get(m[1]));
      }
  };
  visit(own);
  const block = `${START}\n  :root { ${[...need]
    .sort()
    .map((n) => `${n}: ${shared.get(n)};`)
    .join(" ")} }\n  ${END}`;
  const next = html.replace(new RegExp(`${escape(START)}[\\s\\S]*?${escape(END)}`), block);
  if (next !== html) writeFileSync(path, next);
  pages++;
}
console.log(`토큰 블록 ${blocks.length}개 → public/tokens.css, 실험 문서 ${pages}개`);

function escape(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
