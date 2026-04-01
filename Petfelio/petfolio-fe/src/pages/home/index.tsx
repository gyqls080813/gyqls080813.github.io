import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Box } from '@/shared/components/common/Box';
import { useUser } from '@/features/user/context/UserContext';
import { useCards } from '@/features/finance/context/CardContext';
import { SpeechBubble } from '@/features/savings/components/SpeechBubble';

import firstAnimation from '@/shared/components/lottle/first.json';
import catAnimation from '@/shared/components/lottle/Loader cat.json';



// Lottie (SSR-safe)
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Types
interface RankMember {
  rank: number;
  nickname: string;
  totalExpense: number;
}

// PNG Icons from Menu/Navigation
import payIcon from '@/shared/components/ui/menu/dog_pay.png';
import accountbookIcon from '@/shared/components/ui/menu/dog_account_expendables.png';
import healthcareIcon from '@/shared/components/ui/menu/dog_healty.png';
import suppliesIcon from '@/shared/components/ui/menu/dog_account_supplies.png';
import reportIcon from '@/shared/components/ui/menu/dog_account_report.png';


import { useRanking, useMonthlyCompare } from '@/features/home/api/queries';
import { useConsumables } from '@/features/supplies/api/queries';
import { useMonthlyLedgerSummary } from '@/features/calendar/api/queries';
import { getPetDetail } from '@/features/group/api/pet';
import { useLifeCycleData } from '@/features/savings/components/lifecycle/useLifeCycleData';
import { Skeleton } from '@/shared/components/skeleton/Skeleton';
import { usePets } from '@/features/pet/context/PetContext';
import type { StickerImage } from '@/features/pet/types';






interface MonthlySummary {
  yearMonth: string;
  monthlyTotalExpense: number;
  categoryExpenses: { id: number; name: string; amount: number }[];
  petExpenses: { id: number; name: string; amount: number }[];
  commonExpense: number;
}



export default function HomePage() {
  const router = useRouter();
  const { user } = useUser();
  const { cards: registeredCards } = useCards();

  // 1. Data States
  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState(false);
  // React Query 캐싱 — 페이지 재방문 시 staleTime 내 즉시 렌더 (네트워크 요청 없음)
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const { data: ranking = [], isLoading: rankingLoading } = useRanking();
  const { data: suppliesData = [], isLoading: suppliesLoading } = useConsumables();
  const supplies = suppliesData as Array<{ name: string; nextPurchaseDate: string; [key: string]: any }>;
  const { data: ledgerData, isLoading: ledgerLoading } = useMonthlyLedgerSummary(year, month);
  const [petAge, setPetAge] = useState<number | null>(null);

  // Health / Lifecycle Data
  const { selectedStage, currentPet, setSelectedPetIndex } = useLifeCycleData();
  const { pets, stickerImages, getOriginalImage, mainPetId } = usePets();

  // mainPetId에 따라 홈 화면의 기본 펫 설정
  useEffect(() => {
    if (pets.length > 0) {
      const idx = mainPetId ? pets.findIndex(p => p.id === mainPetId) : 0;
      setSelectedPetIndex(idx >= 0 ? idx : 0);
    }
  }, [pets, mainPetId, setSelectedPetIndex]);

  // 현재 펫의 나이 계산
  useEffect(() => {
    if (!currentPet?.id) { setPetAge(null); return; }
    getPetDetail(currentPet.id).then(res => {
      const birthdate = res.data?.birthdate;
      if (!birthdate) { setPetAge(null); return; }
      const birth = new Date(birthdate);
      const now = new Date();
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
      setPetAge(Math.max(0, age));
    }).catch(() => setPetAge(null));
  }, [currentPet?.id]);


  // 현재 선택된 펫의 스티커들
  const currentStickers = currentPet?.id ? stickerImages[currentPet.id] : undefined;

  // 카테고리별 스티커 찾기 헬퍼
  // CATEGORY_META 참조: 1:사료, 2:간식, 3:병원, 4:미용, 5:장난감, 6:용품, 7:펫시터, 8:기타
  // 홈 화면 아이콘 매핑: 거래(기타-8), 가계부/소모품(용품-6), 건강(병원-3), 리포트(펫시터-7 또는 기타-8로 매핑, 여기선 기본 아이콘 유지)
  const getStickerUrl = (categoryId: number) => {
    return currentStickers?.find((s: StickerImage) => s.categoryId === categoryId)?.imageUrl;
  };



  // 각각의 카드에 사용할 이미지 소스 (스티커가 있으면 스티커, 없으면 기본 아이콘)
  // 거래 내역 관리 (임의로 기타(8) 스티커 사용)
  const displayPayIcon = getStickerUrl(8) || payIcon;
  // 생활 가계부 (임의로 용품(6) 스티커 사용)
  const displayAccountbookIcon = getStickerUrl(6) || accountbookIcon;
  // 건강 관리 (병원(3) 스티커 사용)
  const displayHealthcareIcon = getStickerUrl(3) || healthcareIcon;
  // 재고 및 소모품 (사료(1) 스티커 사용)
  const displaySuppliesIcon = getStickerUrl(1) || suppliesIcon;
  // 리포트 (원본 누끼 스티커 또는 기본 리포트 형태 사용)
  const displayReportIcon = (currentPet && getOriginalImage(currentPet.id)) || reportIcon;



  // React Query — 펫별 월간 비교 (캐싱 적용)
  const { data: monthlySummary = null } = useMonthlyCompare(
    currentPet?.id, year, month
  ) as { data: MonthlySummary | null };

  // 파생 데이터 계산
  const ledgerTotal = ledgerData?.monthlyTotalExpense || 0;
  const ledgerTopCategory = (ledgerData as any)?.topCategory?.categoryName || null;
  const loading = rankingLoading || suppliesLoading || ledgerLoading;

  // 2. Computed Values

  const sortedRanking = [...ranking].sort((a, b) => a.rank - b.rank);
  const myRank = sortedRanking.find((r) => r.nickname === user?.nickname) || sortedRanking[0];

  const cardCount = registeredCards.length;
  const totalCardSpending = registeredCards.reduce((sum, c) => sum + (c.getMonthlyTotalCount || 0), 0);
  const totalCardTxCount = registeredCards.reduce((sum, c) => sum + (c.getMonthlyTotalAmount || 0), 0);

  const topCategory = monthlySummary?.categoryExpenses?.sort((a, b) => b.amount - a.amount)[0];
  const topCategoryName = topCategory ? topCategory.name : '-';

  const unfinishedHealthTasks = selectedStage?.checklist?.filter((item) => !item.isChecked).length || 0;

  const nowTime = new Date().getTime();

  // 임박: 7일 이내, 초과: D-day 초과
  const imminentSupplies = supplies.filter((s) => {
    const diffDays = (new Date(s.nextPurchaseDate).getTime() - nowTime) / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 7;
  });
  const overdueSupplies = supplies.filter((s) => {
    const diffDays = (new Date(s.nextPurchaseDate).getTime() - nowTime) / (1000 * 3600 * 24);
    return diffDays < 0;
  });

  const urgentSuppliesText = (() => {
    const parts: string[] = [];
    if (overdueSupplies.length > 0) parts.push(`초과 ${overdueSupplies.length}건: ${overdueSupplies.map(s => s.name).join(', ')}`);
    if (imminentSupplies.length > 0) parts.push(`임박 ${imminentSupplies.length}건: ${imminentSupplies.map(s => s.name).join(', ')}`);
    return parts.length > 0 ? parts.join(' / ') : '모든 물품이 충분해요';
  })();

  // 3. Dynamic AI Messages (Cycling) — 홈 카드와 동일한 데이터 사용
  const petName = currentPet?.name || '아이';
  const messages = [
    // 1. 거래 내역 관리 카드와 매칭
    cardCount > 0
      ? `현재 카드 ${cardCount}장이 등록되어 있고,\n이번 달 ${totalCardTxCount}건의 거래로\n총 ${totalCardSpending.toLocaleString()}원을 사용하셨어요! 💳`
      : `아직 등록된 카드가 없어요!\n카드를 등록하면 거래 내역을 자동으로 관리할 수 있어요! 💳`,
    // 2. 생활 가계부 카드와 매칭
    ledgerTotal > 0
      ? `이번 달 가계부 총 지출은 ${ledgerTotal.toLocaleString()}원이에요!\n주요 지출: ${ledgerTopCategory || topCategoryName}\n지출 관리에 참고해 보세요! 🐾`
      : `이번 달은 아직 지출 기록이 없어요!\n가계부를 작성해 보세요! 🐾`,
    // 3. 뽀삐 관리 카드와 매칭
    unfinishedHealthTasks > 0
      ? `현재 ${petName}의 건강 지도에 ${unfinishedHealthTasks}건의 체크리스트가 남아있어요!\n함께 챙겨볼까요? 🐾`
      : `${petName}의 이번 단계 건강 관리를 모두 완료하셨네요! 최고예요! 🐾`,
    // 4. 재고 및 소모품 카드와 매칭
    overdueSupplies.length > 0
      ? `구매 주기가 초과된 물품이 ${overdueSupplies.length}건 있어요!\n(${overdueSupplies.map(s => s.name).join(', ')})\n빠른 구매를 추천드려요! 🛒`
      : imminentSupplies.length > 0
        ? `구매 주기가 다가온 물품이 ${imminentSupplies.length}건 있어요!\n(${imminentSupplies.map(s => s.name).join(', ')}) 🐾`
        : `현재 모든 소모품 재고가 넉넉하네요!\n안심하셔도 좋습니다. 🐾`
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleCatClick = () => {
    if (!isAiSummaryOpen) {
      setIsAiSummaryOpen(true);
      setCurrentMessageIndex(0);
    } else {
      if (currentMessageIndex === messages.length - 1) {
        setIsAiSummaryOpen(false);
      } else {
        setCurrentMessageIndex((prev) => prev + 1);
      }
    }
  };



  return (
    <div className="max-w-[500px] mx-auto h-[calc(100vh-130px)] overflow-hidden flex flex-col relative">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-card {
          animation: fadeSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .speech-bubble-anim {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform-origin: bottom right;
        }
      `}</style>

      <div className="h-2 shrink-0"></div>

      <Box paddingHorizontal="medium" direction="column" className="flex-1 overflow-y-auto pb-24 flex flex-col pt-2 gap-3">

        {/* ─── ROW 1: Hero Card (반려동물 프로필) — Full Width ─── */}
        <div
          onClick={() => router.push('/health')}
          className="dashboard-card relative cursor-pointer overflow-hidden shrink-0"
          style={{
            animationDelay: '0.0s',
            background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 60%, #fde68a 100%)',
            border: '1px solid #fde68a',
            boxShadow: '0 8px 32px rgba(251, 191, 36, 0.2)',
            borderRadius: '1.75rem',
          }}
        >
          {/* 배경 장식 원 */}
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-30" style={{ background: '#fbbf24', filter: 'blur(24px)' }} />
          <div className="absolute -bottom-6 left-8 w-24 h-24 rounded-full opacity-20" style={{ background: '#f59e0b', filter: 'blur(16px)' }} />

          <div className="relative flex flex-col p-5 gap-4">
            {/* 상단: 레이블 + 화살표 */}
            <div className="flex items-center justify-between">
              <span className="text-[0.62rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(251,191,36,0.25)', color: '#92400e' }}>
                🐾 반려동물 관리
              </span>
              <span className="text-lg font-bold" style={{ color: '#f59e0b' }}>›</span>
            </div>

            {/* 프로필 영역 */}
            <div className="flex items-center gap-4">
              {/* 원형 프로필 이미지 */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    background: 'rgba(251,191,36,0.2)',
                    border: '3px solid rgba(251,191,36,0.5)',
                    boxShadow: '0 4px 12px rgba(251,191,36,0.3)',
                  }}>
                  {loading ? (
                    <Skeleton width={64} height={64} className="rounded-full opacity-50" />
                  ) : (
                    <Image src={displayHealthcareIcon} alt="pet profile" width={64} height={64} className="object-cover scale-110" unoptimized priority />
                  )}
                </div>

              </div>

              {/* 이름 + 정보 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[1.5rem] font-extrabold text-gray-800 leading-tight truncate">{petName}</h3>
                {loading ? (
                  <Skeleton width="70%" height={12} style={{ marginTop: 6 }} />
                ) : (
                  <p className="text-[0.82rem] font-semibold mt-0.5" style={{ color: '#d97706' }}>
                    {currentPet ? `${currentPet.breed}` : '반려동물 등록'}
                  </p>
                )}

                {/* 체중 · 나이 배지 */}
                {!loading && currentPet && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(251,191,36,0.3)', color: '#92400e' }}>
                      {currentPet.weight}kg
                    </span>
                    {petAge !== null && (
                      <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(245,158,11,0.18)', color: '#92400e' }}>
                        {petAge}살
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 구분선 */}
            <div style={{ height: '1px', background: 'rgba(251,191,36,0.3)' }} />

            {/* 헬스케어 상태 */}
            <div className="flex items-center justify-between">
              {loading ? (
                <Skeleton width="60%" height={14} />
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: unfinishedHealthTasks > 0 ? '#f59e0b' : '#10b981' }} />
                    <p className="text-[0.78rem] font-semibold text-gray-600">
                      {unfinishedHealthTasks > 0
                        ? `건강 체크리스트 ${unfinishedHealthTasks}건 남음`
                        : `${selectedStage?.stageSummary || '모든 헬스케어 완료! 🐾'}`}
                    </p>
                  </div>

                </>
              )}
            </div>
          </div>
        </div>

        {/* ─── ROW 2: Medium Cards (거래내역 + 가계부) — 2 Col ─── */}
        <div className="grid grid-cols-2 gap-3 shrink-0">
          {/* 거래내역 */}
          <div
            onClick={() => router.push('/account')}
            className="dashboard-card flex flex-col p-4 rounded-[1.25rem] cursor-pointer overflow-hidden relative"
            style={{
              animationDelay: '0.1s',
              background: 'linear-gradient(145deg, #eef2ff 0%, #e0e7ff 100%)',
              border: '1px solid #c7d2fe',
              boxShadow: '0 2px 12px rgba(99,102,241,0.1)',
              minHeight: '150px',
            }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-1 rounded-r-[1.25rem]" style={{ background: 'linear-gradient(to bottom, #818cf8, #6366f1)' }} />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 overflow-hidden"
              style={{ background: 'rgba(99,102,241,0.15)' }}>
              <Image src={displayPayIcon} alt="transaction" width={36} height={36} className="object-contain" unoptimized />
            </div>
            <p className="text-[0.62rem] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#6366f1' }}>거래 관리</p>
            <h3 className="text-[0.95rem] font-extrabold text-gray-800 leading-tight">거래 내역</h3>
            <div className="mt-auto pt-2">
              {loading ? (
                <Skeleton width="80%" height={12} />
              ) : (
                <>
                  <p className="text-[0.75rem] font-bold" style={{ color: '#4f46e5' }}>카드 {cardCount}장 · {totalCardTxCount}건</p>
                  <p className="text-[0.65rem] text-gray-400 mt-0.5 line-clamp-1">총 {totalCardSpending.toLocaleString()}원 지출</p>
                </>
              )}
            </div>
          </div>

          {/* 생활 가계부 */}
          <div
            onClick={() => router.push('/ledger')}
            className="dashboard-card flex flex-col p-4 rounded-[1.25rem] cursor-pointer overflow-hidden relative"
            style={{
              animationDelay: '0.15s',
              background: 'linear-gradient(145deg, #ecfdf5 0%, #d1fae5 100%)',
              border: '1px solid #a7f3d0',
              boxShadow: '0 2px 12px rgba(16,185,129,0.1)',
              minHeight: '150px',
            }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-1 rounded-r-[1.25rem]" style={{ background: 'linear-gradient(to bottom, #34d399, #10b981)' }} />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 overflow-hidden"
              style={{ background: 'rgba(16,185,129,0.15)' }}>
              <Image src={displayAccountbookIcon} alt="ledger" width={36} height={36} className="object-contain" unoptimized />
            </div>
            <p className="text-[0.62rem] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#059669' }}>생활 가계부</p>
            <h3 className="text-[0.95rem] font-extrabold text-gray-800 leading-tight">이번 달 지출</h3>
            <div className="mt-auto pt-2">
              {loading ? (
                <Skeleton width="80%" height={12} />
              ) : (
                <>
                  <p className="text-[0.75rem] font-bold" style={{ color: '#10b981' }}>{ledgerTotal.toLocaleString()}원</p>
                  <p className="text-[0.65rem] text-gray-400 mt-0.5 line-clamp-1">주요: {ledgerTopCategory || topCategoryName}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ─── ROW 3: Supplies — Wide Card ─── */}
        <div
          onClick={() => router.push('/supplies')}
          className="dashboard-card relative flex items-center gap-4 p-5 rounded-[1.25rem] cursor-pointer overflow-hidden shrink-0"
          style={{
            animationDelay: '0.22s',
            background: overdueSupplies.length > 0
              ? 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)'
              : imminentSupplies.length > 0
                ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
                : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            border: overdueSupplies.length > 0 ? '1px solid #fecdd3'
              : imminentSupplies.length > 0 ? '1px solid #fde68a'
                : '1px solid #bae6fd',
            boxShadow: overdueSupplies.length > 0
              ? '0 2px 12px rgba(239,68,68,0.12)'
              : '0 2px 12px rgba(14,165,233,0.1)',
          }}
        >

          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ml-2 overflow-hidden"
            style={{
              background: overdueSupplies.length > 0 ? 'rgba(239,68,68,0.12)'
                : imminentSupplies.length > 0 ? 'rgba(245,158,11,0.15)'
                  : 'rgba(14,165,233,0.12)'
            }}>
            <Image src={displaySuppliesIcon} alt="supplies" width={44} height={44} className="object-contain" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[0.62rem] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: overdueSupplies.length > 0 ? '#dc2626' : imminentSupplies.length > 0 ? '#d97706' : '#0284c7' }}>
              재고 &amp; 소모품
            </p>
            <h3 className="text-[1rem] font-extrabold text-gray-800">소모품 현황</h3>
            {loading ? (
              <Skeleton width="60%" height={12} style={{ marginTop: 4 }} />
            ) : (
              <div className="mt-1">
                <p className="text-[0.78rem] font-bold">
                  {overdueSupplies.length > 0 && <span style={{ color: '#ef4444' }}>초과 {overdueSupplies.length}건</span>}
                  {overdueSupplies.length > 0 && imminentSupplies.length > 0 && <span className="text-gray-300"> · </span>}
                  {imminentSupplies.length > 0 && <span style={{ color: '#f59e0b' }}>임박 {imminentSupplies.length}건</span>}
                  {overdueSupplies.length === 0 && imminentSupplies.length === 0 && <span style={{ color: '#10b981' }}>모두 충분해요 ✓</span>}
                </p>
                <p className="text-[0.65rem] text-gray-400 mt-0.5 line-clamp-1">{urgentSuppliesText}</p>
              </div>
            )}
          </div>
          <span className="text-xl shrink-0 mr-1"
            style={{ color: overdueSupplies.length > 0 ? '#f87171' : imminentSupplies.length > 0 ? '#fbbf24' : '#38bdf8' }}>›</span>
        </div>

        {/* ─── ROW 4: Report/Dashboard Banner — Full Width Dark ─── */}
        <div
          onClick={() => router.push('/dashboard')}
          className="dashboard-card relative flex items-center p-5 rounded-[1.5rem] cursor-pointer overflow-hidden shrink-0"
          style={{
            animationDelay: '0.3s',
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 60%, #ddd6fe 100%)',
            border: '1px solid #ddd6fe',
            boxShadow: '0 4px 20px rgba(109, 40, 217, 0.1)',
          }}
        >
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-30" style={{ background: '#c4b5fd', filter: 'blur(20px)' }} />
          <div className="absolute -bottom-4 left-10 w-20 h-20 rounded-full opacity-20" style={{ background: '#ddd6fe', filter: 'blur(16px)' }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
            style={{ background: 'rgba(109, 40, 217, 0.08)', border: '1px solid rgba(109, 40, 217, 0.15)' }}>
            <Image src={displayReportIcon} alt="report" width={48} height={48} className="object-contain" unoptimized />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-[0.62rem] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#7c3aed' }}>맞춤 소비 리포트</p>
            <h3 className="text-[1.05rem] font-extrabold text-gray-800 leading-tight">대시보드</h3>
            {loading ? (
              <Skeleton width="60%" height={12} style={{ marginTop: 6 }} />
            ) : (
              <>
                <p className="text-[0.78rem] mt-1 font-semibold" style={{ color: '#5b21b6' }}>
                  현재 <span className="text-violet-700 font-extrabold">{myRank?.rank || '-'}위</span> 진행 중!
                </p>
                <p className="text-[0.68rem] mt-0.5" style={{ color: '#6d28d9', opacity: 0.8 }}>지난주 대비 지출 12% 감소</p>
              </>
            )}
          </div>
          <div className="w-14 h-14 shrink-0 opacity-90">
            <Lottie animationData={firstAnimation} loop autoplay />
          </div>
        </div>

      </Box>

      <div className="absolute bottom-6 right-4 z-50 flex flex-col items-end">
        {isAiSummaryOpen && (
          <div className="mb-3 speech-bubble-anim">
            <SpeechBubble backgroundColor="#4F46E5" borderColor="#4338CA" className="text-white max-w-[280px]">
              <p className="text-[0.95rem] font-bold leading-relaxed whitespace-pre-wrap">
                {messages[currentMessageIndex]}
              </p>
              <div className="flex gap-1 mt-2 justify-end opacity-60">
                {messages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${i === currentMessageIndex ? 'w-3 bg-white' : 'w-1 bg-white/50'}`}
                  />
                ))}
              </div>
            </SpeechBubble>
          </div>
        )}

        <button
          onClick={handleCatClick}
          className="relative w-20 h-20 flex items-center justify-center transition-transform hover:scale-110 active:scale-90 z-10"
          aria-label="Toggle AI Summary"
        >
          <div className="w-32 h-32 absolute -top-6 -left-6 pointer-events-none">
            <Lottie animationData={catAnimation} loop autoplay />
          </div>

          {!isAiSummaryOpen && (
            <span className="absolute top-3 right-3 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
