"use client";

import PartySection from "./PartySection";
import PartyCard from "../PartyCard/PartyCard";
import { useContinueContents } from "@/hooks/home/PartyHooks/ContinueHooker";

const ContinueParty = () => {
  const { data: parties, isLoading } = useContinueContents();

  // 로딩 중이거나 데이터가 없으면 섹션을 숨김
  if (isLoading || !parties || parties.length === 0) {
    return null;
  }

  return (
    /* 🍿 이어보기는 무한 루프(isInfinite)를 끄고 정적으로 배치하는 것이 UX상 좋습니다. */
    <PartySection title="이전에 시청했던 컨텐츠 이어보기" variant="fixed">
      {parties.map((party) => (
        <PartyCard key={party.id} party={party} />
      ))}
    </PartySection>
  );
};

export default ContinueParty;