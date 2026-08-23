import { useMutation } from '@tanstack/react-query';
import { editPasswordApi } from '@/api/user/EditPassword';
import { responseEditPassword, EditPasswordInput } from '@/constants/user/EditPassword';

export const useEditPasswordMutation = () => {
    return useMutation<responseEditPassword, Error, EditPasswordInput>({
        mutationFn: editPasswordApi,
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.error('중복 확인 요청 실패:', error);
        },
    });
};