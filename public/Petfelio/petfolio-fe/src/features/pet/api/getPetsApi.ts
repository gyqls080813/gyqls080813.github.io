import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { Pet } from '../types';

export const getPets = async () => {
  return await request<ApiResponse<Pet[]>>(
    '/api/v1/pets',
    'GET'
  );
};
