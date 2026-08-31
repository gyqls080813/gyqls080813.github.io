"use client";

import { useRouter } from "next/navigation";
import IntroSheet from "./IntroSheet";
import { nodeHref } from "@/lib/nodeTarget";

/**
 * 소개 본문 — 껍데기(SheetChrome)가 감싸 주므로 여기는 내용만 맡는다.
 *
 * 그런데도 파일이 따로 있는 이유는 소개만 본문 안에 이동이 있어서다.
 * 프로젝트 카드와 기술 행을 누르면 그래프의 그 노드로 간다 — 클라이언트
 * 훅이 필요한 부분이라 서버에서 그리는 다른 본문들과 섞을 수 없다.
 */
export default function IntroView() {
  const router = useRouter();

  /* 목적지 페이지로 바로 보내지 않고 그래프를 거친다. 어느 노드로 가는지
     이동·확대가 보여야 소개와 그래프가 이어져 읽힌다 */
  const goToNode = (nodeId: string) => router.push(nodeHref(nodeId));

  return <IntroSheet onProjectClick={goToNode} onTheoryClick={goToNode} />;
}
