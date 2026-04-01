import { useMutation } from '@tanstack/react-query';
import { preferencesApi } from '@/api/user/Preferences';
import { responsePreferences, PreferencesInput } from '@/constants/user/Preferences';

export const usePreferencesMutation = () => {
  return useMutation<responsePreferences, Error, PreferencesInput>({
    mutationFn: preferencesApi,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('카테고리 설정 실패', error);
    },
  });
};