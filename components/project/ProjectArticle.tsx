import Link from "next/link";
import KindIcon from "../graph/KindIcon";
import type { Project } from "@/lib/projects";
import { posts } from "@/lib/posts";
/* 시트 안쪽 폭은 글 페이지와 같은 것을 쓴다 */
import sheetStyles from "../post/PostView.module.css";
import styles from "./ProjectArticle.module.css";

/** 프로젝트 시트 안쪽 — 노드가 열리는 중에도 같은 내용이 그대로 보여야 해서 따로 뒀다 */
export default function ProjectArticle({ project }: { project: Project }) {
  /* 그래프에서 이 프로젝트 노드에 매달린 트러블 노드들과 같은 목록 */
  const troubles = posts.filter((post) => post.project === project.id);

  return (
    <div className={sheetStyles.articleInner}>
      <div className={styles.kicker}>
        <KindIcon kind="project" size={15} />
        프로젝트
      </div>

      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.tagline}>{project.tagline}</p>

      <div className={styles.factsSection}>
        <div className={styles.factRow}>
          <span className={styles.factLabel}>기간</span>
          <span className={styles.factValue}>{project.period}</span>
        </div>
        <div className={styles.factRow}>
          <span className={styles.factLabel}>팀</span>
          <span className={styles.factValue}>{project.team}</span>
        </div>
        <div className={styles.factRow}>
          <span className={styles.factLabel}>역할</span>
          <span className={styles.factValue}>{project.role}</span>
        </div>
      </div>

      <div className={styles.stack}>
        {project.stack.map((item) => (
          <span key={item} className={styles.stackChip}>
            {item}
          </span>
        ))}
      </div>

      <div className={styles.blocks}>
        {project.blocks.map((block) => (
          <section key={block.label} className={styles.block}>
            <h2 className={styles.blockLabel}>{block.label}</h2>
            <p className={styles.blockBody}>{block.body}</p>
          </section>
        ))}
      </div>

      {troubles.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>
            <KindIcon kind="trouble" size={15} />
            여기서 나온 글
          </h2>
          <div className={styles.troubles}>
            {troubles.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className={styles.troubleRow}
              >
                <KindIcon kind="trouble" size={16} />
                <span className={styles.troubleText}>
                  <span className={styles.troubleTitle}>{post.title}</span>
                  <span className={styles.troubleMeta}>
                    {post.date} · {post.readMinutes}분
                  </span>
                </span>
                <span className={styles.port} aria-hidden />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
