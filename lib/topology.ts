/**
 * 그래프 구조에 대한 순수 함수. (asset-pipeline graph/topology.ts에서)
 * React Flow에 의존하지 않는다 — 캔버스 없이 시험할 수 있다.
 */

export interface GraphEdge {
  source: string;
  target: string;
}

/** nodeId -> 그 노드에서 나가는 엣지의 도착 노드들 */
function buildAdjacency(edges: readonly GraphEdge[]): Map<string, string[]> {
  const adjacency = new Map<string, string[]>();
  for (const edge of edges) {
    const targets = adjacency.get(edge.source);
    if (targets) targets.push(edge.target);
    else adjacency.set(edge.source, [edge.target]);
  }
  return adjacency;
}

/**
 * 순서를 결정한다 (Kahn's algorithm).
 * 순환이 있으면 순서를 정할 수 없으므로 null을 돌려준다.
 */
export function topologicalSort(
  nodeIds: readonly string[],
  edges: readonly GraphEdge[],
): string[] | null {
  const known = new Set(nodeIds);
  const relevant = edges.filter(
    (edge) => known.has(edge.source) && known.has(edge.target),
  );

  const adjacency = buildAdjacency(relevant);
  const inDegree = new Map<string, number>(nodeIds.map((id) => [id, 0]));
  for (const edge of relevant) {
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
  }

  const queue = nodeIds.filter((id) => inDegree.get(id) === 0);
  const ordered: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) break;
    ordered.push(current);

    for (const next of adjacency.get(current) ?? []) {
      const remaining = (inDegree.get(next) ?? 0) - 1;
      inDegree.set(next, remaining);
      if (remaining === 0) queue.push(next);
    }
  }

  return ordered.length === nodeIds.length ? ordered : null;
}

/** 이 노드를 만드는 데 필요한 노드들(자신 포함) — 상류. */
export function ancestorsOf(
  nodeId: string,
  edges: readonly GraphEdge[],
): Set<string> {
  return reachable(nodeId, edges, "up");
}

/** 이 노드의 결과가 흘러가는 곳(자신 포함) — 하류. */
export function descendantsOf(
  nodeId: string,
  edges: readonly GraphEdge[],
): Set<string> {
  return reachable(nodeId, edges, "down");
}

/**
 * 이 노드와 관계있는 것 전부 — 위로도 아래로도.
 * 「이 결과가 어디서 왔고 어디로 가는가」가 한 갈래다. 옆으로 뻗은 다른
 * 갈래는 이 노드와 상관이 없으므로 여기 들어오지 않는다.
 */
export function lineageOf(
  nodeId: string,
  edges: readonly GraphEdge[],
): Set<string> {
  const found = ancestorsOf(nodeId, edges);
  for (const id of descendantsOf(nodeId, edges)) found.add(id);
  return found;
}

function reachable(
  nodeId: string,
  edges: readonly GraphEdge[],
  direction: "up" | "down",
): Set<string> {
  const next = new Map<string, string[]>();
  for (const edge of edges) {
    const [from, to] =
      direction === "up" ? [edge.target, edge.source] : [edge.source, edge.target];
    const known = next.get(from);
    if (known) known.push(to);
    else next.set(from, [to]);
  }

  const collected = new Set<string>([nodeId]);
  const stack = [nodeId];

  while (stack.length > 0) {
    const current = stack.pop();
    if (current === undefined) break;
    for (const neighbour of next.get(current) ?? []) {
      if (collected.has(neighbour)) continue;
      collected.add(neighbour);
      stack.push(neighbour);
    }
  }

  return collected;
}
