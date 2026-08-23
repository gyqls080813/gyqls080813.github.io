// src/components/home/CardContainer/PartyCard/PartyCard.tsx
"use client";

import React from 'react';
import Image from "next/image";
import { Lock, Users } from "lucide-react";
import { useEnterParty } from "@/hooks/home/PartyHooks/useEnterParty";
import { useGuardedRouter } from "@/hooks/useGuardedRouter";
import AlertModal from "@/components/common/Modal/AlertModal";
import PasswordInputModal from "@/components/home/PasswordInputModal/PasswordInputModal";
import LeavePartyModal from "@/components/home/LeavePartyModal/LeavePartyModal";
import { getKSTDate } from '@/utils/timezone';

// Helper for Scheduled Time Display
const getScheduledTime = (party: any) => {
  // Only show time for waiting (non-active) parties
  if (party.isActive) return "";

  const timeStr = party.scheduledActiveTime || party.scheduledTime;
  if (!timeStr) return "";

  const target = getKSTDate(timeStr);
  if (isNaN(target.getTime())) return "";

  const now = new Date();
  if (target.getTime() <= now.getTime()) return ""; // Don't show past times

  // Calculate time difference
  const diffMs = target.getTime() - now.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  // Rule 1: Less than 1 hour - show "00분 후 시작"
  if (diffHours < 1) {
    return `${diffMinutes}분 후 시작`;
  }

  // Rule 2: Less than 24 hours - show "00시간 후 시작"
  if (diffHours < 24) {
    return `${diffHours}시간 후 시작`;
  }

  // Rule 3: 24 hours or more - show "00일 후 시작"
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 후 시작`;
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

import { useNavigationGuard } from "@/store/useNavigationGuard"; // Added import

const PartyCard = ({ party }: { party: any }) => {
  const router = useGuardedRouter();
  const { setPartyState } = useNavigationGuard();
  const { checkEntryEligibility, isLoading, error } = useEnterParty();
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

  const handleCardClick = async () => {
    if (isLoading) return;

    if (party.isPrivate) {
      setIsPasswordModalOpen(true);
      return;
    }
    await processEntry(undefined);
  };

  const processEntry = async (password: string | undefined) => {
    try {
      const partyId = party.id || party.partyId;
      if (!partyId) {
        console.error("Party ID is missing");
        return;
      }

      const entryData = await checkEntryEligibility(partyId, password);

      if (entryData) {
        // [Modified] 입장 시 파티 정보 저장 (isActive 즉시 반영)
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
        // Only show modal if there's a specific error from useEnterParty
        setShowErrorModal(true);
      }
    } catch (e) {
      console.error("Party enter failed:", e);
      // Don't show modal for generic errors
    }
  };

  React.useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setShowErrorModal(true);
    }
  }, [error]);

  const isLive = party.isActive;
  // Use scheduledActiveTime for time display
  const timeString = getScheduledTime(party);
  const platformLogo = getPlatformLogo(party.platform);
  const { color: platformColor, label: platformLabel } = getPlatformStyle(party.platform);

  const isOtt = party.platform?.toUpperCase() === 'NETFLIX' || party.platform?.toUpperCase() === 'OTT';

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

      {/* Navigation Guard Modal */}
      {router.isModalOpen && (
        <LeavePartyModal
          onClose={router.handleModalClose}
          onConfirm={router.handleLeaveConfirm}
          isPending={router.isPending}
          isHost={router.isHost}
        />
      )}

      <div
        onClick={handleCardClick}
        className="group flex flex-col w-full h-full cursor-pointer bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 transition-none"
      >
        {/* 1. Thumbnail Section - Flush to top, No hover scale */}
        <div className={`relative w-full bg-neutral-900 border-b border-white/5 ${isOtt ? 'aspect-[2/3]' : 'aspect-video'}`}>
          <Image
            src={party.thumbnail || "/default-poster.png"}
            alt={party.title || "Party"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Gradient for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />

          {/* Top Left: Live Badge & Viewers */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
            <div className={`
                      flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm
                      ${isLive
                ? 'bg-red-600 text-white'
                : 'bg-neutral-600 text-white'
              }
                  `}>
              {isLive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              {isLive ? 'LIVE' : 'WAITING'}
            </div>

            {/* Participant Count: No '명' suffix */}
            <div className="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
              <Users className="w-3 h-3" />
              <span>{party.currentParticipants || 0} / {party.maxParticipants || 0}</span>
            </div>
          </div>

          {/* Secret Room Lock Icon (Bottom Right) */}
          {party.isPrivate && (
            <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-10">
              <Lock className="w-3.5 h-3.5 text-white/90" />
            </div>
          )}
        </div>

        {/* 2. Content Info Section - Padded */}
        <div className="flex flex-col p-4 gap-2">
          {/* Title Row: Flex for Title + Time */}
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-[16px] font-bold text-neutral-100 leading-snug truncate flex-1">
              {party.title}
            </h3>
            {/* Time Display */}
            {timeString && (
              <span className="text-[12px] text-primary font-medium whitespace-nowrap mt-0.5">
                {timeString}
              </span>
            )}
          </div>

          {/* Metadata: Tags Style (Badges) */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
            {/* Platform Tag (First) - Logo Image vs Text Badge */}
            {party.platform && (
              platformLogo ? (
                // Logo: Fixed-size box (w-8 h-6) to ensure consistent "tag" dimensions and spacing margins
                <span className="w-8 h-6 flex items-center justify-center">
                  <img
                    src={platformLogo}
                    alt={party.platform}
                    className="h-4 w-auto object-contain select-none"
                  />
                </span>
              ) : (
                // Text Fallback: Badge Style
                <span className={`bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 ${platformColor}`}>
                  {platformLabel}
                </span>
              )
            )}

            {/* Genre Tag (Second) */}
            <span className="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 truncate max-w-[100px] h-6 flex items-center">
              {party.genreNames?.[0] || party.genre || "일반"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartyCard;