import DictArticle from "@/components/dictionary/DictArticle";
import { dictionary } from "@/lib/dictionary";

export const metadata = {
  title: `${dictionary.name} — 민엽의 트러블로그`,
};

/* 사전은 하나뿐이라 주소도 하나다 — 껍데기(그래프·트리·포트·목차)는 레이아웃이 맡는다 */
export default function DictionaryPage() {
  return <DictArticle dictionary={dictionary} />;
}
