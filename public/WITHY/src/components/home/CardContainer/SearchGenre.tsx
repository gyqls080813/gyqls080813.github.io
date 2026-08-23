"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PartyCard from "./PartyCard/PartyCard";
import { useGenreContents } from "@/hooks/home/PartyHooks/GenreHooker";
import EmptyState from "../EmptyState/EmptyState";
import CategorySelector from '../CategorySelector/CategorySelector';
import TimelineCalendar from './TimelineCalendar';
import { useAuthStore } from '@/store/useAuthStore';

interface SearchGenreProps {
  platform: string;
  category?: string;
  label: string;
}

const SearchGenre = ({ platform, category, label }: SearchGenreProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();

  // URL 파라미터
  const statusParam = searchParams.get('status');
  const viewParam = searchParams.get('view');

  // 상태 관리
  const [showAllLive, setShowAllLive] = useState(false);

  // isActive 값 계산
  const isActive = viewParam === 'timeline' ? undefined : (statusParam === 'active' ? true : statusParam === 'inactive' ? false : undefined);
  const requestCategory = category || "";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useGenreContents(platform, requestCategory, isActive);

  const partyData = data?.pages.flatMap((page) => page.data.parties) || [];
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Handle Category Select Logic
  // platform is already fixed (prop). category changes. label might need update (genre name).
  const handleCategorySelect = (id: string, newLabel: string) => {
    const params = new URLSearchParams();
    if (platform) params.set('platform', platform);
    if (id) params.set('category', id); // Genre ID or Name?
    // Assuming CategorySelector returns ID or Name. SearchGenre expects 'category' param which it uses as requestCategory.
    // Usually category param matches filter param.
    // And we update label?? If I select "Action", label should likely stay "NETFLIX" or become "NETFLIX > Action"?
    // User request: "Select genre -> move to that category".
    // Current `page.tsx` logic passes `label` param as the Title of the page.
    // If I am in Netflix (label=NETFLIX), selecting Action.
    // Should title change? Probably not strictly required, but usually expected.
    // Let's keep label as is or update if we want "NETFLIX - Action"?
    // Let's pass the genre label as param if desired, but typically we keep platform label.
    // Wait, `page.tsx`: label={label}.
    // And `SearchGenre` displays `{label} 파티 목록`.
    // If I filter, I might want to see "Action 파티 목록"?
    // But user said "Click category -> move to that category".
    // If I select "Action", effectively I am viewing Action category.
    // Let's update `category` param.
    // Platform stays same (Netflix).

    // We'll update URL.
    // note: CategorySelector onSelect(category, label).
    // Here category is what we want to filter by.

    const nextLabel = newLabel === "전체" ? (platform === 'OTT' ? 'NETFLIX' : platform) : newLabel;
    // Actually if we select a specific genre, maybe we want title to reflect it?
    // But let's stick to platform context.
    // Let's just update `category`. `label` might be misused in page.tsx if we change it.
    // Current usage: label is used for Title.
    // If I select "Action", I probably want title "Action 파티 목록"?
    // Or "NETFLIX - Action"? 
    // For safety, let's just update the category param. The label param controls "Home" vs "SearchGenre" switching in page.tsx too?
    // page.tsx: `if (label === "홈")`. So if label != "홈", it renders SearchGenre.
    // So we can keep label as is (NETFLIX) or change it.
    // Let's Keep label as "NETFLIX" (or whatever came in props) to stay in this view.

    if (label) params.set('label', label);

    router.push(`/home?${params.toString()}`);
  };

  return (
    <div className="animate-in fade-in duration-700 overflow-visible">
      {/* Category Selection Area */}
      <CategorySelector
        currentPlatform={platform}
        currentCategory={searchParams.get('categoryLabel') || undefined} // Get category name from URL
        onSelect={(cat, catLabel) => {
          // We need to trigger navigation.
          // cat is the ID/Name to filter by.
          // If cat is "", it means "All".

          const params = new URLSearchParams();
          params.set('platform', platform);
          if (cat) params.set('category', cat);

          // Save the category label (name) for highlighting
          if (catLabel && catLabel !== "전체") {
            params.set('categoryLabel', catLabel);
          }

          // Keep the current label (e.g. NETFLIX) so we stay in this SearchGenre view
          params.set('label', label);

          router.push(`/home?${params.toString()}`);
        }}
      />

      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-bold">
          {searchParams.get('categoryLabel') || label} 파티 목록
          <span className="ml-3 text-lg text-muted-foreground font-bold">
            ({partyData.length})
          </span>
        </h2>

        {/* 필터 버튼 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const params = new URLSearchParams();
              params.set('platform', platform);
              if (category) params.set('category', category);
              if (searchParams.get('categoryLabel')) {
                params.set('categoryLabel', searchParams.get('categoryLabel')!);
              }
              params.set('label', label);
              router.push(`/home?${params.toString()}`);
            }}
            className={`
              px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap border-2
              ${!statusParam && viewParam !== 'timeline'
                ? "border-primary bg-primary/20 text-primary shadow-lg shadow-primary/20"
                : "border-white/10 bg-[#1f1f1f] text-neutral-400 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            전체
          </button>

          <button
            onClick={() => {
              const params = new URLSearchParams();
              params.set('platform', platform);
              if (category) params.set('category', category);
              if (searchParams.get('categoryLabel')) {
                params.set('categoryLabel', searchParams.get('categoryLabel')!);
              }
              params.set('label', label);
              params.set('status', 'active');
              router.push(`/home?${params.toString()}`);
            }}
            className={`
              px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap border-2 flex items-center gap-2
              ${statusParam === 'active'
                ? "border-red-500 bg-red-500/10 text-red-400 shadow-lg"
                : "border-white/10 bg-[#1f1f1f] text-neutral-400 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            LIVE
          </button>

          <button
            onClick={() => {
              const params = new URLSearchParams();
              params.set('platform', platform);
              if (category) params.set('category', category);
              if (searchParams.get('categoryLabel')) {
                params.set('categoryLabel', searchParams.get('categoryLabel')!);
              }
              params.set('label', label);
              params.set('status', 'inactive');
              router.push(`/home?${params.toString()}`);
            }}
            className={`
              px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap border-2
              ${statusParam === 'inactive'
                ? "border-gray-500 bg-gray-500/10 text-gray-300 shadow-lg"
                : "border-white/10 bg-[#1f1f1f] text-neutral-400 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            대기중
          </button>

          <div className="w-px h-8 bg-white/10" />

          <button
            onClick={() => {
              const params = new URLSearchParams();
              params.set('platform', platform);
              if (category) params.set('category', category);
              if (searchParams.get('categoryLabel')) {
                params.set('categoryLabel', searchParams.get('categoryLabel')!);
              }
              params.set('label', label);
              params.set('view', 'timeline');
              router.push(`/home?${params.toString()}`);
            }}
            className={`
              px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap border-2 flex items-center gap-2
              ${viewParam === 'timeline'
                ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg"
                : "border-white/10 bg-[#1f1f1f] text-neutral-400 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            타임라인
          </button>
        </div>
      </div>

      {partyData.length > 0 ? (
        viewParam === 'timeline' ? (
          <div className="space-y-8">
            {/* LIVE 파티 섹션 */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded">LIVE</span>
                현재 진행중인 파티
              </h3>
              {partyData.filter(p => p.isActive).length > 0 ? (
                <>
                  <div className={`grid grid-cols-1 md:grid-cols-3 ${platform === 'NETFLIX' || platform === 'OTT' ? 'lg:grid-cols-8' : 'lg:grid-cols-6'} gap-3`}>
                    {partyData.filter(p => p.isActive).slice(0, showAllLive ? undefined : (platform === 'NETFLIX' || platform === 'OTT' ? 8 : 6)).map((party) => {
                      const isHost = user?.userId === party.host.userId;
                      return (
                        <div key={party.id} className={isHost ? 'border-2 border-primary rounded-lg' : ''}>
                          <PartyCard party={party} />
                        </div>
                      );
                    })}
                  </div>
                  {partyData.filter(p => p.isActive).length > (platform === 'NETFLIX' || platform === 'OTT' ? 8 : 6) && (
                    <button
                      onClick={() => setShowAllLive(!showAllLive)}
                      className="mt-4 w-full py-3 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      {showAllLive ? '접기' : `+ 더보기 (${partyData.filter(p => p.isActive).length - (platform === 'NETFLIX' || platform === 'OTT' ? 8 : 6)}개)`}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  현재 진행중인 파티가 없습니다
                </div>
              )}
            </div>

            {/* 대기중 파티 타임라인 */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-bold bg-gray-500 text-white rounded">대기중</span>
                앞으로 진행될 파티
              </h3>
              <TimelineCalendar parties={partyData} />
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 ${platform === 'NETFLIX' || platform === 'OTT' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-3`}>
            {partyData.map((party) => (
              <div key={party.id} className="flex justify-center w-full">
                <PartyCard party={party} />
              </div>
            ))}
          </div>
        )
      ) : (
        <EmptyState />
      )}

      {/* 무한 스크롤 관찰 div */}
      <div ref={observerRef} className="h-20 w-full flex items-center justify-center mt-10">
        {isFetchingNextPage && (
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    </div>
  );
};

export default SearchGenre;