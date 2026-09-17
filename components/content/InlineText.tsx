import type { ReactNode } from "react";
import styles from "./InlineText.module.css";

/**
 * 본문 문자열에서 표시를 붙인 부분만 모양을 바꿔 그린다.
 * - 백틱(`)으로 감싼 부분 → 인라인 코드 박스
 * - 별표 두 개(**)로 감싼 부분 → 강조
 *
 * 문단 안의 `Promise<number>` 같은 이름은 글자와 코드가 섞여 있어 어디까지가 코드인지 흐려지고,
 * 꼭 붙잡아야 할 한 문장은 문단에 묻힌다. 데이터는 그대로 문자열로 두고, 그릴 때만 바꾼다.
 * 문자열이 아니면 손대지 않는다.
 */
export default function InlineText({ children }: { children: ReactNode }) {
  if (typeof children !== "string" || !/[`*]/.test(children)) return children;

  // split 에 괄호를 쓰면 구분자도 결과에 남는다 — 홀수 번째가 백틱 사이
  return children.split(/`([^`]+)`/).map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className={styles.code}>
        {part}
      </code>
    ) : (
      <Emphasis key={index}>{part}</Emphasis>
    ),
  );
}

/** 코드 박스 밖의 글자에서만 ** 를 찾는다 — 코드 안의 별표는 코드다 */
function Emphasis({ children }: { children: string }) {
  if (!children.includes("**")) return children;
  return children.split(/\*\*([^*]+)\*\*/).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className={styles.strong}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
