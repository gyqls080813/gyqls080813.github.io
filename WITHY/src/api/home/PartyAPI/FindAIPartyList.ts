import { axiosInstance } from "../../axiosInstance";

// Backend API response structure
interface AIPartyBackendResponse {
    id: number;
    title: string;
    platform: string;
    mediaType: string | null;
    genreNames: string[];
    currentParticipants: number;
    maxParticipants: number;
    isActive: boolean;
    isPrivate: boolean;
    currentPlaybackTime: number | null;
    thumbnail: string | null;
    scheduledActiveTime?: string; // Added for scheduled time display
    host: {
        userId: number;
        nickname: string;
        profileImageUrl: string;
    } | null;
}

// Frontend interface
export interface AIParty {
    partyId: number;
    title: string;
    platform: string;
    contentTitle: string;
    contentThumbnail: string;
    genres: string[];
    currentParticipants: number;
    maxParticipants: number;
    isActive: boolean; // Added for waiting/live status
    isPrivate: boolean;
    scheduledActiveTime?: string; // Added for scheduled time display
    hostNickname: string;
}

/**
 * 🚀 AI 추천 파티 조회 API
 * 응답 바디의 규격에 맞춰 데이터를 파싱합니다.
 */
export const fetchAIPartyList = async (): Promise<AIParty[]> => {
    try {
        const response = await axiosInstance.get<{
            status: number;
            message: string;
            data: AIPartyBackendResponse[];
        }>("/api/v1/parties/recommendations", {
            params: { topK: 4 }
        });

        // Transform backend response to frontend interface
        const transformedData: AIParty[] = response.data.data.map((party) => ({
            partyId: party.id,
            title: party.title,
            platform: party.platform,
            contentTitle: party.title, // Use party title as fallback for content title
            contentThumbnail: party.thumbnail || "/placeholder-image.jpg",
            genres: party.genreNames || [],
            currentParticipants: party.currentParticipants,
            maxParticipants: party.maxParticipants,
            isActive: party.isActive, // Added
            isPrivate: party.isPrivate,
            scheduledActiveTime: party.scheduledActiveTime, // Added
            hostNickname: party.host?.nickname || "Unknown Host",
        }));

        return transformedData;
    } catch (error: any) {
        // Silently handle 500 errors - AI recommendations are optional feature
        // Log as warning instead of error to avoid alarming users
        if (error?.response?.status === 500) {
            console.warn("⚠️ [AI Recommendations] Service temporarily unavailable");
        } else {
            console.error("❌ [API Error] AI Recommendation Failed:", error?.response?.status, error?.message);
        }

        // Return empty array instead of throwing to prevent UI crash
        // The UI will show "No AI recommendations" gracefully
        return [];
    }
};