import { useContext } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import KindIcon from "../KindIcon";
import { cx } from "@/lib/util";
import type { GraphNodeData } from "../types";
import { HoverHighlightContext } from "./hoverContext";
import { cardWidth } from "./sizes";
import styles from "./KnowledgeNode.module.css";

export type KnowledgeFlowNode = Node<GraphNodeData, "knowledge">;

export default function KnowledgeNode({ id, data }: NodeProps<KnowledgeFlowNode>) {
  const { hovered, neighbors } = useContext(HoverHighlightContext);
  const dimmed = hovered !== null && hovered !== id && !neighbors?.has(id);

  return (
    <div
      className={cx(styles.card, data.hub && styles.hub, data.clickable && styles.clickable)}
      /* 포트·아이콘의 색은 여기 단 종류에서 내려온다 (globals.css의 --kind) */
      data-kind={data.kind}
      style={{ width: cardWidth(data), opacity: dimmed ? 0.18 : 1 }}
    >
      {/* 포트: 왼쪽 = 입력, 오른쪽 = 출력. 나는 출력만, 트러블은 입력만 —
          흐름은 나 → (프로젝트 · 기술) → 트러블 */}
      {data.kind !== "me" && (
        <Handle
          type="target"
          position={Position.Left}
          className={styles.port}
          isConnectable={false}
        />
      )}
      {data.kind !== "trouble" && (
        <Handle
          type="source"
          position={Position.Right}
          className={styles.port}
          isConnectable={false}
        />
      )}

      {/* 1단: 날짜 — 글은 작성일, 프로젝트는 진행 기간 */}
      {data.dateLabel && <div className={styles.dateLine}>{data.dateLabel}</div>}

      {/* 2단: 제목 */}
      <div className={styles.header}>
        <KindIcon kind={data.kind} />
        <span className={cx(styles.title, data.kind === "trouble" && styles.titleWrap)}>
          {data.label}
        </span>
      </div>

      {/* 3단: 집계 — 트러블 수, 내부 내용 수 등 */}
      {data.meta && <div className={styles.summary}>{data.meta}</div>}
    </div>
  );
}
