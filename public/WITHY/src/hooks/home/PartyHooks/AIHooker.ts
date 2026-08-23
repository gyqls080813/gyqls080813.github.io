// src/hooks/home/PartyHooks/AIHooker.ts
import { useQuery } from "@tanstack/react-query";
import { fetchAIPartyList, AIParty } from "@/api/home/PartyAPI/FindAIPartyList";

export const useAIContents = () => {
    return useQuery<AIParty[]>({
        queryKey: ["aiRecommendParties"],
        queryFn: fetchAIPartyList,
        staleTime: 500,
        gcTime: 1000 * 60 * 30,
        retry: 1, // Only retry once on failure
        retryDelay: 1000, // Wait 1s before retry
        // Return empty array on error instead of throwing
        placeholderData: [],
    });
};