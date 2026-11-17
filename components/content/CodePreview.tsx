"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CodePreview.module.css";

/** 이보다 길면 칸 안에서 스크롤한다 — 예시 하나가 화면을 다 덮지 않게 */
const MAX_HEIGHT = 460;

/**
 * 작은 창의 첫머리 — 직접 해 보기(public/labs/html/play.html)와 같은 기본 여백과 글꼴이다.
 * base는 실험 파일이 있는 폴더라, 예시의 상대 주소(cat.jpg, target.html)가 실험과 같은 파일로 풀린다.
 */
const HEAD =
  '<!doctype html><meta charset="utf-8"><base href="/labs/html/">' +
  "<style>:root{color-scheme:light}body{margin:12px 16px;background:#fff;color:#111;" +
  "font-family:system-ui,sans-serif;line-height:1.6}</style>";

/**
 * 결과 미리보기 — HTML 코드 바로 아래에 브라우저가 그린 모습을 붙인다.
 *
 * 코드만 보여 주면 결과는 독자가 머릿속으로 그려야 하고, 직접 해 보기는 편집기와 기록까지
 * 딸려 있어 '어떻게 보이나'만 확인하기엔 무겁다. 코드 한 조각마다 결과를 바로 밑에 두면
 * 둘을 눈으로 오가며 견줄 수 있다.
 *
 * 스크립트는 돌리지 않는다(sandbox에 allow-scripts가 없다). 모양만 보이는 자리이고,
 * 누르고 이벤트를 보는 일은 직접 해 보기가 맡는다. 같은 출처는 열어 둬서(allow-same-origin)
 * 바깥에서 프레임 문서를 읽을 수 있다. 그래서 높이를 정해진 때에 몇 번 재는 대신, 바깥 창의
 * ResizeObserver로 프레임 문서의 크기를 지켜본다 — 그림이 늦게 와서 자리를 잡아도 따라간다.
 */
export default function CodePreview({ html }: { html: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(64);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const root = frame.contentDocument?.documentElement;
      if (root) setHeight(Math.min(Math.max(root.scrollHeight, 40), MAX_HEIGHT));
    };
    const observer = new ResizeObserver(measure);
    /* srcdoc 문서는 load 때 새로 선다 — 그때마다 새 문서의 body를 지켜본다 */
    const watch = () => {
      observer.disconnect();
      const body = frame.contentDocument?.body;
      if (body) observer.observe(body);
      measure();
    };
    frame.addEventListener("load", watch);
    watch();
    return () => {
      frame.removeEventListener("load", watch);
      observer.disconnect();
    };
  }, [html]);

  return (
    <figure className={styles.preview}>
      <figcaption className={styles.caption}>브라우저에서 보이는 모습</figcaption>
      <iframe
        ref={frameRef}
        className={styles.frame}
        title="위 코드를 브라우저가 그린 모습"
        srcDoc={HEAD + html}
        sandbox="allow-same-origin"
        loading="lazy"
        style={{ height }}
      />
    </figure>
  );
}
