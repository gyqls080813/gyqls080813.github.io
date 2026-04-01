import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { ConsumableDetailData } from '../types/consumable';

export const getConsumableDetail = async (consumableId: number) => {
  return await request<ApiResponse<ConsumableDetailData>>(
    `/api/v1/consumables/${consumableId}`,
    'GET'
  );
};
