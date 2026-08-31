import { Fragment } from "react";
import Link from "next/link";
import TopBar from "../TopBar";
import { nodePath } from "@/lib/nodePath";
import { nodeHref } from "@/lib/nodeTarget";
import { SheetNav, SheetShell } from "../content";
import { SheetPorts, type Port } from "../content";
import KnowledgeGraph from "../graph/flow/KnowledgeGraph";
import NodeTree from "../post/NodeTree";
import TheoryArticle, { theoryNavItems } from "./TheoryArticle";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges, fullGraphNodes } from "@/lib/graphData";
import type { Theory } from "@/lib/theories";
import styles from "../post/PostView.module.css";

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

/**
 * 뿌리부터 지금까지의 길 — 트러블 글이 "프로젝트 › 글"을 띄우는 것과 같다.
 *
 * 이름 하나만 띄우면 그래프의 어느 가지에서 왔는지가 사라진다. 트리를 닫아
 * 두고 들어온 사람에게는 이 줄이 위치를 아는 유일한 단서다.
 */
function Breadcrumb({ theory }: { theory: Theory }) {
  const path = nodePath(theory.id);

  return (
    <div className={styles.breadcrumb}>
      {path.map((node, index) => {
        const idea = node.kind === "idea";
        const here = index === path.length - 1;
        return (
          <Fragment key={node.id}>
            {index > 0 && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 6 L15 12 L9 18"
                  stroke="var(--border-node-strong)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
            <span
              className={`${idea ? styles.crumbIdea : styles.crumbTheory} ${
                here ? styles.crumbHere : ""
              }`}
            >
              <span className={idea ? styles.crumbDotIdea : styles.crumbDotTheory} />
              {node.label}
            </span>
          </Fragment>
        );
      })}
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
        <SheetPorts side="left" ports={portsOf(theory.id, "in")} />
        <SheetPorts side="right" ports={portsOf(theory.id, "out")} />

        <SheetShell
          tree={<NodeTree activePostId={theory.id} />}
          nav={<SheetNav items={theoryNavItems(theory)} />}
        >
          <TheoryArticle theory={theory} />
        </SheetShell>
      </div>
    </div>
  );
}
