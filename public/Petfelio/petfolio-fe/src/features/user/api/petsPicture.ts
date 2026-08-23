import { request } from '@/api/request';
import { PetsPicture } from '@/features/user/types/petsPicture';
import { ApiResponse } from '@/types/api';

export const postPetsPicture = async (petId: number, imageFile: File) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  return await request<ApiResponse<PetsPicture>>(
    `/api/v1/pets/${petId}/image`,
    'POST',
    { body: formData }
  );
};