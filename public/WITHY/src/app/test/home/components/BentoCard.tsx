"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEnterParty } from "@/hooks/home/PartyHooks/useEnterParty";
import { MovieItem } from "../data/mockData";
import AlertModal from "@/components/common/Modal/AlertModal";
import PasswordInputModal from "@/components/home/PasswordInputModal/PasswordInputModal";

export interface GridItem extends MovieItem {
    index: number;
    status?: 'LIVE' | 'WAITING';
    platform?: string;
    hostprofile?: string;
    currentParticipants?: number;
    maxParticipants?: number;
    isPrivate?: boolean;
}

interface BentoCardProps {
    item: GridItem;
    hoveredItem?: GridItem | null;
    setHoveredItem?: (item: GridItem | null) => void;
}

// Platform Logo/Color Logic
const getPlatformStyle = (platform?: string) => {
    const p = platform?.toUpperCase() || "";
    if (p === 'YOUTUBE') return { color: 'text-red-600', label: 'YouTube' };
    if (p === 'NETFLIX' || p === 'OTT') return { color: 'text-red-500', label: 'Netflix' };
    if (p === 'TWITCH') return { color: 'text-[#9146FF]', label: 'Twitch' };
    return { color: 'text-gray-400', label: platform || 'Unknown' };
};

export const BentoCard = ({ item }: BentoCardProps) => {
    const router = useRouter();
    const { checkEntryEligibility, isLoading, error } = useEnterParty();
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

    const isLive = item.status === 'LIVE';
    const { color: platformColor, label: platformLabel } = getPlatformStyle(item.platform);

    const handleCardClick = async () => {
        if (isLoading) return;

        if (item.isPrivate) {
            setIsPasswordModalOpen(true);
            return;
        }

        await processEntry(undefined);
    };

    const processEntry = async (password: string | undefined) => {
        try {
            const partyId = item.id;
            const entryData = await checkEntryEligibility(partyId, password);

            if (entryData) {
                router.push(`/waiting-room/${partyId}?isHost=${entryData.isHost}`);
            } else {
                setShowErrorModal(true);
            }
        } catch (e) {
            console.error("Party enter failed:", e);
            setErrorMessage("알 수 없는 오류가 발생했습니다.");
            setShowErrorModal(true);
        }
    };

    React.useEffect(() => {
        if (error) {
            setErrorMessage(error);
            setShowErrorModal(true);
        }
    }, [error]);

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
                title={item.title}
            />
            <motion.div
                onClick={handleCardClick}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col w-full h-full cursor-pointer bg-transparent transition-all duration-300"
            >
                {/* 1. Thumbnail Section */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/5 group-hover:ring-2 group-hover:ring-primary/50 group-hover:-translate-y-1 transition-all duration-300 shadow-lg">
                    <Image
                        src={item.poster_path}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Top Left: Live/Waiting Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className={`
                            flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-md
                            ${isLive ? 'bg-red-600 text-white' : 'bg-[#8B5CF6] text-white'}
                        `}>
                            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                            {isLive ? 'LIVE' : 'WAITING'}
                        </div>
                    </div>

                    {/* Top Right: Private Lock Icon */}
                    {item.isPrivate && (
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                            <Lock className="w-3.5 h-3.5 text-white/80" />
                        </div>
                    )}

                    {/* Bottom Left: Participant Count */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-md border border-white/10">
                        <svg className="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{item.currentParticipants || 0} / {item.maxParticipants || 0}</span>
                    </div>
                </div>

                {/* 2. Content Info Section */}
                <div className="flex mt-3 gap-3 px-1">
                    <div className="video_card_profile flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 overflow-hidden border border-white/5 relative">
                            <Image
                                src={item.hostprofile || "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/09/urbanbrush-20190907002247212240.png"}
                                alt="Host"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="video_card_area flex flex-col min-w-0 flex-1 justify-center">
                        <h3 className="text-[15px] font-medium text-neutral-100 leading-snug truncate group-hover:text-primary transition-colors mb-1">
                            {item.title}
                        </h3>

                        <div className="flex items-center gap-1 text-[13px] text-neutral-500 truncate">
                            <span>{item.genre}</span>
                            {item.platform && (
                                <>
                                    <span className="text-neutral-700 mx-0.5">·</span>
                                    <span className={platformColor}>{platformLabel}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
