import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/api/auth/Login';
import { responseLogin, LoginInput } from '@/constants/auth/Login';
import { useAuthStore } from '@/store/useAuthStore';

export const useLoginMutation = () => {
  const setLogin = useAuthStore((state) => state.setLogin);

  return useMutation<responseLogin, Error, LoginInput>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setLogin(data, data.data.accessToken, data.data.refreshToken);
    },
    onError: (error) => {
      console.error('로그인 실패', error);
    },
  });
};