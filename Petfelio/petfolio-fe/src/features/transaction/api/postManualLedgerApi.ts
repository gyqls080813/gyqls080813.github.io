import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

/** 수동 등록 요청 타입 */
export interface ManualLedgerRequest {
  transactionDate: string;       // "2024-06-01T14:30:00"
  merchantName: string;          // "스타벅스"
  amount: number;                // 4500
  categoryId: number;            // 1~8
  memo: string;                  // "아이스 아메리카노 먹 전"
  petAllocations: {
    petId: number;
    allocatedAmount: number;
  }[];
}

/** 가계부 수동 등록 — POST /api/v1/transactions/ledger/manual */
export const postManualLedger = async (data: ManualLedgerRequest) => {
  return await request<ApiResponse<unknown>>(
    '/api/v1/transactions/ledger/manual',
    'POST',
    { body: data }
  );
};
