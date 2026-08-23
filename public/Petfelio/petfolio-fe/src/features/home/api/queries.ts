/**
 * React Query Hooks — 대시보드 / 홈
 *
 * 홈 화면에서 사용하는 랭킹, 월별 비교 등
 */
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/hooks/queryKeys';
import { dynamicQueryOptions, staticQueryOptions } from '@/shared/hooks/queryConfig';
import { getRanking, getMonthlyCompare, getDashboardSummary } from './dashboardApi';

/** 그룹 내 랭킹 */
export function useRanking() {
  return useQuery({
    queryKey: queryKeys.dashboard.ranking(),
    queryFn: async () => {
      const res = await getRanking();
      return (res.data || []) as Array<{ rank: number; nickname: string; totalExpense: number }>;
    },
    ...dynamicQueryOptions,
  });
}

/** 반려동물별 월간 지출 비교 */
export function useMonthlyCompare(
  petId: number | undefined,
  year: number,
  month: number,
) {
  return useQuery({
    queryKey: queryKeys.dashboard.monthlyCompare(petId || 0, year, month),
    queryFn: async () => {
      if (!petId) return null;
      const res = await getMonthlyCompare(petId, year, month);
      return res.data || null;
    },
    enabled: !!petId,
    ...dynamicQueryOptions,
  });
}

/** 대시보드 요약 */
export function useDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: async () => {
      const res = await getDashboardSummary();
      return res.data || null;
    },
    ...dynamicQueryOptions,
  });
}
