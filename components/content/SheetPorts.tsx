"use client";

import Link from "next/link";
import { nodeHref } from "@/lib/nodeTarget";
import { useSheetView } from "./SheetView";
import type { NodeKind } from "../graph/types";
import styles from "../post/PostView.module.css";

export type Port = { id: string; role: string; name: string; kind: NodeKind };

const DOT_CLASS: Partial<Record<NodeKind, string>> = {
  me: styles.portDotProject,
  project: styles.portDotProject,
  theory: styles.portDotTheory,
  trouble: styles.portDotTrouble,
};

/**
 * 시트 가장자리의 연결 포트 — 글·프로젝트·개념 시트가 모두 이걸 쓴다.
 *
 * 전체 화면에서는 그리지 않는다. 포트는 "시트 바깥에 그래프가 있다"는 표시인데,
 * 시트가 무대를 다 덮으면 가리킬 바깥이 없다 — 남겨 두면 허공에 뜬 점이 된다.
 */
export default function SheetPorts({
  side,
  ports,
}: {
  side: "left" | "right";
  ports: Port[];
}) {
  const { full } = useSheetView();
  if (full || ports.length === 0) return null;

  return (
    <div
      className={`${side === "left" ? styles.portsLeft : styles.portsRight} ${
        /* 하위 챕터가 많은 개념은 촘촘하게 — 안 그러면 화면 밖으로 흐른다 */
        ports.length > 8 ? styles.portsDense : ""
      }`}
    >
      {ports.map((port) => (
        <Link
          key={port.id}
          href={nodeHref(port.id)}
          className={styles.port}
          aria-label={`${port.role}: ${port.name}`}
        >
          <span className={`${styles.portDot} ${DOT_CLASS[port.kind] ?? ""}`} />
          <span className={styles.portPopover}>
            <span className={styles.popRole}>{port.role}</span>
            <span className={styles.popName}>{port.name}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
