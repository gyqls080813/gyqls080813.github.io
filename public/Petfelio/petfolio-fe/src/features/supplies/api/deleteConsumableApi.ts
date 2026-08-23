import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

export const deleteConsumable = async (consumableId: number) => {
  return await request<ApiResponse<Record<string, never>>>(
    `/api/v1/consumables/${consumableId}`,
    'DELETE'
  );
};
