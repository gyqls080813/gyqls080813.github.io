import { notFound } from "next/navigation";
import ProjectArticle from "@/components/project/ProjectArticle";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const project = getProject(id);
    return {
      title: project
        ? `${project.name} — 민엽의 트러블로그`
        : "민엽의 트러블로그",
    };
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();
  /* 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡는다 — 페이지는 본문만 */
  return <ProjectArticle project={project} />;
}
