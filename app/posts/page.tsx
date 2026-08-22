import Link from "next/link";
import TopBar from "@/components/TopBar";
import { fullGraphNodes } from "@/lib/graphData";
import { posts } from "@/lib/posts";
import styles from "./page.module.css";

export const metadata = { title: "전체 글 — 민엽의 트러블로그" };

function nodeLabel(id: string): string {
  return fullGraphNodes.find((node) => node.id === id)?.label ?? id;
}

export default function PostListPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className={styles.screen}>
      <TopBar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>전체 글</h1>
          <p className={styles.sub}>
            트러블슈팅 {posts.length}편 — 그래프가 부담스러울 때의 안전망
          </p>
          <div className={styles.list}>
            {sorted.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`} className={styles.card}>
                <p className={styles.cardTitle}>
                  <span className={styles.cardDot} />
                  {post.title}
                </p>
                <span className={styles.cardMeta}>
                  <span className={styles.chipProject}>{nodeLabel(post.project)}</span>
                  {post.theories.map((theory) => (
                    <span key={theory.id} className={styles.chipTheory}>
                      {nodeLabel(theory.id)}
                    </span>
                  ))}
                  <span className={styles.date}>
                    {post.date} · {post.readMinutes}분
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
