import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveParty } from "@/api/home/PartyAPI/LeaveParty";
import { useNavigationGuard } from "@/store/useNavigationGuard";

export const useLeaveParty = () => {
    const queryClient = useQueryClient();
    const { setPartyState } = useNavigationGuard();

    return useMutation({
        mutationFn: (partyId: number) => leaveParty(partyId),
        onSuccess: () => {
            // Clear navigation guard state immediately
            setPartyState(false, null);

            // Invalidate parties list to reflect changes
            queryClient.invalidateQueries({ queryKey: ["parties"] });
            queryClient.invalidateQueries({ queryKey: ["hostedParties"] });
            queryClient.invalidateQueries({ queryKey: ["partyDetail"] });
        },
        onError: (error) => {
            console.error("Failed to leave party:", error);
        }
    });
};
