import { axiosInstance } from "@/api/axiosInstance";

export const leaveParty = async (partyId: number) => {
    const response = await axiosInstance.delete(`/api/v1/parties/${partyId}/participants`);
    return response.data;
};
