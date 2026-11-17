import type { Metadata } from "next";
import IntroSheet from "@/components/IntroSheet";
import { labelOf } from "@/lib/graphData";
import { ME_ID } from "@/lib/nodeKinds";

/* 탭 제목은 그래프의 시작점 카드와 같은 이름이다 */
export const metadata: Metadata = { title: labelOf(ME_ID) };

/* 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡는다 — 페이지는 본문만 */
export default function AboutPage() {
  return <IntroSheet />;
}
