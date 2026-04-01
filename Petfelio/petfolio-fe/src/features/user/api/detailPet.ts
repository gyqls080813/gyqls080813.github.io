import { request } from '@/api/request';
import { detailPet, PatchDetailPet } from '@/features/user/types/detailPet'
import { ApiResponse } from '@/types/api'

export const getDetailPet = async(petId: number) => {
    return await request<ApiResponse<detailPet>>(`/api/v1/pets/${petId}`, 'GET')
}

export const patchDetailPet = async (petId:number, data: PatchDetailPet) => {
  return await request<ApiResponse<detailPet>>(`/api/v1/pets/${petId}`, 'PATCH', {
    body: data,
  });
};