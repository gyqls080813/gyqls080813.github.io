import { axiosInstance } from "../axiosInstance";
import { responseEditUser } from "@/constants/user/EditUser"; // EditUserInput은 제거하거나 안 씁니다.

export const editUserApi = async (input: FormData): Promise<responseEditUser> => {
    const response = await axiosInstance.patch<responseEditUser>(
        "api/v1/users/me", 
        input, 
        {
            headers: {
                "Content-Type": undefined 
            }
        }
    ); 
    return response.data;
};