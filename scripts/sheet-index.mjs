/**
 * 시트 껍데기가 브라우저에서 쓰는 요약을 빌드 때 뽑아 둔다. 두 가지로 나눠 쓴다.
 *
 * 1. lib/generated/sheetIndex.ts — 모든 노드에 대해 알아야 하는 것(열림 종류, 카드 집계).
 *    껍데기는 루트 레이아웃에 있어 모든 페이지가 이 파일을 받는다. 그래서 작게 둔다.
 * 2. public/outline/<노드 id>.json — 노드 하나에만 쓰이는 것(목차, 포트, 겹침 화면의 머리).
 *    홈에서 노드를 누르면 그 노드 것만 받는다. 시트 페이지는 이 파일을 쓰지 않고,
 *    레이아웃의 @outline 슬롯이 서버에서 같은 계산(lib/sheet의 nodeOutline)을 돌린다.
 *
 * 목차, 포트를 알려면 글, 이론, 생각의 본문 모듈을 불러와야 한다. 껍데기가 그걸 직접
 * 부르면 모든 페이지가 본문 전체를 JS로 받는다. 그래서 여기서 뽑는다.
 *
 * 계산은 전부 원래 함수(lib/sheet·lib/annotatedGraph·lib/openKind)가 한다 —
 * 여기서 규칙을 다시 적으면 언젠가 어긋난다.
 *
 * 여기서 불러오는 모듈은 생성물(lib/generated)을 불러오면 안 된다 — 생성물은 git에
 * 없어서, 처음 받은 저장소에서는 이 스크립트가 만들기 전까지 그 파일이 없다.
 */
import { register } from "node:module";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

register(pathToFileURL(join(import.meta.dirname, "ts-resolve.mjs")).href);

const ROOT = process.cwd();
const load = (path) => import(pathToFileURL(join(ROOT, path)).href);

const { fullGraphNodes } = await load("lib/graphData.ts");
const { nodeOutline } = await load("lib/sheet.ts");
const { nodeOpenKindFromContent } = await load("lib/openKind.ts");
const { annotatedGraphNodes } = await load("lib/annotatedGraph.ts");

const index = { openKind: {}, annotations: {} };

/* 카드에 덧붙는 것만 — 노드 자체(라벨·좌표)는 graphData에 이미 있다 */
const base = new Map(fullGraphNodes.map((node) => [node.id, node]));
for (const node of annotatedGraphNodes) {
  const extra = {};
  for (const key of ["clickable", "meta", "dateLabel"]) {
    if (node[key] !== undefined && node[key] !== base.get(node.id)?.[key]) extra[key] = node[key];
  }
  if (Object.keys(extra).length > 0) index.annotations[node.id] = extra;
}

/* 지난 빌드에서 지운 노드의 파일이 남지 않게 통째로 새로 쓴다 */
const OUTLINE_DIR = join(ROOT, "public", "outline");
rmSync(OUTLINE_DIR, { recursive: true, force: true });
mkdirSync(OUTLINE_DIR, { recursive: true });

for (const { id } of fullGraphNodes) {
  const kind = nodeOpenKindFromContent(id);
  if (!kind) continue;
  index.openKind[id] = kind;
  /* 파일 이름은 id 그대로다 — lib/outline의 outlineUrl과 같은 규칙. 인코딩한 이름으로 쓰면
     서버가 요청 주소의 %XX를 풀어 찾으므로 어긋난다. id는 소문자, 숫자, 하이픈뿐이다
     (tests/graph-integrity가 지킨다) */
  writeFileSync(join(OUTLINE_DIR, `${id}.json`), JSON.stringify(nodeOutline(id)), "utf8");
}

const OUT = join(ROOT, "lib", "generated", "sheetIndex.ts");
mkdirSync(join(ROOT, "lib", "generated"), { recursive: true });
writeFileSync(
  OUT,
  `/* 자동 생성 — scripts/sheet-index.mjs. 직접 고치지 말 것 (git에 올리지 않는다).
   모든 노드에 대해 껍데기가 알아야 하는 것(열림 종류, 카드 집계). 모든 페이지가 받으므로
   노드 하나에만 쓰이는 것(목차, 포트, 머리)은 여기 넣지 않는다 — public/outline에 노드마다 있다. */
import type { GraphNodeData } from "@/components/graph/types";
import type { NodeOpenKind } from "../nodeKinds";

/** 카드에 덧붙는 집계 — lib/annotatedGraph가 본문을 보고 붙인 값 */
export type NodeAnnotation = Pick<GraphNodeData, "clickable" | "meta" | "dateLabel">;

export const sheetIndex: {
  openKind: Record<string, NodeOpenKind>;
  annotations: Record<string, NodeAnnotation>;
} = ${JSON.stringify(index, null, 2)};
`,
  "utf8",
);

console.log(
  `시트 색인: 노드 ${Object.keys(index.openKind).length}개 → ${relative(ROOT, OUT)}, ${relative(ROOT, OUTLINE_DIR)}`,
);
