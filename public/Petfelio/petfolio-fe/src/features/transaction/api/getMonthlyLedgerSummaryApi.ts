import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { MonthlyLedgerSummaryResponse } from '../types/transaction';

/**
 * 월간 가계부 조회 API (GET)
 * 
 * 선택한 그룹의 특정 연월에 대한 전체 지출 요약과 일자별 소비 금액을 조회합니다.
 * 
 * @param year - 조회할 연도
 * @param month - 조회할 월
 * @returns 월간 가계부 요약 데이터
 */
export const getMonthlyLedgerSummary = async (year: number, month: number) => {
  return await request<ApiResponse<MonthlyLedgerSummaryResponse>>(
    `/api/v1/transactions/ledger/monthly/summary?year=${year}&month=${month}`,
    'GET'
  );
};
