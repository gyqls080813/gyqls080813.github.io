import React, { createContext, useContext, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { request } from '@/api/request';
import type { CardItem } from '../types/card';
import type { ApiResponse } from '@/types/api';
import { queryKeys } from '@/shared/hooks/queryKeys';
import { staticQueryOptions } from '@/shared/hooks/queryConfig';

const NO_FETCH_PAGES = ['/', '/login', '/register', '/onboarding', '/onboarding/step1', '/onboarding/step2'];

interface CardContextValue {
  cards: CardItem[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const CardContext = createContext<CardContextValue>({
  cards: [],
  loading: true,
  refresh: async () => {},
});

export const useCards = () => useContext(CardContext);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isNoFetchPage = NO_FETCH_PAGES.includes(router.pathname);

  // React Query — 카드 목록 (5분 캐시, 페이지 이동 시 즉시 렌더)
  const { data: cards = [], isLoading } = useQuery({
    queryKey: queryKeys.cards.list(),
    queryFn: async () => {
      const res = await request<ApiResponse<CardItem[]>>('/api/v1/cards', 'GET');
      return res.data || [];
    },
    ...staticQueryOptions,
    enabled: !isNoFetchPage,
  });

  const loading = isNoFetchPage ? false : isLoading;

  // 명시적 갱신 (카드 등록/삭제 후 호출)
  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.cards.list() });
  }, [queryClient]);

  return (
    <CardContext.Provider value={{ cards, loading, refresh }}>
      {children}
    </CardContext.Provider>
  );
};
