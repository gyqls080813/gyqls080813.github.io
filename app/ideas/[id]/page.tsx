import { notFound } from "next/navigation";
import IdeaArticle from "@/components/idea/IdeaArticle";
import { getIdea, ideas } from "@/lib/ideas";

export function generateStaticParams() {
  return ideas.map((idea) => ({ id: idea.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const idea = getIdea(id);
    return {
      title: idea ? `${idea.name} — 민엽의 트러블로그` : "민엽의 트러블로그",
    };
  });
}

export default async function IdeaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idea = getIdea(id);
  if (!idea) notFound();
  /* 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡는다 — 페이지는 본문만 */
  return <IdeaArticle idea={idea} />;
}
