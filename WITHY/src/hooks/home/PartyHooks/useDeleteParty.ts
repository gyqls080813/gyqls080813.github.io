import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteParty } from '@/api/home/PartyAPI/DeleteParty';

export const useDeleteParty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (partyId: number) => deleteParty(partyId),
        onSuccess: () => {
            // MyPage의 내가 만든 파티 목록 갱신
            // HostedPartySection에서 사용하는 queryKey가 있다면 무효화해야 함.
            // 현재 useHostedPartyList는 react-query를 사용하지 않고 local state로 관리 중일 수 있음.
            // 하지만 추후 react-query 전환을 대비하거나, 다른 컴포넌트에서 쓰일 수 있으므로 기본적인 세팅.
            // *현재 HostedPartySection은 useEffect로 fetch하므로, 직접 refetch 함수를 호출해야 함.*
            // 이 훅은 단순히 API 호출을 돕는 용도로 사용.
        },
        onError: (error) => {
            console.error("Party deletion failed:", error);
        }
    });
};
