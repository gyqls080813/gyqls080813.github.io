import TilArticle from "@/components/til/TilArticle";
import { sheetPage } from "@/lib/sheetPage";
import { tils } from "@/lib/tils";

const page = sheetPage({
  list: tils,
  title: (til) => til.title,
  render: (til) => <TilArticle til={til} />,
});

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
