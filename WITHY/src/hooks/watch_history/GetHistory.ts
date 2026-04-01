import { useQuery } from '@tanstack/react-query';
import { getHistoryApi } from '@/api/watch_history/GetHistory';
import { GETHISTORY_KEYS, responseGetHistory } from '@/constants/watch_history/GetHistory';

export const useGetHistoryQuery = () => {
  // useQuery<반환타입, 에러타입>
  return useQuery<responseGetHistory[], Error>({
    queryKey: GETHISTORY_KEYS.all,
    queryFn: getHistoryApi,
    staleTime: 500,
  });
};