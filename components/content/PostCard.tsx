import { nodeHref } from "@/lib/nodeTarget";
import NodeCard from "./NodeCard";

/**
 * 트러블 글 한 장 — 프로젝트 시트의 "트러블 슈팅"과 이론 시트의 "이 개념이 나온 글"이
 * 같은 카드를 쓴다. 누르면 그래프를 거쳐 그 글로 간다(nodeHref).
 */
export default function PostCard({
  post,
}: {
  post: { id: string; title: string; date: string; readMinutes: number };
}) {
  return (
    <NodeCard
      kind="trouble"
      title={post.title}
      meta={`${post.date}, ${post.readMinutes}분`}
      href={nodeHref(post.id)}
    />
  );
}
