import { notFound } from "next/navigation";
import TheoryView from "@/components/theory/TheoryView";
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
  return <TheoryView theory={theory} />;
}
