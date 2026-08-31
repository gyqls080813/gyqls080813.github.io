import { fullGraphNodes } from "@/lib/graphData";
import type { Post } from "@/lib/posts";
import { Chip, CodeBlock, SectionHeading } from "../content";
import { slugify } from "@/lib/slug";
import styles from "../content/Sheet.module.css";

function nodeLabel(id: string): string {
  return fullGraphNodes.find((node) => node.id === id)?.label ?? id;
}

/** 글 본문 — 연결 노드 카드는 시트 밖(껍데기의 가장자리 포트)이 맡는다 */
export default function PostArticle({ post }: { post: Post }) {
  return (
    <div className={styles.articleInner}>
      <div className={styles.meta}>
        <Chip kind="project" variant="soft">
          {nodeLabel(post.project)}
        </Chip>
        {post.theories.map((theory) => (
          <Chip key={theory.id} kind="theory" variant="soft">
            {nodeLabel(theory.id)}
          </Chip>
        ))}
        <span className={styles.metaDate}>
          {post.date}, {post.readMinutes}분
        </span>
      </div>

      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.lead}>{post.lead}</p>

      {post.sections.map((section) => (
        <section key={section.heading} id={slugify(section.heading)}>
          <SectionHeading tone={section.tone}>{section.heading}</SectionHeading>
          <p className={styles.sectionBody}>{section.body}</p>
          {section.code && <CodeBlock>{section.code}</CodeBlock>}
        </section>
      ))}
    </div>
  );
}
