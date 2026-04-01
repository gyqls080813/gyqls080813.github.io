import { useMutation } from '@tanstack/react-query';
import { editLanguageApi } from '@/api/user/EditLanguage';
import { responseEditLanguage, EditLanguageInput } from '@/constants/user/EditLanguage';

export const useEditLanguageMutation = () => {
    return useMutation<responseEditLanguage, Error, EditLanguageInput>({
        mutationFn: editLanguageApi,
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.error('중복 확인 요청 실패:', error);
        },
    });
};