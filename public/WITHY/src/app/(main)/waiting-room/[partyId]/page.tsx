'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ExternalLink, ArrowLeft, LogOut, Trash2, AlertTriangle } from 'lucide-react';
import { usePartyDetail } from '@/hooks/party/usePartyDetail';
import { useLeaveParty } from '@/hooks/home/PartyHooks/useLeaveParty';
import { useActivateParty } from '@/hooks/home/PartyHooks/useActivateParty';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigationGuard } from '@/store/useNavigationGuard';
import { useGuardedNavigation } from '@/hooks/useGuardedNavigation';
import ActivePartyExitModal from '@/components/home/ActivePartyExitModal/ActivePartyExitModal';
import AlertModal from '@/components/common/Modal/AlertModal';
import { getKSTDate } from '@/utils/timezone';

// Helper for Relative Time with Days and Hours
const getRelativeTime = (timeStr?: string) => {
    if (!timeStr) return "";

    const now = new Date();
    const target = getKSTDate(timeStr);

    if (isNaN(target.getTime())) return "";

    const diff = target.getTime() - now.getTime();
    const absDiff = Math.abs(diff);

    // Calculate days, hours, and minutes
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

    // Build time string
    let timeString = "";

    if (days > 0) {
        timeString += `${days}일`;
        if (hours > 0) {
            timeString += ` ${hours}시간`;
        }
    } else if (hours > 0) {
        timeString += `${hours}시간`;
        if (minutes > 0) {
            timeString += ` ${minutes}분`;
        }
    } else {
        timeString += `${minutes}분`;
    }

    // Add 전/후
    return diff > 0 ? `${timeString} 후` : `${timeString} 전`;
};

// Helper for Platform Logo
const getPlatformLogo = (platform?: string) => {
    const p = platform?.toUpperCase();
    if (p === 'NETFLIX' || p === 'OTT') return "/logo/NETFLIX.png";
    if (p === 'YOUTUBE') return "/logo/Youtube.png";
    return null;
};

// Helper for Platform Colors (Same as BentoCard)
const getPlatformStyle = (platform?: string) => {
    const p = platform?.toUpperCase() || "";
    if (p === 'YOUTUBE') return { color: 'text-red-600', label: 'YouTube' };
    if (p === 'NETFLIX' || p === 'OTT') return { color: 'text-red-500', label: 'Netflix' };
    if (p === 'TWITCH') return { color: 'text-[#9146FF]', label: 'Twitch' };
    return { color: 'text-gray-400', label: platform || 'Unknown' };
};

export default function WaitingRoomPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const partyId = Number(params?.partyId);

    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);

    // API Calls
    const { data: party, isLoading, isError, refetch } = usePartyDetail(partyId);

    const leavePartyMutation = useLeaveParty();
    const activatePartyMutation = useActivateParty();


    // Navigation Guard & Global State
    const { setPartyState, isHost: storedIsHost, allowNavigation } = useNavigationGuard();
    const {
        guardedNavigate,
        isExitModalOpen,
        setIsExitModalOpen,
        closeModal,
        pendingDestination,
        partyIdToLeave: guardedPartyId
    } = useGuardedNavigation();

    // [FIX] 입장 시점의 isHost 값을 ref로 저장하여 보존
    // storedIsHost는 다른 컴포넌트에서 setPartyState(false, null) 호출 시 false로 리셋될 수 있음
    // 따라서 최초 입장 시점의 값을 ref에 저장하고 그것을 계속 사용
    const initialIsHostRef = useRef<boolean | null>(null);

    // 최초 마운트 시점에 storedIsHost 값을 저장
    if (initialIsHostRef.current === null && storedIsHost !== false) {
        initialIsHostRef.current = storedIsHost;
    }

    // Derived State from API
    const isPartyActive = party?.isActive || false;

    // Auth & Permissions
    const { user } = useAuthStore();

    // [Modified] 호스트 여부 - 입장 시점에 저장된 값을 신뢰
    // ref에 저장된 초기값 사용, fallback으로 storedIsHost 사용
    const isHost = initialIsHostRef.current ?? storedIsHost;

    // [NEW] Restore host status from localStorage on page refresh
    useEffect(() => {
        // Only restore if ref is not already set
        if (initialIsHostRef.current !== null) {
            return;
        }

        try {
            const stored = localStorage.getItem('party_host_status');

            if (stored) {
                const { partyId: storedPartyId, isHost, timestamp } = JSON.parse(stored);

                // Verify partyId matches and data is recent (< 24 hours)
                const isRecent = Date.now() - timestamp < 86400000; // 24 hours

                if (storedPartyId === partyId && isRecent && isHost) {
                    initialIsHostRef.current = true;
                    setPartyState(true, partyId, true, party?.isActive || false);
                }
            }
        } catch (error) {
            console.error('Failed to restore host status from localStorage:', error);
        }
    }, [partyId, party, setPartyState]);



    // ... existing useEffects for monitoring host status ...

    // [FIX] Set navigation guard state immediately when entering waiting room
    // This prevents Plus button from showing before party data loads
    useEffect(() => {
        if (partyId && !isNaN(partyId) && partyId > 0) {
            // Set isInWaitingRoom to true immediately, even before party data loads
            // This prevents the Plus button from appearing during loading
            setPartyState(true, partyId, initialIsHostRef.current ?? false, false);
        }
    }, [partyId, setPartyState]);

    // Update navigation guard state when party data loads
    useEffect(() => {
        if (party && initialIsHostRef.current !== null) {
            // ref에 저장된 초기 isHost 값으로 업데이트
            setPartyState(true, partyId, initialIsHostRef.current, isPartyActive);
        }
    }, [partyId, setPartyState, isPartyActive, party]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            // Note: Don't clear localStorage here because page refresh triggers unmount
            // localStorage will be overwritten on next party entry or expire after 24h
            setPartyState(false, null);
        };
    }, [setPartyState]);

    // 🚨 Detect Deleted Party (isDeleted = true)
    useEffect(() => {

        if (party?.isDeleted) {
            // Show custom modal instead of system alert
            setIsDeletedModalOpen(true);
        }
    }, [party?.isDeleted, partyId, party]);

    // 🔒 Browser Back Button Guard (Active Host Only)
    useEffect(() => {
        // Only block back navigation for active hosts
        if (!isHost || !isPartyActive) {
            return; // Allow free navigation for guests and inactive hosts
        }

        const handlePopState = (event: PopStateEvent) => {
            // Prevent back navigation by pushing state again
            window.history.pushState(null, "", window.location.href);

            // Show exit modal (will DELETE party)
            setIsExitModalOpen(true);
        };

        // Initialize Guard: Add current state to history
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isHost, isPartyActive]);

    // 3. Page Refresh/Close Protection (beforeunload)
    const beforeUnloadCleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // Allow navigation if explicitly permitted (e.g., after party deletion)
            if (allowNavigation) {
                return;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Store cleanup function in ref so it can be called externally
        beforeUnloadCleanupRef.current = () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            beforeUnloadCleanupRef.current = null;
        };
    }, [isHost, isPartyActive, allowNavigation]);

    // Expose cleanup function via window for ActivePartyExitModal to use
    useEffect(() => {
        (window as any).__removeBeforeUnload = () => {
            if (beforeUnloadCleanupRef.current) {
                beforeUnloadCleanupRef.current();
            }
        };

        return () => {
            delete (window as any).__removeBeforeUnload;
        };
    }, []);

    // Debounce error display by 3 seconds
    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setShowError(true);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setShowError(false);
        }
    }, [isError]);

    // Handle leaving party for participants or inactive parties
    const handleLeaveParty = () => {
        leavePartyMutation.mutate(partyId, {
            onSuccess: () => {
                router.push('/home');
            },
            onError: (err: any) => {
                console.error("Leave party failed:", err);
                if (err.response?.status === 403) {
                    alert("퇴장 권한이 없습니다.");
                } else {
                    alert("파티 퇴장에 실패했습니다.");
                }
            }
        });
    };




    // Handle Activate Party (Host only)
    const handleActivateParty = () => {
        // 1. Dispatch custom event for extension to pick up (and open tab + save ID)
        if (party?.startUrl) {
            const event = new CustomEvent('WIDDY_OPEN_PARTY_TAB', {
                detail: { url: party.startUrl }
            });
            window.dispatchEvent(event);
        }

        // 2. Call API to activate party
        activatePartyMutation.mutate(partyId, {
            onSuccess: async () => {
                // Refetch party data to get updated isActive status
                await refetch();
            },
            onError: (err: any) => {
                console.error("Activate party failed:", err);
                alert("파티 활성화에 실패했습니다.");
            }
        });
    };

    const handleExtensionSync = () => {
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    // Handle API errors or non-existent party (not deleted, just error)
    if (showError || (!party && !isLoading)) {
        return (
            <div className="flex items-center justify-center h-full bg-black text-white flex-col gap-4">
                <AlertTriangle className="w-16 h-16 text-red-500" />
                <p className="text-xl font-bold">파티를 찾을 수 없습니다</p>
                <button
                    onClick={() => router.push('/home')}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                >
                    홈으로 돌아가기
                </button>
            </div>
        );
    }

    const platformLogo = getPlatformLogo(party.platform);
    const { color: platformColor, label: platformLabel } = getPlatformStyle(party.platform);

    // Time Logic
    const timeLeft = getRelativeTime(party.scheduledActiveTime);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            {/* Background Video Layer */}
            <div className="absolute inset-0 w-full h-full z-0">
                {!isPartyActive ? (
                    /* 광고 모드 - 전체 화면 YouTube */
                    <div className="w-full h-full flex flex-col items-center justify-center text-white">
                        <div className="absolute inset-0 w-full h-full">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/8QE3y-ws7ew?autoplay=1&mute=1&loop=1&playlist=8QE3y-ws7ew&controls=0&showinfo=0&modestbranding=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="object-cover"
                            ></iframe>
                        </div>
                        {/* Overlay for time and activation button */}
                        <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-6 z-50">
                            {isHost && (
                                <button
                                    onClick={handleActivateParty}
                                    disabled={activatePartyMutation.isPending}
                                    className="flex items-center gap-3 px-12 py-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-2xl font-bold text-2xl transition-all shadow-2xl cursor-pointer"
                                >
                                    <ExternalLink className="w-7 h-7" />
                                    {activatePartyMutation.isPending ? '활성화 중...' : '파티 시작하기'}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    /* 활성화 모드 - 경고 문구 표시 (Redesigned) */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/60 backdrop-blur-md text-white p-6 z-20 animate-in fade-in duration-700">
                        <div className="w-full max-w-2xl bg-neutral-900/80 border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-500">

                            {/* Icon & Title */}
                            <div className="flex flex-col items-center gap-6 mb-10">
                                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                                    <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                                    잠시만요!
                                </h2>
                            </div>

                            {/* Divider with glow */}
                            <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full opacity-50 mb-10" />

                            {/* Content */}
                            <div className="space-y-8 text-xl md:text-2xl font-bold text-gray-200 leading-relaxed">
                                <p>
                                    현재 페이지를 <span className="text-red-500 underline underline-offset-8 decoration-4 decoration-red-500/50">나가야</span><br />
                                    파티에서 완전히 퇴장됩니다.
                                </p>

                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mx-4">
                                    <p className="text-base md:text-lg text-gray-400 font-medium mb-3">
                                        파티 유지 중 다른 앱 실행 시
                                    </p>
                                    <div className="flex items-center justify-center gap-3 flex-wrap">
                                        <span className="px-4 py-2 bg-[#FF0000]/20 text-[#FF0000] rounded-lg border border-[#FF0000]/20 flex items-center gap-2">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" /></svg>
                                            YouTube
                                        </span>
                                        <span className="px-4 py-2 bg-[#E50914]/20 text-[#E50914] rounded-lg border border-[#E50914]/20 flex items-center gap-2">
                                            <span className="font-black text-lg leading-none">N</span>
                                            Netflix
                                        </span>
                                    </div>
                                    <p className="mt-4 text-red-400 font-bold">
                                        원격 조작이 될 수 있으니 주의해주세요.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={() => {
                                        if (party?.startUrl) {
                                            const event = new CustomEvent('WIDDY_OPEN_PARTY_TAB', {
                                                detail: { url: party.startUrl }
                                            });
                                            window.dispatchEvent(event);
                                        }
                                    }}
                                    className="flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-xl transition-all shadow-2xl cursor-pointer"
                                >
                                    <ExternalLink className="w-6 h-6" />
                                    파티 다시 참여하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay: Top Info Bar */}
            <div className="absolute top-0 left-0 w-full z-10 p-8 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-between">
                {/* Left: Title */}
                <div className="flex items-start gap-4">
                    <div className="text-white">
                        <div className="flex items-center gap-3">
                            {/* Back Button */}
                            <button
                                onClick={() => guardedNavigate('/home')}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
                                title="홈으로 돌아가기"
                            >
                                <ArrowLeft className="w-6 h-6 text-white" />
                            </button>
                            <h1 className="text-3xl font-bold drop-shadow-md">{party.title}</h1>
                        </div>
                        {/* Start time in red below title */}
                        {!isPartyActive && timeLeft && (
                            <p className="text-red-500 text-xl font-bold mt-2 drop-shadow-md">
                                {timeLeft} 시작 예정
                            </p>
                        )}
                    </div>
                </div>

                {/* Right: Status Badges */}
                <div className="flex items-center gap-3">
                    {/* Delete Party Button (Host Only) */}
                    {isHost && (
                        <button
                            onClick={() => setIsLeaveModalOpen(true)}
                            className="flex items-center justify-center w-[34px] h-[34px] rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors"
                            title="파티 삭제"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}

                    {/* Live/Waiting Badge */}
                    <div className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wider uppercase shadow-sm
                        ${isPartyActive ? 'bg-red-600 text-white' : 'bg-neutral-600 text-white'}
                    `}>
                        {isPartyActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                        {isPartyActive ? 'LIVE' : 'WAITING'}
                    </div>

                </div>
            </div>

            {/* Active Party Exit Modal (Back Button / Browser Back / Trash Button) */}
            {isLeaveModalOpen && (
                <ActivePartyExitModal
                    partyId={partyId}
                    onClose={() => setIsLeaveModalOpen(false)}
                />
            )}

            {/* Active Party Exit Modal for Guarded Navigation (Back Button) */}
            {isExitModalOpen && guardedPartyId && (
                <ActivePartyExitModal
                    partyId={guardedPartyId}
                    onClose={closeModal}
                    redirectPath={pendingDestination || '/home'}
                />
            )}

            {/* Deleted Party Alert Modal */}
            <AlertModal
                isOpen={isDeletedModalOpen}
                onClose={() => {
                    setIsDeletedModalOpen(false);
                    router.push('/home');
                }}
                title="파티 삭제됨"
                message="이 파티는 삭제되었습니다."
            />
        </div>
    );
}