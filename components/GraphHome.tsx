"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar, { type GraphFilter } from "./TopBar";
import type { ReactFlowInstance } from "@xyflow/react";
import IntroSheet from "./IntroSheet";
import KnowledgeGraph, {
  type GraphHandle,
} from "./graph/flow/KnowledgeGraph";
import NodeTree from "./post/NodeTree";
import PostArticle from "./post/PostArticle";
import ProjectArticle from "./project/ProjectArticle";
import TheoryArticle from "./theory/TheoryArticle";
import type { NodeKind } from "./graph/types";
import postStyles from "./post/PostView.module.css";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges } from "@/lib/graphData";
import { getPost } from "@/lib/posts";
import { getProject } from "@/lib/projects";
import { getTheory } from "@/lib/theories";
import { nodeDestination, nodeOpenKind } from "@/lib/nodeTarget";
import { frameDescendants } from "./graph/flow/toFlow";
import styles from "./GraphHome.module.css";

const VISIBLE_KINDS: Record<GraphFilter, NodeKind[]> = {
  all: ["me", "theory", "project", "trouble"],
  theory: ["theory"],
  project: ["me", "project", "trouble"],
  trouble: ["trouble"],
};

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Expanding {
  /** 글 노드는 글 페이지로, 프로젝트 노드는 프로젝트 페이지로, 민엽 노드는 소개 시트로 */
  kind: "post" | "project" | "intro" | "theory";
  nodeId: string;
  from: Rect;
  to: Rect;
}

/** 그래프 밖에서 들어왔을 때 노드로 옮겨 가는 동작 */
const FOCUS_ZOOM = 1.35;
const FOCUS_MS = 520;

/** 글 페이지 시트와 같은 위치·크기 (PostView.module.css의 .sheet와 반드시 맞출 것).
    90%(상한 1500×940), 좁은 화면(≤720px)에서는 거의 전체 — 값이 어긋나면
    카드→시트 전환이 마지막에 튄다. */
function sheetRect(stage: DOMRect): Rect {
  const narrow = stage.width <= 720;
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
  const [filter, setFilter] = useState<GraphFilter>("all");
  const [expanding, setExpanding] = useState<Expanding | null>(null);
  const [opened, setOpened] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const flowRef = useRef<ReactFlowInstance | null>(null);
  const graphRef = useRef<GraphHandle | null>(null);

  /* 다른 페이지의 포트에서 넘어올 때 열어야 할 노드 (`/?node=me`).
     그래프 인스턴스가 준비된 뒤에야 좌표를 알 수 있어 여기 담아 두고 onReady에서 연다 */
  const pendingNodeRef = useRef<string | null>(null);

  /* 이 이펙트는 주소(?node)를 읽고 지운다. StrictMode에서 두 번 돌면
     두 번째에는 이미 지워진 주소를 보고 "타깃 없음"으로 오판해 소개를 띄운다 */
  const bootedRef = useRef(false);

  /* 첫 방문(세션 기준)이거나 상단 바 "소개"로 요청됐으면 소개를 연다 */
  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;

    const target = new URLSearchParams(window.location.search).get("node");
    if (target) {
      pendingNodeRef.current = target;
      /* 주소는 되돌려 둔다 — 새로고침이나 뒤로가기에서 다시 열리면 성가시다 */
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    let requested = false;
    let seen = false;
    try {
      requested = sessionStorage.getItem("introRequest") === "1";
      if (requested) sessionStorage.removeItem("introRequest");
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {
      /* 저장소가 막힌 브라우저에서는 매번 소개부터 */
    }
    if (requested || !seen) setIntroOpen(true);
  }, []);

  const closeIntro = () => {
    setIntroOpen(false);
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      /* 무시 */
    }
  };

  /* 소개의 기술 행 → 프로젝트 행과 똑같이 그 노드로 가서 열린다.
     다른 점은 하나뿐이다 — 갈래가 접힌 채로 시작하므로 먼저 펴야 그 노드가
     화면에 있다. 접힘은 그래프가 쥐고 있으니 펴는 일만 그래프에 맡긴다. */
  const focusTheory = (rootId: string) => {
    closeIntro();
    const settling = graphRef.current?.reveal(rootId) ?? 0;
    if (settling === 0) {
      openNode(rootId);
      return;
    }
    window.setTimeout(() => openNode(rootId), settling);
  };

  /* 소개 속 프로젝트 클릭 → 시트를 닫고 그 노드로 이동한 뒤 열린다 */
  const focusProject = (nodeId: string) => {
    closeIntro();
    openNode(nodeId);
  };

  const { nodes, edges, backdrops } = useMemo(() => {
    const kinds = new Set(VISIBLE_KINDS[filter]);
    const nodes = annotatedGraphNodes.filter((node) => kinds.has(node.kind));
    const visibleIds = new Set(nodes.map((node) => node.id));
    /* 틀 안에 틀이 있으면(이론 → React·JS·TS) 멤버가 노드 id가 아니라
       틀 id다 — 안쪽까지 펼쳐 보고 하나라도 보이면 그 틀도 남긴다 */
    const byFrame = new Map(fullGraphBackdrops.map((frame) => [frame.id, frame]));
    const backdrops = fullGraphBackdrops.filter((backdrop) =>
      frameDescendants(backdrop, byFrame).some((member) =>
        visibleIds.has(member),
      ),
    );
    const edges = fullGraphEdges.filter(
      (edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to),
    );
    return { nodes, edges, backdrops };
  }, [filter]);

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
    const finish = () => {
      const destination = nodeDestination(nodeId);
      if (destination) {
        router.push(destination);
        return;
      }
      /* 소개는 확장이 끝난 자리에 시트를 놓는다 — 크기·위치가 같아 이어져 보인다 */
      setIntroOpen(true);
      setExpanding(null);
      setOpened(false);
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
      to: sheetRect(stage),
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
      <TopBar activeFilter={filter} onFilterChange={setFilter} />
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
            /* 노드가 한 번 그려진 뒤라야 좌표가 맞다 */
            requestAnimationFrame(() => openNode(target));
          }}
        />

        {introOpen && !expanding && (
          <IntroSheet
            onClose={closeIntro}
            onProjectClick={focusProject}
            onTheoryClick={focusTheory}
          />
        )}
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
              {expanding.kind === "intro" ? (
                <IntroSheet
                  bare
                  onClose={closeIntro}
                  onProjectClick={focusProject}
                  onTheoryClick={focusTheory}
                />
              ) : (
                <>
                  <aside className={postStyles.treePanel}>
                    <NodeTree activePostId={expanding.nodeId} />
                  </aside>
                  <article className={postStyles.article}>
                    {expanding.kind === "project" ? (
                      <ProjectArticle project={getProject(expanding.nodeId)!} />
                    ) : expanding.kind === "theory" ? (
                      <TheoryArticle theory={getTheory(expanding.nodeId)!} />
                    ) : (
                      <PostArticle post={getPost(expanding.nodeId)!} />
                    )}
                  </article>
                </>
              )}
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
