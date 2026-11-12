import Link from "next/link";
import TopBar from "@/components/TopBar";
import PostMeta from "@/components/content/PostMeta";
import { postSummaries } from "@/lib/catalog";
import { nodeHref } from "@/lib/nodeTarget";
import styles from "./page.module.css";

export const metadata = { title: "전체 글" };

export default function PostListPage() {
  /* 목록에는 본문이 필요 없다 — 요약 목록이면 충분하다 */
  const sorted = [...postSummaries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className={styles.screen}>
      <TopBar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>전체 글</h1>
          <p className={styles.sub}>
            트러블슈팅 {postSummaries.length}편 — 그래프가 부담스러울 때의 안전망
          </p>
          <div className={styles.list}>
            {sorted.map((post) => (
              <Link key={post.id} href={nodeHref(post.id)} className={styles.card}>
                <p className={styles.cardTitle}>
                  <span className={styles.cardDot} />
                  {post.title}
                </p>
                <PostMeta post={post} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
