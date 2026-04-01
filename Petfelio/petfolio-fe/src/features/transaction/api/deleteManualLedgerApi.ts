import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

/** 가계부 수동 삭제 — DELETE /api/v1/transactions/ledger/manual/{transactionId} */
export const deleteManualLedger = async (transactionId: number): Promise<ApiResponse<void>> => {
    return request<ApiResponse<void>>(
        `/api/v1/transactions/ledger/manual/${transactionId}`,
        'DELETE'
    );
};
