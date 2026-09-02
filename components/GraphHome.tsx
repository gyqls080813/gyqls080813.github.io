"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "./TopBar";
import type { ReactFlowInstance } from "@xyflow/react";
import IntroSheet from "./IntroSheet";
import KnowledgeGraph, {
  type GraphHandle,
} from "./graph/flow/KnowledgeGraph";
import NodeTree from "./post/NodeTree";
import PostArticle from "./post/PostArticle";
import ProjectArticle from "./project/ProjectArticle";
import TheoryArticle from "./theory/TheoryArticle";
import TilArticle from "./til/TilArticle";
import { SheetNav, useSheetView } from "./content";
import { sheetNavItems } from "@/lib/sheet";
import postStyles from "./content/Sheet.module.css";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges } from "@/lib/graphData";
import { getPost } from "@/lib/posts";
import { getProject } from "@/lib/projects";
import { getTheory } from "@/lib/theories";
import { getTil } from "@/lib/tils";
import { nodeDestination, nodeOpenKind } from "@/lib/nodeTarget";
import styles from "./GraphHome.module.css";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Expanding {
  /** 글 노드는 글 페이지로, 프로젝트 노드는 프로젝트 페이지로, 민엽 노드는 소개 시트로 */
  kind: "post" | "project" | "intro" | "theory" | "til";
  nodeId: string;
  from: Rect;
  to: Rect;
}

/** 그래프 밖에서 들어왔을 때 노드로 옮겨 가는 동작 */
const FOCUS_ZOOM = 1.35;
const FOCUS_MS = 520;

/** 열린 시트와 같은 위치·크기 (content/Sheet.module.css의 .sheet와 반드시 맞출 것).
    90%(상한 1500×940), 좁은 화면(≤720px)에서는 거의 전체 — 값이 어긋나면
    카드→시트 전환이 마지막에 튄다. */
function sheetRect(stage: DOMRect, full: boolean): Rect {
  /* 전체 화면으로 켜 두고 들어가면 목적지도 전체 화면이다 — 끝나는 크기를
     맞춰 두지 않으면 시트가 열린 직후 한 번 더 커지며 튄다 */
  const narrow = stage.width <= 720 || full;
  const width = narrow ? stage.width : Math.min(stage.width * 0.9, 1500);
  const height = narrow ? stage.height : Math.min(stage.height * 0.93, 940);
  return {
    top: stage.top + (stage.height - height) / 2,
    left: stage.left + (stage.width - width) / 2,
    width,
    height,
  };
}

export default function GraphHome() {
  const router = useRouter();
  const [expanding, setExpanding] = useState<Expanding | null>(null);
  const [opened, setOpened] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  /* 시트 보기 설정은 전역이다 — 겹침 화면도 목적지와 같은 모습이라야 이어진다 */
  const sheetView = useSheetView();
  const flowRef = useRef<ReactFlowInstance | null>(null);
  const graphRef = useRef<GraphHandle | null>(null);

  /* 다른 페이지의 포트에서 넘어올 때 열어야 할 노드 (`/?node=me`).
     그래프 인스턴스가 준비된 뒤에야 좌표를 알 수 있어 여기 담아 두고 onReady에서 연다 */
  const pendingNodeRef = useRef<string | null>(null);

  /* 이 이펙트는 주소(?node)를 읽고 지운다. StrictMode에서 두 번 돌면
     두 번째에는 이미 지워진 주소를 보고 엉뚱한 노드를 연다 */
  const bootedRef = useRef(false);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const target = new URLSearchParams(window.location.search).get("node");
    if (!target) return;
    pendingNodeRef.current = target;
    /* 주소는 되돌려 둔다 — 새로고침이나 뒤로가기에서 다시 열리면 성가시다 */
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  /* 그래프는 늘 전부 보여준다 — 무엇을 감출지는 백드랍 접기가 맡는다.
     상단 필터로 갈래를 가리던 방식은 접기와 하는 일이 겹쳐 걷어냈다. */
  const nodes = annotatedGraphNodes;
  const edges = fullGraphEdges;
  const backdrops = fullGraphBackdrops;

  /* 노드를 화면 가운데로 옮기고 확대한다 — 이동이 끝나는 데 걸리는 ms를 돌려준다 */
  const moveToNode = (nodeId: string): number => {
    const instance = flowRef.current;
    const node = instance?.getNode(nodeId);
    if (!instance || !node) return 0;
    instance.setCenter(
      node.position.x + (node.measured?.width ?? 176) / 2,
      node.position.y + (node.measured?.height ?? 56) / 2,
      { zoom: FOCUS_ZOOM, duration: FOCUS_MS },
    );
    return FOCUS_MS;
  };

  /* 노드 카드가 제자리에서 시트 크기로 열린다 */
  const expandNode = (nodeId: string, kind: Expanding["kind"]) => {
    /* 확장이 끝나면 그 노드의 주소로 넘어간다 — 소개도 이제 주소가 있다 */
    const finish = () => {
      const destination = nodeDestination(nodeId);
      if (destination) router.push(destination);
    };

    const nodeElement = document.querySelector(
      `.react-flow__node[data-id="${nodeId}"]`,
    );
    const stage = stageRef.current?.getBoundingClientRect();
    if (!nodeElement || !stage) {
      finish();
      return;
    }

    const from = nodeElement.getBoundingClientRect();
    setExpanding({
      kind,
      nodeId,
      from: {
        top: from.top,
        left: from.left,
        width: from.width,
        height: from.height,
      },
      to: sheetRect(stage, sheetView.full),
    });
    setTimeout(finish, 500);
  };

  /* 노드로 가는 유일한 동작 — 어디서 왔든 같은 순서다: 이동(확대) → 열림.
     포트·트리·노드 내부·노드 직접 클릭, 그리고 다른 페이지에서 넘어온 ?node=
     까지 모두 이 함수 하나를 거쳐 같은 동작이 된다.
     열 것이 없는 노드(이론)는 이동·확대까지만 하고 멈춘다 */
  function openNode(nodeId: string) {
    if (expanding) return;

    const kind = nodeOpenKind(nodeId);
    /* 직접 누른 노드라도 언제나 그 자리로 데려간 뒤에 연다 — 동작을 하나로 */
    const wait = moveToNode(nodeId);

    /* 열 것이 없는 노드(이론)는 이동·확대까지만 */
    if (!kind) return;
    if (wait === 0) {
      expandNode(nodeId, kind);
      return;
    }
    /* 이동이 끝나 카드가 제자리에 선 뒤에 재야 시작 위치가 어긋나지 않는다 */
    window.setTimeout(() => expandNode(nodeId, kind), wait + 40);
  }

  const handleNodeClick = (nodeId: string) => openNode(nodeId);

  /* 오버레이가 시작 상태로 한 번 그려진 뒤에 열어야 전이가 걸린다 */
  useLayoutEffect(() => {
    if (!expanding || opened) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpened(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [expanding, opened]);

  const rect = expanding ? (opened ? expanding.to : expanding.from) : null;

  /* 확장 중 포트 위치 — 시작은 노드 카드의 포트 자리, 끝은 글 페이지 포트 자리
     (PostView.module.css의 .portsLeft/.portsRight와 맞출 것: 점 15px, 세로 간격 30px) */
  const PORT = 15;
  const PORT_GAP = 30;
  const expandingPost =
    expanding?.kind === "post" ? getPost(expanding.nodeId) : null;
  const leftPortPos =
    rect && expandingPost
      ? { top: rect.top + rect.height / 2 - PORT / 2, left: rect.left - 8 }
      : null;
  const rightPortPos = (index: number, count: number) => {
    if (!expanding) return {};
    if (!opened) {
      const { from } = expanding;
      return {
        top: from.top + from.height / 2 - PORT / 2,
        left: from.left + from.width - (PORT - 8),
      };
    }
    const { to } = expanding;
    const totalHeight = count * PORT + (count - 1) * PORT_GAP;
    return {
      top: to.top + to.height / 2 - totalHeight / 2 + index * (PORT + PORT_GAP),
      left: to.left + to.width - (PORT - 8),
    };
  };

  return (
    <div className={`${styles.screen} ${opened ? styles.expandOpen : ""}`}>
      <TopBar />
      <main ref={stageRef} className={styles.graphArea}>
        <KnowledgeGraph
          nodes={nodes}
          edges={edges}
          backdrops={backdrops}
          hoverHighlight
          onNodeClick={handleNodeClick}
          onReady={(instance, graph) => {
            flowRef.current = instance;
            graphRef.current = graph;
            const target = pendingNodeRef.current;
            if (!target) return;
            pendingNodeRef.current = null;
            /* 접힌 갈래 안이면 먼저 편다 — 안 그러면 숨은 노드로 날아간다.
               노드가 한 번 그려진 뒤라야 좌표도 맞다 */
            const settling = graph.reveal(target);
            window.setTimeout(
              () => requestAnimationFrame(() => openNode(target)),
              settling,
            );
          }}
        />

      </main>

      {expanding && rect && (
        <>
          <div className={styles.expandScrim} />
          <div
            className={styles.expandCard}
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }}
          >
            {/* 시트 전체가 한 강체 — 카드 폭에 맞게 축소돼 있다가 카드와 함께 커진다 */}
            <div
              className={styles.expandContent}
              style={{
                width: expanding.to.width,
                height: expanding.to.height,
                transform: opened
                  ? "none"
                  : `scale(${expanding.from.width / expanding.to.width})`,
              }}
            >
              <>
                {sheetView.tree && (
                  <aside className={postStyles.treePanel}>
                    <NodeTree activeNodeId={expanding.nodeId} />
                  </aside>
                )}
                <article className={postStyles.article}>
                  {expanding.kind === "project" ? (
                    <ProjectArticle project={getProject(expanding.nodeId)!} />
                  ) : expanding.kind === "theory" ? (
                    <TheoryArticle theory={getTheory(expanding.nodeId)!} />
                  ) : expanding.kind === "post" ? (
                    <PostArticle post={getPost(expanding.nodeId)!} />
                  ) : expanding.kind === "til" ? (
                    <TilArticle til={getTil(expanding.nodeId)!} />
                  ) : (
                    <IntroSheet
                      onProjectClick={openNode}
                      onTheoryClick={openNode}
                    />
                  )}
                </article>
                {sheetView.nav && (
                  <aside className={postStyles.navPanel}>
                    {/* 겹침 화면의 목차 — 목적지 시트와 같은 목록을 쓴다 */}
                    <SheetNav items={sheetNavItems(expanding.nodeId)} />
                  </aside>
                )}
              </>
            </div>

          </div>

          {/* 포트도 처음부터 달려서 카드와 함께 이동한다 */}
          {leftPortPos && (
            <div className={styles.overlayPort} style={leftPortPos}>
              <span
                className={`${postStyles.portDot} ${postStyles.portDotProject}`}
              />
            </div>
          )}
          {expandingPost?.theories.map((theory, index) => (
            <div
              key={theory.id}
              className={styles.overlayPort}
              style={rightPortPos(index, expandingPost.theories.length)}
            >
              <span
                className={`${postStyles.portDot} ${postStyles.portDotTheory}`}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
