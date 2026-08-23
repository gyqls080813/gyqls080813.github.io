/**
 * React Query — 중앙 집중식 Query Key Factory
 *
 * 모든 서버 상태의 캐시 키를 한 곳에서 관리하여
 * 캐시 무효화(invalidation)와 프리페칭(prefetching)을 안전하게 수행합니다.
 *
 * 네이밍 컨벤션:
 *   queryKeys.feature.action(params)
 *   → ['feature', 'action', params] 형태의 키 배열 반환
 */

export const queryKeys = {
  /** ─── 사용자 ─── */
  user: {
    all: ['user'] as const,
    me: () => [...queryKeys.user.all, 'me'] as const,
  },

  /** ─── 반려동물 ─── */
  pets: {
    all: ['pets'] as const,
    list: () => [...queryKeys.pets.all, 'list'] as const,
    stickers: (petId: number) => [...queryKeys.pets.all, 'stickers', petId] as const,
  },

  /** ─── 카드(결제수단) ─── */
  cards: {
    all: ['cards'] as const,
    list: () => [...queryKeys.cards.all, 'list'] as const,
  },

  /** ─── 거래 내역 ─── */
  transactions: {
    all: ['transactions'] as const,
    byCard: (cardId: number) => [...queryKeys.transactions.all, 'card', cardId] as const,
    detail: (txId: number) => [...queryKeys.transactions.all, 'detail', txId] as const,
  },

  /** ─── 가계부 (월별/일별) ─── */
  ledger: {
    all: ['ledger'] as const,
    monthly: (year: number, month: number) =>
      [...queryKeys.ledger.all, 'monthly', year, month] as const,
    daily: (date: string) =>
      [...queryKeys.ledger.all, 'daily', date] as const,
  },

  /** ─── 소모품 ─── */
  consumables: {
    all: ['consumables'] as const,
    list: () => [...queryKeys.consumables.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.consumables.all, 'detail', id] as const,
  },

  /** ─── 대시보드 / 리포트 ─── */
  dashboard: {
    all: ['dashboard'] as const,
    ranking: () => [...queryKeys.dashboard.all, 'ranking'] as const,
    monthlyCompare: (petId: number, year: number, month: number) =>
      [...queryKeys.dashboard.all, 'monthlyCompare', petId, year, month] as const,
    summary: () => [...queryKeys.dashboard.all, 'summary'] as const,
  },
} as const;
