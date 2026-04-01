"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { GenreParty } from '@/api/home/PartyAPI/FindGenrePartyList';
import { useAuthStore } from '@/store/useAuthStore';
import { useEnterParty } from '@/hooks/home/PartyHooks/useEnterParty';
import { useNavigationGuard } from '@/store/useNavigationGuard';
import AlertModal from '@/components/common/Modal/AlertModal';
import PasswordInputModal from '@/components/home/PasswordInputModal/PasswordInputModal';
import { getKSTTimeComponents } from '@/utils/timezone';

interface TimelinePartyItemProps {
    party: GenreParty;
    size?: 'small' | 'medium';
}

// Size variant configuration
const SIZE_CONFIG = {
    small: {
        container: 'p-2 rounded',
        timeText: 'text-xs',
        titleText: 'text-xs',
        badge: 'px-1 py-0.5 text-[8px]',
        layout: 'vertical' as const,
    },
    medium: {
        container: 'p-3 rounded-lg',
        timeText: 'text-sm',
        titleText: 'text-sm',
        badge: 'px-2 py-0.5 text-xs',
        layout: 'horizontal' as const,
    },
} as const;

const TimelinePartyItem: React.FC<TimelinePartyItemProps> = ({ party, size = 'small' }) => {
    const router = useRouter();
    const { user } = useAuthStore();

    const formatTime = (dateString: string) => {
        if (!dateString) {
            console.warn('⚠️ scheduledActiveTime is missing for party:', party.title);
            return '--:--';
        }

        try {
            const { hours, minutes } = getKSTTimeComponents(dateString);
            return `${hours}:${String(minutes).padStart(2, '0')}`;
        } catch (error) {
            console.warn('⚠️ Invalid scheduledActiveTime for party:', party.title, dateString);
            return '--:--';
        }
    };

    const isHost = user?.userId === party.host?.userId;
    const timeText = formatTime(party.scheduledActiveTime);
    const config = SIZE_CONFIG[size];

    // Party entry logic
    const { setPartyState } = useNavigationGuard();
    const { checkEntryEligibility, isLoading, error } = useEnterParty();
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

    const handleClick = async () => {
        if (isLoading) return;

        if (party.isPrivate) {
            setIsPasswordModalOpen(true);
            return;
        }
        await processEntry(undefined);
    };

    const processEntry = async (password: string | undefined) => {
        try {
            const partyId = party.id;
            if (!partyId) {
                console.error("Party ID is missing");
                return;
            }

            const entryData = await checkEntryEligibility(partyId, password);

            if (entryData) {
                setPartyState(true, partyId, entryData.isHost, entryData.isActive);

                // Save host status to localStorage for page refresh persistence
                if (entryData.isHost) {
                    localStorage.setItem('party_host_status', JSON.stringify({
                        partyId,
                        isHost: true,
                        timestamp: Date.now()
                    }));
                }

                router.push(`/waiting-room/${partyId}`);
            } else if (error) {
                setShowErrorModal(true);
            }
        } catch (e) {
            // console.error("Party enter failed:", e);
        }
    };

    React.useEffect(() => {
        if (error) {
            setErrorMessage(error);
            setShowErrorModal(true);
        }
    }, [error]);

    const LiveBadge = party.isActive ? (
        <span className={`${config.badge} font-bold bg-red-500 text-white rounded`}>
            LIVE
        </span>
    ) : null;

    return (
        <>
            <AlertModal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                title="입장 실패"
                message={errorMessage}
            />
            <PasswordInputModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onConfirm={(pwd) => processEntry(pwd)}
                title={party.title}
            />

            <div
                onClick={handleClick}
                className={`${config.container} bg-white/5 hover:bg-white/10 transition-all cursor-pointer border group ${isHost ? 'border-primary' : 'border-white/5'
                    }`}
            >
                {config.layout === 'vertical' ? (
                    <>
                        <div className="flex items-center gap-1.5 mb-1">
                            <span className={`${config.timeText} font-semibold text-primary`}>
                                {timeText}
                            </span>
                            {LiveBadge}
                        </div>
                        <div className={`${config.titleText} truncate group-hover:text-primary transition-colors`}>
                            {party.title}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className={`${config.timeText} font-semibold text-primary`}>
                            {timeText}
                        </span>
                        <span className="text-neutral-500">:</span>
                        <span className={`${config.titleText} group-hover:text-primary transition-colors flex-1`}>
                            {party.title}
                        </span>
                        {LiveBadge}
                    </div>
                )}
            </div>
        </>
    );
};

export default TimelinePartyItem;
