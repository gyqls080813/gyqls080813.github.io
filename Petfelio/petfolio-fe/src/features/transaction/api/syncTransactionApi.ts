import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

export interface SyncResult {
  syncCount: number;
  jobId: string;
}

export const syncTransactions = async (cardId: number) => {
  return await request<ApiResponse<SyncResult>>(
    `/api/v1/transactions/sync?cardId=${cardId}`,
    'POST'
  );
};
