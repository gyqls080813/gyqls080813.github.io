import { useQuery } from "@tanstack/react-query";
import { fetchPartyParticipants, ParticipantData } from "@/api/party/GetParticipants";

/**
 * 👉 파티 참가자 목록을 가져오는 훅
 * @param partyId 파티 ID
 */
export const usePartyParticipants = (partyId: number) => {
    return useQuery<ParticipantData[]>({
        queryKey: ["partyParticipants", partyId],
        queryFn: () => fetchPartyParticipants(partyId),
        enabled: !!partyId && !isNaN(partyId),
        staleTime: 500, // 0.5초간 캐시
        retry: 1,
    });
};
