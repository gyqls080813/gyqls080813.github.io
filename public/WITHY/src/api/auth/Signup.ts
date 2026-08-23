import { axiosInstance } from "../axiosInstance"; 
import { SignupInput, responseSignup } from "@/constants/auth/Signup";

export const signupApi = async (input: SignupInput): Promise<responseSignup> => {
  const { data } = await axiosInstance.post<responseSignup>("/api/v1/auth/signup", input);
  
  return data;
};