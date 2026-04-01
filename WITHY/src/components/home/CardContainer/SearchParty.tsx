"use client";

import React, { useState, useMemo } from 'react';
import PartyCardProps from "./PartyCard/PartyCard";
import { useSearchContents } from "@/hooks/home/PartyHooks/SearchHooker";
import EmptyState from "../EmptyState/EmptyState";

interface SearchPartyProps {
  platform?: string;
  search: string; // 🎯 필수 값으로 변경
}

const SearchParty = ({ platform, search }: SearchPartyProps) => {
  // 🎯 서버 검색 훅 사용
  const { data, isLoading, isError } = useSearchContents(search);

  // parties 배열을 flatMap으로 추출
  const allParties = data?.pages.flatMap((page) => page.data.parties) || [];

  // 🎯 검색 결과에서 존재하는 플랫폼 목록 추출
  const availablePlatforms = useMemo(() => {
    const platformSet = new Set(allParties.map(party => party.platform?.toUpperCase() || "OTHER"));
    return Array.from(platformSet).sort();
  }, [allParties]);

  // 🎯 플랫폼 필터 상태 관리 (기본값: 첫 번째 플랫폼)
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  // 첫 로드 시 첫 번째 플랫폼으로 초기화
  React.useEffect(() => {
    if (availablePlatforms.length > 0 && !selectedPlatform) {
      setSelectedPlatform(availablePlatforms[0]);
    }
  }, [availablePlatforms, selectedPlatform]);

  // 🎯 선택된 플랫폼에 따라 파티 필터링
  const displayParties = useMemo(() => {
    if (!selectedPlatform) return [];

    return allParties.filter(party => {
      const partyPlatform = party.platform?.toUpperCase() || "OTHER";
      // OTT와 NETFLIX를 같은 것으로 처리
      if (selectedPlatform === "NETFLIX" || selectedPlatform === "OTT") {
        return partyPlatform === "NETFLIX" || partyPlatform === "OTT";
      }
      return partyPlatform === selectedPlatform;
    });
  }, [allParties, selectedPlatform]);

  // 🎯 플랫폼별 로고 및 스타일
  const getPlatformInfo = (platform: string) => {
    const p = platform.toUpperCase();
    switch (p) {
      case "YOUTUBE":
        return { logo: "/logo/Youtube.png", label: "YouTube", color: "border-red-600 bg-red-600/10 text-red-600" };
      case "NETFLIX":
      case "OTT":
        return { logo: "/logo/NETFLIX.png", label: "Netflix", color: "border-red-500 bg-red-500/10 text-red-500" };
      case "TWITCH":
        return { logo: null, label: "Twitch", color: "border-[#9146FF] bg-[#9146FF]/10 text-[#9146FF]" };
      default:
        return { logo: null, label: platform, color: "border-neutral-500 bg-neutral-500/10 text-neutral-400" };
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-muted-foreground">결과를 불러오는 중...</p>
      </div>
    );
  }

  if (isError) return <EmptyState />;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* Search Result Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className="text-primary">'{search}'</span> 검색 결과
          <span className="ml-3 text-lg text-muted-foreground font-bold">
            ({allParties.length})
          </span>
        </h2>
      </div>

      {/* Platform Filter Buttons */}
      {allParties.length > 0 && (
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2">
          {/* Platform Buttons Only (No ALL button) */}
          {availablePlatforms.map((platform) => {
            const platformInfo = getPlatformInfo(platform);
            const count = allParties.filter(p => {
              const pp = p.platform?.toUpperCase() || "OTHER";
              if (platform === "NETFLIX" || platform === "OTT") {
                return pp === "NETFLIX" || pp === "OTT";
              }
              return pp === platform;
            }).length;
            const isSelected = selectedPlatform === platform ||
              ((selectedPlatform === "NETFLIX" || selectedPlatform === "OTT") &&
                (platform === "NETFLIX" || platform === "OTT"));

            return (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`
                  px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap
                  flex items-center gap-2 border-2
                  ${isSelected
                    ? `${platformInfo.color} shadow-lg`
                    : "border-white/10 bg-[#1f1f1f] text-neutral-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {platformInfo.logo && (
                  <img
                    src={platformInfo.logo}
                    alt={platformInfo.label}
                    className="h-4 w-auto object-contain"
                  />
                )}
                <span>{platformInfo.label} ({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Filtered Results Count */}
      {selectedPlatform && displayParties.length > 0 && (
        <div className="mb-6 text-sm text-neutral-400">
          {getPlatformInfo(selectedPlatform).label} 파티 <span className="text-white font-semibold">{displayParties.length}</span>개
        </div>
      )}

      {/* Results or Empty State */}
      {displayParties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayParties.map((party) => (
            <div key={party.id} className="flex justify-center w-full">
              <PartyCardProps key={party.id} party={party} />
            </div>
          ))}
        </div>
      ) : allParties.length > 0 && selectedPlatform ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <p className="text-lg text-neutral-400">
            {getPlatformInfo(selectedPlatform).label} 플랫폼의 검색 결과가 없습니다.
          </p>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default SearchParty;