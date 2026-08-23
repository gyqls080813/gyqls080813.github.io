import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

export const deleteCard = async (cardId: number) => {
  return await request<ApiResponse<object>>(
    `/api/v1/cards/${cardId}`,
    'DELETE'
  );
};
