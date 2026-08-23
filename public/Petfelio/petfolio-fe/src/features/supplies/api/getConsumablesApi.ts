import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { ConsumableItem } from '../types/consumable';

export const getConsumables = async () => {
  return await request<ApiResponse<ConsumableItem[]>>(
    '/api/v1/consumables',
    'GET'
  );
};
