import { axiosInstance } from "../axiosInstance";
import { Patchinput, responsePatch } from "@/constants/user/Patch";

export const patchApi = async (input: Patchinput): Promise<responsePatch> => {
  const { data } = await axiosInstance.patch<responsePatch>("/api/v1/users/me", input);

  return data;
};