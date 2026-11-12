import InlineText from "./InlineText";
import styles from "./DataTable.module.css";

/**
 * 표 — 경우를 견주거나 구조를 칸으로 나눠 보여 준다.
 *
 * 코드 블록 안에 공백으로 줄을 맞춘 글자 표는 한글이 영문의 1.44배 폭이라 칸이
 * 어긋나고, 좁은 화면에서는 옆으로 밀린다. 칸을 진짜 칸으로 적으면 폭은 브라우저가
 * 맞추고, 긴 칸은 칸 안에서 줄을 바꾼다. 그래도 좁으면 표만 옆으로 민다.
 */
export default function DataTable({
  caption,
  head,
  rows,
}: {
  caption?: string;
  head: string[];
  rows: string[][];
}) {
  return (
    <figure className={styles.figure}>
      {caption && (
        <figcaption className={styles.caption}>
          <InlineText>{caption}</InlineText>
        </figcaption>
      )}
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((cell, index) => (
                <th key={index} scope="col">
                  <InlineText>{cell}</InlineText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, index) =>
                  /* 첫 칸은 그 행이 무엇인지 — 행의 머리 */
                  index === 0 ? (
                    <th key={index} scope="row">
                      <InlineText>{cell}</InlineText>
                    </th>
                  ) : (
                    <td key={index}>
                      <InlineText>{cell}</InlineText>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
