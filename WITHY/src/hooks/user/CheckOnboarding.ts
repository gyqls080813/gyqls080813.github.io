import { useMutation } from '@tanstack/react-query';
import { checkOnboardingApi } from '@/api/user/CheckOnboarding';
import { responseCheckOnboarding, CheckOnboardingInput } from '@/constants/user/CheckOnboarding';

export const useCheckOnboardingMutation = () => {
    return useMutation<responseCheckOnboarding, Error, CheckOnboardingInput>({
        mutationFn: checkOnboardingApi,
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.error('중복 확인 요청 실패:', error);
        },
    });
};