// src/hooks/home/PartyHooks/GenreHooker.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGenrePartyList, GenrePartyResponse } from "@/api/home/PartyAPI/FindGenrePartyList";

/**
 * 🎬 특정 플랫폼의 장르별 파티 목록을 무한 스크롤로 가져오는 렌더링 엔진입니다.
 * @param platform 플랫폼
 * @param category 장르/카테고리
 * @param isActive 활성화 상태 필터 (true: LIVE만, false: 대기중만, undefined: 전체)
 */
export const useGenreContents = (platform: string, category?: string, isActive?: boolean) => {
  return useInfiniteQuery<GenrePartyResponse>({
    // 🎯 카테고리와 활성화 상태가 바뀔 때마다 캐시를 새로 고침하기 위해 key에 추가합니다.
    queryKey: ["genreParties", platform, category, isActive],

    queryFn: ({ pageParam = 0 }) =>
      fetchGenrePartyList(platform, category, isActive, pageParam as number),

    initialPageParam: 0,

    /**
     * 🎯 다음 페이지 파라미터 계산 로직
     * 사용자님의 API 응답 구조: { data: { parties, totalPage, totalElements } }
     */
    getNextPageParam: (lastPage, allPages) => {
      // 1. 현재까지 불러온 페이지 수가 서버의 전체 페이지 수보다 작으면 다음 페이지 번호 반환
      const totalPage = lastPage.data.totalPage;
      const currentPage = allPages.length - 1; // 0부터 시작하므로

      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },

    staleTime: 500
  });
};