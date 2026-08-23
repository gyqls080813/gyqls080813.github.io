import { axiosInstance } from "../axiosInstance";
import { EditCategoryInput, responseEditCategory } from "@/constants/user/EditCategory";

export const editCategoryApi = async (input : EditCategoryInput): Promise<responseEditCategory> => {
    const response = await axiosInstance.put<responseEditCategory>("api/v1/users/subscribes", input); 
    return response.data;
};