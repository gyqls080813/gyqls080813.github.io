import { axiosInstance } from "../axiosInstance";
import { EditLanguageInput, responseEditLanguage } from "@/constants/user/EditLanguage";

export const editLanguageApi = async (input : EditLanguageInput): Promise<responseEditLanguage> => {
    const response = await axiosInstance.patch<responseEditLanguage>("api/v1/users/language", input); 
    return response.data;
};