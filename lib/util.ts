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
