import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { MemberProfile } from '../types/profile';

/** 회원 프로필 정보 조회 */
export const getProfile = async () => {
  return request<ApiResponse<MemberProfile>>(
    '/api/v1/members/me',
    'GET'
  );
};
