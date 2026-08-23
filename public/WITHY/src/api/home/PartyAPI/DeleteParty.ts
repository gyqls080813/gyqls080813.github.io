import { axiosInstance } from "@/api/axiosInstance";

export const deleteParty = async (partyId: number) => {
    const response = await axiosInstance.delete(`/api/v1/parties/${partyId}`);
    return response.data;
};
