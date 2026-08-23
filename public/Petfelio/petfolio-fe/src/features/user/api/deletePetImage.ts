import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

/** 반려동물 사진(스티커) 삭제 — DELETE /api/v1/stickers/{petId}/image */
export const deletePetImage = async (petId: number): Promise<ApiResponse<Record<string, never>>> => {
  return await request<ApiResponse<Record<string, never>>>(
    `/api/v1/stickers/${petId}/image`,
    'DELETE',
  );
};
