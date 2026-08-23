import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

export const deleteTransactionDetails = async (transactionId: number) => {
  return await request<ApiResponse<null>>(
    `/api/v1/transactions/${transactionId}/classifications`,
    'DELETE'
  );
};
