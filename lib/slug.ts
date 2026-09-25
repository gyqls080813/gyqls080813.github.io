/**
 * 제목 → 앵커 id.
 *
 * 순번이 아니라 제목에서 뽑는다. 순번으로 만들면 절을 하나 끼워 넣는 순간
 * 앞뒤 앵커가 전부 밀려 밖에서 걸어 둔 링크가 엉뚱한 데를 가리킨다.
 * 한글은 그대로 둔다 — id에 쓸 수 있고, 무엇을 가리키는지 읽히는 편이 낫다.
 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * 절 안 블록의 앵커 — 절 id를 앞에 붙인다.
 *
 * 한 시트 안에서 같은 라벨이 여러 절에 나온다(단계마다 "도구" 절 아래 "테스트"처럼).
 * 라벨만으로 지으면 DOM id가 겹쳐 목차가 첫 번째 것으로만 간다. 절 제목도
 * 순번이 아니라 제목에서 뽑으므로, 붙여도 앵커가 밀리지 않는 성질은 그대로다.
 */
export function sectionBlockId(sectionHeading: string, label: string): string {
  return `${slugify(sectionHeading)}--${slugify(label)}`;
}
