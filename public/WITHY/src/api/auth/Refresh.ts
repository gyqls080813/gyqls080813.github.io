import { axiosInstance } from "../axiosInstance"; 
import { RefreshInput, responseRefresh } from "@/constants/auth/Refresh";

export const refreshApi = async (input: RefreshInput): Promise<responseRefresh> => {
  const { data } = await axiosInstance.post<responseRefresh>("/api/v1/auth/refresh", input);
  
  return data;
};