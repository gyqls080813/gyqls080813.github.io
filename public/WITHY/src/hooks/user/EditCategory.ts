import { useMutation } from '@tanstack/react-query';
import { editCategoryApi } from '@/api/user/EditCategory';
import { responseEditCategory, EditCategoryInput } from '@/constants/user/EditCategory';

export const useEditCategoryMutation = () => {
  return useMutation<responseEditCategory, Error, EditCategoryInput>({
    mutationFn: editCategoryApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('수정 실패', error);
    },
  });
};