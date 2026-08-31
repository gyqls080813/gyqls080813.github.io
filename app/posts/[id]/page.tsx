import { notFound } from "next/navigation";
import PostArticle from "@/components/post/PostArticle";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const post = getPost(id);
    return {
      title: post ? `${post.title} — 민엽의 트러블로그` : "민엽의 트러블로그",
    };
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) notFound();
  /* 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡는다 — 페이지는 본문만 */
  return <PostArticle post={post} />;
}
