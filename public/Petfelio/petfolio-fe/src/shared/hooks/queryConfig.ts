/**
 * React Query — 전역 캐시 설정 및 공용 쿼리 옵션
 *
 * QueryClient의 전역 기본값과 데이터 특성에 따른 캐시 프리셋을 정의합니다.
 *
 * 캐시 전략:
 *   - STATIC (5분): 자주 변하지 않는 데이터 (사용자 프로필, 펫 목록, 카드 목록)
 *   - DYNAMIC (30초): 자주 변하는 데이터 (거래 내역, 가계부)
 *   - REALTIME (0초): 항상 최신 (SSE 연동 데이터)
 */
import { QueryClient } from '@tanstack/react-query';

/** ─── 캐시 시간 상수 (ms) ─── */
export const CACHE_TIME = {
  /** 자주 변하지 않는 데이터: 5분 stale + 30분 gc */
  STATIC_STALE: 5 * 60 * 1000,
  STATIC_GC: 30 * 60 * 1000,

  /** 보통 빈도로 변하는 데이터: 1분 stale + 10분 gc */
  MODERATE_STALE: 1 * 60 * 1000,
  MODERATE_GC: 10 * 60 * 1000,

  /** 자주 변하는 데이터: 30초 stale + 5분 gc */
  DYNAMIC_STALE: 30 * 1000,
  DYNAMIC_GC: 5 * 60 * 1000,

  /** 항상 최신: 0초 stale */
  REALTIME_STALE: 0,
} as const;

/** 캐싱 비활성화 플래그 (벤치마크 비교용) */
const DISABLE_CACHE = process.env.NEXT_PUBLIC_DISABLE_CACHE === 'true';

/** ─── QueryClient Factory ─── */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DISABLE_CACHE ? 0 : CACHE_TIME.MODERATE_STALE,
        gcTime: DISABLE_CACHE ? 0 : CACHE_TIME.MODERATE_GC,
        retry: 1,
        refetchOnWindowFocus: !DISABLE_CACHE,
        refetchOnMount: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

/** ─── 데이터 특성별 Query 옵션 프리셋 ─── */

/** 정적 데이터: 사용자 프로필, 펫 목록, 카드 목록 (5분 캐시) */
export const staticQueryOptions = {
  staleTime: CACHE_TIME.STATIC_STALE,
  gcTime: CACHE_TIME.STATIC_GC,
} as const;

/** 동적 데이터: 거래 내역, 가계부, 소모품 (30초 캐시) */
export const dynamicQueryOptions = {
  staleTime: CACHE_TIME.DYNAMIC_STALE,
  gcTime: CACHE_TIME.DYNAMIC_GC,
} as const;

/** 실시간 데이터: SSE 연동 (캐시 안 함) */
export const realtimeQueryOptions = {
  staleTime: CACHE_TIME.REALTIME_STALE,
  gcTime: CACHE_TIME.DYNAMIC_GC,
} as const;
