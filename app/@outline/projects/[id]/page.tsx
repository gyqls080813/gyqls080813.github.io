import { projects } from "@/lib/projects";
import { outlinePage } from "@/lib/sheetPage";

/* 레이아웃의 @outline 슬롯 — 이 시트의 목차와 포트 (lib/sheetPage의 outlinePage) */
const page = outlinePage(projects);

export const generateStaticParams = page.generateStaticParams;
export default page.Page;
