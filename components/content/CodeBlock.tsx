import styles from "./CodeBlock.module.css";

/** 코드 블록 — 등폭 글꼴, 줄바꿈 유지, 가로 넘침은 스크롤 */
export default function CodeBlock({ children }: { children: string }) {
  return <pre className={styles.code}>{children}</pre>;
}
