import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { CreateConsumableRequest, CreateConsumableResponse } from '../types/consumable';

export const createConsumable = async (data: CreateConsumableRequest) => {
  return await request<ApiResponse<CreateConsumableResponse>>(
    '/api/v1/consumables',
    'POST',
    {
      body: data,
    }
  );
};
