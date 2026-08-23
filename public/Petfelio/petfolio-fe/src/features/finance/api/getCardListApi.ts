import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { CardItem } from '../types/card';

export const getCardList = async () => {
  return await request<ApiResponse<CardItem[]>>(
    '/api/v1/cards',
    'GET'
  );
};
