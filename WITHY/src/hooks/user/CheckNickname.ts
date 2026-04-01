import { useMutation } from '@tanstack/react-query';
import { checkNicknameApi } from '@/api/user/CheckNickname';
import { responseCheckNickname, CheckNicknameInput } from '@/constants/user/CheckNickname';

export const useCheckNicknameMutation = () => {
  return useMutation<responseCheckNickname, Error, CheckNicknameInput>({
    mutationFn: checkNicknameApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('중복 확인 요청 실패:', error);
    },
  });
};