import Link from "next/link";
import TopBar from "../TopBar";
import KnowledgeGraph from "../graph/flow/KnowledgeGraph";
import NodeTree from "./NodeTree";
import PostArticle, { postNavItems } from "./PostArticle";
import { SheetNav, SheetPorts, SheetShell, type Port } from "../content";
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
        <path d="M9 6 L15 12 L9 18" stroke="var(--border-node-strong)" strokeWidth="2.5" strokeLinecap="round" />
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
        <SheetPorts
          side="left"
          ports={[
            {
              id: post.project,
              role: "프로젝트 · 발생한 곳",
              name: nodeLabel(post.project),
              kind: "project",
            },
          ]}
        />
        <SheetPorts
          side="right"
          ports={post.theories.map(
            (theory): Port => ({
              id: theory.id,
              role: `이론 · ${theory.role}`,
              name: nodeLabel(theory.id),
              kind: "theory",
            }),
          )}
        />

        <SheetShell
          tree={<NodeTree activePostId={post.id} />}
          nav={<SheetNav items={postNavItems(post)} />}
        >
          <PostArticle post={post} />
        </SheetShell>
      </div>
    </div>
  );
}
