import { notFound } from "next/navigation";
import TheoryArticle from "@/components/theory/TheoryArticle";
import { getTheory, theories } from "@/lib/theories";

export function generateStaticParams() {
  return theories.map((theory) => ({ id: theory.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const theory = getTheory(id);
    return {
      title: theory ? `${theory.name} — 민엽의 트러블로그` : "민엽의 트러블로그",
    };
  });
}

export default async function TheoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const theory = getTheory(id);
  if (!theory) notFound();
  /* 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡는다 — 페이지는 본문만 */
  return <TheoryArticle theory={theory} />;
}
