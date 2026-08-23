import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { myProfileApi } from '@/api/user/MyProfile';
import { responseMyProfile } from '@/constants/user/MyProfile';

export const useMyProfileQuery = (options?: Omit<UseQueryOptions<responseMyProfile, Error>, 'queryKey' | 'queryFn'>) => {
  return useQuery<responseMyProfile, Error>({
    queryKey: ['myProfile'],
    queryFn: myProfileApi,
    staleTime: 500,
    ...options
  });
};