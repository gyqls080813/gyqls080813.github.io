"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
// UI 구성 요소
import HomeDashboard from '@/components/home/CardContainer/HomeDashboard';
import SearchParty from '@/components/home/CardContainer/SearchParty';
import SearchGenre from '@/components/home/CardContainer/SearchGenre';

import { useUIStore } from '@/store/uiStore';

import ServicePrepare from '@/components/home/ServicePrepare/ServicePrepare';
import { useRefreshMutation } from '@/hooks/auth/Refresh';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter(); // For handleDashboardCategorySelect
  const { setSidebarOpen, isSidebarOpen } = useUIStore(); // To open sidebar on category select
  const { user } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  // URL Params parsing
  const platform = searchParams.get('platform') || undefined;
  const category = searchParams.get('category') || undefined;
  const label = searchParams.get('label') || "홈";
  const search = searchParams.get('search') || "";
  const { mutate: refresh, isPending: isRefreshing } = useRefreshMutation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (user && !user.data?.isOnboardingComplete) {
      router.replace("/onboarding/step1");
    }
  }, [isReady, user, router]);

  if (!isReady) return null;
  if (!mounted) return null;

  // 대시보드에서 카테고리 선택 시 처리
  // Layout의 handleFilterChange 로직과 유사하게 URL 변경 + Sidebar Open
  const handleDashboardCategorySelect = (p: string, c: string, l: string) => {
    // Trigger URL change
    const params = new URLSearchParams();
    if (p && p !== '홈') params.set('platform', p);
    if (c) params.set('category', c);
    if (l) params.set('label', l);

    // 장르 알약 박스 하이라이트를 위해 categoryLabel 추가
    if (c && c !== 'ALL') {
      params.set('categoryLabel', c);
    }

    // searchParams를 preserve 할지 여부는 기획에 따름 (여기선 Reset logic)
    // 기존 코드: handleFilterChange는 setSearch("") 했음. 즉 search 초기화.

    router.push(`/home?${params.toString()}`);

    // 페이지 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!isSidebarOpen) {
      setSidebarOpen(true);
    }
  };

  // 준비 중인 플랫폼 리스트 (Navbar와 동일하게 관리 필요)
  const COMING_SOON_PLATFORMS = ['Tving', 'CoupangPlay', 'Wavve', 'Watcha', 'Laftel', 'DisneyPlus', 'AppleTV'];

  // 🎬 씬 전환 로직
  const renderMainContent = () => {
    // 1. Check COMING SOON first
    if (platform && COMING_SOON_PLATFORMS.includes(platform)) {
      return <ServicePrepare />;
    }

    if (search !== "") {
      return <SearchParty platform={platform} search={search} />;
    }
    if (label === "홈") {
      return <HomeDashboard onCategorySelect={handleDashboardCategorySelect} currentPlatform={platform} currentCategory={category} />;
    }

    return (
      <SearchGenre
        platform={platform || "ALL"}
        category={category || "ALL"}
        label={label}
      />
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full overflow-visible">
      <div className="animate-in fade-in duration-700 overflow-visible">
        {renderMainContent()}
      </div>
    </div>
  );
}
