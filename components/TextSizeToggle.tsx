"use client";

import { TEXT_SIZES, type TextSize } from "@/lib/site";
import { setTextSize, useTextSize } from "./useTextSize";
import styles from "./Segmented.module.css";

const LABEL: Record<TextSize, string> = { m: "보통", l: "크게", xl: "아주 크게" };

/**
 * 읽는 글자 크기 — 보통, 크게, 아주 크게.
 *
 * 편한 글자 크기는 사람마다 다르다(Wallace 외 2022). 하나로 정해 두지 않고 고르게 한다.
 * 본문, 제목, 코드처럼 읽는 글자만 커지고, 트리와 목차 같은 화면 글자는 그대로다.
 * 값은 <html>의 표식으로만 바꾼다 — 크기 자체는 globals.css의 --reading-scale이 쥐고 있다.
 */
export default function TextSizeToggle() {
  const size = useTextSize();
  return (
    <div className={styles.group} role="group" aria-label="글자 크기">
      {TEXT_SIZES.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.option}
          data-active={size === option}
          onClick={() => setTextSize(option)}
          aria-pressed={size === option}
          title={`글자 ${LABEL[option]}`}
          aria-label={`글자 ${LABEL[option]}`}
        >
          <span className={styles.glyph} data-size={option} aria-hidden="true">
            가
          </span>
        </button>
      ))}
    </div>
  );
}
