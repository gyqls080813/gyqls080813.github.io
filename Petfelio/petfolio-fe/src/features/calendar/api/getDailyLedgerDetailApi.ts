import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { DailyLedgerDetail } from '../types/calendarApi';

export const getDailyLedgerDetail = async (date: string) => {
  return await request<ApiResponse<DailyLedgerDetail[]>>(
    `/api/v1/transactions/ledger/daily?date=${date}`,
    'GET'
  );
};
