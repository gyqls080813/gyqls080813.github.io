// src/hooks/home/PartyHooks/SearchHooker.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSearchPartyList } from "@/api/home/PartyAPI/SearchParty";

/**
 * 🔍 통합 검색 결과를 무한 스크롤로 가져오는 훅입니다.
 * @param keyword 사용자가 입력한 검색어
 */
export const useSearchContents = (keyword: string) => {
  return useInfiniteQuery({
    // 🎯 검색어가 바뀔 때마다 새로운 쿼리를 생성하기 위해 key에 keyword를 포함합니다.
    queryKey: ["searchParties", keyword],

    // 🎯 검색어가 비어있을 때는 API를 호출하지 않도록 설정할 수 있습니다.
    queryFn: ({ pageParam = 0 }) => fetchSearchPartyList(keyword, pageParam as number),

    initialPageParam: 0,

    /**
     * 🎯 다음 페이지 계산 로직
     * 서버 응답 규격에 totalPage가 없으므로, 받아온 데이터 개수로 판단합니다.
     */
    getNextPageParam: (lastPage, allPages) => {
      const currentPartiesCount = lastPage.data.parties.length;
      const currentPage = allPages.length - 1;
      const size = 20;

      // 만약 받아온 파티 개수가 size보다 작다면, 다음 페이지는 없습니다.
      if (currentPartiesCount < size) return undefined;

      return currentPage + 1;
    },

    // 🎬 검색 결과는 사용자의 입력에 따라 즉각적인 반응이 필요하므로 짧게 설정
    staleTime: 500, // 검색 결과는 0.5초간 신선하다고 간주
    enabled: !!keyword,       // 검색어가 있을 때만 쿼리 실행
  });
};  