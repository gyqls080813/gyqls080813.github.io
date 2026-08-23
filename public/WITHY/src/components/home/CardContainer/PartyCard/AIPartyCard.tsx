"use client";

import React from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { AIParty } from '@/api/home/PartyAPI/FindAIPartyList';
import { useEnterParty } from '@/hooks/home/PartyHooks/useEnterParty';
import { useGuardedRouter } from "@/hooks/useGuardedRouter";
import AlertModal from '@/components/common/Modal/AlertModal';
import PasswordInputModal from '@/components/home/PasswordInputModal/PasswordInputModal';
import LeavePartyModal from "@/components/home/LeavePartyModal/LeavePartyModal";
import { getKSTDate } from '@/utils/timezone';
import { useNavigationGuard } from "@/store/useNavigationGuard"; // Added

// Helper for Platform Logo
const getPlatformLogo = (platform?: string) => {
  const p = platform?.toUpperCase();
  if (p === 'NETFLIX' || p === 'OTT') return "/logo/NETFLIX.png";
  if (p === 'YOUTUBE') return "/logo/Youtube.png";
  return null;
};

// Helper for Scheduled Time Display
const getScheduledTime = (party: AIParty) => {
  const timeStr = party.scheduledActiveTime;
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

interface AIPartyCardProps {
  party: AIParty;
  isExpanded: boolean; // 🎯 마우스 호버 여부에 따른 확장 상태
}

const AIPartyCard = ({ party, isExpanded }: AIPartyCardProps) => {
  const router = useGuardedRouter();
  const { setPartyState } = useNavigationGuard();
  const { checkEntryEligibility, isLoading, error } = useEnterParty();
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

  // Calculate display values
  const isWaiting = !party.isActive;
  const timeString = isWaiting ? getScheduledTime(party) : "";

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
      const partyId = party.partyId;
      if (!partyId) {
        console.error("Party ID is missing");
        return;
      }

      const entryData = await checkEntryEligibility(partyId, password);

      if (entryData) {
        // Save party info and navigate to waiting room (isActive immediately reflected)
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
        onClick={handleCardClick}
        className={`
      relative h-[400px] rounded-[32px] overflow-hidden transition-all duration-700 ease-in-out cursor-pointer group
      ${isExpanded ? 'flex-[4] min-w-[500px] shadow-2xl border-2 border-red-600' : 'flex-1 min-w-[80px] grayscale hover:grayscale-0 border-2 border-transparent'}
    `}>
        {/* 🎬 배경 레이어: 썸네일 */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={party.contentThumbnail || "/placeholder-image.jpg"}
            alt={party.contentTitle}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* 그라데이션 오버레이: 글자가 잘 보이게 하단에 그림자 배치 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* 🎬 상단 왼쪽: 플랫폼/카테고리 태그 + 인원수 */}
        <div className={`absolute top-6 left-6 flex flex-col gap-2 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          {/* 플랫폼 / 카테고리 태그 */}
          <div className="flex gap-2 items-center">
            {/* Platform Text */}
            <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${party.platform === 'YOUTUBE' ? 'bg-red-600 text-white' : 'bg-black text-red-500'}`}>
              {party.platform === 'OTT' ? 'NETFLIX' : party.platform}
            </span>
            {party.genres?.slice(0, 2).map((genre: string, i: number) => (
              <span key={i} className="bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded border border-white/10">{genre}</span>
            ))}
          </div>

          {/* 참여 인원 */}
          <div className="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10 w-fit">
            <Users className="w-3 h-3" />
            <span>{party.currentParticipants}/{party.maxParticipants}</span>
          </div>
        </div>

        {/* 🎬 상단 오른쪽: LIVE/대기중 상태 */}
        {isExpanded && (
          <div className="absolute top-6 right-6">
            {party.isActive ? (
              <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded uppercase shadow-lg">
                LIVE
              </span>
            ) : (
              <span className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-xs font-bold rounded border border-white/10">
                대기중
              </span>
            )}
          </div>
        )}

        {/* 🎬 하단 정보: 제목 + 시간 */}
        <div className={`absolute bottom-8 left-8 right-8 transition-all duration-500 transform ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-white text-3xl font-black leading-tight drop-shadow-lg line-clamp-1">{party.title}</h3>
          {/* Scheduled Time for Waiting Parties */}
          {timeString && (
            <p className="text-red-400 text-sm font-bold mt-2 drop-shadow-md">
              {timeString}
            </p>
          )}
        </div>



        {/* Navigation Guard Modal */}
        {router.isModalOpen && (
          <LeavePartyModal
            onClose={router.handleModalClose}
            onConfirm={router.handleLeaveConfirm}
            isPending={router.isPending}
            isHost={router.isHost}
          />
        )}
      </div>
    </>
  );
};

export default AIPartyCard;
