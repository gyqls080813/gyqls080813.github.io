import { request } from '@/api/request';
import { CreateGroupRequest, CreateGroupResponse, JoinGroupRequest, JoinGroupResponse, RefreshInviteCodeResponse, DelegateHostResponse, GetGroupMembersResponse, GetInviteCodeResponse, KickMemberResponse, LeaveGroupResponse } from '../types/group';

export const createGroup = async (data: CreateGroupRequest): Promise<CreateGroupResponse> => {
  return request<CreateGroupResponse, CreateGroupRequest>(
    '/api/v1/groups',
    'POST',
    { body: data }
  );
};

export const joinGroup = async (data: JoinGroupRequest): Promise<JoinGroupResponse> => {
  return request<JoinGroupResponse, JoinGroupRequest>(
    '/api/v1/groups/join',
    'POST',
    { body: data }
  );
};

/** 
 * 초대 코드 갱신 API
 * POST /api/v1/groups/me/invite-code/refresh
 * 초대 코드를 새로 갱신합니다.
 */
export const refreshInviteCode = async (): Promise<RefreshInviteCodeResponse> => {
  return request<RefreshInviteCodeResponse>(
    '/api/v1/groups/me/invite-code/refresh',
    'POST'
  );
};

/** 
 * 방장 위임 API
 * PATCH /api/v1/groups/members/{targetUserId}/host
 * 그룹장이 다른 멤버에게 방장 권한을 위임합니다.
 */
export const delegateHost = async (targetUserId: number): Promise<DelegateHostResponse> => {
  return request<DelegateHostResponse>(
    `/api/v1/groups/members/${targetUserId}/host`,
    'PATCH'
  );
};

/** 
 * 그룹 멤버 목록 조회 API
 * GET /api/v1/groups/me/members
 * 현재 속한 그룹의 멤버 목록을 조회합니다.
 */
export const getGroupMembers = async (): Promise<GetGroupMembersResponse> => {
  return request<GetGroupMembersResponse>(
    '/api/v1/groups/me/members',
    'GET'
  );
};

/** 
 * 내 초대 코드 조회 API
 * GET /api/v1/groups/me/invite-code
 * 현재 속한 그룹의 초대 코드를 조회합니다.
 */
export const getInviteCode = async (): Promise<GetInviteCodeResponse> => {
  return request<GetInviteCodeResponse>(
    '/api/v1/groups/me/invite-code',
    'GET'
  );
};

/** 
 * 멤버 강퇴 API
 * DELETE /api/v1/groups/members/{targetUserId}
 * 그룹장이 특정 멤버를 그룹에서 강퇴합니다.
 */
export const kickMember = async (targetUserId: number): Promise<KickMemberResponse> => {
  return request<KickMemberResponse>(
    `/api/v1/groups/members/${targetUserId}`,
    'DELETE'
  );
};

/** 
 * 그룹 탈퇴 API
 * DELETE /api/v1/groups/me/leave
 * 현재 속한 그룹에서 탈퇴합니다.
 */
export const leaveGroup = async (): Promise<LeaveGroupResponse> => {
  return request<LeaveGroupResponse>(
    '/api/v1/groups/me/leave',
    'DELETE'
  );
};
