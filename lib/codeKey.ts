/**
 * 칠해 둔 코드 조각을 찾는 열쇠 — 문법과 원문을 함께 쓴다.
 *
 * 원문만으로 찾으면 같은 코드를 다른 문법으로 칠한 조각이 하나로 겹친다.
 * 칠하는 쪽(scripts/highlight-code.mjs)과 꺼내는 쪽(CodeBlock)이 이 함수 하나를 쓴다.
 */
export function codeKey(lang: string, code: string): string {
  return `${lang}\n${code}`;
}
