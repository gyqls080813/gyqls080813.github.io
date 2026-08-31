"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopBar from "../TopBar";
import KnowledgeGraph from "../graph/flow/KnowledgeGraph";
import NodeTree from "../post/NodeTree";
import SheetBreadcrumb from "./SheetBreadcrumb";
import SheetNav from "./SheetNav";
import SheetPorts from "./SheetPorts";
import SheetShell from "./SheetShell";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges } from "@/lib/graphData";
import { sheetNavItems, sheetNodeId, sheetPorts } from "@/lib/sheet";
import styles from "./Sheet.module.css";

/**
 * 시트의 껍데기 — 뒤의 그래프, 상단 바, 양옆 포트, 세 열의 틀.
 *
 * ## 왜 레이아웃에 있나
 *
 * 예전에는 글·프로젝트·개념·소개 네 뷰가 이 껍데기를 각자 그렸다. 그러니
 * 주소가 바뀔 때마다 페이지 서브트리가 갈아 끼워지면서 껍데기까지 다시
 * 마운트됐다 — 190줄짜리 트리의 스크롤이 맨 위로 튀고, 접어 둔 갈래가 전부
 * 펴지고, 노드 200개짜리 그래프가 통째로 다시 그려졌다.
 *
 * 루트 레이아웃에 두면 주소가 바뀌어도 이 컴포넌트는 살아 있다. 갈래를
 * 건너뛰어도(개념 → 글) 마찬가지다 — 라우트 그룹으로 나누지 않고 루트에
 * 둔 이유가 이것이다.
 *
 * ## 그래서 노드 id 하나만 안다
 *
 * 껍데기는 페이지에서 무엇도 받지 않는다. 주소에서 노드 id를 읽고, 나머지는
 * 전부 lib/sheet.ts가 계산한다. 페이지는 본문만 넘긴다.
 *
 * 시트가 아닌 곳(그래프 홈, 글 목록)에서는 아무것도 감싸지 않고 지나 보낸다.
 */
export default function SheetChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const nodeId = sheetNodeId(pathname ?? "");

  if (!nodeId) return <>{children}</>;

  const ports = sheetPorts(nodeId);

  return (
    <div className={styles.screen}>
      <TopBar breadcrumb={<SheetBreadcrumb nodeId={nodeId} />} />

      <div className={styles.stage}>
        {/* 뒤에 남는 전체 그래프 — 시트 양옆으로 노드와 선이 비친다.
            focusNodeId는 카메라가 아니라 강조만 바꾼다. 그래서 이 그래프가
            살아남은 채 노드만 갈아타도 화면이 움직이지 않는다 */}
        <div className={styles.backGraph}>
          <KnowledgeGraph
            nodes={annotatedGraphNodes}
            edges={fullGraphEdges}
            backdrops={fullGraphBackdrops}
            focusNodeId={nodeId}
            showControls={false}
          />
        </div>
        <Link href="/" className={styles.scrim} aria-label="그래프로 돌아가기" />

        {/* 그래프에서 이 노드에 들어오고 나가는 선이 그대로 포트가 된다 */}
        <SheetPorts side="left" ports={ports.left} />
        <SheetPorts side="right" ports={ports.right} />

        <SheetShell
          nodeId={nodeId}
          tree={<NodeTree activeNodeId={nodeId} />}
          nav={<SheetNav items={sheetNavItems(nodeId)} />}
        >
          {children}
        </SheetShell>
      </div>
    </div>
  );
}
