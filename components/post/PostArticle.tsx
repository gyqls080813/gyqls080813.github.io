import { fullGraphNodes } from "@/lib/graphData";
import type { Post } from "@/lib/posts";
import { Chip, CodeBlock, SectionHeading, type NavItem } from "../content";
import { slugify } from "@/lib/slug";
import styles from "./PostView.module.css";

function nodeLabel(id: string): string {
  return fullGraphNodes.find((node) => node.id === id)?.label ?? id;
}

/**
 * 오른쪽 목차에 세울 것 — 제목을 가진 쪽이 목록도 만든다.
 * 본문과 목차를 다른 파일에서 각자 만들면 언젠가 어긋난다.
 */
export function postNavItems(post: Post): NavItem[] {
  return post.sections.map((section) => ({
    id: slugify(section.heading),
    label: section.heading,
  }));
}

/** 글 본문 — 연결 노드 카드는 시트 밖(PostView의 사이드 노드)이 맡는다 */
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
          {post.date} · {post.readMinutes}분
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
