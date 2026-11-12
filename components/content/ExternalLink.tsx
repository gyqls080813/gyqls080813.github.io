import type { ReactNode } from "react";

/**
 * 사이트 밖으로 나가는 링크 — 새 탭으로 열고, 연 쪽 창을 넘겨주지 않는다.
 * 출처 칩과 저장소 링크가 각자 rel을 적다가 값이 갈라졌던 자리다.
 */
export default function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
