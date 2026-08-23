import { axiosInstance } from "../axiosInstance";
import { CheckOnboardingInput, responseCheckOnboarding } from "@/constants/user/CheckOnboarding";

export const checkOnboardingApi = async (): Promise<responseCheckOnboarding> => {
    const { data } = await axiosInstance.patch<responseCheckOnboarding>("/api/v1/users/onboarding");
    
    return data;
};