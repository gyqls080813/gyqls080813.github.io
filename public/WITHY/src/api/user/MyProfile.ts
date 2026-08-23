import { axiosInstance } from "../axiosInstance";
import { MyProfileInput, responseMyProfile } from "@/constants/user/MyProfile";

export const myProfileApi = async (): Promise<responseMyProfile> => {
  const { data } = await axiosInstance.get<responseMyProfile>("/api/v1/users/me");

  return data;
};