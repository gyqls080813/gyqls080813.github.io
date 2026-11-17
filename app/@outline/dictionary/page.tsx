import OutlineSlot from "@/components/content/OutlineSlot";
import { DICT_ID } from "@/lib/nodeKinds";

/* 레이아웃의 @outline 슬롯 — 사전 시트의 목차와 포트 */
export default function DictionaryOutline() {
  return <OutlineSlot nodeId={DICT_ID} />;
}
