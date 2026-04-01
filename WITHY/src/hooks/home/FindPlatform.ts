import { useQuery } from "@tanstack/react-query";
import { fetchPlatformTypes } from "@/api/home/FindPlatform";

/**
 * 👉 플랫폼 리스트를 가져오는 커스텀 훅
 * 캐싱, 로딩 상태, 에러 처리를 자동으로 관리합니다.
 */
export const usePlatformTypes = () => {
  return useQuery({
    queryKey: ["platformTypes"], // 쿼리를 식별하는 고유 키
    queryFn: fetchPlatformTypes, // 실행할 API 함수
    staleTime: 500,   // 플랫폼 종류는 자주 변하지 않으므로 1시간 동안 캐시 유지
    gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 데이터 보관
  });
};