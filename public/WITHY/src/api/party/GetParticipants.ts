import { axiosInstance } from "../axiosInstance";

/**
 * 🎯 파티 참가자 정보
 */
export interface ParticipantData {
    nickname: string;
    profileImage: string;
    role: string; // "HOST" | "GUEST"
    status: string; // e.g., "ACTIVE"
}

interface ParticipantsResponse {
    status: number;
    message: string;
    data: ParticipantData[];
}

/**
 * 🚀 파티 참가자 목록 조회 API
 * @param partyId 파티 ID
 */
export const fetchPartyParticipants = async (partyId: number): Promise<ParticipantData[]> => {
    const response = await axiosInstance.get<ParticipantsResponse>(`/api/v1/parties/${partyId}/participants`);
    return response.data.data;
};
