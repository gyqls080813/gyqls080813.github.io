import { axiosInstance } from "../axiosInstance";
import { EditPasswordInput, responseEditPassword } from "@/constants/user/EditPassword";

export const editPasswordApi = async (input : EditPasswordInput): Promise<responseEditPassword> => {
    const response = await axiosInstance.patch<responseEditPassword>("api/v1/users/password", input); 
    return response.data;
};