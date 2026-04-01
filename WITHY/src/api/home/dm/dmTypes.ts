export interface DmTargetUser {
    userId: number;
    nickname: string;
    profileImage: string | null;
}

export interface DmRoomData {
    roomId: number;
    targetUser: DmTargetUser;
    lastMessage: string | null;
    lastMessageAt: string | null;
    createdAt: string;
    isLeft: boolean;
}

export interface CreateDmRoomRequest {
    targetUserId: number;
}

export interface CreateDmRoomResponse {
    status: number;
    message: string;
    data: DmRoomData;
}

// --- DM 메시지 목록 조회 ---
export interface DmMessage {
    messageId: number;
    senderId: number;
    senderNickname: string;
    message: string;
    createdAt: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort?: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
}

export interface DmMessageListResponseData {
    content: DmMessage[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size?: number;
    number?: number;
    sort?: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements?: number;
    first?: boolean;
    empty?: boolean;
}

export interface GetDmMessagesResponse {
    status: number;
    message: string;
    data: DmMessageListResponseData;
}

export interface GetDmMessagesParams {
    roomId: number;
    page?: number;
    size?: number;
}

// --- DM 방 목록 조회 ---
export interface GetDmRoomsResponse {
    status: number;
    message: string;
    data: DmRoomData[];
}
