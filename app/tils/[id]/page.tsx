import { notFound } from "next/navigation";
import TilArticle from "@/components/til/TilArticle";
import { getTil, tils } from "@/lib/tils";

export function generateStaticParams() {
  return tils.map((til) => ({ id: til.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const til = getTil(id);
    return {
      title: til ? `${til.title} — 민엽의 트러블로그` : "민엽의 트러블로그",
    };
  });
}

export default async function TilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const til = getTil(id);
  if (!til) notFound();
  /* 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡는다 — 페이지는 본문만 */
  return <TilArticle til={til} />;
}
