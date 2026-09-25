import type { GraphNodeData } from "@/components/graph/types";
import { fullGraphNodes } from "./graphData";
import { sheetIndex, type PostOutline } from "./generated/sheetIndex";
import type { NavItem, Port } from "./sheet";

/**
 * 브라우저가 쓰는 시트 요약 — 목차·포트·머리말·카드 집계·글 뼈대.
 *
 * lib/sheet·lib/annotatedGraph가 본문을 보고 계산하던 것을 빌드 때 색인으로
 * 뽑아 두고(scripts/sheet-index.mjs), 여기서는 읽기만 한다. 껍데기는 루트
 * 레이아웃에 있어 모든 페이지에 실리므로, 본문 모듈을 불러오면 모든 페이지가
 * 본문 전체를 JS로 받게 된다. 이 파일은 본문 모듈을 불러오지 않는다.
 */

// ── 지금 어느 노드인가 ───────────────────────────────────

/**
 * 주소 → 열린 노드 id. 시트가 아닌 곳(그래프 홈, 글 목록)이면 null.
 *
 * 목록(/posts)과 글(/posts/x)을 가르는 건 두 번째 칸의 유무다 — 목록은
 * 껍데기를 쓰지 않으므로 여기서 걸러야 한다.
 */
export function sheetNodeId(pathname: string): string | null {
  /* 주소는 끝에 /가 붙어 온다(trailingSlash) — 붙든 안 붙든 같은 노드다 */
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/about") return "me";
  if (path === "/dictionary") return "dict";
  const match = /^\/(?:posts|projects|theories|ideas|tils)\/([^/]+)$/.exec(path);
  if (!match) return null;
  /* 없는 노드면 시트가 아니다 — 404 페이지가 그 주소로 뜰 때 껍데기를 그리면,
     서버가 만든 404 HTML(껍데기 없음)과 어긋나 하이드레이션이 깨진다 */
  const id = decodeURIComponent(match[1]);
  return SHEET_IDS.has(id) ? id : null;
}

/** 시트로 열리는 노드 — 주소에서 읽은 id가 진짜인지 여기서 본다 */
const SHEET_IDS = new Set(Object.keys(sheetIndex.openKind));

// ── 요약 ────────────────────────────────────────────────

const nodeById = new Map(fullGraphNodes.map((node) => [node.id, node]));

/**
 * 글 데이터를 집계해 노드에 붙인 그래프 — 카드 3단(날짜 / 제목 / 집계).
 * 홈과 시트 뒤 그래프가 같은 배열을 써야 노드 크기까지 픽셀이 일치해 확장
 * 전환이 끊기지 않는다(초기 배치 캐시도 같은 배열인지로 알아본다).
 */
export const annotatedGraphNodes: GraphNodeData[] = fullGraphNodes.map((node) => {
  const extra = sheetIndex.annotations[node.id];
  return extra ? { ...node, ...extra } : node;
});

/** 오른쪽 목차 */
export const navOf = (nodeId: string): NavItem[] => sheetIndex.nav[nodeId] ?? [];

/** 시트 양옆의 포트 = 그래프에서 이 노드에 들어오고 나가는 선 */
export const portsOf = (nodeId: string): { left: Port[]; right: Port[] } =>
  sheetIndex.ports[nodeId] ?? { left: [], right: [] };

/** 머리말에 세울 길 — 뿌리부터 지금까지 */
export const crumbsOf = (nodeId: string): GraphNodeData[] =>
  (sheetIndex.crumbs[nodeId] ?? [])
    .map((id) => nodeById.get(id))
    .filter((node): node is GraphNodeData => node !== undefined);

/** 트리·프로젝트 포트가 쓰는 글의 뼈대 (본문 없음) */
export const postOutlines: PostOutline[] = sheetIndex.posts;
