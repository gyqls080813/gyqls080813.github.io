import { request } from '@/api/request';
import { Pet, RegisterPetRequest } from '@/features/user/types/myPets'
import { ApiResponse } from '@/types/api'

export const totalPetFinance = async () => {
    return await request<ApiResponse<Pet[]>>('/api/v1/reports/summary', 'GET');
};
