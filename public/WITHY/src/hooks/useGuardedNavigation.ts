'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNavigationGuard } from '@/store/useNavigationGuard';
import { useLeaveParty } from '@/hooks/home/PartyHooks/useLeaveParty';

/**
 * Centralized hook for guarded navigation from waiting room
 * 
 * Handles party exit logic consistently across all navigation buttons:
 * - Not in party → Navigate immediately
 * - In party (guest or inactive host) → Auto-leave and navigate
 * - In party (active host) → Show confirmation modal
 * 
 * Usage:
 * ```tsx
 * const { guardedNavigate, isExitModalOpen, ... } = useGuardedNavigation();
 * 
 * <button onClick={() => guardedNavigate('/home')}>Logo</button>
 * 
 * {isExitModalOpen && (
 *   <ActivePartyExitModal
 *     partyId={partyIdToLeave}
 *     redirectPath={pendingDestination}
 *     onClose={() => setIsExitModalOpen(false)}
 *   />
 * )}
 * ```
 */
export const useGuardedNavigation = () => {
    const router = useRouter();
    const { isInParty, partyIdToLeave, isHost, isActive, setPartyState } = useNavigationGuard();
    const leavePartyMutation = useLeaveParty();

    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [pendingDestination, setPendingDestination] = useState<string | null>(null);

    /**
     * Auto-leave party without confirmation
     * Used for guests and inactive hosts
     */
    const handleAutoLeave = (destination: string) => {
        if (!partyIdToLeave) {

            router.push(destination);
            return;
        }

        leavePartyMutation.mutate(partyIdToLeave, {
            onSuccess: () => {

                setPartyState(false, null);
                router.push(destination);
            },
            onError: (err: any) => {
                console.error('[useGuardedNavigation] Auto-leave failed:', err);
                // Fail-open: Clear state and redirect anyway
                setPartyState(false, null);
                router.push('/home');
            }
        });
    };

    /**
     * Main navigation function with party exit guards
     * 
     * @param destination - Target URL path (e.g., '/home', '/mypage')
     */
    const guardedNavigate = (destination: string) => {


        // Not in party → Navigate immediately
        if (!isInParty) {

            router.push(destination);
            return;
        }

        // In party → Check host and active status
        if (isHost && isActive) {
            // Active host → Show confirmation modal
            setPendingDestination(destination);
            setIsExitModalOpen(true);
        } else {
            // Guest or inactive host → Auto-leave
            handleAutoLeave(destination);
        }
    };

    /**
     * Close modal and clear pending destination
     */
    const closeModal = () => {
        setIsExitModalOpen(false);
        setPendingDestination(null);
    };

    return {
        guardedNavigate,
        isExitModalOpen,
        setIsExitModalOpen,
        closeModal,
        pendingDestination,
        partyIdToLeave,
        isLoading: leavePartyMutation.isPending,
    };
};
