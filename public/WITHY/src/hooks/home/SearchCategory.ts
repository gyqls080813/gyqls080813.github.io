import { useQuery } from "@tanstack/react-query";
import { SearchCategory } from "@/api/home/SearchCategory";

export const useSearchCategory = (platform: string, isExpanded: boolean) => {
  return useQuery({
    // 1. 쿼리 키: 플랫폼별로 캐싱되도록 설정
    queryKey: ["SearchCategory", platform],

    // 2. 쿼리 함수: 실제 API 호출
    queryFn: () => SearchCategory(platform),

    // 3. 데이터 정제: 전체 장르 객체 유지하고 partyCount 기준으로 정렬
    select: (response) => {
      const genresArray = response.data?.genres || [];
      return genresArray
        .map((genre: { name: string; partyCount?: number }) => ({
          name: genre.name,
          partyCount: genre.partyCount || 0
        }))
        .sort((a: { name: string; partyCount: number }, b: { name: string; partyCount: number }) => b.partyCount - a.partyCount); // 파티 개수 내림차순 정렬
    },

    // 4. 지연 로딩: 섹션이 펼쳐졌을 때만 API 호출 (Efficiency!)
    enabled: !!platform && platform !== "홈" && isExpanded,

    // 5. 캐싱 시간: 장르는 자주 바뀌지 않으니 1시간 유지
    staleTime: 500,
  });
};