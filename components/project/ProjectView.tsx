import Link from "next/link";
import TopBar from "../TopBar";
import { nodeHref } from "@/lib/nodeTarget";
import KnowledgeGraph from "../graph/flow/KnowledgeGraph";
import NodeTree from "../post/NodeTree";
import ProjectArticle from "./ProjectArticle";
import { annotatedGraphNodes } from "@/lib/annotatedGraph";
import { fullGraphBackdrops, fullGraphEdges } from "@/lib/graphData";
import type { Project } from "@/lib/projects";
import { posts } from "@/lib/posts";
import styles from "../post/PostView.module.css";

function Breadcrumb({ project }: { project: Project }) {
  return (
    <div className={styles.breadcrumb}>
      <span className={styles.crumbProject}>
        <span className={styles.crumbDotProject} />
        {project.name}
      </span>
    </div>
  );
}

export default function ProjectView({ project }: { project: Project }) {
  const troubles = posts.filter((post) => post.project === project.id);

  return (
    <div className={styles.screen}>
      <TopBar breadcrumb={<Breadcrumb project={project} />} />

      <div className={styles.stage}>
        {/* 뒤에 남는 전체 그래프 — 시트 양옆으로 노드와 선이 비친다 */}
        <div className={styles.backGraph}>
          <KnowledgeGraph
            nodes={annotatedGraphNodes}
            edges={fullGraphEdges}
            backdrops={fullGraphBackdrops}
            focusNodeId={project.id}
            showControls={false}
          />
        </div>
        <Link href="/" className={styles.scrim} aria-label="그래프로 돌아가기" />

        {/* 왼쪽은 이 프로젝트를 만든 사람, 오른쪽은 여기서 나온 글들 —
            그래프에서 이 노드에 들어오고 나가는 선과 같은 자리다 */}
        <div className={styles.portsLeft}>
          <Link
            href={nodeHref("me")}
            className={styles.port}
            aria-label="만든 사람: 민엽"
          >
            <span className={`${styles.portDot} ${styles.portDotProject}`} />
            <span className={styles.portPopover}>
              <span className={styles.popRole}>만든 사람</span>
              <span className={styles.popName}>민엽</span>
            </span>
          </Link>
        </div>
        <div className={styles.portsRight}>
          {troubles.map((post) => (
            <Link
              key={post.id}
              href={nodeHref(post.id)}
              className={styles.port}
              aria-label={`여기서 나온 글: ${post.title}`}
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
            <NodeTree activePostId={project.id} />
          </aside>

          <article className={styles.article}>
            <ProjectArticle project={project} />
          </article>
        </div>
      </div>
    </div>
  );
}
