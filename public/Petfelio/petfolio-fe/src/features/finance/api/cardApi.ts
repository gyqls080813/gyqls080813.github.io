import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { RegisterCardRequest } from '../types/card';

export const registerCard = async (data: RegisterCardRequest) => {
  return await request<ApiResponse<unknown>>(`/api/v1/cards`, 'POST', {
    body: data,
  });
};
