import { axiosInstance } from "@/api/axiosInstance";
import {
    GetFriendListResponse,
    GetFriendRequestListResponse,
    GetSentFriendRequestListResponse,
    RespondFriendRequestResponse,
    UserSearchResponse,
    SendFriendRequestResponse,
    GetBlockListResponse
} from "./friendTypes";

// 공통 Response Type (status, message만 있는 경우)
export interface BaseResponse {
    status: number;
    message: string;
}

// 친구 목록 조회
export const getFriendList = async (): Promise<GetFriendListResponse> => {
    // 명세 Endpoint: /api/v1/users/friends (파라미터 없음)
    const response = await axiosInstance.get<GetFriendListResponse>("/api/v1/users/friends");
    // 주의: 이전 DM API는 /dm/rooms 였음. (prefix가 /api라고 가정하면 /api/dm/rooms).
    // 이번 명세는 /api/v1/users/friends. 
    // 만약 baseURL이 "http://.../api"라면 -> "/v1/users/friends" 호출 필요.
    // 일단 "/users/friends"로 작성하고, 에러 시 조정 필요. (dmApi.ts는 /dm/rooms 였음 -> /api/dm/rooms 였을 가능성)
    // 명세 URL: /api/v1/users/friends 
    // 환경변수 확인 못했으므로, 가장 안전한 방법은 baseURL + path.
    // 일단 v1을 포함하여 작성 시도.
    return response.data;
};

// 받은 친구 신청 목록 조회
export const getReceivedFriendRequests = async (): Promise<GetFriendRequestListResponse> => {
    // 명세 Endpoint: /api/v1/users/friends/requests/received
    // 이전 Network Error는 무한 루프 인한 부하로 추정됨. 405(Method Not Allowed)가 뜬 /requests 대신 원래 경로 복구.
    const response = await axiosInstance.get<GetFriendRequestListResponse>("/api/v1/users/friends/requests/received");
    return response.data;
};

// 보낸 친구 신청 목록 조회
export const getSentFriendRequests = async (): Promise<GetSentFriendRequestListResponse> => {
    // 명세 Endpoint: /api/v1/users/friends/requests/sent
    const response = await axiosInstance.get<GetSentFriendRequestListResponse>("/api/v1/users/friends/requests/sent");
    return response.data;
};

// 친구 신청 취소 (보낸 요청 철회)
export const cancelFriendRequest = async (requestId: number): Promise<BaseResponse> => {
    // 명세 Endpoint: /api/v1/users/friends/requests/{requestId}
    // Method: DELETE
    const response = await axiosInstance.delete<BaseResponse>(`/api/v1/users/friends/requests/${requestId}`);
    return response.data;
};

// 친구 신청 수락/거절
export const respondFriendRequest = async (requestId: number, isAccepted: boolean): Promise<RespondFriendRequestResponse> => {
    // 명세 Endpoint: /api/v1/users/friends/requests/{requestId}
    // Method: PATCH (명세에 안나왔지만, 보통 상태 변경은 PATCH/PUT. 
    // 하지만 "친구 신청을 처리했습니다." 응답만 보면 POST일 수도 있음. 
    // -> 통상적으로 리소스의 상태를 업데이트하므로 POST or PUT or PATCH.
    // -> Request Parameter [Path Variable] requestId
    // -> Request Body: { isAccepted: boolean }
    // -> 일반적으로 Body가 있으면 POST나 PUT/PATCH.
    // -> 만약 문서에 Method가 없다면 POST로 가정하거나 문맥상 PATCH.
    // -> 여기서는 Body를 보내므로 POST로 일단 시도. (Restful 관례상 특정 action은 POST 사용하기도 함)
    // -> **수정**: 문서에 Method가 명시되어 있지 않지만, 'Resource state update'이므로 PATCH나 POST 예상.
    // -> 가장 안전한 POST로 시도해보고, 405 Method Not Allowed 뜨면 변경. 
    // -> (업데이트: REST API 설계에서 상태 변경은 PATCH가 맞으나, 많은 경우 POST로 처리)
    // -> !! 주의 !! URL 구조상 `.../requests/{id}` 이므로 PUT/PATCH가 적절해 보임.
    // -> 명확하지 않으므로 POST로 구현 (가장 일반적).
    // -> 문서에 Method가 PATCH로 명시됨 (스크린샷 확인 완료)
    const response = await axiosInstance.patch<RespondFriendRequestResponse>(`/api/v1/users/friends/requests/${requestId}`, {
        isAccepted
    });
    return response.data;
};


// 친구 삭제
export const deleteFriend = async (friendId: number): Promise<BaseResponse> => {
    // 명세 Endpoint: /api/v1/users/friends/{friendId}
    // Method: DELETE (Body: {})
    const response = await axiosInstance.delete<BaseResponse>(`/api/v1/users/friends/${friendId}`, {
        data: {}
    });
    return response.data;
};

// 차단 해제
export const unblockUser = async (blockedId: number): Promise<BaseResponse> => {
    // 명세 Endpoint: /api/v1/users/blocks/{blockedId}
    const response = await axiosInstance.delete<BaseResponse>(`/api/v1/users/blocks/${blockedId}`, {
        data: {}
    });
    return response.data;
};

// 차단 목록 조회
export const getBlockList = async (page = 0, size = 20): Promise<GetBlockListResponse> => {
    // 명세 Endpoint: /api/v1/users/blocks
    const response = await axiosInstance.get<GetBlockListResponse>(`/api/v1/users/blocks`, {
        params: { page, size }
    });
    return response.data;
};

// 유저 검색
export const searchUsers = async (nickname: string): Promise<UserSearchResponse> => {
    // 명세 Endpoint: /api/v1/users/search?nickname={nickname} (가정)
    const response = await axiosInstance.get<UserSearchResponse>(`/api/v1/users/search`, {
        params: { nickname }
    });
    return response.data;
};

// 친구 신청 보내기
// 친구 신청 보내기
export const sendFriendRequest = async (receiverId: number): Promise<SendFriendRequestResponse> => {
    // 명세 Endpoint: /api/users/friends/requests (가정)
    // Body: { receiverId: number }
    // [Swagger Verified] Key is 'receiverId'
    // 400 Error indicates logic failure (Duplicate/Self), not syntax error.
    const payload = { receiverId };

    try {
        const response = await axiosInstance.post<SendFriendRequestResponse>(`/api/v1/users/friends/requests`, payload);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 400) {
            // [Silent Handling] 400 에러는 중복 신청 등 로직상 발생할 수 있으므로 에러 로그를 남기지 않고 throw만 수행
            // useFriend.ts에서 이를 catch하여 처리함
            throw new Error("이미 요청을 보냈거나, 신청할 수 없는 사용자입니다.");
        }
        console.error("[FriendApi] Error Detail:", error.response?.data);
        throw error;
    }
};
