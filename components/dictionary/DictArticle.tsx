import type { Dictionary } from "@/lib/dictionary";
import { slugify } from "@/lib/slug";
import SheetArticle from "../content/SheetArticle";

/**
 * 사전 시트 안쪽 — 절은 낱말이 나온 문서, 블록은 낱말 하나(표제어가 라벨).
 * 사전도 생각 갈래라 색이 같다. 낱말 앵커는 표제어만으로 짓는다 — 목차가
 * 같은 규칙(item(entry.term))으로 찾아온다.
 */
export default function DictArticle({ dictionary }: { dictionary: Dictionary }) {
  return (
    <SheetArticle
      kind="idea"
      kicker="사전"
      title={dictionary.name}
      tagline={dictionary.tagline}
      introLabel="무엇을 모으나"
      intro={dictionary.intro}
      sections={dictionary.sections.map((section) => ({
        heading: section.heading,
        blocks: section.entries.map((entry) => ({
          label: entry.term,
          body: entry.body,
          code: entry.code,
        })),
      }))}
      blockAnchor={(_, label) => slugify(label)}
    />
  );
}
