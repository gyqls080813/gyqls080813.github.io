import Link from "next/link";
import TopBar from "../TopBar";
import { nodeHref } from "@/lib/nodeTarget";
import KnowledgeGraph from "../graph/flow/KnowledgeGraph";
import NodeTree from "./NodeTree";
import PostArticle from "./PostArticle";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import {
  fullGraphBackdrops,
  fullGraphEdges,
  fullGraphNodes,
} from "@/lib/graphData";
import type { Post } from "@/lib/posts";
import styles from "./PostView.module.css";

function nodeLabel(id: string): string {
  return fullGraphNodes.find((node) => node.id === id)?.label ?? id;
}

function Breadcrumb({ post }: { post: Post }) {
  return (
    <div className={styles.breadcrumb}>
      <span className={styles.crumbProject}>
        <span className={styles.crumbDotProject} />
        {nodeLabel(post.project)}
      </span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 6 L15 12 L9 18" stroke="#3a4456" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className={styles.crumbTrouble}>
        <span className={styles.crumbDotTrouble} />
        {post.title}
      </span>
    </div>
  );
}

export default function PostView({ post }: { post: Post }) {
  return (
    <div className={styles.screen}>
      <TopBar breadcrumb={<Breadcrumb post={post} />} />

      <div className={styles.stage}>
        {/* 뒤에 남는 전체 그래프 — 시트 양옆으로 노드와 선이 비친다 */}
        <div className={styles.backGraph}>
          <KnowledgeGraph
            nodes={annotatedGraphNodes}
            edges={fullGraphEdges}
            backdrops={fullGraphBackdrops}
            focusNodeId={post.id}
            showControls={false}
          />
        </div>
        <Link href="/" className={styles.scrim} aria-label="그래프로 돌아가기" />

        {/* 이 글이 잇는 노드 — 확대된 노드(시트)의 가장자리 포트로.
            호버하면 무엇과 이어져 있는지 작은 카드가 펼쳐진다 */}
        <div className={styles.portsLeft}>
          <Link
            href={nodeHref(post.project)}
            className={styles.port}
            aria-label={`발생한 프로젝트: ${nodeLabel(post.project)}`}
          >
            <span className={`${styles.portDot} ${styles.portDotProject}`} />
            <span className={styles.portPopover}>
              <span className={styles.popRole}>프로젝트 · 발생한 곳</span>
              <span className={styles.popName}>{nodeLabel(post.project)}</span>
            </span>
          </Link>
        </div>
        <div className={styles.portsRight}>
          {post.theories.map((theory) => (
            <Link
              key={theory.id}
              href={nodeHref(theory.id)}
              className={styles.port}
              aria-label={`연결된 이론: ${nodeLabel(theory.id)}`}
            >
              <span className={`${styles.portDot} ${styles.portDotTheory}`} />
              <span className={styles.portPopover}>
                <span className={styles.popRole}>이론 · {theory.role}</span>
                <span className={styles.popName}>{nodeLabel(theory.id)}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.sheet}>
          <aside className={styles.treePanel}>
            <NodeTree activePostId={post.id} />
          </aside>

          <article className={styles.article}>
            <PostArticle post={post} />
          </article>
        </div>
      </div>
    </div>
  );
}
