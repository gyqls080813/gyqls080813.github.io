import type { Metadata } from "next";
import IntroSheet from "@/components/IntroSheet";

export const metadata: Metadata = { title: "Who am I" };

/* 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡는다 — 페이지는 본문만 */
export default function AboutPage() {
  return <IntroSheet />;
}
