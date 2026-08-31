"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import TopBar from "./TopBar";
import KnowledgeGraph from "./graph/flow/KnowledgeGraph";
import NodeTree from "./post/NodeTree";
import IntroSheet, { introNavItems } from "./IntroSheet";
import { SheetNav, SheetPorts, SheetShell, type Port } from "./content";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges } from "@/lib/graphData";
import { nodeHref } from "@/lib/nodeTarget";
import type { NodeKind } from "./graph/types";
import styles from "./post/PostView.module.css";

/**
 * 민엽 노드를 떠나는 선 — 소개 시트의 가장자리 포트.
 * 다른 시트와 같은 규칙이다: 그래프에서 이 노드에 붙은 선이 곧 포트다.
 */
const ROLE_OF: Partial<Record<NodeKind, string>> = {
  project: "프로젝트",
  theory: "이론",
  idea: "생각",
};
const mePorts: Port[] = fullGraphEdges
  .filter((edge) => edge.from === "me")
  .flatMap((edge) => {
    const node = annotatedGraphNodes.find((item) => item.id === edge.to);
    const role = node && ROLE_OF[node.kind];
    return node && role
      ? [{ id: node.id, role, name: node.label, kind: node.kind }]
      : [];
  });

function Breadcrumb() {
  return (
    <div className={styles.breadcrumb}>
      <span className={styles.crumbMe}>
        <span className={styles.crumbDotMe} />
        Who am I
      </span>
    </div>
  );
}

/**
 * 소개 페이지 — 다른 노드와 같은 자리, 같은 틀.
 *
 * 예전에는 루트(/)에서 시트로 떠 있었다. 그러니 "전체 그래프로 돌아가기"가
 * 루트로 보내도 다시 소개가 열려, 그래프만 보는 방법이 없었다.
 * 제 주소를 갖게 되면서 루트는 그래프 하나만 뜻하게 됐다.
 */
export default function IntroView() {
  const router = useRouter();

  /* 소개에서 고른 노드로 — 그래프를 거쳐 간다. 어느 노드로 가는지
     이동·확대가 보여야 소개와 그래프가 이어져 읽힌다 */
  const goToNode = (nodeId: string) => router.push(nodeHref(nodeId));

  return (
    <div className={styles.screen}>
      <TopBar breadcrumb={<Breadcrumb />} />

      <div className={styles.stage}>
        {/* 뒤에 남는 전체 그래프 — 시트 양옆으로 노드와 선이 비친다 */}
        <div className={styles.backGraph}>
          <KnowledgeGraph
            nodes={annotatedGraphNodes}
            edges={fullGraphEdges}
            backdrops={fullGraphBackdrops}
            focusNodeId="me"
            showControls={false}
          />
        </div>
        <Link href="/" className={styles.scrim} aria-label="그래프로 돌아가기" />

        <SheetPorts side="right" ports={mePorts} />

        <SheetShell
          tree={<NodeTree activePostId="me" />}
          nav={<SheetNav items={introNavItems()} />}
        >
          <IntroSheet onProjectClick={goToNode} onTheoryClick={goToNode} />
        </SheetShell>
      </div>
    </div>
  );
}
