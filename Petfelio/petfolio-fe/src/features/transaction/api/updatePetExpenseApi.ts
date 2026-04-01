import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { UpdatePetExpenseRequest } from '../types/transactionDetail';

export const updatePetExpense = async (transactionId: number, data: UpdatePetExpenseRequest) => {
  return await request<ApiResponse<unknown>>(
    `/api/v1/transactions/${transactionId}/pet-expense`,
    'PATCH',
    {
      body: data,
    }
  );
};
