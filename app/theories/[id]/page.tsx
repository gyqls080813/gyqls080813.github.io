import TheoryArticle from "@/components/theory/TheoryArticle";
import { sheetPage } from "@/lib/sheetPage";
import { theories } from "@/lib/theories";

const page = sheetPage({
  list: theories,
  title: (theory) => theory.name,
  render: (theory) => <TheoryArticle theory={theory} />,
});

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
