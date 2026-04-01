import { axiosInstance } from "@/api/axiosInstance";

export interface EnterPartyData {
    partyId: number;
    role: string; // e.g., "GUEST", "HOST"
    isHost: boolean;
    isActive: boolean;
    platform: string;
    mediaType: string;
    contentId: number;
    tmdbId: number;
    externalId: string;
    title: string;
    thumbnail: string;
    seasonNumber: string;
    episodeNumber: number;
    currentPlaybackTime: number;
}

export interface EnterPartyResponse {
    status: number;
    message: string;
    data: EnterPartyData;
}

export const enterParty = async (partyId: number, password?: string): Promise<EnterPartyResponse> => {
    // 백엔드 호환성을 위해 password가 있을 때만 전송
    const body = password ? { password } : {};

    const response = await axiosInstance.post<EnterPartyResponse>(`/api/v1/parties/${partyId}/participants`, body);
    return response.data;
};
