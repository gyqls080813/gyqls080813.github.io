import Link from "next/link";
import TopBar from "../TopBar";
import { nodeHref } from "@/lib/nodeTarget";
import KnowledgeGraph from "../graph/flow/KnowledgeGraph";
import NodeTree from "../post/NodeTree";
import TheoryArticle from "./TheoryArticle";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges } from "@/lib/graphData";
import type { Theory } from "@/lib/theories";
import { posts } from "@/lib/posts";
import styles from "../post/PostView.module.css";

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
  const related = posts.filter((post) =>
    post.theories.some((item) => item.id === theory.id),
  );

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

        {/* 오른쪽은 이 개념이 쓰인 글들 — 그래프에서 이 노드를 떠나는 다리와 같은 자리 */}
        <div className={styles.portsRight}>
          {related.map((post) => (
            <Link
              key={post.id}
              href={nodeHref(post.id)}
              className={styles.port}
              aria-label={`이 개념이 나온 글: ${post.title}`}
            >
              <span className={`${styles.portDot} ${styles.portDotTrouble}`} />
              <span className={styles.portPopover}>
                <span className={styles.popRole}>트러블슈팅</span>
                <span className={styles.popName}>{post.title}</span>
              </span>
            </Link>
          ))}
        </div>

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
