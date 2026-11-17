import type { GraphNodeData } from "@/components/graph/types";
import { postSummaries, type PostSummary } from "./catalog";
import { fullGraphNodes, nodeById } from "./graphData";
import { sheetIndex } from "./generated/sheetIndex";
import { parseRoute } from "./nodeKinds";
import { nodePath } from "./nodePath";
import type { NodeOutline } from "./sheet";
import { isDefined, own } from "./util";

/**
 * 브라우저가 쓰는 시트 요약 — 열림 종류, 카드 집계, 머리말의 길, 글 뼈대.
 *
 * 껍데기는 루트 레이아웃에 있어 모든 페이지에 실린다. 그래서 여기서 부르는 것도
 * 모든 페이지가 받는다. 본문 모듈은 부르지 않고, 빌드 때 뽑은 색인(scripts/sheet-index.mjs)은
 * 모든 노드에 대해 알아야 하는 것(열림 종류, 카드 집계)만 갖는다.
 *
 * 노드 하나에만 쓰이는 목차, 포트, 머리는 여기 모으지 않는다 — 노드가 수백 개라
 * 다 모으면 모든 페이지가 수백 KB를 받는다. 시트 페이지는 레이아웃의 @outline
 * 슬롯으로, 홈의 겹침 화면은 loadOutline으로 그 노드 것만 받는다.
 */

// ── 지금 어느 노드인가 ───────────────────────────────────

/**
 * 주소 → 열린 노드 id. 시트가 아닌 곳(그래프 홈, 글 목록)이면 null.
 * 주소를 읽는 규칙은 노드 → 주소와 같은 표(lib/nodeKinds)에서 나온다.
 */
export function sheetNodeId(pathname: string): string | null {
  const route = parseRoute(pathname);
  /* 없는 노드면 시트가 아니다 — 404 페이지가 그 주소로 뜰 때 껍데기를 그리면,
     서버가 만든 404 HTML(껍데기 없음)과 어긋나 하이드레이션이 깨진다 */
  return route && own(sheetIndex.openKind, route.nodeId) === route.kind ? route.nodeId : null;
}

// ── 요약 ────────────────────────────────────────────────

/**
 * 글 데이터를 집계해 노드에 붙인 그래프 — 카드 3단(날짜 / 제목 / 집계).
 * 홈과 시트 뒤 그래프가 같은 배열을 써야 노드 크기까지 픽셀이 일치해 확장
 * 전환이 끊기지 않는다(초기 배치 캐시도 같은 배열인지로 알아본다).
 */
export const annotatedGraphNodes: GraphNodeData[] = fullGraphNodes.map((node) => {
  const extra = own(sheetIndex.annotations, node.id);
  return extra ? { ...node, ...extra } : node;
});

/**
 * 머리말에 세울 길 — 뿌리부터 지금까지.
 *
 * 개념·생각은 계층이 간선에 있으므로 nodePath가 그대로 답이다. 트러블 글만
 * 예외인데, 프로젝트의 자식이지만 개념 계층(허브 → 챕터)에 속하지 않아서
 * 부모(요약 목록의 project)를 따로 얹어 준다.
 */
export function crumbsOf(nodeId: string): GraphNodeData[] {
  const post = postSummaries.find((item) => item.id === nodeId);
  if (post) return [post.project, nodeId].map((id) => nodeById.get(id)).filter(isDefined);
  return nodePath(nodeId);
}

/** 트리가 쓰는 글의 뼈대 — 본문 없는 요약 목록 그대로다 */
export const postOutlines: PostSummary[] = postSummaries;

// ── 노드 하나의 목차, 포트, 머리 ─────────────────────────

/**
 * 빌드 때 노드마다 뽑아 둔 요약 파일의 주소 (scripts/sheet-index.mjs가 public/outline에 쓴다).
 * id를 그대로 쓴다 — 노드 id는 소문자, 숫자, 하이픈뿐이라 주소에 그대로 들어간다(tests/graph-integrity).
 */
export const outlineUrl = (nodeId: string) => `/outline/${nodeId}.json`;

const loading = new Map<string, Promise<NodeOutline | null>>();

/**
 * 노드 하나의 목차, 포트, 머리 — 홈에서 노드를 누른 순간 받기 시작한다. 카메라가 그
 * 노드로 옮겨 가는 동안(0.5초) 도착하는 크기다. 한 번 받은 것은 다시 받지 않고,
 * 못 받았으면 null이다(다음에 누를 때 다시 받는다). 겹침 화면은 그동안 머리 없이 열린다.
 */
export function loadOutline(nodeId: string): Promise<NodeOutline | null> {
  const cached = loading.get(nodeId);
  if (cached) return cached;
  const promise = fetch(outlineUrl(nodeId))
    .then((response) => (response.ok ? (response.json() as Promise<NodeOutline>) : null))
    .catch(() => null)
    .then((outline) => {
      if (!outline) loading.delete(nodeId);
      return outline;
    });
  loading.set(nodeId, promise);
  return promise;
}
