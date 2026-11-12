/**
 * 코드 조각을 빌드 때 미리 칠해 둔다.
 *
 * shiki는 VSCode와 같은 문법(TextMate)·테마를 쓰지만 Node에서만 돈다.
 * 그런데 시트는 클라이언트에서도 그려진다 — 노드가 열리는 중의 겹침 화면.
 * 그래서 런타임에 부르지 않고, 여기서 HTML로 미리 만들어 둔 것을 넣는다.
 * 브라우저로 나가는 것은 색이 입혀진 HTML 문자열뿐이라 shiki는 한 바이트도 안 간다.
 *
 * 어느 문자열이 코드인지는 본문 모듈을 실제로 불러와 값에서 찾는다(sheet-index와 같은
 * 방식). 소스 글자를 직접 훑던 때는 codeLang이 code 바로 뒤에 있어야만 읽혔고,
 * 템플릿 리터럴의 ${}·이스케이프가 실제 값과 달라 열쇠가 어긋났으며, 본문 문장 안의
 * "code:"까지 코드로 잡았다. 값에서 읽으면 그런 차이가 생길 수 없다.
 */
import { register } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { codeToHtml } from "shiki";

register(pathToFileURL(join(import.meta.dirname, "ts-resolve.mjs")).href);

const ROOT = process.cwd();
const load = (path) => import(pathToFileURL(join(ROOT, path)).href);
const OUT_DIR = join(ROOT, "lib", "generated");
const OUT_FILE = join(OUT_DIR, "codeHighlight.ts");

const { codeKey } = await load("lib/codeKey.ts");
/* 코드 조각이 들어 있는 본문 모듈 전부 */
const sources = [
  (await load("lib/theories/index.ts")).theories,
  (await load("lib/ideas/index.ts")).ideas,
  (await load("lib/tils.ts")).tils,
  (await load("lib/dictionary.ts")).dictionary,
  (await load("lib/posts.ts")).posts,
  (await load("lib/projects.ts")).projects,
];

/** lib/theories의 CodeLang과 같은 목록 — 모르는 문법이면 조용히 tsx로 칠하지 않고 멈춘다 */
const LANGS = new Set(["tsx", "bash", "text"]);

/** 값을 훑어 code 칸을 모은다 — 문법은 같은 객체의 codeLang(없으면 tsx) */
function collect(value, found, seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) return found;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) collect(item, found, seen);
    return found;
  }
  if (typeof value.code === "string") {
    const lang = value.codeLang ?? "tsx";
    if (!LANGS.has(lang)) throw new Error(`모르는 codeLang "${lang}": ${value.code.slice(0, 40)}`);
    found.set(codeKey(lang, value.code), { code: value.code, lang });
  }
  for (const item of Object.values(value)) collect(item, found, seen);
  return found;
}

const snippets = collect(sources, new Map());

/**
 * VSCode의 기본 두 테마 그대로. 배경은 쓰지 않고 우리 판 색을 쓴다.
 *
 * 한 테마로 뽑으면 어두운 판의 색이 밝은 판에도 그대로 나와 글자가 바탕에
 * 묻힌다. 두 벌을 함께 뽑으면 shiki가 색을 --shiki-light / --shiki-dark
 * 변수로 심어 주고, 어느 쪽을 쓸지는 CSS가 고른다.
 */
const THEMES = { light: "light-plus", dark: "dark-plus" };

const entries = await Promise.all(
  [...snippets].map(async ([key, { code, lang }]) => [
    key,
    await codeToHtml(code, { lang, themes: THEMES, defaultColor: false, structure: "inline" }),
  ]),
);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  OUT_FILE,
  `/* 자동 생성 — scripts/highlight-code.mjs. 직접 고치지 말 것 (git에 올리지 않는다).
   열쇠는 lib/codeKey의 codeKey(문법, 원문), 값은 색이 입혀진 HTML이다.
   테마: ${THEMES.light} / ${THEMES.dark} (--shiki-light / --shiki-dark) */
export const highlightedCode: Record<string, string> = ${JSON.stringify(
    Object.fromEntries(entries),
    null,
    2,
  )};
`,
  "utf8",
);

console.log(`칠한 조각 ${entries.length}개 → ${relative(ROOT, OUT_FILE)}`);
