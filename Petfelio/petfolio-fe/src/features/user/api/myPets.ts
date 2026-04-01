import { request } from '@/api/request';
import { Pet, RegisterPetRequest } from '@/features/user/types/myPets'
import { ApiResponse } from '@/types/api'

export const getMyPets = async () => {
  return await request<ApiResponse<Pet[]>>('/api/v1/pets', 'GET');
};

export const postMyPet = async (data: RegisterPetRequest) => {
  return await request<ApiResponse<unknown>>('/api/v1/pets', 'POST', {
    body: data,
  });
};