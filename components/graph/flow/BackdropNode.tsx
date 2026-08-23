import type { Node, NodeProps } from "@xyflow/react";
import KindIcon from "../KindIcon";
import styles from "./BackdropNode.module.css";

import type { NodeKind } from "../types";

export type BackdropFlowNode = Node<
  {
    label: string;
    tint: NodeKind;
    countLabel: string;
    /** 타이틀 바 드래그 시 함께 움직일 멤버 노드 id들 */
    memberIds: string[];
  },
  "backdrop"
>;

/** 순수 시각적 묶음 — 간선은 받지 않는다. 계층은 노드끼리의 간선이 표현한다 */
export default function BackdropNode({ data }: NodeProps<BackdropFlowNode>) {
  return (
    <div className={`${styles.backdrop} ${styles[data.tint]}`}>
      {/* 타이틀 바만 잡아서 끈다 — 몸통은 클릭을 통과시킨다 (dragHandle) */}
      <div className={`${styles.title} backdrop-drag-handle`}>
        <KindIcon kind={data.tint} size={13} />
        <span className={styles.label}>{data.label}</span>
        <span className={styles.count}>{data.countLabel}</span>
      </div>
    </div>
  );
}
