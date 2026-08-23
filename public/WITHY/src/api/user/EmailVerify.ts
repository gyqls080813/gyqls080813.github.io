import { axiosInstance } from "../axiosInstance";
import { EmailVerifyInput, responseEmailVerify } from "@/constants/user/EmailVerify";

export const emailVerifyApi = async (input: EmailVerifyInput): Promise<responseEmailVerify> => {
    const response = await axiosInstance.post<responseEmailVerify>("api/v1/auth/email/verify", input);
    return response.data;
};