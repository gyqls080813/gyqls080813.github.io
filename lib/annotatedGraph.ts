import type { GraphNodeData } from "@/components/graph/types";
import { fullGraphNodes, theoryClusters } from "./graphData";
import { getPost, posts } from "./posts";
import { getTheory } from "./theories";

/**
 * 글 데이터를 집계해 노드에 붙인 그래프.
 * 카드 3단 구성: 날짜(dateLabel) / 제목 / 집계(meta).
 * 홈과 글 페이지 배경이 같은 데이터를 써야 노드 크기까지 픽셀이 일치해
 * 확장 전환이 끊기지 않는다.
 */
export const annotatedGraphNodes: GraphNodeData[] = fullGraphNodes.map((node) => {
  if (node.kind === "me") {
    return { ...node, clickable: true, meta: "자기소개" };
  }
  if (node.kind === "trouble") {
    const post = getPost(node.id);
    return post
      ? {
          ...node,
          clickable: true,
          dateLabel: post.date,
          meta: `${post.readMinutes}분 · 섹션 ${post.sections.length}`,
        }
      : node;
  }
  if (node.kind === "project") {
    const count = posts.filter((post) => post.project === node.id).length;
    return { ...node, meta: `트러블 ${count}` };
  }
  /* 내용이 있는 개념만 열린다 — 나머지는 이동·확대까지만 */
  const openable = getTheory(node.id) ? { clickable: true } : null;
  const cluster = theoryClusters.find((candidate) => candidate.hub === node.id);
  if (cluster) {
    return { ...node, ...openable, meta: `챕터 ${cluster.chapters.length}` };
  }
  const references = posts.filter((post) =>
    post.theories.some((theory) => theory.id === node.id),
  ).length;
  return references > 0
    ? { ...node, ...openable, meta: `글 ${references}` }
    : { ...node, ...openable };
});
