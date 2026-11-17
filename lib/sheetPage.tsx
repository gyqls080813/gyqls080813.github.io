import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OutlineSlot from "@/components/content/OutlineSlot";

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

/**
 * 같은 `[id]` 시트의 목차와 포트 — 레이아웃의 @outline 슬롯에 서는 페이지(app/@outline).
 *
 * 껍데기는 루트 레이아웃에 있어 페이지가 바뀌어도 살아 있고, 페이지에서 무엇도 받지
 * 않는다. 노드마다 다른 목차와 포트는 이 슬롯으로 들어온다. 본문 페이지와 같은 목록으로
 * 정적 경로를 만든다 — 한쪽에만 있는 경로가 생기지 않게.
 */
export function outlinePage<T extends { id: string }>(list: readonly T[]) {
  return {
    generateStaticParams: () => list.map((item) => ({ id: item.id })),
    Page: async function OutlinePage({ params }: Params) {
      const { id } = await params;
      return list.some((item) => item.id === id) ? <OutlineSlot nodeId={id} /> : null;
    },
  };
}
