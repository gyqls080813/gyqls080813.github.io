// src/hooks/home/PartyHooks/ContinueHooker.ts
import { useQuery } from "@tanstack/react-query";
import { fetchContinuePartyList, ContinueParty } from "@/api/home/PartyAPI/FindContinuePartyList";

export const useContinueContents = () => {
  return useQuery<ContinueParty[]>({
    queryKey: ["continueParties"],
    queryFn: fetchContinuePartyList,

    // 🎯 캐시 신선도 설정 (1분)
    // 사용자가 파티를 나갔다 들어왔을 때 즉각적인 업데이트를 원한다면 
    // staleTime을 0으로 설정하는 것도 방법입니다.
    staleTime: 500,

    // 🎯 에러 핸들링 (비로그인 대응)
    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
};