import { axiosInstance } from "../axiosInstance";
import { PreferencesInput, responsePreferences } from "@/constants/user/Preferences";

export const preferencesApi = async (input: PreferencesInput): Promise<responsePreferences> => {
  const { data } = await axiosInstance.post<responsePreferences>("/api/v1/users/me/preferences", input);

  return data;
};