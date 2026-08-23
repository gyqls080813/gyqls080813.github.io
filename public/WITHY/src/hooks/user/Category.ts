import { useQuery } from "@tanstack/react-query";
import { SearchCategory } from "@/api/home/SearchCategory";

// 반환되는 데이터 타입 정의
interface Genre {
  id: number;
  name: string;
}

export const useSearchCategory = (platform: string, isExpanded: boolean = true) => {
  return useQuery({
    queryKey: ["SearchCategory", platform],
    queryFn: () => SearchCategory(platform),

    // 데이터 정제: id와 name을 모두 포함한 객체 반환
    select: (response) => {
      const genresArray = response.data?.genres || [];

      return genresArray
        .map((genre: any) => ({
          id: genre.id,
          name: genre.name
        }))
        // 가나다순 정렬
        .sort((a: Genre, b: Genre) => a.name.localeCompare(b.name, 'ko'));
    },

    // 이 페이지에서는 항상 데이터를 불러와야 하므로 platform만 확인
    enabled: !!platform,
    staleTime: 500,
  });
};