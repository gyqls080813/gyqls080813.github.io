import OutlineSlot from "@/components/content/OutlineSlot";
import { ME_ID } from "@/lib/nodeKinds";

/* 레이아웃의 @outline 슬롯 — 소개 시트의 목차와 포트 */
export default function AboutOutline() {
  return <OutlineSlot nodeId={ME_ID} />;
}
