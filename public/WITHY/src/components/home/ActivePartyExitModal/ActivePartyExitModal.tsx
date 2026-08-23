'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, LogOut } from 'lucide-react';
import { useDeleteParty } from '@/hooks/home/PartyHooks/useDeleteParty';
import { useNavigationGuard } from '@/store/useNavigationGuard';

interface ActivePartyExitModalProps {
    partyId: number;
    onClose: () => void;
    onDeleteSuccess?: () => void; // Optional callback after successful deletion
    redirectPath?: string; // Optional redirect path (default: '/home')
}

/**
 * Self-contained modal for active party exit
 * Calls DELETE API (party deletion) and redirects to home
 * Used when host tries to navigate away from active (LIVE) party
 */
const ActivePartyExitModal = ({ partyId, onClose, onDeleteSuccess, redirectPath = '/home' }: ActivePartyExitModalProps) => {
    const router = useRouter();
    const deletePartyMutation = useDeleteParty();
    const { setPartyState, setAllowNavigation } = useNavigationGuard();

    const handleConfirm = () => {
        deletePartyMutation.mutate(partyId, {
            onSuccess: () => {

                // 1. Clear navigation guard state FIRST
                setPartyState(false, null);

                // 2. Allow navigation (bypasses beforeunload warning)
                setAllowNavigation(true);

                // 3. CRITICAL: Remove beforeunload listener immediately
                if (typeof (window as any).__removeBeforeUnload === 'function') {
                    (window as any).__removeBeforeUnload();
                }

                // 4. Close modal
                onClose();

                // 5. Small delay to ensure state propagates before navigation
                setTimeout(() => {
                    // Execute custom callback if provided
                    if (onDeleteSuccess) {
                        onDeleteSuccess();
                    } else {
                        // Redirect to specified path or home
                        router.push(redirectPath);
                    }
                }, 50); // 50ms delay ensures beforeunload listener sees updated state
            },
            onError: (err: any) => {
                console.error('[ActivePartyExitModal] Delete party failed:', err);

                // Show error alert
                if (err.response?.status === 403) {
                    alert('파티 삭제 권한이 없습니다.');
                } else {
                    alert('파티 삭제에 실패했습니다.');
                }

                // Fail-open: Clear state and redirect anyway
                setPartyState(false, null);

                // Allow navigation even on error
                setAllowNavigation(true);

                // CRITICAL: Remove beforeunload listener immediately
                if (typeof (window as any).__removeBeforeUnload === 'function') {
                    (window as any).__removeBeforeUnload();
                }

                // Close modal
                onClose();

                // Small delay before redirect
                setTimeout(() => {
                    router.push('/home');
                }, 50);
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-border animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="px-6 py-4 bg-secondary flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-primary rounded-full" />
                        <h2 className="text-lg font-black text-foreground tracking-tight">
                            파티 나가기
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={deletePartyMutation.isPending}
                        className="p-2 bg-muted/50 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-2">
                        <LogOut size={32} className="text-destructive ml-1" />
                    </div>

                    <div className="space-y-2 flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-foreground">
                            파티를 나가시겠습니까?
                        </h3>

                        {/* Warning for active party */}
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-2">
                            <p className="text-red-500 text-sm font-bold leading-relaxed">
                                파티가 진행 중입니다.
                                <br />
                                호스트가 퇴장하면 파티가 삭제됩니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-black/20 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={deletePartyMutation.isPending}
                        className="flex-1 py-4 bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground rounded-[20px] font-bold transition-all"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={deletePartyMutation.isPending}
                        className="flex-1 py-4 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[20px] font-bold shadow-lg shadow-destructive/20 transition-all flex items-center justify-center gap-2"
                    >
                        {deletePartyMutation.isPending ? (
                            <span className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
                        ) : (
                            <>나가기</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivePartyExitModal;
