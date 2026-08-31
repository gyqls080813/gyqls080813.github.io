import Link from "next/link";
import TopBar from "../TopBar";
import { nodeHref } from "@/lib/nodeTarget";
import KnowledgeGraph from "../graph/flow/KnowledgeGraph";
import NodeTree from "../post/NodeTree";
import TheoryArticle from "./TheoryArticle";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges, fullGraphNodes } from "@/lib/graphData";
import type { NodeKind } from "../graph/types";
import type { Theory } from "@/lib/theories";
import styles from "../post/PostView.module.css";

type Port = { id: string; role: string; name: string; kind: NodeKind };

const nodeById = new Map(fullGraphNodes.map((node) => [node.id, node]));

/**
 * 시트 양옆의 포트 = 그래프에서 이 노드에 들어오고 나가는 선.
 *
 * 개념 노드는 프로젝트와 달리 위아래로도 이어진다 — 상위 개념에서 내려와
 * 하위 챕터로 갈라지고, 옆으로는 그 개념이 나온 트러블 글로 빠진다.
 * 그래서 목록을 손으로 적지 않고 간선에서 그대로 끌어낸다.
 */
function portsOf(theoryId: string, side: "in" | "out"): Port[] {
  const ids = fullGraphEdges
    .filter((edge) => (side === "in" ? edge.to : edge.from) === theoryId)
    .map((edge) => (side === "in" ? edge.from : edge.to));
  return ids.flatMap((id) => {
    const node = nodeById.get(id);
    if (!node) return [];
    const role =
      node.kind === "me"
        ? "공부한 사람"
        : node.kind === "trouble"
          ? "트러블슈팅"
          : side === "in"
            ? "상위 개념"
            : "하위 개념";
    return [{ id, role, name: node.label, kind: node.kind }];
  });
}

const DOT_CLASS: Partial<Record<NodeKind, string>> = {
  me: styles.portDotProject,
  project: styles.portDotProject,
  theory: styles.portDotTheory,
  trouble: styles.portDotTrouble,
};

function PortColumn({ side, ports }: { side: "left" | "right"; ports: Port[] }) {
  if (ports.length === 0) return null;
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

function Breadcrumb({ theory }: { theory: Theory }) {
  return (
    <div className={styles.breadcrumb}>
      <span className={styles.crumbTheory}>
        <span className={styles.crumbDotTheory} />
        {theory.name}
      </span>
    </div>
  );
}

export default function TheoryView({ theory }: { theory: Theory }) {
  return (
    <div className={styles.screen}>
      <TopBar breadcrumb={<Breadcrumb theory={theory} />} />

      <div className={styles.stage}>
        {/* 뒤에 남는 전체 그래프 — 시트 양옆으로 노드와 선이 비친다 */}
        <div className={styles.backGraph}>
          <KnowledgeGraph
            nodes={annotatedGraphNodes}
            edges={fullGraphEdges}
            backdrops={fullGraphBackdrops}
            focusNodeId={theory.id}
            showControls={false}
          />
        </div>
        <Link href="/" className={styles.scrim} aria-label="그래프로 돌아가기" />

        {/* 왼쪽은 여기로 들어오는 선(상위 개념), 오른쪽은 나가는 선(하위 챕터·트러블 글) */}
        <PortColumn side="left" ports={portsOf(theory.id, "in")} />
        <PortColumn side="right" ports={portsOf(theory.id, "out")} />

        <div className={styles.sheet}>
          <aside className={styles.treePanel}>
            <NodeTree activePostId={theory.id} />
          </aside>

          <article className={styles.article}>
            <TheoryArticle theory={theory} />
          </article>
        </div>
      </div>
    </div>
  );
}
