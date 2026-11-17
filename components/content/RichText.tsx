import InlineText from "./InlineText";
import styles from "./RichText.module.css";

/** 목록 줄의 머리 — 1) (1) 1. 그리고 - */
const MARKER = /^(\(\d+\)|\d+\)|\d+\.|-)\s+/;

type Piece =
  { kind: "text"; text: string } | { kind: "list"; items: { marker: string; text: string }[] };

/** 문단 하나를 글줄 덩어리와 목록 덩어리로 나눈다. 이어진 목록 줄은 한 목록이 된다 */
function piecesOf(paragraph: string): Piece[] {
  const pieces: Piece[] = [];
  for (const line of paragraph.split("\n")) {
    const match = line.match(MARKER);
    const last = pieces.at(-1);
    if (match) {
      const item = { marker: match[1], text: line.slice(match[0].length) };
      if (last?.kind === "list") last.items.push(item);
      else pieces.push({ kind: "list", items: [item] });
    } else if (last?.kind === "text") {
      last.text += `\n${line}`;
    } else {
      pieces.push({ kind: "text", text: line });
    }
  }
  return pieces;
}

/**
 * 본문 글 — 빈 줄로 문단을 나누고, 1) (1) 1. - 로 시작하는 줄은 목록으로 세운다.
 *
 * 한 덩어리로 줄바꿈만 살려 그리면 문단 사이가 한 줄 높이밖에 안 벌어지고, 목록의
 * 두 번째 줄이 번호 밑으로 파고들어 어디서 항목이 바뀌는지 눈으로 찾아야 한다.
 * 문단은 문단대로 띄우고, 목록은 번호를 왼쪽에 매달아 글이 번호 오른쪽에서 줄을 맞춘다.
 * 데이터는 그대로 문자열이고, 그릴 때만 나눈다.
 */
export default function RichText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const paragraphs = children.split(/\n{2,}/).filter((part) => part.trim() !== "");
  return (
    <div className={className ? `${styles.rich} ${className}` : styles.rich}>
      {paragraphs.map((paragraph, index) =>
        piecesOf(paragraph).map((piece, at) =>
          piece.kind === "text" ? (
            <p key={`${index}-${at}`} className={styles.para}>
              <InlineText>{piece.text}</InlineText>
            </p>
          ) : (
            <ul key={`${index}-${at}`} className={styles.list}>
              {piece.items.map((item, n) => (
                <li key={n} className={styles.item}>
                  <span
                    className={
                      item.marker === "-" ? `${styles.marker} ${styles.bullet}` : styles.marker
                    }
                    aria-hidden={item.marker === "-"}
                  >
                    {item.marker === "-" ? "•" : item.marker}
                  </span>
                  <span className={styles.itemText}>
                    <InlineText>{item.text}</InlineText>
                  </span>
                </li>
              ))}
            </ul>
          ),
        ),
      )}
    </div>
  );
}
