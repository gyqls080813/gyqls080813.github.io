'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useNavigationGuard } from '@/store/useNavigationGuard';
import { useLeaveParty } from '@/hooks/home/PartyHooks/useLeaveParty';

/**
 * 파티 네비게이션 가드가 통합된 Router Hook
 * 
 * 사용법:
 * const router = useGuardedRouter();
 * router.push('/home'); // 파티에 참가 중이면 자동으로 모달 표시
 * 
 * 모달 렌더링:
 * {router.renderModal()}
 */
export const useGuardedRouter = () => {
    const nextRouter = useRouter();
    const { isInParty, partyIdToLeave, isHost, isActive, setPartyState } = useNavigationGuard();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingHref, setPendingHref] = useState<string | null>(null);
    const leavePartyMutation = useLeaveParty();

    // Handle leave confirmation
    // [Modified] Accepts optional immediate target to support non-modal flow
    const handleLeaveConfirm = useCallback((immediateTarget?: string) => {
        if (!partyIdToLeave) {
            console.error('[useGuardedRouter] No partyId to leave');
            return;
        }

        leavePartyMutation.mutate(partyIdToLeave, {
            onSuccess: () => {
                // Clear guard state
                setPartyState(false, null);
                setIsModalOpen(false);

                // Navigate to pending destination
                const target = immediateTarget || pendingHref;
                if (target) {
                    nextRouter.push(target);
                    // Only clear if we used state
                    if (!immediateTarget) setPendingHref(null);
                }
            },
            onError: (err: any) => {
                console.error('[useGuardedRouter] Leave party failed (redirecting to Home):', err);

                // 에러 발생 시에도 강제로 상태 초기화 및 홈으로 이동 (Fail-Open)
                setPartyState(false, null);
                setIsModalOpen(false);
                nextRouter.push('/home'); // 퇴장 실패 시 홈으로 리다이렉트
            }
        });
    }, [partyIdToLeave, leavePartyMutation, setPartyState, pendingHref, nextRouter]);

    // Guarded push function
    const guardedPush = useCallback((href: string) => {
        if (isInParty) {
            if (isHost && isActive) {
                // Host + Active: Show confirmation modal
                setPendingHref(href);
                setIsModalOpen(true);
            } else {
                // Guest or Inactive Host: Leave immediately
                handleLeaveConfirm(href);
            }
        } else {
            // Direct navigation
            nextRouter.push(href);
        }
    }, [isInParty, isHost, isActive, nextRouter, handleLeaveConfirm]);

    // Handle modal close (cancel)
    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        setPendingHref(null);
    }, []);

    return {
        // Spread all original router methods
        ...nextRouter,
        // Override push with guarded version
        push: guardedPush,
        // Modal state and handlers
        isModalOpen,
        handleLeaveConfirm,
        handleModalClose,
        isPending: leavePartyMutation.isPending,
        isInParty, // Expose party participation state
        partyIdToLeave, // Expose party ID
        isHost, // Expose host status
        isActive, // Expose active status
    };
};
