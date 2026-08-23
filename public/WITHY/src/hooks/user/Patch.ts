import { useMutation } from '@tanstack/react-query';
import { patchApi } from '@/api/user/Patch';
import { responsePatch, Patchinput } from '@/constants/user/Patch';

export const usePatchMutation = () => {
  return useMutation<responsePatch, Error, Patchinput>({
    mutationFn: patchApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('수정 실패', error);
    },
  });
};