import type { NodeKind } from "../graph/types";
import styles from "./PortDot.module.css";

/** 연결 점 크기 — sm: 카드/행 안 · md: 시트 가장자리 포트 */
export type PortSize = "sm" | "md";

/**
 * 노드끼리의 연결을 나타내는 점. 그래프 노드의 포트와 같은 모양.
 * className으로 부모(카드 등)가 hover 상태를 걸 수 있게 열어 둔다.
 */
export default function PortDot({
  kind,
  size = "sm",
  className = "",
}: {
  kind: NodeKind;
  size?: PortSize;
  className?: string;
}) {
  return (
    <span
      className={`${styles.dot} ${styles[size]} ${className}`}
      data-kind={kind}
      aria-hidden
    />
  );
}
