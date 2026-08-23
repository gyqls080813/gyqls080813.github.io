export interface FriendData {
    userId: number;
    nickname: string;
    profileImageUrl: string | null;
    status: 'ONLINE' | 'OFFLINE'; // 추가 상태가 있다면 여기에 추가
}

export interface GetFriendListResponse {
    status: number;
    message: string;
    data: FriendData[];
}

export interface FriendRequest {
    requestId: number;
    requesterId: number;
    requesterNickname: string;
    requesterProfileImageUrl: string | null;
}

export interface GetFriendRequestListResponse {
    status: number;
    message: string;
    data: FriendRequest[];
}

export interface SentFriendRequest {
    requestId: number;
    requesterId: number; // [Fix] 실제 API 필드 (의미: 받는 사람 ID)
    receiverId: number;
    receiverNickname: string;
    receiverProfileImageUrl: string | null;
}

export interface GetSentFriendRequestListResponse {
    status: number;
    message: string;
    data: SentFriendRequest[];
}

// (Empty)
export interface SearchedUserData {
    userId: number; // Backend uses userId (camelCase), not userID
    nickname: string;
    profileImage: string | null;
    isFriend: boolean;
    isFriendRequestSent: boolean; // 내가 이 유저에게 친구 신청을 보낸 상태인지
}

export interface UserSearchResponse {
    status: number;
    message: string;
    data: SearchedUserData;
}

export interface SendFriendRequestResponse {
    status: number;
    message: string;
}

export interface RespondFriendRequestResponse {
    status: number;
    message: string;
}

export interface BlockedUserData {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
}

export interface GetBlockListResponse {
    status: number;
    message: string;
    data: BlockedUserData[];
}
