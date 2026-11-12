import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import KindIcon from "../KindIcon";
import { cx } from "@/lib/util";
import { ChevronIcon } from "../../icons";
import type { NodeKind } from "../types";
import styles from "./BackdropNode.module.css";

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
  },
  "backdrop"
>;

/** 순수 시각적 묶음 — 간선은 받지 않는다. 계층은 노드끼리의 간선이 표현한다 */
export default function BackdropNode({ data }: NodeProps<BackdropFlowNode>) {
  const collapsed = data.collapsed ?? false;

  return (
    <div
      className={cx(styles.backdrop, collapsed && styles.collapsed)}
      /* 틀·포트·제목의 색은 갈래에서 (globals.css의 --kind-rgb) */
      data-kind={data.tint}
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
            isConnectable={false}
          />
          <Handle
            type="source"
            position={Position.Right}
            className={styles.port}
            isConnectable={false}
          />
        </>
      )}

      {/* 타이틀 바만 잡아서 끈다 — 몸통은 클릭을 통과시킨다 (dragHandle) */}
      <div className={cx(styles.title, "backdrop-drag-handle")}>
        {data.onToggle && (
          /* nodrag: 이 버튼 위에서는 틀이 끌리지 않는다 */
          <button
            type="button"
            className={cx(styles.toggle, "nodrag")}
            onClick={(event) => {
              event.stopPropagation();
              data.onToggle?.();
            }}
            aria-expanded={!collapsed}
            aria-label={collapsed ? `${data.label} 펼치기` : `${data.label} 접기`}
            title={collapsed ? "펼치기" : "접기"}
          >
            <ChevronIcon />
          </button>
        )}
        <KindIcon kind={data.tint} size={13} />
        <span className={styles.label}>{data.label}</span>
        <span className={styles.count}>{data.countLabel}</span>
      </div>
    </div>
  );
}
