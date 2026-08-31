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
