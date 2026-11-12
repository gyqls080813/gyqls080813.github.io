import { Fragment } from "react";
import { crumbsOf } from "@/lib/outline";
import { cx } from "@/lib/util";
import { ChevronIcon } from "../icons";
import styles from "./Sheet.module.css";

/**
 * 상단 바의 머리말 — 뿌리부터 지금 열린 노드까지의 길.
 *
 * 갈래마다 따로 만들던 것을 하나로 합쳤다. 종류가 달라도 뜻은 하나다:
 * 그래프의 어느 가지에서 왔는가. 트리를 닫고 들어온 사람에게는 이 줄이
 * 위치를 아는 유일한 단서다.
 */
export default function SheetBreadcrumb({ nodeId }: { nodeId: string }) {
  const crumbs = crumbsOf(nodeId);

  return (
    <div className={styles.breadcrumb}>
      {crumbs.map((node, index) => {
        /* 마지막 칸 = 지금 보고 있는 것 */
        const here = index === crumbs.length - 1;
        return (
          <Fragment key={node.id}>
            {index > 0 && <ChevronIcon size={12} color="var(--border-node-strong)" />}
            {/* 알약 색은 종류에서 — 기록(til)도 생각 갈래라 같은 초록이다 */}
            <span className={cx(styles.crumb, here && styles.crumbHere)} data-kind={node.kind}>
              <span className={styles.crumbDot} />
              <span className={styles.crumbText}>{node.label}</span>
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}
