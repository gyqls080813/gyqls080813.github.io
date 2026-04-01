import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

export interface UploadPetImageResponse {
  url: string;
  jobId: string;
}

/**
 * 반려동물 프로필 이미지 업로드
 * POST /api/v1/stickers/{petId}/image
 * Content-Type: multipart/form-data
 */
export const uploadPetImage = async (petId: number, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return await request<ApiResponse<UploadPetImageResponse>>(
    `/api/v1/stickers/${petId}/image`,
    'POST',
    { body: formData as unknown }
  );
};
