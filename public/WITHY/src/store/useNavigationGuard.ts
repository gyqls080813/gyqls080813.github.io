import { create } from 'zustand';

interface NavigationGuardState {
    isInParty: boolean;
    partyIdToLeave: number | null;
    isHost: boolean;
    isActive: boolean;
    allowNavigation: boolean;
    setPartyState: (isInParty: boolean, partyId: number | null, isHost?: boolean, isActive?: boolean) => void;
    setAllowNavigation: (allow: boolean) => void;
}

/**
 * 파티 네비게이션 가드를 위한 전역 상태
 * 파티에 참가 중일 때 다른 페이지로 이동하려는 시도를 감지하고 모달을 표시
 */
export const useNavigationGuard = create<NavigationGuardState>((set) => ({
    isInParty: false,
    partyIdToLeave: null,
    isHost: false,
    isActive: false,
    allowNavigation: false,
    setPartyState: (isInParty, partyId, isHost = false, isActive = false) =>
        set({ isInParty, partyIdToLeave: partyId, isHost, isActive }),
    setAllowNavigation: (allow) => set({ allowNavigation: allow }),
}));
