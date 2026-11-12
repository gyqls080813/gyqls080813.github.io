import ProjectArticle from "@/components/project/ProjectArticle";
import { projects } from "@/lib/projects";
import { sheetPage } from "@/lib/sheetPage";

const page = sheetPage({
  list: projects,
  title: (project) => project.name,
  render: (project) => <ProjectArticle project={project} />,
});

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
