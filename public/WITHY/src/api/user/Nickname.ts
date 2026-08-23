import { axiosInstance } from "../axiosInstance";
import { NicknameInput, responseNickname } from "@/constants/user/Nickname";

export const nicknameApi = async (input: NicknameInput): Promise<responseNickname> => {
  const { data } = await axiosInstance.patch<responseNickname>("/api/v1/users/nickname", input);

  return data;
};