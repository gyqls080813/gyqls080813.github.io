// src/hooks/home/PartyHooks/FollowedHooker.ts
import { useQuery } from "@tanstack/react-query";
import { fetchFollowedPartyList, FollowedGenreData } from "@/api/home/PartyAPI/FindFollowedPartyList";

/**
 * 🎯 사용자가 구독한 장르와 해당 장르별 파티 리스트(최대 10개)를 가져옵니다.
 */
export const useFollowedContents = () => {
  return useQuery<FollowedGenreData[]>({
    queryKey: ["followedParties"],
    queryFn: fetchFollowedPartyList,

    // 🎬 큐레이션된 장르 리스트는 데이터 변동 폭이 크지 않으므로 
    // 5분간 캐시를 유지하여 쾌적한 UX를 제공합니다.
    staleTime: 500,

    // 비로그인 상태이거나 팔로우 데이터가 없는 경우를 대비해 
    // 기본값을 설정하면 컴포넌트 에러를 방지할 수 있습니다.
    initialData: [],
  });
};