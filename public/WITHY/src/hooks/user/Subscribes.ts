import { useQuery } from '@tanstack/react-query';
// 조회 API 함수 (GET)
import { subscribesApi } from '@/api/user/Subscribes';

export const useSubscribesQuery = () => {
  return useQuery({
    queryKey: ['subscribes'],
    queryFn: subscribesApi,
    staleTime: 500,
    select: (response) => {
      const genres = response.data.genres;
      if (!genres) return [];

      return genres.map((item: any) => item.id);
    },
  });
};