import { useMutation } from '@tanstack/react-query';
import { editUserApi } from '@/api/user/EditUser';
import { responseEditUser } from '@/constants/user/EditUser';

export const useEditUserMutation = () => {
  return useMutation<responseEditUser, Error, FormData>({
    mutationFn: editUserApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('수정 실패', error);
    },
  });
};