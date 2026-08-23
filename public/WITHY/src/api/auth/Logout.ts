import { axiosInstance } from "../axiosInstance";
import { LogoutInput, responseLogout } from "@/constants/auth/Logout";

export const logoutApi = async (input: LogoutInput): Promise<responseLogout> => {
  const { data } = await axiosInstance.post<responseLogout>("/api/v1/auth/logout", input);
  
  return data;
};