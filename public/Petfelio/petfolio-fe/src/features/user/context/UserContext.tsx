import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { request } from '@/api/request';
import type { MemberProfile } from '@/features/user/types/profile';
import { queryKeys } from '@/shared/hooks/queryKeys';
import { staticQueryOptions } from '@/shared/hooks/queryConfig';

const NO_FETCH_PAGES = ['/', '/login', '/register', '/onboarding', '/onboarding/step1', '/onboarding/step2'];

interface UserContextValue {
  user: MemberProfile | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<MemberProfile | null>>;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isNoFetchPage = NO_FETCH_PAGES.includes(router.pathname);

  // React Query — 사용자 정보 (5분 캐시)
  const { data: queryUser, isLoading } = useQuery({
    queryKey: queryKeys.user.me(),
    queryFn: async () => {
      const res = await request<{ status: number; data: MemberProfile }>(
        '/api/v1/users/me',
        'GET',
      );
      return res.data;
    },
    ...staticQueryOptions,
    enabled: !isNoFetchPage,
  });

  // 로컬 오버라이드를 위한 state (setUser 호환성 유지)
  const [localUser, setLocalUser] = useState<MemberProfile | null>(null);
  const user = localUser ?? queryUser ?? null;
  const loading = isNoFetchPage ? false : isLoading;

  // queryUser가 변경되면 로컬 오버라이드 초기화
  useEffect(() => {
    if (queryUser) setLocalUser(null);
  }, [queryUser]);

  const refreshUser = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.user.me() });
  }, [queryClient]);

  const setUser: React.Dispatch<React.SetStateAction<MemberProfile | null>> = useCallback((action) => {
    setLocalUser(prev => typeof action === 'function' ? action(prev) : action);
  }, []);

  // ─── 그룹 미가입 시 온보딩으로 리다이렉트 ───
  useEffect(() => {
    if (loading || !user) return;
    if (NO_FETCH_PAGES.includes(router.pathname)) return;
    if (!user.groupId) {
      router.replace('/onboarding');
    }
  }, [user, loading, router.pathname]);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

/** 전역 사용자 정보 훅 */
export function useUser() {
  return useContext(UserContext);
}
