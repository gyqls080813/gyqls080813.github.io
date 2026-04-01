import { useMutation } from '@tanstack/react-query';
import { postHistoryApi } from '@/api/watch_history/PostHistory';
import { responsePostHistory, PostHistoryInput } from '@/constants/watch_history/PostHistory';

export const usePostHistoryMutation = () => {
  return useMutation<responsePostHistory, Error, PostHistoryInput>({
    mutationFn: postHistoryApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('등록 실패', error);
    },
  });
};