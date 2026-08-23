import { axiosInstance } from "../axiosInstance";
import { HistoryApiResponse, responseGetHistory } from "@/constants/watch_history/GetHistory";

export const getHistoryApi = async (): Promise<responseGetHistory[]> => {
  const { data } = await axiosInstance.get<HistoryApiResponse>("/api/v1/users/me/histories");
 
  return data.data;
};