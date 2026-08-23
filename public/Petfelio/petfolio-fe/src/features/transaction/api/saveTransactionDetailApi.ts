import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { TransactionDetailsRequest } from '../types/transactionDetail';

export const saveTransactionDetails = async (
  transactionId: number,
  data: TransactionDetailsRequest
) => {
  return await request<ApiResponse<unknown>>(
    `/api/v1/transactions/${transactionId}/details`,
    'POST',
    {
      body: data,
    }
  );
};
