import type { GraphNodeData } from "@/components/graph/types";
import { fullGraphNodes, ideaClusters, theoryClusters } from "./graphData";

/* 이론과 생각이 같은 문법(허브 → 챕터)을 쓰므로 집계도 한 목록에서 본다 */
const clusters = [...theoryClusters, ...ideaClusters];
import { getPost, posts } from "./posts";
import { getTheory } from "./theories";
import { getTil } from "./tils";

/**
 * 글 데이터를 집계해 노드에 붙인 그래프.
 * 카드 3단 구성: 날짜(dateLabel) / 제목 / 집계(meta).
 * 홈과 글 페이지 배경이 같은 데이터를 써야 노드 크기까지 픽셀이 일치해
 * 확장 전환이 끊기지 않는다.
 */
export const annotatedGraphNodes: GraphNodeData[] = fullGraphNodes.map((node) => {
  if (node.kind === "me") {
    return { ...node, clickable: true, meta: "프론트엔드 이민엽" };
  }
  if (node.kind === "trouble") {
    const post = getPost(node.id);
    return post
      ? {
          ...node,
          clickable: true,
          dateLabel: post.date,
          meta: `${post.readMinutes}분, 섹션 ${post.sections.length}`,
        }
      : node;
  }
  if (node.kind === "project") {
    const count = posts.filter((post) => post.project === node.id).length;
    return { ...node, meta: `트러블 ${count}` };
  }
  /* 내용이 있는 것만 열린다 — 나머지는 이동·확대까지만 */
  const openable =
    getTheory(node.id) || getTil(node.id) ? { clickable: true } : null;
  const cluster = clusters.find((candidate) => candidate.hub === node.id);
  if (cluster) {
    /* TIL 아래는 챕터가 아니라 날짜다 — 세는 것이 다르면 이름도 달라야 한다 */
    const unit = node.id === "til" ? "기록" : "챕터";
    return { ...node, ...openable, meta: `${unit} ${cluster.chapters.length}` };
  }
  const references = posts.filter((post) =>
    post.theories.some((theory) => theory.id === node.id),
  ).length;
  return references > 0
    ? { ...node, ...openable, meta: `글 ${references}` }
    : { ...node, ...openable };
});
