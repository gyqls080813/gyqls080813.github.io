import { useQuery } from '@tanstack/react-query';
import { randomNicknameApi } from '@/api/user/RandomNickname';
import { responseRandomNickname } from '@/constants/user/RandomNickname';

export const useRandomNicknameQuery = () => {
  return useQuery<responseRandomNickname, Error>({
    queryKey: ['randomNickname'],
    queryFn: randomNicknameApi,
    staleTime: 500,
    enabled: true,
  });
};