import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { TransactionDetailsRequest } from '../types/transactionDetail';

export const updateTransactionDetails = async (
  transactionId: number,
  data: TransactionDetailsRequest
) => {
  return await request<ApiResponse<unknown>>(
    `/api/v1/transactions/${transactionId}/details`,
    'PUT',
    {
      body: data,
    }
  );
};
