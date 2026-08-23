import { useMutation } from '@tanstack/react-query';
import { deleteUserApi } from '@/api/user/DeleteUser';
import { responseDeleteUser, DeleteUserInput } from '@/constants/user/DeleteUser';

export const useDeleteUserMutation = () => {
  return useMutation<responseDeleteUser, Error, DeleteUserInput>({
    mutationFn: deleteUserApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('삭제 실패', error);
    },
  });
};