import PostArticle from "@/components/post/PostArticle";
import { posts } from "@/lib/posts";
import { sheetPage } from "@/lib/sheetPage";

const page = sheetPage({
  list: posts,
  title: (post) => post.title,
  render: (post) => <PostArticle post={post} />,
});

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
