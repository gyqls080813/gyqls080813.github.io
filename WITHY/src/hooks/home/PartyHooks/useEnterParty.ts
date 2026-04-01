import { useState } from 'react';
import { enterParty, EnterPartyResponse, EnterPartyData } from '@/api/home/PartyAPI/EnterParty';

export const useEnterParty = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkEntryEligibility = async (partyId: number, password?: string): Promise<EnterPartyData | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response: EnterPartyResponse = await enterParty(partyId, password);

            // 성공 시 status 200 (OK)
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message || "입장에 실패했습니다.");
                return null;
            }
        } catch (err: any) {
            console.error("Party Entry Request failed", err);

            // API 에러 응답 파싱
            const status = err.response?.status;
            const message = err.response?.data?.message || "";

            // 상태 코드별 에러 메시지
            let errorMessage = message || "파티 입장에 실패했습니다.";

            if (status === 403) {
                // 권한 없음 - 이미 참가 중이거나, 차단되었거나, 인원 초과
                if (message.includes("already") || message.includes("이미")) {
                    // Auto-redirect to waiting room immediately without error message
                    window.location.href = `/waiting-room/${partyId}`;
                    return null; // Stop execution here
                } else if (message.includes("banned") || message.includes("차단")) {
                    errorMessage = "해당 파티에서 차단되었습니다.";
                } else if (message.includes("full") || message.includes("초과")) {
                    errorMessage = "파티 인원이 가득 찼습니다.";
                } else {
                    errorMessage = "파티에 입장할 권한이 없습니다.";
                }
            } else if (status === 404) {
                errorMessage = "존재하지 않는 파티입니다.";
            } else if (status === 401) {
                errorMessage = "비밀번호가 일치하지 않습니다.";
            }

            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        checkEntryEligibility,
        isLoading,
        error
    };
};
