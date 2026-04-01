// src/hooks/home/PartyHooks/HotHooker.ts
import { useQuery } from "@tanstack/react-query";
import { fetchHotPartyList } from "@/api/home/PartyAPI/FindHotPartyList";

export const useHotContents = () => {
  return useQuery({
    queryKey: ["hotParties"],
    queryFn: fetchHotPartyList,

    // 🚀 인기 카테고리는 참여 인원 합계가 실시간으로 변동되므로 
    // 3분마다 데이터를 갱신하여 현장감을 유지합니다.
    staleTime: 500,

    // 🎯 데이터 가공: response.data (HotGenreGroup[])만 반환하여 
    // 컴포넌트의 가독성을 높입니다.
    select: (response) => response.data,
  });
};