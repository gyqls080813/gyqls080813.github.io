import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { CategoryItem } from '../types/category';

export const getCategories = async () => {
  return await request<ApiResponse<CategoryItem[]>>(
    '/api/v1/categories',
    'GET'
  );
};
