import type { Idea } from "@/lib/ideas";
import SheetArticle from "../content/SheetArticle";

/**
 * 생각 시트 안쪽.
 *
 * 이론 시트와 다른 점은 둘이다 — 머리 표식이 '생각'이고, "이 개념이 나온 글"
 * 목록이 없다. 트러블 글은 이론에 다리를 놓지 생각에는 놓지 않는다. 생각이
 * 프로젝트에서 나온 자리는 본문의 마지막 절("실제로 부딪힌 곳")이 직접 말한다.
 */
export default function IdeaArticle({ idea }: { idea: Idea }) {
  return (
    <SheetArticle
      kind="idea"
      kicker="생각"
      title={idea.name}
      tagline={idea.tagline}
      introLabel="무엇을 정하는가"
      intro={idea.intro}
      blocks={idea.blocks}
      sections={idea.sections}
      sources={idea.sources}
    />
  );
}
