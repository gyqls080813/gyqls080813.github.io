import { axiosInstance } from "../axiosInstance";
import { PostHistoryInput, responsePostHistory } from "@/constants/watch_history/PostHistory";

export const postHistoryApi = async (input: PostHistoryInput): Promise<responsePostHistory> => {
  const { data } = await axiosInstance.post<responsePostHistory>("/api/v1/users/me/histories", input);

  return data;
};