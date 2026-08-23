import { useState, useCallback } from 'react';
import { getHostedPartyList, HostedPartyData } from '@/api/home/PartyAPI/FindHostedPartyList';

export const useHostedPartyList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHostedParties = useCallback(async (page = 0, size = 10): Promise<HostedPartyData | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getHostedPartyList(page, size);
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err: any) {
            console.error("Hosted Party List fetch failed", err);
            const errorMessage = err.response?.data?.message || err.message || "파티 목록 조회에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        fetchHostedParties,
        isLoading,
        error
    };
};
