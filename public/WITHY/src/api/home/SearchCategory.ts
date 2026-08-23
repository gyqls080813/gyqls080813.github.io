import { axiosInstance } from "../axiosInstance";

export const SearchCategory = async (platform: string) => {
  const response = await axiosInstance.get(`/api/v1/genres`, {
    params: { platform }
  });
  return response.data;
};