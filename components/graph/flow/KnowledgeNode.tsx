import { useContext } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import KindIcon from "../KindIcon";
import type { GraphNodeData, NodeKind } from "../types";
import { HoverHighlightContext } from "./hoverContext";
import styles from "./KnowledgeNode.module.css";

export type KnowledgeFlowNode = Node<GraphNodeData, "knowledge">;

/** 카드 폭 — 노드 에디터처럼 종류별 고정 폭 (toFlow의 중심 보정과 맞출 것) */
export function cardWidth(data: GraphNodeData): number {
  if (data.kind === "trouble") return 196;
  if (data.kind === "project" || data.kind === "me") return 176;
  return data.hub ? 158 : 174;
}

/** 포트 색 — 노드 종류의 색을 그대로 (asset-pipeline의 포트 문법, 이름 없이) */
const PORT_COLOR: Record<NodeKind, string> = {
  theory: "var(--theory)",
  project: "var(--project)",
  trouble: "var(--trouble)",
  me: "var(--me)",
};

export default function KnowledgeNode({ id, data }: NodeProps<KnowledgeFlowNode>) {
  const { hovered, neighbors } = useContext(HoverHighlightContext);
  const dimmed = hovered !== null && hovered !== id && !neighbors?.has(id);
  const title = data.sublabel ? `${data.label} ${data.sublabel}` : data.label;

  return (
    <div
      className={[
        styles.card,
        data.hub ? styles.hub : "",
        data.clickable ? styles.clickable : "",
      ].join(" ")}
      style={{ width: cardWidth(data), opacity: dimmed ? 0.18 : 1 }}
    >
      {/* 포트: 왼쪽 = 입력, 오른쪽 = 출력. 나·프로젝트는 출력만, 이론은 입력만 */}
      {data.kind !== "project" && data.kind !== "me" && (
        <Handle
          type="target"
          position={Position.Left}
          className={styles.port}
          style={{ borderColor: PORT_COLOR[data.kind] }}
          isConnectable={false}
        />
      )}
      {data.kind !== "theory" && (
        <Handle
          type="source"
          position={Position.Right}
          className={styles.port}
          style={{ borderColor: PORT_COLOR[data.kind] }}
          isConnectable={false}
        />
      )}

      <div className={styles.header}>
        <KindIcon kind={data.kind} />
        <span
          className={`${styles.title} ${data.kind === "trouble" ? styles.titleWrap : ""}`}
        >
          {title}
        </span>
        {data.badge != null && data.badge > 0 && (
          <span className={styles.badge} title={`이 개념을 참조하는 글 ${data.badge}편`}>
            {data.badge}
          </span>
        )}
      </div>

      {data.meta && <div className={styles.summary}>{data.meta}</div>}
    </div>
  );
}
