/**
 * 어느 파일에도 딸리지 않는 작은 손잡이들 — 같은 한 줄을 여러 곳에 적지 않으려고 모았다.
 */

/** 클래스 이름 잇기 — 거짓 값은 건너뛴다 (`cx(a, on && b)`) */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** 배열에서 빈 칸을 걸러 내며 타입도 좁힌다 (`list.filter(isDefined)`) */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/** 있으면 빼고 없으면 넣은 새 집합 — 접기·펴기 상태가 모두 이것이다 */
export function toggled<T>(set: ReadonlySet<T>, item: T): Set<T> {
  const next = new Set(set);
  if (!next.delete(item)) next.add(item);
  return next;
}

/**
 * 객체를 사전처럼 찾되 자기 키만 본다.
 *
 * 생성된 색인(lib/generated/sheetIndex)은 평범한 객체 리터럴이라, `index[id]`로
 * 찾으면 `constructor`, `toString` 같은 Object의 기본 키까지 걸린다. 주소에서 온
 * id(`/?node=constructor`)가 그대로 들어오면 함수가 돌아와 뒤에서 깨진다.
 */
export function own<T>(record: Readonly<Record<string, T>>, key: string): T | undefined {
  return Object.hasOwn(record, key) ? record[key] : undefined;
}
