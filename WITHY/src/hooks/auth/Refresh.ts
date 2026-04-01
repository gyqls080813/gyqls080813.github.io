import { useMutation } from '@tanstack/react-query';
import { refreshApi } from '@/api/auth/Refresh';
import { RefreshInput, responseRefresh } from "@/constants/auth/Refresh";

export const useRefreshMutation = () => {
  return useMutation<responseRefresh, Error, RefreshInput>({
    mutationFn: refreshApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('로그인 실패', error);
    },
  });
};