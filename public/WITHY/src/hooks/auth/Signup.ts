import { useMutation } from '@tanstack/react-query';
import { signupApi } from '@/api/auth/Signup';
import { responseSignup, SignupInput } from '@/constants/auth/Signup';
import { useAuthStore } from '@/store/useAuthStore'; // 스토어 임포트
import { useRouter } from 'next/navigation';

export const useRegistMutation = () => {
  const setLogin = useAuthStore((state) => state.setLogin); // 스토어 함수 가져오기
  const router = useRouter();

  return useMutation<responseSignup, Error, SignupInput>({
    mutationFn: signupApi,
    onSuccess: (response) => {
      const accessToken = response.accessToken || response.data?.accessToken;
      const refreshToken = response.refreshToken || response.data?.refreshToken;

      if (!accessToken) {
        return;
      }

      setLogin(response, accessToken, refreshToken);
      router.push('/onboarding/step1');
    },
  });
};