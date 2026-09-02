import { Fragment } from "react";
import { sheetCrumbs } from "@/lib/sheet";
import type { NodeKind } from "../graph/types";
import styles from "./Sheet.module.css";

/**
 * 종류마다 알약과 점의 색 — Partial이 아니라 전부 채운 Record다.
 * 빠뜨리면 색 없는 알약이 조용히 나온다. (SheetPorts의 DOT_CLASS와 같은 이유)
 */
const CRUMB: Record<NodeKind, { pill: string; dot: string }> = {
  me: { pill: styles.crumbMe, dot: styles.crumbDotMe },
  project: { pill: styles.crumbProject, dot: styles.crumbDotProject },
  trouble: { pill: styles.crumbTrouble, dot: styles.crumbDotTrouble },
  theory: { pill: styles.crumbTheory, dot: styles.crumbDotTheory },
  idea: { pill: styles.crumbIdea, dot: styles.crumbDotIdea },
  /* 기록도 생각 갈래라 알약이 같다 — 머리말은 색으로 갈래를 말한다 */
  til: { pill: styles.crumbIdea, dot: styles.crumbDotIdea },
};

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6 L15 12 L9 18"
        stroke="var(--border-node-strong)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 상단 바의 머리말 — 뿌리부터 지금 열린 노드까지의 길.
 *
 * 갈래마다 따로 만들던 것을 하나로 합쳤다. 종류가 달라도 뜻은 하나다:
 * 그래프의 어느 가지에서 왔는가. 트리를 닫고 들어온 사람에게는 이 줄이
 * 위치를 아는 유일한 단서다.
 */
export default function SheetBreadcrumb({ nodeId }: { nodeId: string }) {
  const crumbs = sheetCrumbs(nodeId);

  return (
    <div className={styles.breadcrumb}>
      {crumbs.map((node, index) => {
        const { pill, dot } = CRUMB[node.kind];
        /* 마지막 칸 = 지금 보고 있는 것 */
        const here = index === crumbs.length - 1;
        return (
          <Fragment key={node.id}>
            {index > 0 && <Chevron />}
            <span className={`${pill} ${here ? styles.crumbHere : ""}`}>
              <span className={dot} />
              {node.label}
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}
