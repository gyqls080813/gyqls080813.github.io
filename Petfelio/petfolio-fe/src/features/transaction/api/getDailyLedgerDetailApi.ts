import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { LedgerDailyDetailItem } from '../types/transaction';

/**
 * 일간 가계부 상세 내역 조회 API (GET)
 * 
 * 선택한 그룹의 특정 일자에 대한 상세 지출 내역을 조회합니다.
 * 
 * @param date - 조회할 일자 (형식: YYYY-MM-DD)
 * @returns 해당 일자의 상세 지출 내역 목록
 */
export const getDailyLedgerDetail = async (date: string) => {
  return await request<ApiResponse<LedgerDailyDetailItem[]>>(
    `/api/v1/transactions/ledger/daily?date=${date}`,
    'GET'
  );
};
