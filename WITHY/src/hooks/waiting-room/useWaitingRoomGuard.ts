import { useEffect } from 'react';

/**
 * Navigation Guard Hook
 * 뒤로가기 및 페이지 새로고침/닫기를 방지
 */
export const useWaitingRoomGuard = (
    isHost: boolean,
    isPartyActive: boolean,
    onLeave: () => void,
    onShowModal: () => void
) => {
    // 뒤로가기 방지
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            // Prevent back navigation by pushing state again
            window.history.pushState(null, "", window.location.href);

            // Host + Active Party → Show modal (will DELETE)
            if (isHost && isPartyActive) {
                onShowModal();
            } else {
                // Participant or Waiting → Leave immediately
                onLeave();
            }
        };

        // Initialize Guard
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isHost, isPartyActive, onLeave, onShowModal]);

    // 페이지 새로고침/닫기 방지 (호스트 + 활성화 파티만)
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isHost && isPartyActive) {
                e.preventDefault();
                e.returnValue = '';
                return '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isHost, isPartyActive]);
};
