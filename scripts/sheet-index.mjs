/**
 * 시트 껍데기가 쓰는 요약 색인을 빌드 때 뽑아 둔다.
 *
 * 껍데기(그래프 배경·트리·포트·목차·머리말)는 루트 레이아웃에 있어 모든 페이지에
 * 실린다. 그런데 목차·포트를 알려면 글·이론·생각의 본문 모듈을 불러와야 했고,
 * 그 바람에 모든 페이지가 본문 전체(한글 10만 자)를 JS로 받았다. 껍데기가 실제로
 * 쓰는 것은 제목·절 이름·연결뿐이라, 그것만 여기서 뽑아 lib/generated/sheetIndex.ts에
 * 적는다. 본문 모듈은 서버(페이지)와 겹침 화면(홈)만 쓴다.
 *
 * 계산은 전부 원래 함수(lib/sheet·lib/annotatedGraph·lib/openKind)가 한다 —
 * 여기서 규칙을 다시 적으면 언젠가 어긋난다.
 */
import { register } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

register(pathToFileURL(join(import.meta.dirname, "ts-resolve.mjs")).href);

const ROOT = process.cwd();
const load = (path) => import(pathToFileURL(join(ROOT, path)).href);

const { fullGraphNodes } = await load("lib/graphData.ts");
const { sheetNavItems, sheetPorts, sheetCrumbs } = await load("lib/sheet.ts");
const { nodeOpenKindFromContent } = await load("lib/openKind.ts");
const { annotatedGraphNodes } = await load("lib/annotatedGraph.ts");
const { posts } = await load("lib/posts.ts");

const index = { openKind: {}, nav: {}, ports: {}, crumbs: {}, annotations: {}, posts: [] };

/* 카드에 덧붙는 것만 — 노드 자체(라벨·좌표)는 graphData에 이미 있다 */
const base = new Map(fullGraphNodes.map((node) => [node.id, node]));
for (const node of annotatedGraphNodes) {
  const extra = {};
  for (const key of ["clickable", "meta", "dateLabel"]) {
    if (node[key] !== undefined && node[key] !== base.get(node.id)?.[key]) extra[key] = node[key];
  }
  if (Object.keys(extra).length > 0) index.annotations[node.id] = extra;
}

for (const { id } of fullGraphNodes) {
  const kind = nodeOpenKindFromContent(id);
  if (!kind) continue;
  index.openKind[id] = kind;
  const nav = sheetNavItems(id);
  if (nav.length > 0) index.nav[id] = nav;
  const ports = sheetPorts(id);
  if (ports.left.length > 0 || ports.right.length > 0) index.ports[id] = ports;
  index.crumbs[id] = sheetCrumbs(id).map((node) => node.id);
}

/* 트리·프로젝트 포트가 쓰는 글의 뼈대 — 본문(sections의 블록)은 뺀다 */
index.posts = posts.map((post) => ({
  id: post.id,
  title: post.title,
  date: post.date,
  project: post.project,
  theories: post.theories.map((theory) => theory.id),
}));

const OUT = join(ROOT, "lib", "generated", "sheetIndex.ts");
mkdirSync(join(ROOT, "lib", "generated"), { recursive: true });
writeFileSync(
  OUT,
  `/* 자동 생성 — scripts/sheet-index.mjs. 직접 고치지 말 것.
   시트 껍데기가 브라우저에서 쓰는 요약(목차·포트·머리말·열림 종류·카드 집계·글 뼈대).
   본문 모듈을 브라우저로 보내지 않으려고 빌드 때 뽑아 둔다. */
import type { GraphNodeData } from "@/components/graph/types";
import type { NodeOpenKind } from "../nodeTarget";
import type { NavItem, Port } from "../sheet";

export type PostOutline = {
  id: string;
  title: string;
  date: string;
  project: string;
  theories: string[];
};

/** 카드에 덧붙는 집계 — lib/annotatedGraph가 본문을 보고 붙인 값 */
export type NodeAnnotation = Pick<GraphNodeData, "clickable" | "meta" | "dateLabel">;

export const sheetIndex: {
  openKind: Record<string, NodeOpenKind>;
  nav: Record<string, NavItem[]>;
  ports: Record<string, { left: Port[]; right: Port[] }>;
  crumbs: Record<string, string[]>;
  annotations: Record<string, NodeAnnotation>;
  posts: PostOutline[];
} = ${JSON.stringify(index, null, 2)};
`,
  "utf8",
);

console.log(
  `시트 색인: 노드 ${Object.keys(index.openKind).length}개, 목차 ${Object.keys(index.nav).length}개, 글 ${index.posts.length}개 → ${relative(ROOT, OUT)}`,
);
