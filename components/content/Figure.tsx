import styles from "./Figure.module.css";

/**
 * 그림(이미지) 박스 — 테두리·라운드·반응형 폭을 갖춘 이미지.
 * 담긴 시트 폭에 반응한다(좁아지면 세로로 서며 크기가 줄어든다).
 * 캡션이 있으면 figure/figcaption으로 감싸고, 없으면 img만 낸다(마크업 최소).
 *
 * 기본은 인물 사진(portrait) — 세로로 길어 높이를 제한하고 좁아지면 작아진다.
 * 가로로 넓은 화면 캡처는 wide — 잘리지 않게 전부 보여주고 폭을 그대로 쓴다.
 */
export default function Figure({
  src,
  alt,
  width,
  height,
  maxWidth = 340,
  caption,
  variant = "portrait",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** 최대 폭(px) — 기본 340 */
  maxWidth?: number;
  caption?: string;
  variant?: "portrait" | "wide";
}) {
  const style = { "--fig-max": `${maxWidth}px` } as React.CSSProperties;
  const img = (
    <img
      className={`${styles.img} ${variant === "wide" ? styles.wide : ""}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
    />
  );

  if (!caption) return img;
  return (
    <figure className={styles.figure} style={style}>
      {img}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
