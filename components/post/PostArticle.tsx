import { fullGraphNodes } from "@/lib/graphData";
import type { Post } from "@/lib/posts";
import styles from "./PostView.module.css";

function nodeLabel(id: string): string {
  return fullGraphNodes.find((node) => node.id === id)?.label ?? id;
}

/** 글 본문 — 연결 노드 카드는 시트 밖(PostView의 사이드 노드)이 맡는다 */
export default function PostArticle({ post }: { post: Post }) {
  return (
    <div className={styles.articleInner}>
      <div className={styles.meta}>
        <span className={styles.chipProject}>{nodeLabel(post.project)}</span>
        {post.theories.map((theory) => (
          <span key={theory.id} className={styles.chipTheory}>
            {nodeLabel(theory.id)}
          </span>
        ))}
        <span className={styles.metaDate}>
          {post.date} · {post.readMinutes}분
        </span>
      </div>

      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.lead}>{post.lead}</p>

      {post.sections.map((section) => (
        <section key={section.heading}>
          <h2 className={styles.sectionHeading}>
            <span
              className={`${styles.bullet} ${
                section.tone === "trouble"
                  ? styles.bulletTrouble
                  : styles.bulletTheory
              }`}
            />
            {section.heading}
          </h2>
          <p className={styles.sectionBody}>{section.body}</p>
          {section.code && <pre className={styles.code}>{section.code}</pre>}
        </section>
      ))}
    </div>
  );
}
