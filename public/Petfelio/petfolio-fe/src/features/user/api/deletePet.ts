import { request } from '@/api/request'
import { ApiResponse } from '@/types/api'

export const deletePet = async (petId: number) => {
  return await request<ApiResponse<unknown>>(
    `/api/v1/pets/${petId}`,
    'DELETE'
  )
};