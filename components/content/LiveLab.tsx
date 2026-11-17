"use client";

import { useEffect, useRef, useState } from "react";
import type { TheoryLab } from "@/lib/theories";
import { LAB_TAGS, LabEngine, type LabRow } from "@/lib/lab/engine";
import styles from "./LiveLab.module.css";

/**
 * 직접 해 보기 — 고칠 수 있는 HTML, 그 코드가 들어가는 진짜 작은 창, 그리고 그 창에서 난 일의 기록.
 *
 * 보기만 하는 예제와 다른 점은 작은 창이 흉내가 아니라는 것이다. 링크를 누르면 그 창이 실제로
 * 이동하고, 폼은 실제로 검증하고, 기록 줄은 브라우저가 실제로 낸 이벤트다. 엔진(lib/lab/engine)이
 * 같은 출처의 그 창에 귀를 달아 받아 적는다.
 *
 * 창은 화면 가까이 왔을 때 만든다 — 한 시트에 여럿이 있어도 처음에 다 띄우지 않는다.
 */
export default function LiveLab({ lab }: { lab: TheoryLab }) {
  const [code, setCode] = useState(lab.html);
  const [rows, setRows] = useState<LabRow[]>([]);
  const [url, setUrl] = useState("");
  const [values, setValues] = useState<string[]>([]);
  /* 작은 창의 폭(px). null이면 블록 폭에 맞춘다 */
  const [frameWidth, setFrameWidth] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLOListElement>(null);
  const engineRef = useRef<LabEngine | null>(null);
  /* 창이 처음 뜰 때 넣을 코드 — 편집할 때마다 함께 바꾼다 */
  const codeRef = useRef(lab.html);

  useEffect(() => {
    const root = rootRef.current;
    const box = boxRef.current;
    if (!root || !box) return;
    const engine = new LabEngine(
      box,
      { checks: lab.checks, logFocus: lab.logFocus, logInput: lab.logInput },
      { rows: setRows, url: setUrl, checks: setValues },
    );
    engineRef.current = engine;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer);
        if (!entry?.isIntersecting) return;
        if (!engine.started) engine.run(codeRef.current);
        timer = window.setInterval(() => engine.tick(), 400);
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      engine.dispose();
      engineRef.current = null;
    };
  }, [lab]);

  /* 새 줄이 생기면 기록 칸을 맨 아래로 */
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [rows]);

  const edit = (next: string) => {
    setCode(next);
    codeRef.current = next;
  };

  const lines = code.split("\n").length;

  return (
    <div ref={rootRef} className={styles.lab}>
      <div className={styles.head}>
        <span className={styles.kicker}>직접 해 보기</span>
        <span className={styles.hint}>코드를 고치고 실행하면 아래 작은 창에 그대로 들어갑니다</span>
      </div>

      <textarea
        className={styles.code}
        value={code}
        onChange={(event) => edit(event.target.value)}
        rows={Math.min(Math.max(lines + 1, 3), 24)}
        wrap="off"
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="실험할 HTML 코드"
      />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.primary}
          onClick={() => engineRef.current?.run(code)}
        >
          이 코드로 실행
        </button>
        <button
          type="button"
          onClick={() => {
            edit(lab.html);
            engineRef.current?.run(lab.html);
          }}
        >
          처음 코드로
        </button>
      </div>
      {lab.tryIt && <p className={styles.try}>해 볼 것: {lab.tryIt}</p>}

      <div className={styles.browser}>
        <div className={styles.bar}>
          <span className={styles.url} title={url}>
            {url || "…"}
          </span>
          <button type="button" onClick={() => engineRef.current?.reload()}>
            새로 고침
          </button>
        </div>
        {lab.widths && lab.widths.length > 0 && (
          <div className={styles.widths} role="group" aria-label="작은 창 폭">
            <span>창 폭</span>
            {[...lab.widths, null].map((width) => (
              <button
                key={width ?? "fit"}
                type="button"
                aria-pressed={frameWidth === width}
                onClick={() => setFrameWidth(width)}
              >
                {width === null ? "맞춤" : `${width}px`}
              </button>
            ))}
          </div>
        )}
        <div
          ref={boxRef}
          className={styles.frame}
          style={{ height: lab.height ?? 160, width: frameWidth ?? undefined }}
        />
      </div>

      {lab.checks && lab.checks.length > 0 && (
        <table className={styles.checks}>
          <caption>지금 값 (작은 창 안에서 계속 다시 잽니다)</caption>
          <tbody>
            {lab.checks.map((check, index) => (
              <tr key={check.label}>
                <th scope="row">{check.label}</th>
                <td>
                  <code>{values[index] ?? "…"}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className={styles.logTitle}>일어난 일</p>
      <ol ref={logRef} className={styles.log} aria-live="polite">
        {rows.length === 0 ? (
          <li className={styles.empty}>작은 창이 화면에 들어오면 시작합니다.</li>
        ) : (
          rows.map((row) =>
            row.tag === "sep" ? (
              <li key={row.id} className={styles.sep} aria-hidden="true" />
            ) : (
              <li key={row.id} className={styles.row}>
                <span className={styles.ms}>{row.ms}</span>
                <span className={styles.tag} data-tag={row.tag}>
                  {LAB_TAGS[row.tag]}
                </span>
                <span className={styles.text}>{row.text}</span>
              </li>
            ),
          )
        )}
      </ol>
    </div>
  );
}
