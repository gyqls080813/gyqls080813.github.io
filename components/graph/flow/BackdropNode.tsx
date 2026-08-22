import type { Node, NodeProps } from "@xyflow/react";
import KindIcon from "../KindIcon";
import styles from "./BackdropNode.module.css";

import type { NodeKind } from "../types";

export type BackdropFlowNode = Node<
  { label: string; tint: NodeKind; countLabel: string },
  "backdrop"
>;

export default function BackdropNode({ data }: NodeProps<BackdropFlowNode>) {
  return (
    <div className={`${styles.backdrop} ${styles[data.tint]}`}>
      <div className={styles.title}>
        <KindIcon kind={data.tint} size={13} />
        <span className={styles.label}>{data.label}</span>
        <span className={styles.count}>{data.countLabel}</span>
      </div>
    </div>
  );
}
