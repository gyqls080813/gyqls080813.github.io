import { useMutation } from '@tanstack/react-query';
import { nicknameApi } from '@/api/user/Nickname';
import { responseNickname, NicknameInput } from '@/constants/user/Nickname';

export const useNicknameMutation = () => {
  return useMutation<responseNickname, Error, NicknameInput>({
    mutationFn: nicknameApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('닉네임 등록 실패', error);
    },
  });
};