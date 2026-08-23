import { axiosInstance } from "../axiosInstance";
import { SubscribesInput, responseSubscribes } from "@/constants/user/Subscribes";

export const subscribesApi = async (): Promise<responseSubscribes> => {
  const { data } = await axiosInstance.get<responseSubscribes>("/api/v1/users/subscribes");

  return data;
};