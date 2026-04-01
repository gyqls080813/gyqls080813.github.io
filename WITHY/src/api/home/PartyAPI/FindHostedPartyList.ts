import { axiosInstance } from "@/api/axiosInstance";

export interface HostedPartyData {
    parties: {
        id: number;
        title: string;
        platform: string;
        mediaType: string;
        genreNames: string[];
        currentParticipants: number;
        maxParticipants: number;
        isActive: boolean;
        isPrivate: boolean;
        currentPlaybackTime: number;
        thumbnail: string;
        host: {
            userId: number;
            nickname: string;
            profileImageUrl: string;
        };
    }[];
    totalPage: number;
    totalElements: number;
}

export interface HostedPartyResponse {
    status: number;
    message: string;
    data: HostedPartyData;
}

export const getHostedPartyList = async (page = 0, size = 10): Promise<HostedPartyResponse> => {
    const response = await axiosInstance.get<HostedPartyResponse>(`/api/v1/parties/me/hosted`, {
        params: { page, size }
    });
    return response.data;
};
