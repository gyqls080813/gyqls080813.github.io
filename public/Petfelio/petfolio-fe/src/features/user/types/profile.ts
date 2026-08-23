/** 회원 프로필 정보 (Swagger: GET /api/v1/users/me) */
export interface MemberProfile {
  userId: number;
  email: string;
  nickname: string;
  role?: 'USER' | 'HOST' | 'MEMBER';
  groupId?: number;
  groupName?: string;
  imageUrl?: string;
  /** @deprecated 이전 API 호환용 */
  memberId?: number;
  /** @deprecated 이전 API 호환용 */
  name?: string;
}
