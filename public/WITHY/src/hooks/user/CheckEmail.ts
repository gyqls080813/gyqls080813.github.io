import { useMutation } from '@tanstack/react-query';
import { checkEmailApi } from '@/api/user/CheckEmail';
import { responseCheckEmail, CheckEmailInput } from '@/constants/user/CheckEmail';

export const useCheckEmailMutation = () => {
  return useMutation<responseCheckEmail, Error, CheckEmailInput>({
    mutationFn: checkEmailApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('중복 확인 요청 실패:', error);
    },
  });
};