import { useMutation } from '@tanstack/react-query';
import { emailVerifyApi } from '@/api/user/EmailVerify';
import { responseEmailVerify, EmailVerifyInput } from '@/constants/user/EmailVerify';

export const useEmailVerifyMutation = () => {
  return useMutation<responseEmailVerify, Error, EmailVerifyInput>({
    mutationFn: emailVerifyApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('수정 실패', error);
    },
  });
};