export interface CreateGroupRequest {
  name: string; // "우리 가족 그룹"
}

/** 그룹 생성 응답 정보 (200 OK) */
export interface CreateGroupResponse {
  status: number;
  message: string;
  data: {
    groupId: number;
    name: string;
    inviteCode: string;
  };
}

/** 그룹 참여 요청 정보 (POST /api/v1/groups/join) */
export interface JoinGroupRequest {
  inviteCode: string; // "A1B2C3D4"
}

/** 그룹 참여 응답 정보 (200 OK) */
export interface JoinGroupResponse {
  status: number;
  message: string;
  data: {
    groupId: number;
    groupName: string;
  };
}

/** 초대 코드 갱신 응답 정보 (200 OK) */
export interface RefreshInviteCodeResponse {
  status: number;
  message: string;
  data: {
    inviteCode: string;
  };
}

/** 방장 위임 응답 정보 (200 OK) */
export interface DelegateHostResponse {
  status: number;
  message: string;
  data: Record<string, never>; // {}
}

/** 그룹 멤버 정보 */
export interface GroupMember {
  userId: number;
  name: string;
  nickname: string;
  imageUrl: string;
  role: string;
}

/** 그룹 멤버 목록 조회 응답 정보 (200 OK) */
export interface GetGroupMembersResponse {
  status: number;
  message: string;
  data: {
    members: GroupMember[];
  };
}

/** 내 초대 코드 조회 응답 정보 (200 OK) */
export interface GetInviteCodeResponse {
  status: number;
  message: string;
  data: {
    inviteCode: string;
  };
}

/** 멤버 강퇴 응답 정보 (200 OK) */
export interface KickMemberResponse {
  status: number;
  message: string;
  data: Record<string, never>; // {}
}

/** 그룹 탈퇴 응답 정보 (200 OK) */
export interface LeaveGroupResponse {
  status: number;
  message: string;
  data: Record<string, never>; // {}
}
