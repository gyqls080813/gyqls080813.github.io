import { axiosInstance } from "../axiosInstance";
import { EmailAuthenticationInput, responseEmailAuthentication } from "@/constants/user/EmailAuthentication";

export const emailAuthenticationApi = async (input: EmailAuthenticationInput): Promise<responseEmailAuthentication> => {
    const response = await axiosInstance.post<responseEmailAuthentication>("api/v1/auth/email/send", input);
    return response.data;
};