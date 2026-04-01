import { useQuery } from "@tanstack/react-query";
import { fetchPartyDetail, PartyDetailData } from "@/api/party/GetPartyDetail";

/**
 * 👉 파티 상세 정보를 가져오는 훅
 * @param partyId 파티 ID (숫자)
 */
export const usePartyDetail = (partyId: number, options?: any) => {
    return useQuery<PartyDetailData>({
        queryKey: ["partyDetail", partyId],
        queryFn: () => fetchPartyDetail(partyId),
        enabled: !!partyId && !isNaN(partyId), // partyId가 유효할 때만 실행
        staleTime: 500, // 0.5초간 캐시 유지
        retry: 1, // 실패 시 1회 재시도
        ...options, // 추가 옵션 병합 (예: refetchInterval)
    });
};
