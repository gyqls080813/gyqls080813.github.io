import { notFound } from "next/navigation";
import PostView from "@/components/post/PostView";
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
  return <PostView post={post} />;
}
