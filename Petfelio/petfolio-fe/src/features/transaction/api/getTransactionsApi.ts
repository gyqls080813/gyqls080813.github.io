import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { TransactionListResponse } from '../types/transaction';

export const getTransactions = async (cardId: number, page = 0, size = 20) => {
  return await request<ApiResponse<TransactionListResponse>>(
    `/api/v1/transactions/${cardId}/transactions?page=${page}&size=${size}`,
    'GET'
  );
};
