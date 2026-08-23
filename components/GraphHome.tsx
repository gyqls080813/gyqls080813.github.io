"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar, { type GraphFilter } from "./TopBar";
import type { ReactFlowInstance } from "@xyflow/react";
import IntroSheet from "./IntroSheet";
import KnowledgeGraph from "./graph/flow/KnowledgeGraph";
import NodeTree from "./post/NodeTree";
import PostArticle from "./post/PostArticle";
import type { NodeKind } from "./graph/types";
import postStyles from "./post/PostView.module.css";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges } from "@/lib/graphData";
import { getPost } from "@/lib/posts";
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
  postId: string;
  from: Rect;
  to: Rect;
}

/** 글 페이지 시트와 같은 위치·크기 (PostView.module.css의 .sheet와 맞출 것) */
function sheetRect(stage: DOMRect): Rect {
  const width = stage.width * 0.9;
  const height = stage.height * 0.93;
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

  /* 첫 방문(세션 기준)이거나 상단 바 "소개"로 요청됐으면 소개를 연다 */
  useEffect(() => {
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

  /* 소개의 "기술 블로그로 가기" → 시트를 닫고 이론 영역 전체를 화면에 */
  const focusTheory = () => {
    closeIntro();
    const theoryIds = annotatedGraphNodes
      .filter((node) => node.kind === "theory")
      .map((node) => ({ id: node.id }));
    flowRef.current?.fitView({ nodes: theoryIds, padding: 0.18, duration: 650 });
  };

  /* 소개 속 프로젝트 클릭 → 시트를 닫고 그 노드로 줌인 */
  const focusProject = (nodeId: string) => {
    closeIntro();
    const node = flowRef.current?.getNode(nodeId);
    if (node) {
      flowRef.current?.setCenter(
        node.position.x + (node.measured?.width ?? 176) / 2,
        node.position.y + (node.measured?.height ?? 56) / 2,
        { zoom: 1.35, duration: 650 },
      );
    }
  };

  const { nodes, edges, backdrops } = useMemo(() => {
    const kinds = new Set(VISIBLE_KINDS[filter]);
    const nodes = annotatedGraphNodes.filter((node) => kinds.has(node.kind));
    const visibleIds = new Set(nodes.map((node) => node.id));
    const backdrops = fullGraphBackdrops.filter((backdrop) =>
      backdrop.members.some((member) => visibleIds.has(member)),
    );
    const edges = fullGraphEdges.filter(
      (edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to),
    );
    return { nodes, edges, backdrops };
  }, [filter]);

  /* 클릭한 노드 카드가 제자리에서 시트 크기로 열린 뒤 글 페이지로 넘어간다 */
  const handleNodeClick = (nodeId: string) => {
    if (nodeId === "me") {
      setIntroOpen(true);
      return;
    }
    const post = getPost(nodeId);
    if (!post || expanding) return;

    const nodeElement = document.querySelector(
      `.react-flow__node[data-id="${nodeId}"]`,
    );
    const stage = stageRef.current?.getBoundingClientRect();
    if (!nodeElement || !stage) {
      router.push(`/posts/${nodeId}`);
      return;
    }

    const from = nodeElement.getBoundingClientRect();
    setExpanding({
      postId: nodeId,
      from: {
        top: from.top,
        left: from.left,
        width: from.width,
        height: from.height,
      },
      to: sheetRect(stage),
    });
    setTimeout(() => router.push(`/posts/${nodeId}`), 500);
  };

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
  const expandingPost = expanding ? getPost(expanding.postId) : null;
  const leftPortPos = rect
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
          onReady={(instance) => {
            flowRef.current = instance;
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
              <aside className={postStyles.treePanel}>
                <NodeTree activePostId={expanding.postId} />
              </aside>
              <article className={postStyles.article}>
                <PostArticle post={getPost(expanding.postId)!} />
              </article>
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
