import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { params: Promise<{ id: string }> };

/**
 * `[id]` 시트 페이지 하나에 필요한 세 가지 — 정적 경로, 탭 제목, 본문.
 *
 * 프로젝트·글·이론·생각·TIL 페이지가 모양이 같아서 이 하나로 만든다.
 * 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡으므로 페이지는 본문만 넘긴다.
 * 탭 제목의 사이트 이름 꼬리는 레이아웃의 title.template가 붙인다.
 */
export function sheetPage<T extends { id: string }>({
  list,
  title,
  render,
}: {
  list: readonly T[];
  title: (item: T) => string;
  render: (item: T) => ReactNode;
}) {
  const find = (id: string) => list.find((item) => item.id === id);
  return {
    generateStaticParams: () => list.map((item) => ({ id: item.id })),
    generateMetadata: async ({ params }: Params): Promise<Metadata> => {
      const item = find((await params).id);
      return item ? { title: title(item) } : {};
    },
    Page: async function SheetPage({ params }: Params) {
      const item = find((await params).id);
      if (!item) notFound();
      return render(item);
    },
  };
}
