import { axiosInstance } from "../axiosInstance";
import { CheckNicknameInput, responseCheckNickname } from "@/constants/user/CheckNickname";

export const checkNicknameApi = async (input: CheckNicknameInput): Promise<responseCheckNickname> => {
    const { data } = await axiosInstance.get<responseCheckNickname>("/api/v1/users/nickname/check", {
        params: input,
    });

    return data;
};