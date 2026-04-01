import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type { GetServerSideProps } from 'next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/features/calendar';
import type { DaySummary } from '@/features/calendar';
import { Transaction, TransactionAddForm, useLedgerData } from '@/features/transaction';
import type { TransactionItem, SubItem } from '@/features/transaction';
import { CATEGORY_COLORS, CATEGORY_IMAGE_URLS } from '@/shared/constants/categories';
import { request } from '@/api/request';
import { CATEGORY_META } from '@/shared/constants/categories';
import { useCategories } from '@/shared/context/CategoryContext';
import { useMonthlyLedgerSummary, useDailyLedgerDetail, useInvalidateLedger } from '@/features/calendar/api/queries';
import { getMonthlyLedgerSummary } from '@/features/calendar/api/getMonthlyLedgerSummaryApi';
import { getDailyLedgerDetail } from '@/features/calendar/api/getDailyLedgerDetailApi';
import type { DailyLedgerDetail, MonthlyLedgerSummary } from '@/features/calendar/types/calendarApi';
import { postManualLedger } from '@/features/transaction/api/postManualLedgerApi';
import { useUser } from '@/features/user/context/UserContext';
import { usePets } from '@/features/pet/context/PetContext';
import Card from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { Badge } from '@/shared/components/common/Badge';
import { Button } from '@/shared/components/common/Button';
import { useRouter } from 'next/router';
import { Skeleton, SkeletonCard, SkeletonListItem } from '@/shared/components/skeleton/Skeleton';

type ViewMode = 'calendar' | 'detail' | 'edit' | 'add';

/* ── 토스 스타일 전환 애니메이션 ── */
const pageVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const pageTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };

let subItemId = 1;
const genSubId = () => `sub-${subItemId++}`;

import type { Pet } from '@/features/pet/types';

/** 거래 단위 그룹핑: merchant+payer 기준 → 하나의 TransactionItem (subItems 포함) */
const groupDetailsToTransactions = (details: DailyLedgerDetail[], myNickname: string, myUserId: number, globalPets: Pet[]): TransactionItem[] => {
  const groups = new Map<string, DailyLedgerDetail[]>();
  for (const d of details) {
    // 수동 입력 거래는 각각 개별 표시 (그룹핑하지 않음)
    const isManual = d.merchantName === '수동 입력' || d.merchantName === '직접 등록';
    const key = isManual
      ? `manual__${d.transactionId ?? d.detailId ?? Math.random()}`
      : `${d.merchantName}__${(d as any).payerId || d.payerName}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(d);
  }

  const items: TransactionItem[] = [];
  for (const [, group] of groups) {
    const allPets = [...new Set(group.flatMap((d) => d.petNames))];
    const allCategories = [...new Set(group.map((d) => d.categoryName))];
    const totalAmount = group.reduce((sum, d) => sum + d.amount, 0);
    const payer = group[0].payerName;
    const payerId = (group[0] as any).payerId;
    const isMine = (myUserId && payerId) ? (payerId === myUserId) : (myNickname && payer === myNickname);
    const displayPayer = isMine ? '나' : payer;
    const primaryCategory = allCategories[0];

    const subItems: SubItem[] = group.map((d) => ({
      id: genSubId(),
      what: d.categoryName,
      whom: d.petNames as any,
      amount: d.amount,
    }));

    const actualId = group[0].transactionId ?? group[0].detailId ?? new Date().getTime();

    let iconSrc = group[0].stickerImageUrl || undefined;
    
    // stickerImageUrl이 없고 펫 지출인 경우 카테고리와 펫 종에 따라 디폴트 이미지 설정
    if (!iconSrc && allPets.length > 0) {
      const catMeta = CATEGORY_META.find(c => c.name === primaryCategory);
      if (catMeta) {
        const involvedPets = globalPets.filter(p => allPets.includes(p.name));
        const hasDog = involvedPets.some(p => p.species === 'DOG');
        const hasCat = involvedPets.some(p => p.species === 'CAT');

        if (hasDog && !hasCat) {
          iconSrc = catMeta.dogImage.src;
        } else if (hasCat && !hasDog) {
          iconSrc = catMeta.catImage.src;
        } else if (hasDog && hasCat) {
          // 둘 다 있으면 랜덤 (Math.random)
          iconSrc = Math.random() > 0.5 ? catMeta.dogImage.src : catMeta.catImage.src;
        } else {
          // 종 정보가 없으면 기본값
          iconSrc = catMeta.image.src;
        }
      }
    }

    items.push({
      id: String(actualId),

      store: group[0].merchantName,
      amount: totalAmount,
      category: allCategories.length > 1 ? allCategories.join(', ') : primaryCategory,
      time: '',
      isPet: allPets.length > 0,
      pets: allPets,
      recordedBy: displayPayer,
      categoryColor: CATEGORY_COLORS[primaryCategory] || '#888',
      iconSrc,
      subItems,
    });
  }
  return items;
};

interface LedgerPageProps {
  initialSummary: MonthlyLedgerSummary | null;
}

export const getServerSideProps: GetServerSideProps<LedgerPageProps> = async () => {
  const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
  const now = new Date();
  let initialSummary: MonthlyLedgerSummary | null = null;
  try {
    const res = await fetch(`${base}/api/v1/transactions/ledger/monthly/summary?year=${now.getFullYear()}&month=${now.getMonth() + 1}`);
    const json = await res.json();
    if (json.data) {
      initialSummary = json.data;
    }
  } catch (e) {
    console.error('[SSR] 가계부 데이터 로딩 실패:', e);
  }
  return { props: { initialSummary } };
};

export default function LedgerPage({ initialSummary }: LedgerPageProps) {
  const today = new Date();
  const router = useRouter();
  const nowMonth = { year: today.getFullYear(), month: today.getMonth() + 1 };
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [editingTx, setEditingTx] = useState<TransactionItem | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState(nowMonth);

  // 캘린더용 데이터 및 요약 (월 변경에 따라 바뀜)
  const [monthlySummary, setMonthlySummary] = useState<MonthlyLedgerSummary | null>(initialSummary);
  const [transactionsByDate, setTransactionsByDate] = useState<Record<string, TransactionItem[]>>({});
  const [loading, setLoading] = useState(!initialSummary);

  const daySummaries = useMemo(() => {
    if (!monthlySummary?.days) return {};
    const res: Record<string, DaySummary> = {};
    for (const day of monthlySummary.days) {
      res[day.date] = { totalAmount: day.dailyTotal };
    }
    return res;
  }, [monthlySummary]);

  // 유저 프로필 (payerName, payerId 비교용)
  const { user } = useUser();
  const myNickname = user?.nickname ?? '';
  const myUserId = user?.userId ?? 0;

  // 카테고리
  const { categoryNames } = useCategories();

  // 펫 목록
  const { pets: globalPets } = usePets();

  // 현재 달/이전 달 총 지출 (요약카드용)
  const monthlyTotal = monthlySummary?.monthlyTotalExpense || 0;
  const topCategory = monthlySummary?.topCategory?.categoryName || null;

  // 캘린더용 월별 요약 API 호출
  const fetchMonthlySummary = useCallback(async (year: number, month: number) => {
    setLoading(true);
    try {
      const res = await getMonthlyLedgerSummary(year, month);
      setMonthlySummary(res.data);
    } catch (err) {
      console.error('[월간 가계부 API fetch 실패]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 일간 상세 API 호출 → 거래 단위로 그룹핑 + subItems 포함
  const fetchDailyDetail = useCallback(async (date: string) => {
    try {
      const res = await getDailyLedgerDetail(date);
      const details = res.data || [];
      const grouped = groupDetailsToTransactions(details, myNickname, myUserId, globalPets);
      setTransactionsByDate((prev) => ({ ...prev, [date]: grouped }));
    } catch (err) {
      console.error('[일간 가계부 API fetch 실패]', err);
      setTransactionsByDate((prev) => ({ ...prev, [date]: [] }));
    }
  }, [myNickname, myUserId, globalPets]);

  // CSR fallback: only refetch if SSR didn't provide data
  useEffect(() => {
    if (!initialSummary) {
      fetchMonthlySummary(today.getFullYear(), today.getMonth() + 1);
    }
  }, []);

  // useLedgerData 훅
  const { calendarEvents } = useLedgerData({
    transactions: transactionsByDate,
    startDate: '',
    endDate: '',
    petFilter: 'all',
  });

  // 월 변경 (캘린더만)
  const handleMonthChange = useCallback((year: number, month: number) => {
    const m = month + 1;
    setCurrentMonth({ year, month: m });
    fetchMonthlySummary(year, m);
  }, [fetchMonthlySummary]);

  // 날짜 선택 → 즉시 뷰 전환, 데이터는 비동기 로드
  const handleSelectDate = useCallback((date: string) => {
    setSelectedDate(date);
    setViewMode('detail');
    fetchDailyDetail(date);
  }, [fetchDailyDetail]);

  // 거래 클릭 → 즉시 편집 뷰로 전환, 데이터는 비동기 로드
  const handleEdit = useCallback(async (tx: TransactionItem) => {
    setEditingTx(tx);
    setDetailData(null);
    setViewMode('edit');

    try {
      const { getTransactionDetail } = await import('@/features/transaction/api/getTransactionDetailApi');
      const res = await getTransactionDetail(Number(tx.id));
      setDetailData(res.data);
    } catch (err) {
      console.error('[거래 상세 조회 실패]', err);
    }
  }, []);

  // 뒤로가기
  const handleClose = useCallback(() => {
    setViewMode('calendar');
  }, []);

  if (loading && !monthlySummary) {
    // 스켈레톤용 날짜 계산 (현재 달)
    const skYear = currentMonth.year;
    const skMonth = currentMonth.month; // 1-indexed
    const skMonthIdx = skMonth - 1; // 0-indexed for Date
    const skFirstDay = new Date(skYear, skMonthIdx, 1).getDay();
    const skLastDate = new Date(skYear, skMonth, 0).getDate();
    const skPrevLastDate = new Date(skYear, skMonthIdx, 0).getDate();
    const skDays: { day: number; isCurrent: boolean }[] = [];
    for (let i = skFirstDay - 1; i >= 0; i--) skDays.push({ day: skPrevLastDate - i, isCurrent: false });
    for (let d = 1; d <= skLastDate; d++) skDays.push({ day: d, isCurrent: true });
    const skRemaining = Math.ceil(skDays.length / 7) * 7 - skDays.length;
    for (let d = 1; d <= skRemaining; d++) skDays.push({ day: d, isCurrent: false });
    const MONTH_NAMES = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

    return (
      <div className="max-w-[500px] mx-auto overflow-hidden">
        {/* ─── 월별 지출 요약 카드 (실제와 동일) ─── */}
        <Card elevation="low" radius="large" withBorder>
          <Box
            padding="medium"
            paddingHorizontal="large"
            direction="column"
            gap="xsmall"
            htmlStyle={{
              background: 'linear-gradient(135deg, var(--color-pet-grad-start), var(--color-pet-grad-end))',
            }}
          >
            <Box direction="row" alignItems="center" justifyContent="space-between">
              <Paragraph typography="st7" fontWeight="medium" color="var(--color-pet-text-sub)">
                {skMonth}월 한달 간 총 지출
              </Paragraph>
            </Box>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <Skeleton width={160} height={28} />
              </div>
              <Skeleton width={100} height={50} borderRadius={8} />
            </div>
            <Skeleton width={220} height={14} style={{ marginTop: 4 }} />
          </Box>
        </Card>

        <div style={{ height: 12 }} />

        {/* ─── 캘린더 (실제 Calendar 컴포넌트와 동일한 구조) ─── */}
        <div className="bg-white rounded-[20px] overflow-hidden" style={{ border: '1px solid var(--color-pet-border, #ede9e3)' }}>
          {/* CalendarHeader (실제와 동일 클래스) */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <span className="bg-transparent border-none text-[1em] text-[var(--color-pet-text-dim)] px-2 py-1">‹</span>
            <div className="text-center">
              <div className="text-[1.2em] font-extrabold text-[var(--color-pet-text-dark)] tracking-tight">
                {MONTH_NAMES[skMonthIdx]}
              </div>
              <div className="text-[0.68em] text-[var(--color-pet-text-secondary)] font-medium mt-px">
                {skYear}
              </div>
            </div>
            <span className="bg-transparent border-none text-[1em] text-[var(--color-pet-text-dim)] px-2 py-1">›</span>
          </div>

          {/* CalendarGrid (실제와 동일 클래스) */}
          <div className="px-3 pb-2">
            {/* 요일 헤더 (실제 색상: 일=red, 토=blue) */}
            <div className="grid grid-cols-7 text-center mb-1">
              {['일','월','화','수','목','금','토'].map((label, idx) => (
                <div key={label}
                  className="text-[0.72em] font-semibold py-2"
                  style={{ color: idx === 0 ? '#FF3B30' : idx === 6 ? '#007AFF' : '#8e8e93' }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* 날짜 셀 (실제 CalendarDayCell과 동일 클래스) */}
            <div className="grid grid-cols-7 gap-0.5">
              {skDays.map((d, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-start py-1.5 rounded-[10px] min-h-[72px]"
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center text-[0.88em]"
                    style={{
                      borderRadius: 16,
                      fontWeight: 400,
                      color: !d.isCurrent ? '#d1d1d6'
                        : (i % 7 === 0) ? '#FF3B30'
                        : (i % 7 === 6) ? '#007AFF'
                        : 'var(--color-pet-text-dark)',
                    }}
                  >
                    {d.day}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[500px] mx-auto overflow-hidden">
      <AnimatePresence mode="wait">
        {viewMode === 'calendar' && (
          <motion.div
            key="calendar"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            {/* ─── 월별 지출 요약 카드 ─── */}
            <Card elevation="low" radius="large" withBorder clickable onClick={() => router.push('/dashboard')}>
              <Box
                padding="medium"
                paddingHorizontal="large"
                direction="column"
                gap="xsmall"
                htmlStyle={{
                  background: 'linear-gradient(135deg, var(--color-pet-grad-start), var(--color-pet-grad-end))',
                }}
              >
                <Box direction="row" alignItems="center" justifyContent="space-between">
                  <Paragraph typography="st7" fontWeight="medium" color="var(--color-pet-text-sub)">
                    {currentMonth.month}월 한달 간 총 지출
                  </Paragraph>
                </Box>

                {/* 금액 + 비교 스파크라인 */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <Paragraph typography="t2" fontWeight="bold" color="var(--color-pet-text)">
                      {monthlyTotal > 0 ? `₩${monthlyTotal.toLocaleString()}` : '—'}
                    </Paragraph>
                  </div>

                  {/* 비교 스파크라인 그래프 */}
                  {(() => {
                    const curCumList = monthlySummary?.currentMonthTrend || [];
                    const prevCumList = monthlySummary?.lastMonthTrend || [];

                    if (curCumList.length === 0 && prevCumList.length === 0) return null;

                    // 미래 달이면 그래프 안 그림
                    const now = new Date();
                    const viewingDate = new Date(currentMonth.year, currentMonth.month - 1, 1);
                    const isFutureMonth = viewingDate > new Date(now.getFullYear(), now.getMonth(), 1);
                    if (isFutureMonth) return null;

                    // 이번 달이면 오늘까지만, 과거 달이면 전체 표시
                    const isCurrentMonth = currentMonth.year === now.getFullYear() && currentMonth.month === (now.getMonth() + 1);
                    const trimmedCurList = isCurrentMonth
                      ? curCumList.filter(t => t.day <= now.getDate())
                      : curCumList;

                    const curCum = trimmedCurList.map(t => t.cumulativeAmount);
                    const prevCum = prevCumList.map(t => t.cumulativeAmount);

                    const daysInMonth = new Date(currentMonth.year, currentMonth.month, 0).getDate();
                    let py = currentMonth.year, pm = currentMonth.month - 1;
                    if (pm < 1) { pm = 12; py -= 1; }
                    const prevDaysInMonth = new Date(py, pm, 0).getDate();
                    
                    const maxVal = Math.max(...prevCum, ...curCum, 1);
                    // 두 달 모두 같은 x축 사용 (일수가 큰 달 기준)
                    const maxDays = Math.max(daysInMonth, prevDaysInMonth);
                    const W = 130, H = 48, PAD = 3;

                    // 지난 달 포인트
                    const prevPoints = prevCumList.map(t => {
                      const x = PAD + ((t.day - 1) / (maxDays - 1)) * (W - PAD * 2);
                      const y = H - PAD - (t.cumulativeAmount / maxVal) * (H - PAD * 2);
                      return `${x},${y}`;
                    });

                    // 이번 달 포인트 (오늘까지만)
                    const curPoints = trimmedCurList.map(t => {
                      const x = PAD + ((t.day - 1) / (maxDays - 1)) * (W - PAD * 2);
                      const y = H - PAD - (t.cumulativeAmount / maxVal) * (H - PAD * 2);
                      return `${x},${y}`;
                    });

                    if (prevPoints.length < 2 && curPoints.length < 2) return null;

                    const lastCurPt = curPoints.length > 0 ? curPoints[curPoints.length - 1].split(',') : null;
                    
                    const curTotal = curCum.length > 0 ? curCum[curCum.length - 1] : 0;
                    const prevTotal = prevCum.length > 0 ? prevCum[prevCum.length - 1] : 0;
                    const diff = curTotal - prevTotal;

                    return (
                      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ flexShrink: 0 }}>
                        {/* 지난 달 (회색) - 전체 너비 */}
                        {prevPoints.length >= 2 && (
                          <polyline
                            fill="none"
                            stroke="var(--color-pet-text-muted, #ccc)"
                            strokeWidth="1.5"
                            points={prevPoints.join(' ')}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.5"
                          />
                        )}
                        {/* 이번 달 (빨간색/파란색) - 현재 날짜 위치까지만 */}
                        {curPoints.length >= 2 && (
                          <polyline
                            fill="none"
                            stroke={diff > 0 ? '#ff6b6b' : '#4dabf7'}
                            strokeWidth="2.5"
                            points={curPoints.join(' ')}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                        {/* 현재 위치 점 */}
                        {lastCurPt && (
                          <circle cx={lastCurPt[0]} cy={lastCurPt[1]} r="3.5"
                            fill={diff > 0 ? '#ff6b6b' : '#4dabf7'}
                          />
                        )}
                      </svg>
                    );
                  })()}
                </div>

                {/* 이번 달 최다 소비 카테고리 */}
                {topCategory && (
                  <Paragraph typography="st7" fontWeight="semibold" color="var(--color-pet-text-sub)">
                    이번 달에 <span style={{ color: 'var(--color-pet-text)', fontWeight: 700 }}>{topCategory}</span> 지출이 가장 많았어요
                  </Paragraph>
                )}
              </Box>
            </Card>

            <div style={{ height: 12 }} />

            <Calendar
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              events={calendarEvents}
              daySummaries={daySummaries}
              onMonthChange={handleMonthChange}
              initialYear={currentMonth.year}
              initialMonth={currentMonth.month - 1}
            />
          </motion.div>
        )}

        {viewMode === 'detail' && (
          <motion.div
            key="detail"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            <Transaction
              dateString={selectedDate}
              transactionsByDate={transactionsByDate}
              categoryColors={CATEGORY_COLORS}
              categoryIcons={CATEGORY_IMAGE_URLS}
              onClose={handleClose}
              onAdd={() => setViewMode('add')}
              onEdit={handleEdit}
              onDateChange={fetchDailyDetail}
              onDelete={async (txId) => {
                if (window.confirm('이 내역을 삭제하시겠습니까?')) {
                  try {
                    const { deleteTransactionDetails } = await import('@/features/transaction/api/deleteTransactionDetailApi');
                    await deleteTransactionDetails(Number(txId));
                    if (selectedDate) fetchDailyDetail(selectedDate);
                    fetchMonthlySummary(currentMonth.year, currentMonth.month);
                  } catch (err: any) {
                    if (err.status === 404 || err.response?.status === 404) {
                      // 404 means it might be a manual ledger entry
                      try {
                        const { deleteManualLedger } = await import('@/features/transaction/api/deleteManualLedgerApi');
                        await deleteManualLedger(Number(txId));
                        if (selectedDate) fetchDailyDetail(selectedDate);
                        fetchMonthlySummary(currentMonth.year, currentMonth.month);
                      } catch (manualErr: any) {
                        console.error('[수동 내역 삭제 실패]', manualErr);
                        alert(`내역 삭제에 실패했습니다: ${manualErr.message || '알 수 없는 오류'}`);
                      }
                    } else {
                      console.error('[자동/분류 내역 삭제 실패]', err);
                      alert('내역 삭제에 실패했습니다.');
                    }
                  }
                }
              }}
            />
          </motion.div>
        )}

        {(viewMode === 'edit' || viewMode === 'add') && (
          <motion.div
            key="form"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            {/* edit 모드에서 detailData 로딩 중이면 폼 마운트를 지연 */}
            {viewMode === 'edit' && !detailData ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Skeleton width={200} height={24} style={{ marginBottom: 12 }} />
                <Skeleton width={140} height={16} />
              </div>
            ) : (
            <TransactionAddForm
              dateString={selectedDate || new Date().toISOString().slice(0, 10)}
              categoryOptions={categoryNames}
              petList={globalPets.map(p => ({ id: p.id, name: p.name }))}
              initialAmount={editingTx?.amount ?? 0}
              maxAmount={editingTx?.amount ?? 0}
              merchantName={editingTx?.store}
              initialItems={
                viewMode === 'edit' && detailData && detailData.classifications?.length > 0
                  ? detailData.classifications.map((cls: any, i: number) => ({
                    id: `edit-${i}`,
                    what: cls.categoryName,
                    whom: cls.petAllocations.map((p: any) => p.petId),
                    amount: cls.amount,
                  }))
                  : undefined
              }
              onSave={async (data) => {
                // 수동 등록 API 호출
                if (viewMode === 'add' && selectedDate) {
                  try {
                    for (const item of (data as any).items || []) {
                      const catMeta = CATEGORY_META.find(c => c.name === item.what);
                      const petIds = item.whom || [];
                      const numPets = Math.max(petIds.length, 1);
                      const baseAmount = Math.floor(item.amount / numPets);
                      const remainder = item.amount % numPets;

                      const petAllocations = petIds.map((petId: number, index: number) => {
                        const allocatedAmount = index === 0 ? baseAmount + remainder : baseAmount;
                        return {
                          petId,
                          allocatedAmount,
                        };
                      });
                      await postManualLedger({
                        transactionDate: `${selectedDate}T12:00:00`,
                        merchantName: editingTx?.store || '수동 입력',
                        amount: item.amount,
                        categoryId: catMeta?.id || 8,
                        memo: '',
                        petAllocations,
                      });
                    }
                    // 성공 후 다시 일간 데이터 로드
                    await fetchDailyDetail(selectedDate);
                    fetchMonthlySummary(currentMonth.year, currentMonth.month);
                  } catch (err) {
                    console.error('[수동 등록 실패]', err);
                  }
                } else if (viewMode === 'edit' && editingTx && selectedDate) {
                  // 기존 거래 수정 로직
                  try {
                    const { updateTransactionDetails } = await import('@/features/transaction/api/updateTransactionDetailApi');
                    const categoryNamesList = Object.keys(CATEGORY_COLORS);
                    const updateData = {
                      classifications: (data as any).items.map((item: any) => {
                        const petIds = item.whom || [];
                        const numPets = Math.max(petIds.length, 1);
                        const baseAmount = Math.floor(item.amount / numPets);
                        const remainder = item.amount % numPets;

                        return {
                          categoryId: categoryNamesList.indexOf(item.what) + 1 || 99,
                          amount: item.amount,
                          memo: '',
                          petAllocations: petIds.map((petId: number, index: number) => {
                            const allocatedAmount = index === 0 ? baseAmount + remainder : baseAmount;
                            return {
                              petId,
                              allocatedAmount,
                            };
                          })
                        };
                      })
                    };
                    await updateTransactionDetails(Number(editingTx.id), updateData);
                    // 성공 후 다시 로드
                    await fetchDailyDetail(selectedDate);
                    fetchMonthlySummary(currentMonth.year, currentMonth.month);
                  } catch (err: any) {
                    console.error('[수정 등록 실패]', err);
                    if (err?.status === 404) {
                      alert(`수정 실패: 해당 거래(ID: ${editingTx.id})를 찾을 수 없습니다. (수동 입력 내역이거나, 서버 데이터와 동기화되지 않았을 수 있습니다.)`);
                    } else {
                      alert('수정 등록에 실패했습니다.');
                    }
                  }
                }
                setEditingTx(null);
                setDetailData(null);
                setViewMode('detail');
              }}
              onCancel={() => {
                setEditingTx(null);
                setDetailData(null);
                setViewMode('detail');
              }}
            />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
