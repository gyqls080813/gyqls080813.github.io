import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { TransactionDetailData } from '../types/transactionDetail';

export const getTransactionDetail = async (transactionId: number) => {
  return await request<ApiResponse<TransactionDetailData>>(
    `/api/v1/transactions/${transactionId}/details`,
    'GET'
  );
};
