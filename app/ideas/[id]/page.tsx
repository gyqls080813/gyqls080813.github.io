import IdeaArticle from "@/components/idea/IdeaArticle";
import { ideas } from "@/lib/ideas";
import { sheetPage } from "@/lib/sheetPage";

const page = sheetPage({
  list: ideas,
  title: (idea) => idea.name,
  render: (idea) => <IdeaArticle idea={idea} />,
});

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
