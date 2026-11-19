import Link from "next/link";
import { labelOf } from "@/lib/graphData";
import { routeOf, type NodeOpenKind } from "@/lib/nodeKinds";
import { sheetNeighbors } from "@/lib/sheetNeighbors";
import styles from "./SheetPager.module.css";

/**
 * 이전·다음 — 같은 갈래의 앞뒤 장으로 바로 넘어간다.
 *
 * 장이 순서대로 쌓이는 갈래(HTML 1~15장, 태그 참고서, 생각의 단계)는 다 읽은 자리에서 다음 장으로
 * 이어져야 흐름이 끊기지 않는다. 그래프나 트리로 돌아가 다음 노드를 찾게 하면 읽던
 * 맥락을 내려놓게 된다. 포트는 그래프를 거쳐 가지만, 여기는 시트에서 시트로 곧장 간다.
 */
export default function SheetPager({ nodeId, kind }: { nodeId: string; kind: NodeOpenKind }) {
  const { prev, next } = sheetNeighbors(nodeId, kind);
  if (!prev && !next) return null;
  return (
    <nav className={styles.pager} aria-label="이전, 다음 장">
      {prev ? (
        <Link href={routeOf(kind, prev)} className={styles.link} data-side="prev">
          <span className={styles.dir}>← 이전</span>
          <span className={styles.name}>{labelOf(prev)}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={routeOf(kind, next)} className={styles.link} data-side="next">
          <span className={styles.dir}>다음 →</span>
          <span className={styles.name}>{labelOf(next)}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
