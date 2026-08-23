import React, { useState, useCallback, useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { Calendar } from '@/features/calendar';
import type { DaySummary } from '@/features/calendar';
import { getMonthlyLedgerSummary } from '@/features/calendar/api/getMonthlyLedgerSummaryApi';
import { getDailyLedgerDetail } from '@/features/calendar/api/getDailyLedgerDetailApi';
import type { DailyLedgerDetail } from '@/features/calendar/types/calendarApi';

import Image from 'next/image';
import { CATEGORY_IMAGES } from '@/shared/constants/categories';


interface CalendarPageProps {
  initialSummaries: Record<string, DaySummary> | null;
  initialMonthlyTotal: number;
  ssrYear: number;
  ssrMonth: number;
}

export const getServerSideProps: GetServerSideProps<CalendarPageProps> = async () => {
  const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  let initialSummaries: Record<string, DaySummary> | null = null;
  let initialMonthlyTotal = 0;
  try {
    const res = await fetch(`${base}/api/v1/transactions/ledger/monthly/summary?year=${year}&month=${month}`);
    const json = await res.json();
    const data = json.data;
    if (data) {
      const summaries: Record<string, DaySummary> = {};
      for (const day of data.days) {
        summaries[day.date] = { totalAmount: day.dailyTotal };
      }
      initialSummaries = summaries;
      initialMonthlyTotal = data.monthlyTotalExpense;
    }
  } catch (e) {
    console.error('[SSR] 캘린더 데이터 로딩 실패:', e);
  }
  return { props: { initialSummaries, initialMonthlyTotal, ssrYear: year, ssrMonth: month } };
};

export default function CalendarPage({ initialSummaries, initialMonthlyTotal, ssrYear, ssrMonth }: CalendarPageProps) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [daySummaries, setDaySummaries] = useState<Record<string, DaySummary>>(initialSummaries || {});
  const [monthlyTotal, setMonthlyTotal] = useState(initialMonthlyTotal);
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(ssrYear);
  const [currentMonth, setCurrentMonth] = useState(ssrMonth);

  // 일간 상세
  const [dailyDetails, setDailyDetails] = useState<DailyLedgerDetail[]>([]);
  const [dailyLoading, setDailyLoading] = useState(false);

  const fetchMonthlySummary = useCallback(async (year: number, month: number) => {
    setLoading(true);
    try {
      const res = await getMonthlyLedgerSummary(year, month);
      const data = res.data;

      const summaries: Record<string, DaySummary> = {};
      for (const day of data.days) {
        summaries[day.date] = { totalAmount: day.dailyTotal };
      }

      setDaySummaries(summaries);
      setMonthlyTotal(data.monthlyTotalExpense);
    } catch (err) {
      console.error('[월간 가계부 API fetch 실패]', err);
    } finally {
      setLoading(false);
    }
  }, []);


  // 날짜 클릭 시 일간 상세 조회
  const fetchDailyDetail = useCallback(async (date: string) => {
    setDailyLoading(true);
    try {
      const res = await getDailyLedgerDetail(date);
      setDailyDetails(res.data || []);
    } catch (err) {
      console.error('[일간 가계부 API fetch 실패]', err);
      setDailyDetails([]);
    } finally {
      setDailyLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonthlySummary(currentYear, currentMonth);
  }, [fetchMonthlySummary, currentYear, currentMonth]);

  // 날짜 선택 시 상세 API 호출
  const handleSelectDate = useCallback((date: string) => {
    setSelectedDate(date);
    fetchDailyDetail(date);
  }, [fetchDailyDetail]);

  const handleMonthChange = useCallback((year: number, month: number) => {
    const apiMonth = month + 1;
    setCurrentYear(year);
    setCurrentMonth(apiMonth);
    // 월 변경 시 선택 초기화
    setSelectedDate(undefined);
    setDailyDetails([]);
  }, []);

  const dailyTotal = dailyDetails.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="p-6 max-w-[480px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[1.25em] font-bold text-[var(--color-pet-text)]">📅 캘린더</h1>
        {monthlyTotal > 0 && (
          <span className="text-[0.85em] font-bold text-[#FF3B30]">
            이번 달 -{monthlyTotal.toLocaleString()}원
          </span>
        )}
      </div>

      <Calendar
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        daySummaries={daySummaries}
        onMonthChange={handleMonthChange}
      />

      {loading && (
        <div className="mt-4 text-center text-sm text-[var(--color-pet-text-muted)]">
          거래 내역을 불러오는 중...
        </div>
      )}

      {/* 날짜 선택 시 일간 상세 내역 */}
      {selectedDate && (
        <div className="mt-4 bg-[var(--color-pet-surface)] rounded-[16px] border border-[var(--color-pet-border)] overflow-hidden">
          {/* 헤더 */}
          <div className="px-4 py-3 border-b border-[var(--color-pet-border)] flex justify-between items-center">
            <span className="text-[0.85em] font-bold text-[var(--color-pet-text)]">
              {selectedDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일')}
            </span>
            {dailyDetails.length > 0 && (
              <span className="text-[0.75em] font-bold text-[#FF3B30]">
                -{dailyTotal.toLocaleString()}원
              </span>
            )}
          </div>

          {/* 로딩 */}
          {dailyLoading && (
            <div className="px-4 py-6 text-center text-sm text-[var(--color-pet-text-muted)]">
              상세 내역을 불러오는 중...
            </div>
          )}

          {/* 상세 내역 리스트 */}
          {!dailyLoading && dailyDetails.length > 0 && dailyDetails.map((detail) => (
            <div
              key={detail.detailId}
              className="px-4 py-3 flex justify-between items-start border-b border-[var(--color-pet-border)]/30 last:border-b-0"
            >
              <div className="flex items-start gap-2.5">
                {/* 카테고리 아이콘 */}
                <div className="w-9 h-9 rounded-[10px] bg-[var(--color-pet-bg-light)] flex items-center justify-center shrink-0 overflow-hidden p-1">
                  {CATEGORY_IMAGES[detail.categoryName] ? (
                    <Image src={CATEGORY_IMAGES[detail.categoryName]} alt={detail.categoryName} width={28} height={28} className="object-contain" />
                  ) : (
                    <span className="text-[1.1em]">💰</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[0.82em] font-semibold text-[var(--color-pet-text)]">
                    {detail.merchantName}
                  </div>
                  <div className="text-[0.65em] mt-0.5 text-[var(--color-pet-text-secondary)]">
                    {detail.categoryName} · {detail.payerName}
                  </div>
                  {detail.memo && (
                    <div className="text-[0.62em] mt-0.5 text-[var(--color-pet-text-muted)]">
                      💬 {detail.memo}
                    </div>
                  )}
                  {detail.petNames.length > 0 && (
                    <div className="text-[0.62em] mt-0.5 text-[var(--color-pet-text-muted)]">
                      🐾 {detail.petNames.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-[0.85em] font-bold text-[var(--color-pet-text)] shrink-0 ml-2">
                -{detail.amount.toLocaleString()}원
              </div>
            </div>
          ))}

          {/* 내역 없음 */}
          {!dailyLoading && dailyDetails.length === 0 && (
            <div className="px-4 py-6 text-center">
              <div className="text-[1.5em] mb-2">📭</div>
              <div className="text-sm text-[var(--color-pet-text-muted)]">이 날은 거래 내역이 없어요</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
