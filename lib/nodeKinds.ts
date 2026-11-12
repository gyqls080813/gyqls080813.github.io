/**
 * 노드가 열리면 무엇이 되는가 — 종류와 그 종류의 주소.
 *
 * 노드 → 주소(nodeDestination)와 주소 → 노드(sheetNodeId)가 이 표 하나에서 나온다.
 * 예전에는 한쪽은 switch로, 다른 쪽은 같은 표를 거꾸로 적은 정규식으로 따로 적었다.
 *
 * 이 파일은 본문 모듈을 부르지 않는다 — 브라우저(트리·그래프·껍데기)에서도 쓴다.
 * 종류마다 본문을 찾는 쪽은 lib/nodeContent에 있다.
 */
export const OPEN_KINDS = ["intro", "project", "post", "theory", "idea", "til", "dict"] as const;
export type NodeOpenKind = (typeof OPEN_KINDS)[number];

/**
 * 종류 → 주소. 폴더 이름이 곧 주소라 app/ 아래 폴더(projects/[id] 등)와 함께 간다.
 * 하나뿐인 시트(소개·사전)는 id 없이 고정 주소이고, 그 주소가 가리키는 노드를 같이 적는다.
 */
const ROUTES: Record<NodeOpenKind, { prefix: string } | { path: string; nodeId: string }> = {
  project: { prefix: "/projects/" },
  post: { prefix: "/posts/" },
  theory: { prefix: "/theories/" },
  idea: { prefix: "/ideas/" },
  til: { prefix: "/tils/" },
  dict: { path: "/dictionary", nodeId: "dict" },
  intro: { path: "/about", nodeId: "me" },
};

/** 이 종류의 이 노드가 머무는 주소 */
export function routeOf(kind: NodeOpenKind, nodeId: string): string {
  const route = ROUTES[kind];
  return "prefix" in route ? `${route.prefix}${nodeId}` : route.path;
}

/**
 * 주소 → 어느 종류의 어느 노드인가. 시트 주소가 아니면 null.
 * 목록(/posts)과 글(/posts/x)은 접두 뒤에 id가 있느냐로 갈린다.
 * 주소는 끝에 /가 붙어 온다(trailingSlash) — 붙든 안 붙든 같은 노드다.
 */
export function parseRoute(pathname: string): { kind: NodeOpenKind; nodeId: string } | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  for (const kind of OPEN_KINDS) {
    const route = ROUTES[kind];
    if ("path" in route) {
      if (path === route.path) return { kind, nodeId: route.nodeId };
      continue;
    }
    if (!path.startsWith(route.prefix)) continue;
    const rest = path.slice(route.prefix.length);
    if (rest && !rest.includes("/")) return { kind, nodeId: decodeURIComponent(rest) };
  }
  return null;
}
