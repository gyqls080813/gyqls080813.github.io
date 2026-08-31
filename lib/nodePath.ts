import type { GraphNodeData } from "@/components/graph/types";
import { fullGraphNodes, ideaClusters, theoryClusters } from "./graphData";

/**
 * 계층 지도 — 이론과 생각이 같은 문법(허브 → 챕터)을 쓰므로 한 벌로 본다.
 *
 * 트리(왼쪽 탐색기)와 머리말이 같은 계층을 각자 계산하고 있었다. 한쪽만
 * 고치면 둘이 다른 깊이를 말하게 되므로 여기 한 곳에서 만든다.
 */
const clusters = [...theoryClusters, ...ideaClusters];

export const chaptersOf = new Map<string, readonly string[]>(
  clusters.map((cluster) => [cluster.hub, cluster.chapters]),
);

export const parentOf = new Map<string, string>(
  clusters.flatMap((cluster) =>
    cluster.chapters.map((chapter) => [chapter, cluster.hub] as const),
  ),
);

/**
 * 뿌리부터 이 노드까지의 길 (자기 포함).
 *
 * 트러블 글의 머리말이 "프로젝트 › 글"로 어디쯤인지 알려 주듯, 개념·생각도
 * 자기 이름만 띄우면 그래프의 어느 가지에서 왔는지가 사라진다. 트리를 접어
 * 두고 들어온 사람에게는 이 줄이 유일한 단서다.
 *
 * 고리가 있어도 멈춘다 — 데이터가 잘못돼도 화면이 멎지는 않아야 한다.
 */
export function nodePath(id: string): GraphNodeData[] {
  const byId = new Map(fullGraphNodes.map((node) => [node.id, node]));
  const ids: string[] = [];
  const seen = new Set<string>();

  let cursor: string | undefined = id;
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    ids.unshift(cursor);
    cursor = parentOf.get(cursor);
  }

  return ids
    .map((each) => byId.get(each))
    .filter((node): node is GraphNodeData => node !== undefined);
}
