import { axiosInstance } from "@/api/axiosInstance";
import {
    CreateDmRoomRequest,
    CreateDmRoomResponse,
    GetDmMessagesParams,
    GetDmMessagesResponse,
    GetDmRoomsResponse
} from "./dmTypes";

// DM 방 존재 여부 확인 (GET)
export const getDmRoomByTarget = async (targetUserId: number): Promise<CreateDmRoomResponse> => {
    // 명세 Endpoint: /api/dm/rooms/target/{targetUserId}
    try {
        const response = await axiosInstance.get<CreateDmRoomResponse>(`/api/dm/rooms/target/${targetUserId}`);
        return response.data;
    } catch (error: any) {
        // 404 is expected for new rooms
        if (error.response?.status === 404) {
            throw error; // Let the caller handle 404
        }
        console.error("[dmApi] getDmRoomByTarget Error", error);
        throw error;
    }
};

// DM 방 생성 / 재진입 (POST)
export const createOrGetDmRoom = async (body: CreateDmRoomRequest): Promise<CreateDmRoomResponse> => {
    // 명세 Endpoint: /api/dm/rooms (스크린샷 기준)
    try {
        const response = await axiosInstance.post<CreateDmRoomResponse>("/api/dm/rooms", body);
        return response.data;
    } catch (error: any) {
        console.error("[dmApi] createOrGetDmRoom 500 Error Detail:", error.response?.data);
        console.error("[dmApi] Status Code:", error.response?.status);
        throw error;
    }
};

// DM 메시지 목록 조회
export const getDmMessages = async ({ roomId, page = 0, size = 20 }: GetDmMessagesParams): Promise<GetDmMessagesResponse> => {
    // 명세 Endpoint: /api/dm/rooms/{roomId}/messages
    const response = await axiosInstance.get<GetDmMessagesResponse>(`/api/dm/rooms/${roomId}/messages`, {
        params: {
            page,
            size
        }
    });
    return response.data;
};

// DM 방 목록 조회
export const getDmRooms = async (page = 0, size = 20): Promise<GetDmRoomsResponse> => {
    // 명세 Endpoint: /api/dm/rooms
    const response = await axiosInstance.get<GetDmRoomsResponse>("/api/dm/rooms", {
        params: { page, size }
    });
    return response.data;
};

// DM 방 나가기 (삭제)
export const deleteDmRoom = async (roomId: number): Promise<any> => {
    const response = await axiosInstance.delete(`/api/dm/rooms/${roomId}`);
    return response.data;
};
