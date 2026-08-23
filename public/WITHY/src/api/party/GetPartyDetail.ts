import { axiosInstance } from "../axiosInstance";

/**
 * 🎯 파티 상세/대기방 정보 Response
 */
export interface PartyDetailData {
    partyId: number;
    title: string;
    hostName: string;
    hostProfileImage: string;
    contentId: number | string;
    tmdbId: number;
    contentTitle: string;
    posterPath: string;
    backdropPath: string;
    platform: string;
    currentParticipants: number;
    maxParticipants: number;
    isActive: boolean;
    isDeleted: boolean; // 파티 삭제 여부
    isPrivate: boolean;
    scheduledActiveTime: string;
    createdAt: string;
    role?: string; // "HOST" | "GUEST"
    isHost?: boolean; // 추가적인 호스트 여부 필드 가능성
    startUrl?: string; // 파티 시작 URL
}

interface PartyDetailResponse {
    status: number;
    message: string;
    data: PartyDetailData;
}

/**
 * 🚀 파티 상세 조회 API
 * @param partyId 파티 ID
 */
export const fetchPartyDetail = async (partyId: number) => {
    const url = `/api/v1/parties/${partyId}`;
    const response = await axiosInstance.get<PartyDetailResponse>(url);

    return response.data.data;
};
