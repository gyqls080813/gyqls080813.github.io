import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { MonthlyLedgerSummary } from '../types/calendarApi';

export const getMonthlyLedgerSummary = async (year: number, month: number) => {
  return await request<ApiResponse<MonthlyLedgerSummary>>(
    `/api/v1/transactions/ledger/monthly/summary?year=${year}&month=${month}&_t=${Date.now()}`,
    'GET'
  );
};
