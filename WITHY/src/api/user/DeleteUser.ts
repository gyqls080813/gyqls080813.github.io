import { axiosInstance } from "../axiosInstance";
import { DeleteUserInput, responseDeleteUser } from "@/constants/user/DeleteUser";

export const deleteUserApi = async (): Promise<responseDeleteUser> => {
  const { data } = await axiosInstance.delete<responseDeleteUser>("/api/v1/users/me");

  return data;
};