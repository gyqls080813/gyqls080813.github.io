import { highlightedCode } from "@/lib/generated/codeHighlight";
import styles from "./CodeBlock.module.css";

/**
 * 코드 블록 — 색은 빌드 때 미리 입혀 둔 것을 그대로 쓴다.
 *
 * shiki는 Node에서만 돌고 시트는 클라이언트에서도 그려지므로, 여기서 부르지 않고
 * scripts/highlight-code.mjs가 만들어 둔 HTML을 꺼내 넣는다. 그래서 브라우저로
 * 나가는 것은 색이 입혀진 문자열뿐이고, 문법·테마 데이터는 한 바이트도 안 간다.
 *
 * 아직 안 칠해진 조각(방금 쓴 것)은 원문 그대로 나온다 — 색만 없을 뿐 읽힌다.
 * 스크립트를 다시 돌리면 채워진다.
 */
export default function CodeBlock({ children }: { children: string }) {
  const painted = highlightedCode[children];
  return (
    <pre className={styles.code}>
      {painted ? (
        <code dangerouslySetInnerHTML={{ __html: painted }} />
      ) : (
        <code>{children}</code>
      )}
    </pre>
  );
}
