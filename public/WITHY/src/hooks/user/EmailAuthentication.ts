import { useMutation } from '@tanstack/react-query';
import { emailAuthenticationApi } from '@/api/user/EmailAuthentication';
import { responseEmailAuthentication, EmailAuthenticationInput } from '@/constants/user/EmailAuthentication';

export const useEmailAuthenticationMutation = () => {
  return useMutation<responseEmailAuthentication, Error, EmailAuthenticationInput>({
    mutationFn: emailAuthenticationApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('수정 실패', error);
    },
  });
};