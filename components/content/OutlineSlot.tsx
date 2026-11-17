import { nodeOutline } from "@/lib/sheet";
import SheetOutline from "./SheetOutline";

/**
 * 레이아웃의 @outline 슬롯 페이지가 그리는 것 — 이 노드의 목차와 포트를 서버에서
 * 계산해 넘긴다. 브라우저는 열린 노드 것만 받는다(정적 HTML과 이동 때의 페이로드에 실린다).
 */
export default function OutlineSlot({ nodeId }: { nodeId: string }) {
  const { nav, ports } = nodeOutline(nodeId);
  return <SheetOutline nav={nav} ports={ports} />;
}
