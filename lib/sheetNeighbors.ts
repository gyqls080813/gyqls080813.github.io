import type { NodeOpenKind } from "./nodeKinds";
import { chaptersOf, parentOf } from "./nodePath";
import { nodeOpenKind } from "./nodeTarget";

/**
 * 같은 허브 아래에서 바로 앞, 바로 뒤의 시트. 같은 종류로 열리는 노드만 센다 —
 * 아직 내용이 없는 노드나 다른 종류로 열리는 노드는 건너뛴다.
 *
 * 열리는지는 본문이 아니라 빌드 때 뽑은 색인(lib/nodeTarget)으로 본다. 그래서 이 함수는
 * 본문 모듈을 부르지 않고, 홈이나 껍데기 같은 브라우저 번들에 들어가도 본문이 따라오지 않는다.
 * 이전·다음 이동(SheetPager)과 지난 장 다시 떠올리기(BeforeReading)가 같은 순서를 쓴다.
 */
export function sheetNeighbors(
  nodeId: string,
  kind: NodeOpenKind,
): { prev?: string; next?: string } {
  const hub = parentOf.get(nodeId);
  const siblings = (hub ? (chaptersOf.get(hub) ?? []) : []).filter(
    (id) => nodeOpenKind(id) === kind,
  );
  const at = siblings.indexOf(nodeId);
  if (at < 0) return {};
  return { prev: siblings[at - 1], next: siblings[at + 1] };
}
