import { useState, useEffect } from 'react';
import { useNavigationGuard } from '@/store/useNavigationGuard';

/**
 * 대기실 상태 관리 Hook
 */
export const useWaitingRoomState = (
    partyId: number,
    isHost: boolean,
    isPartyActive: boolean
) => {
    const { setPartyState } = useNavigationGuard();
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [showError, setShowError] = useState(false);

    // Set navigation guard state
    useEffect(() => {
        setPartyState(true, partyId, isHost, isPartyActive);
    }, [partyId, setPartyState, isHost, isPartyActive]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            setPartyState(false, null);
        };
    }, [setPartyState]);

    return {
        isLeaveModalOpen,
        setIsLeaveModalOpen,
        showError,
        setShowError
    };
};
