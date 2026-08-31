/**
 * 코드 조각을 빌드 때 미리 칠해 둔다.
 *
 * shiki는 VSCode와 같은 문법(TextMate)·테마를 쓰지만 Node에서만 돈다.
 * 그런데 시트는 클라이언트에서도 그려진다 — 노드가 열리는 중의 겹침 화면.
 * 그래서 런타임에 부르지 않고, 여기서 HTML로 미리 만들어 둔 것을 넣는다.
 * 브라우저로 나가는 것은 색이 입혀진 HTML 문자열뿐이라 shiki는 한 바이트도 안 간다.
 *
 * 어느 문자열이 코드인지는 `code:` 뒤의 리터럴을 직접 훑어 찾는다. 한 줄짜리
 * 정규식으로는 안 된다 — 코드 안에 따옴표와 이스케이프가 들어 있어서 어디서
 * 끝나는지를 문자 단위로 따라가야 한다. (타입스크립트 7은 네이티브 포트라
 * JS 쪽에 파서를 내주지 않으므로 컴파일러 API를 쓸 수 없다.)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { codeToHtml } from "shiki";

const ROOT = process.cwd();
const SOURCE_DIR = join(ROOT, "lib");
const OUT_DIR = join(ROOT, "lib", "generated");
const OUT_FILE = join(OUT_DIR, "codeHighlight.ts");

/** lib 아래의 .ts 전부 (생성물 자신은 뺀다) */
function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return name === "generated" ? [] : sourceFiles(path);
    }
    return name.endsWith(".ts") ? [path] : [];
  });
}

const ESCAPES = { n: "\n", t: "\t", r: "\r", b: "\b", f: "\f", v: "\v", "0": "\0" };

/** 소스에 적힌 그대로의 리터럴을 실제 문자열로 */
function unescape(raw) {
  let out = "";
  for (let i = 0; i < raw.length; i += 1) {
    if (raw[i] !== "\\") {
      out += raw[i];
      continue;
    }
    const next = raw[i + 1];
    if (next === "u") {
      out += String.fromCharCode(parseInt(raw.slice(i + 2, i + 6), 16));
      i += 5;
      continue;
    }
    out += ESCAPES[next] ?? next;
    i += 1;
  }
  return out;
}

/** `code:` 뒤에 붙은 문자열·템플릿 리터럴의 값만 모은다 */
function codeLiterals(path) {
  const text = readFileSync(path, "utf8");
  const found = [];
  const marker = /\bcode:\s*/g;
  let match;
  while ((match = marker.exec(text))) {
    const open = match.index + match[0].length;
    const quote = text[open];
    if (quote !== '"' && quote !== "'" && quote !== "`") continue;
    let raw = "";
    let i = open + 1;
    for (; i < text.length && text[i] !== quote; i += 1) {
      /* 이스케이프된 따옴표는 끝이 아니다 — 두 글자를 통째로 넘긴다 */
      if (text[i] === "\\") {
        raw += text[i] + text[i + 1];
        i += 1;
      } else {
        raw += text[i];
      }
    }
    found.push(unescape(raw));
    marker.lastIndex = i + 1;
  }
  return found;
}

const snippets = [...new Set(sourceFiles(SOURCE_DIR).flatMap(codeLiterals))];

/**
 * VSCode의 기본 두 테마 그대로. 배경은 쓰지 않고 우리 판 색을 쓴다.
 *
 * 한 테마로 뽑으면 어두운 판의 색이 밝은 판에도 그대로 나와 글자가 바탕에
 * 묻힌다. 두 벌을 함께 뽑으면 shiki가 색을 --shiki-light / --shiki-dark
 * 변수로 심어 주고, 어느 쪽을 쓸지는 CSS가 고른다.
 */
const THEMES = { light: "light-plus", dark: "dark-plus" };

const entries = await Promise.all(
  snippets.map(async (code) => [
    code,
    await codeToHtml(code, {
      lang: "tsx",
      themes: THEMES,
      defaultColor: false,
      structure: "inline",
    }),
  ]),
);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  OUT_FILE,
  `/* 자동 생성 — scripts/highlight-code.mjs. 직접 고치지 말 것.
   키는 코드 원문, 값은 색이 입혀진 HTML이다.
   테마: ${THEMES.light} / ${THEMES.dark} (--shiki-light / --shiki-dark) */
export const highlightedCode: Record<string, string> = ${JSON.stringify(
    Object.fromEntries(entries),
    null,
    2,
  )};
`,
  "utf8",
);

console.log(
  `칠한 조각 ${entries.length}개 → ${relative(ROOT, OUT_FILE)}`,
);
