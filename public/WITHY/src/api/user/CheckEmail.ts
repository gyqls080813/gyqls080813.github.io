import { axiosInstance } from "../axiosInstance";
import { CheckEmailInput, responseCheckEmail } from "@/constants/user/CheckEmail";

export const checkEmailApi = async (input: CheckEmailInput): Promise<responseCheckEmail> => {
    const { data } = await axiosInstance.get<responseCheckEmail>("/api/v1/users/email/check", {
        params: input,
    });

    return data;
};