import { axiosInstance } from "../axiosInstance"; 
import { LoginInput, responseLogin } from "@/constants/auth/Login";

export const loginApi = async (input: LoginInput): Promise<responseLogin> => {
  const { data } = await axiosInstance.post<responseLogin>("/api/v1/auth/login", input);
  
  return data;
};