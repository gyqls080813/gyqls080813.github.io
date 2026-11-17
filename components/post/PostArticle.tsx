import type { Post } from "@/lib/posts";
import CodeBlock from "../content/CodeBlock";
import { SectionHeading } from "../content/Prose";
import { PostHead } from "../content/ArticleHeads";
import { slugify } from "@/lib/slug";
import styles from "../content/Sheet.module.css";

/** 글 본문 — 연결 노드 카드는 시트 밖(껍데기의 가장자리 포트)이 맡는다 */
export default function PostArticle({ post }: { post: Post }) {
  return (
    <div className={styles.articleInner}>
      <PostHead post={post} />
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
