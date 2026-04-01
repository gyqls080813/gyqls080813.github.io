import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { UpdateConsumableRequest } from '../types/consumable';

export const updateConsumable = async (consumableId: number, data: UpdateConsumableRequest) => {
  return await request<ApiResponse<Record<string, never>>>(
    `/api/v1/consumables/${consumableId}`,
    'PATCH',
    {
      body: data,
    }
  );
};
