import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import KindIcon from "../KindIcon";
import styles from "./BackdropNode.module.css";

import type { NodeKind } from "../types";

/** 포트 색 — 노드 카드와 같은 체계 */
const PORT_COLOR: Record<NodeKind, string> = {
  me: "var(--me)",
  project: "var(--project)",
  theory: "var(--theory)",
  trouble: "var(--trouble)",
  idea: "var(--idea)",
};

export type BackdropFlowNode = Node<
  {
    label: string;
    tint: NodeKind;
    countLabel: string;
    /** 타이틀 바 드래그 시 함께 움직일 멤버 노드 id들 */
    memberIds: string[];
    /** 접혀 있는가 — 안쪽이 숨고 틀이 카드 한 장 크기로 줄어든다 */
    collapsed?: boolean;
    onToggle?: () => void;
    /** 접혔을 때 안쪽이 바깥과 어디서 이어지는지 — 포트가 없는 대신 글로 적는다 */
    links?: { inner: string[]; outer: string }[];
  },
  "backdrop"
>;

/** 순수 시각적 묶음 — 간선은 받지 않는다. 계층은 노드끼리의 간선이 표현한다 */
export default function BackdropNode({ data }: NodeProps<BackdropFlowNode>) {
  const collapsed = data.collapsed ?? false;

  return (
    <div
      className={`${styles.backdrop} ${styles[data.tint]} ${
        collapsed ? styles.collapsed : ""
      }`}
    >
      {/* 접히면 안쪽 노드가 숨으므로 그 노드에 붙어 있던 선이 갈 곳을 잃는다.
          틀이 그 자리를 대신 받는다 — 안쪽 어디였는지는 접은 동안 묻고,
          「이 묶음이 바깥과 이어져 있다」만 남긴다. 펴면 원래 노드로 돌아간다. */}
      {collapsed && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            className={styles.port}
            style={{ borderColor: PORT_COLOR[data.tint] }}
            isConnectable={false}
          />
          <Handle
            type="source"
            position={Position.Right}
            className={styles.port}
            style={{ borderColor: PORT_COLOR[data.tint] }}
            isConnectable={false}
          />
        </>
      )}

      {/* 타이틀 바만 잡아서 끈다 — 몸통은 클릭을 통과시킨다 (dragHandle) */}
      <div className={`${styles.title} backdrop-drag-handle`}>
        {data.onToggle && (
          /* nodrag: 이 버튼 위에서는 틀이 끌리지 않는다 */
          <button
            type="button"
            className={`${styles.toggle} nodrag`}
            onClick={(event) => {
              event.stopPropagation();
              data.onToggle?.();
            }}
            aria-expanded={!collapsed}
            aria-label={collapsed ? `${data.label} 펼치기` : `${data.label} 접기`}
            title={collapsed ? "펼치기" : "접기"}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M8 5 L16 12 L8 19"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <KindIcon kind={data.tint} size={13} />
        <span className={styles.label}>{data.label}</span>
        <span className={styles.count}>{data.countLabel}</span>
      </div>

    </div>
  );
}
