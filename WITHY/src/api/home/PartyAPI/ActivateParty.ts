import { axiosInstance } from '@/api/axiosInstance';

export interface ActivatePartyResponse {
    status: number;
    message: string;
    data: string;
}

/**
 * Activate a party (Host only)
 * PATCH /api/v1/parties/{partyId}/active
 */
export const activateParty = async (partyId: number): Promise<ActivatePartyResponse> => {
    const response = await axiosInstance.patch(`/api/v1/parties/${partyId}/active`);
    return response.data;
};
