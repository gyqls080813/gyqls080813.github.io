import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Tab from '@/shared/components/common/Tab';
import Card from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { Button } from '@/shared/components/common/Button';
import { request } from '@/api/request';
import { SummaryCard } from '@/features/finance/components/SummaryCard';
import { CategorySpendingSection } from '@/features/finance/components/CategorySpendingSection';
import { SpendingComparisonSection } from '@/features/finance/components/SpendingComparisonSection';
import { RankingSection } from '@/features/finance/components/RankingSection';
import { useToast } from '@/shared/context/ToastContext';
import type { RankingEntry } from '@/features/finance';

import Image from 'next/image';
import allIcon from '@/shared/components/ui/category/petsiter.png';
import { usePets, STICKER_CATEGORIES } from '@/features/pet';

import dogDefaultImg from '@/shared/components/ui/default/dog_default.png';
import catDefaultImg from '@/shared/components/ui/default/cat_default.png';
import { Skeleton, SkeletonCircle } from '@/shared/components/skeleton/Skeleton';

const TABS_ALL = ['랭킹', '소비', '펫 별 현황'] as const;
const TABS_PET = ['랭킹', '소비', '전체 현황'] as const;

/* ─── API 응답 타입 ─── */
interface Pet { id: number; name: string; species: string; breed: string; weight: number; imageUrl?: string; }

interface MonthlySummary {
  yearMonth: string;
  monthlyTotalExpense: number;
  categoryExpenses: { id: number; name: string; amount: number }[];
  petExpenses: { id: number; name: string; amount: number }[];
  commonExpense: number;
}

interface PetDetail {
  petId: number;
  petName: string;
  totalAmount: number;
  categoryDetails: { categoryId: number; categoryName: string; amount: number }[];
}

interface MemberRank {
  userId: number;
  name: string;
  nickname: string;
  profileImageUrl: string;
  totalAmount: number;
  rank: number;
}

interface PetCompare {
  petId: number;
  petName: string;
  myTotalAmount: number;
  speciesName: string;
  speciesAverage: number;
  speciesStdDev: number;
  speciesZScore: number;
  breedName: string;
  breedAverage: number;
  breedStdDev: number;
  breedZScore: number;
}

export default function DashboardPage() {
  const { getStickerByCategory, stickerImages, pets: contextPets } = usePets();

  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('ALL');

  const [pets, setPets] = useState<Pet[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);
  const [petsDetail, setPetsDetail] = useState<PetDetail[]>([]);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [petCompare, setPetCompare] = useState<PetCompare | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const { showToast } = useToast();

  /* ─── PetContext에서 이미 로드된 펫 목록 사용 (이중 호출 방지) ─── */
  useEffect(() => {
    if (contextPets.length > 0) {
      setPets(contextPets);
    }
  }, [contextPets]);

  /* ─── 월별 데이터 로딩 ─── */
  const loadData = useCallback(async (year: number, month: number) => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        request<{ data: MonthlySummary }>(`/api/v1/dashboard/monthly/summary?year=${year}&month=${month}`, 'GET'),
        request<{ data: PetDetail[] }>(`/api/v1/dashboard/monthly/pets-detail?year=${year}&month=${month}`, 'GET'),
        request<{ data: MemberRank[] }>('/api/v1/dashboard/members/rank', 'GET'),
      ]);

      // 월별 요약
      if (results[0].status === 'fulfilled' && results[0].value.data) {
        setMonthlySummary(results[0].value.data);
      }
      // 펫별 상세
      if (results[1].status === 'fulfilled' && results[1].value.data) {
        setPetsDetail(results[1].value.data);
      }
      // 랭킹 (MemberRank → RankingEntry 변환)
      if (results[2].status === 'fulfilled' && results[2].value.data) {
        const rankData: RankingEntry[] = results[2].value.data.map((m: MemberRank) => ({
          rank: m.rank,
          name: m.nickname || m.name,
          imageUrl: m.profileImageUrl || '',
          totalAmount: m.totalAmount,
          spending: m.totalAmount,
        }));
        setRanking(rankData);
      }
    } catch (err) {
      console.error('대시보드 데이터 로딩 실패:', err);
      showToast('대시보드 데이터를 불러오지 못했어요');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, loadData]);

  /* ─── 펫 비교 데이터 로딩 ─── */
  useEffect(() => {
    if (selectedPetFilter === 'ALL' || !pets.length) {
      setPetCompare(null);
      return;
    }
    const pet = pets.find(p => p.name === selectedPetFilter);
    if (!pet) return;

    request<{ data: PetCompare }>(
      `/api/v1/dashboard/monthly/compare/pets/${pet.id}?year=${selectedYear}&month=${selectedMonth}`, 'GET'
    )
      .then(res => { 
        if (res.data) {
          // --- TODO(하드코딩): 나중에 백엔드에서 정상 데이터가 오면 이 블록 삭제 ---
          const patched = { ...res.data };
          if (patched.speciesAverage === 0) patched.speciesAverage = 280000;
          if (patched.speciesStdDev === 0) patched.speciesStdDev = 90000;
          if (patched.speciesZScore === 0) patched.speciesZScore = 2.0;

          if (patched.breedAverage === 0) patched.breedAverage = 320000;
          if (patched.breedStdDev === 0) patched.breedStdDev = 80000;
          if (patched.breedZScore === 0) patched.breedZScore = 1.75;
          // -------------------------------------------------------------------

          setPetCompare(patched);
        }
      })
      .catch(err => console.error('펫 비교 데이터 실패:', err));
  }, [selectedPetFilter, pets, selectedYear, selectedMonth]);

  const goMonth = (dir: -1 | 1) => {
    let y = selectedYear;
    let m = selectedMonth + dir;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    setSelectedYear(y);
    setSelectedMonth(m);
  };

  /* ─── 필터 관련 데이터 가공 ─── */
  const filteredSummary = useMemo(() => {
    if (!monthlySummary) return null;
    if (selectedPetFilter === 'ALL') return monthlySummary;
    const petExpense = monthlySummary.petExpenses.find(pe => pe.name === selectedPetFilter);
    return {
      ...monthlySummary,
      monthlyTotalExpense: petExpense?.amount ?? 0,
    };
  }, [monthlySummary, selectedPetFilter]);

  const categorySpending = useMemo(() => {
    if (!monthlySummary) return { data: [], labels: [] };
    const expenses = selectedPetFilter !== 'ALL'
      ? petsDetail.find(p => p.petName === selectedPetFilter)?.categoryDetails.map(c => ({ name: c.categoryName, amount: c.amount })) ?? []
      : monthlySummary.categoryExpenses;
    return {
      data: expenses.map(e => e.amount),
      labels: expenses.map(e => e.name),
    };
  }, [monthlySummary, petsDetail, selectedPetFilter]);

  // CDF 근사 (오차 함수 기반 누적 정규 분포)
  const calculateTopPercentage = (val: number, mean: number, sd: number) => {
    if (sd <= 0) return 100;
    const z = (val - mean) / sd;
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (z > 0) p = 1 - p;
    // z가 상승(지출이 많음)할 때 누적분포확률 p는 상승.
    // 많이 쓴 기준에서의 '상위 %' 라면 1 - p.
    return Math.max(0, Math.min(100, Math.round((1 - p) * 100)));
  };

  const spendingAnalysis = useMemo(() => {
    if (!petCompare) {
      return { 
        mySpending: 0, 
        averageSpending: 0, 
        standardDeviation: 0, 
        topPercentage: 0,
        zScore: 0,
        breedName: '',
        breedAverage: 0,
        speciesName: '',
        speciesAverage: 0 
      };
    }
    const zScore = petCompare.breedZScore || petCompare.speciesZScore || 0;
    
    const hasBreedCompare = petCompare.breedAverage > 0;
    const avg = hasBreedCompare ? petCompare.breedAverage : petCompare.speciesAverage;
    const stdDev = hasBreedCompare ? petCompare.breedStdDev : petCompare.speciesStdDev;

    const myAmount = petCompare.myTotalAmount ?? 0;
    const myZ = (avg === 0 && stdDev === 0) ? 0 : (myAmount - avg) / stdDev;
    // Z-score 클리핑 (-3.4 ~ 3.4) 그래프 이탈 방지
    const clampedZ = Math.max(-3.4, Math.min(3.4, myZ));

    const topPct = (avg === 0 && stdDev === 0) ? 100 : calculateTopPercentage(myAmount, avg, stdDev);

    return {
      mySpending: myAmount,
      averageSpending: avg,
      standardDeviation: stdDev,
      topPercentage: topPct,
      zScore: clampedZ,
      breedName: petCompare.breedName || '동일 품종',
      breedAverage: petCompare.breedAverage || 0,
      speciesName: petCompare.speciesName === 'DOG' ? '강아지' : petCompare.speciesName === 'CAT' ? '고양이' : '전체',
      speciesAverage: petCompare.speciesAverage || 0,
    };
  }, [petCompare]);

  const monthlySummaryForCard = useMemo(() => ({
    totalSpending: filteredSummary?.monthlyTotalExpense ?? 0,
    petCount: monthlySummary?.petExpenses.length ?? 0,
    transactionCount: 0,
  }), [filteredSummary, monthlySummary]);


  if (loading) {
    return (
      <div className="max-w-[500px] mx-auto">
        <Box direction="column" gap="medium" fullWidth>

          {/* ─── 필터 섹션 (실제 Card + Box 구조와 동일) ─── */}
          <Card elevation="low" radius="large" withBorder>
            <Box padding="medium" direction="column" gap="small">
              {/* 월 네비게이션 (실제와 동일) */}
              <Box direction="row" alignItems="center" justifyContent="space-between" htmlStyle={{ marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }} />
                <Box direction="row" alignItems="center" justifyContent="center" gap="medium" htmlStyle={{ flex: 2 }}>
                  <Skeleton width={36} height={36} borderRadius="50%" />
                  <Skeleton width={100} height={18} />
                  <Skeleton width={36} height={36} borderRadius="50%" />
                </Box>
                <div style={{ flex: 1 }} />
              </Box>

              {/* 반려동물 필터 칩 (실제 60px 아바타 + 이름 구조와 동일) */}
              <div
                ref={(el) => {
                  if (!el) return;
                  let isDown = false, startX = 0, scrollLeft = 0;
                  el.onmousedown = (e) => { isDown = true; el.style.cursor = 'grabbing'; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
                  el.onmouseleave = () => { isDown = false; el.style.cursor = 'grab'; };
                  el.onmouseup = () => { isDown = false; el.style.cursor = 'grab'; };
                  el.onmousemove = (e) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
                }}
                style={{ display: 'flex', gap: '1.25rem', overflowX: 'auto', padding: '0.25rem 0.25rem 0.75rem', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', cursor: 'grab', userSelect: 'none' }}>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flexShrink: 0, opacity: idx === 0 ? 1 : 0.7 }}
                  >
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '50%', padding: '3px',
                      background: idx === 0 ? 'linear-gradient(45deg, #a8a29e, #d6d3d1)' : 'transparent',
                    }}>
                      <div style={{
                        width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#fcfcfc',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                        border: idx === 0 ? '2px solid white' : '1.5px solid #e5e7eb',
                      }}>
                        <SkeletonCircle size={54} />
                      </div>
                    </div>
                    <Skeleton width={36} height={12} />
                  </div>
                ))}
              </div>
            </Box>
          </Card>

          {/* ─── 탭 (실제와 동일 스타일) ─── */}
          <Tab onChange={() => {}} size="large" ariaLabel="대시보드 탭">
            {TABS_ALL.map((tab: string, idx: number) => (
              <Tab.Item key={tab} selected={idx === 0}>
                {tab}
              </Tab.Item>
            ))}
          </Tab>

          {/* ─── SummaryCard 스켈레톤 (실제 gradient Card + flex 구조와 동일) ─── */}
          <Card elevation="low" radius="large" withBorder>
            <Box
              padding="medium"
              paddingHorizontal="large"
              htmlStyle={{
                background: 'linear-gradient(135deg, var(--color-pet-grad-start), var(--color-pet-grad-end))',
              }}
            >
              <div className="flex items-center gap-4">
                <SkeletonCircle size={64} />
                <div className="flex flex-col justify-center">
                  <Skeleton width={160} height={13} style={{ marginBottom: 6 }} />
                  <Skeleton width={180} height={22} />
                </div>
              </div>
            </Box>
          </Card>

          {/* ─── 콘텐츠 스켈레톤 (RankingSection/Podium 위치) ─── */}
          <Card elevation="low" radius="large" withBorder padding="medium">
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <SkeletonCircle size={120} className="mx-auto" />
              <Skeleton width={160} height={14} style={{ margin: '12px auto 0' }} />
            </div>
          </Card>

        </Box>
      </div>
    );
  }

  const currentTabs = selectedPetFilter === 'ALL' ? TABS_ALL : TABS_PET;
  const activeTab = currentTabs[activeTabIdx] || currentTabs[0];

  return (
    <div className="max-w-[500px] mx-auto">
      <Box direction="column" gap="medium" fullWidth>

        {/* ─── 필터 섹션 ─── */}
        <Card elevation="low" radius="large" withBorder>
          <Box padding="medium" direction="column" gap="small">
            {/* ─── 월 네비게이션과 필터 섹션 분리 (UI 개선) ─── */}
            <Box direction="row" alignItems="center" justifyContent="space-between" htmlStyle={{ marginBottom: '0.5rem' }}>
              <div style={{ flex: 1 }} />
              <Box direction="row" alignItems="center" justifyContent="center" gap="medium" htmlStyle={{ flex: 2 }}>
                <Button size="small" variant="weak" color="dark"
                  onClick={() => goMonth(-1)} aria-label="이전 달"
                  htmlStyle={{ borderRadius: '50%', width: 36, height: 36, padding: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </Button>
                <Paragraph 
                  typography="st5" 
                  fontWeight="bold" 
                  color="var(--color-pet-text)"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {selectedYear}년 {selectedMonth}월
                </Paragraph>
                <Button size="small" variant="weak" color="dark"
                  onClick={() => goMonth(1)} aria-label="다음 달"
                  htmlStyle={{ borderRadius: '50%', width: 36, height: 36, padding: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </Button>
              </Box>
              <div style={{ flex: 1 }} />
            </Box>

            {/* 반려동물 필터 칩 (Instagram Story Style) */}
            <div
              ref={(el) => {
                if (!el) return;
                let isDown = false, startX = 0, scrollLeft = 0;
                el.onmousedown = (e) => { isDown = true; el.style.cursor = 'grabbing'; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
                el.onmouseleave = () => { isDown = false; el.style.cursor = 'grab'; };
                el.onmouseup = () => { isDown = false; el.style.cursor = 'grab'; };
                el.onmousemove = (e) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
              }}
              style={{ display: 'flex', gap: '1.25rem', overflowX: 'auto', padding: '0.25rem 0.25rem 0.75rem', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', cursor: 'grab', userSelect: 'none' }}>
              {/* '전체' 옵션 렌더링 */}
              <div 
                onClick={() => { setSelectedPetFilter('ALL'); setActiveTabIdx(0); }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', flexShrink: 0, opacity: selectedPetFilter === 'ALL' ? 1 : 0.7, transition: 'opacity 0.2s' }}
              >
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '50%', padding: '3px',
                  background: selectedPetFilter === 'ALL' ? 'linear-gradient(45deg, #a8a29e, #d6d3d1)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}>
                  <div style={{ 
                    width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#fcfcfc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: selectedPetFilter === 'ALL' ? '2px solid white' : '1.5px solid #e5e7eb'
                  }}>
                    <Image src={allIcon} alt="전체" width={32} height={32} style={{ objectFit: 'contain' }} />
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: selectedPetFilter === 'ALL' ? 700 : 500, color: selectedPetFilter === 'ALL' ? 'var(--color-pet-text)' : 'var(--color-pet-text-muted)' }}>
                  전체
                </span>
              </div>

              {/* 개별 펫 프로필 렌더링 */}
              {pets.map((p) => {
                const isSelected = selectedPetFilter === p.name;
                return (
                  <div 
                    key={p.id} 
                    onClick={() => { setSelectedPetFilter(p.name); setActiveTabIdx(0); }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', flexShrink: 0, opacity: isSelected ? 1 : 0.7, transition: 'opacity 0.2s' }}
                  >
                    <div style={{ 
                      width: '60px', height: '60px', borderRadius: '50%', padding: '3px',
                      background: isSelected ? 'linear-gradient(45deg, #8FBC8F, #3cb371)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}>
                      <div style={{ 
                        width: '100%', height: '100%', borderRadius: '50%', backgroundColor: p.species === 'DOG' ? 'rgba(194,149,106,0.15)' : 'rgba(106,149,194,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: isSelected ? '2px solid white' : '1.5px solid #e5e7eb'
                      }}>
                        {(() => {
                          const petStickers = stickerImages[p.id] || [];
                          const hasRealGroomingSticker = petStickers.some(s => s.categoryId === STICKER_CATEGORIES.GROOMING);
                          const stickerUrl = getStickerByCategory(p.id, STICKER_CATEGORIES.GROOMING);
                          
                          if (hasRealGroomingSticker && stickerUrl) {
                            return (
                              <Image 
                                src={stickerUrl} 
                                alt={p.name} 
                                width={60}
                                height={60}
                                className="w-full h-full object-cover"
                                unoptimized={true}
                              />
                            );
                          }
                          return (
                            <div className="w-full h-full flex items-center justify-center p-1">
                              <Image 
                                src={p.species === 'DOG' ? dogDefaultImg : catDefaultImg}
                                alt={p.name}
                                width={54}
                                height={54}
                                className="object-contain"
                              />
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--color-pet-text)' : 'var(--color-pet-text-muted)' }}>
                      {p.name.length > 4 ? p.name.substring(0, 4) + '..' : p.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </Box>
        </Card>

        {/* ─── 탭 ─── */}
        <Tab onChange={(idx: number) => setActiveTabIdx(idx)} size="large" ariaLabel="대시보드 탭">
          {currentTabs.map((tab, idx) => (
            <Tab.Item key={tab} selected={activeTabIdx === idx}>
              {tab}
            </Tab.Item>
          ))}
        </Tab>

        {/* ─── 탭 콘텐츠 ─── */}
        {activeTab === '랭킹' && (
          <Box direction="column" gap="medium" fullWidth>
            <SummaryCard monthlySummary={monthlySummaryForCard} month={selectedMonth} petName={selectedPetFilter !== 'ALL' ? selectedPetFilter : undefined} />
            <RankingSection ranking={ranking} />
          </Box>
        )}

        {activeTab === '소비' && (
          <Box direction="column" gap="medium" fullWidth>
            <CategorySpendingSection categorySpending={categorySpending} />
          </Box>
        )}

        {activeTab === '펫 별 현황' && (
          <Box direction="column" gap="medium" fullWidth>
            <Card elevation="low" radius="large" withBorder padding="medium">
              <Box direction="column" gap="small">
                <Paragraph typography="st6" fontWeight="bold" color="var(--color-pet-text)">
                  🐾 펫 별 지출 현황
                </Paragraph>
                {petsDetail.length === 0 ? (
                  <Paragraph typography="st6" color="var(--color-pet-text-muted)">
                    이번 달 펫 별 지출 데이터가 없어요.
                  </Paragraph>
                ) : (
                  (() => {
                    const totalPetAmount = petsDetail.reduce((acc, p) => acc + p.totalAmount, 0);
                    const maxPetAmount = petsDetail.length > 0 ? Math.max(...petsDetail.map(p => p.totalAmount)) : 1;
                    const PET_COLORS = ['#3182f6', '#f06595', '#20c997', '#f59f00', '#845ef7'];

                    return petsDetail.map((pet, idx) => {
                      const pct = Math.round((pet.totalAmount / totalPetAmount) * 100) || 0;
                      const barWidth = (pet.totalAmount / maxPetAmount) * 100;
                      const color = PET_COLORS[idx % PET_COLORS.length];

                      return (
                        <div key={pet.petId} style={{ 
                          padding: '1.25rem', 
                          borderRadius: '1rem', 
                          background: '#FDFCF9', 
                          marginBottom: '0.75rem' 
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#333333' }}>
                              {pet.petName}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>
                                {pet.totalAmount.toLocaleString()}원
                              </span>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-pet-text-muted)' }}>
                                {pct}%
                              </span>
                            </div>
                          </div>
                          
                          {/* 수평 바 차트 */}
                          <div style={{
                            width: '100%',
                            height: 10,
                            borderRadius: 5,
                            background: 'rgba(0,0,0,0.05)',
                            overflow: 'hidden',
                            marginBottom: '1rem',
                          }}>
                            <div style={{
                              width: `${barWidth}%`,
                              height: '100%',
                              borderRadius: 5,
                              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
                              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            }} />
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {pet.categoryDetails
                              .filter(c => c.amount > 0)
                              .sort((a, b) => b.amount - a.amount)
                              .map(c => (
                                <span key={c.categoryId} style={{ 
                                  fontSize: '0.8rem', 
                                  fontWeight: 600,
                                  padding: '0.35rem 0.75rem', 
                                  borderRadius: '999px', 
                                  background: '#EFECE6', 
                                  color: '#8A8276' 
                                }}>
                                  {c.categoryName} {c.amount.toLocaleString()}원
                                </span>
                              ))}
                          </div>
                        </div>
                      );
                    });
                  })()
                )}
              </Box>
            </Card>
          </Box>
        )}

        {activeTab === '전체 현황' && (
          <Box direction="column" gap="medium" fullWidth>
            <SpendingComparisonSection spendingAnalysis={spendingAnalysis} />
          </Box>
        )}

      </Box>
    </div>
  );
}
