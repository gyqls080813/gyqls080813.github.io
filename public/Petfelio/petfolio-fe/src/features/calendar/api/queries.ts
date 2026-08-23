/**
 * React Query Hooks — 가계부 (Ledger)
 *
 * SSR initialData와 결합하여 즉시 렌더 + 백그라운드 갱신을 제공합니다.
 */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/hooks/queryKeys';
import { dynamicQueryOptions } from '@/shared/hooks/queryConfig';
import { getMonthlyLedgerSummary } from './getMonthlyLedgerSummaryApi';
import { getDailyLedgerDetail } from './getDailyLedgerDetailApi';
import type { MonthlyLedgerSummary, DailyLedgerDetail } from '../types/calendarApi';

/** 월간 가계부 요약 (SSR initialData 지원) */
export function useMonthlyLedgerSummary(
  year: number,
  month: number,
  initialData?: MonthlyLedgerSummary | null,
) {
  return useQuery({
    queryKey: queryKeys.ledger.monthly(year, month),
    queryFn: async () => {
      const res = await getMonthlyLedgerSummary(year, month);
      return res.data;
    },
    ...dynamicQueryOptions,
    // SSR에서 미리 받아온 데이터가 있으면 초기값으로 사용 (네트워크 요청 없이 즉시 렌더)
    ...(initialData ? { initialData } : {}),
  });
}

/** 일간 가계부 상세 */
export function useDailyLedgerDetail(date: string | undefined) {
  return useQuery({
    queryKey: queryKeys.ledger.daily(date || ''),
    queryFn: async () => {
      if (!date) return [] as DailyLedgerDetail[];
      const res = await getDailyLedgerDetail(date);
      return res.data || [];
    },
    enabled: !!date,
    ...dynamicQueryOptions,
    staleTime: 15 * 1000, // 일간 상세는 15초 캐시 (수정이 잦을 수 있음)
  });
}

/** 가계부 캐시 무효화 헬퍼 */
export function useInvalidateLedger() {
  const queryClient = useQueryClient();
  return {
    /** 특정 월 요약 무효화 */
    invalidateMonthly: (year: number, month: number) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.ledger.monthly(year, month) }),
    /** 특정 일 상세 무효화 */
    invalidateDaily: (date: string) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.ledger.daily(date) }),
    /** 가계부 전체 무효화 */
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.ledger.all }),
  };
}
