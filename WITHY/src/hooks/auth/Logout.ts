import { useMutation } from '@tanstack/react-query';
import { logoutApi } from '@/api/auth/Logout';
import { responseLogout, LogoutInput } from '@/constants/auth/Logout';

export const useLogoutMutation = () => {
  return useMutation<responseLogout, Error, LogoutInput>({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      // localStorage.removeItem
    },
    onError: (error) => {
      console.error('로그아웃 실패', error);
    },
  });
};