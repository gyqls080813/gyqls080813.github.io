import { axiosInstance } from "../axiosInstance";
import { RandomNicknameInput, responseRandomNickname } from "@/constants/user/RandomNickname";

export const randomNicknameApi = async (): Promise<responseRandomNickname> => {
  const { data } = await axiosInstance.get<responseRandomNickname>("/api/v1/users/nickname/random");

  return data;
};