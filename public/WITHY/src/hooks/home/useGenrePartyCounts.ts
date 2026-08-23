import { useQueries } from "@tanstack/react-query";
import { fetchGenrePartyList } from "@/api/home/PartyAPI/FindGenrePartyList";

/**
 * 🎯 여러 장르의 파티 개수를 동시에 가져오는 훅
 * @param platform - 플랫폼 (OTT, YOUTUBE 등)
 * @param genres - 장르 이름 배열
 * @returns 각 장르별 파티 개수를 담은 Map
 */
export const useGenrePartyCounts = (platform: string, genres: string[]) => {
    const queries = useQueries({
        queries: genres.map((genre) => ({
            queryKey: ["genrePartyCount", platform, genre],
            queryFn: () => fetchGenrePartyList(platform, genre, undefined, 0), // 첫 페이지만
            select: (data: any) => data.data.totalElements || 0,
            staleTime: 5 * 60 * 1000, // 5분 캐싱
            enabled: !!platform && !!genre,
        })),
    });

    // Map으로 변환 { 장르이름: 개수 }
    const countMap = new Map<string, number>();
    genres.forEach((genre, index) => {
        const query = queries[index];
        if (query.data !== undefined) {
            countMap.set(genre, query.data as unknown as number);
        }
    });

    const isLoading = queries.some((q) => q.isLoading);

    return { countMap, isLoading };
};
