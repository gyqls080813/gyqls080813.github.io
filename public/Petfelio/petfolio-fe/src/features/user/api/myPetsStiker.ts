import { getAccessToken } from '@/api/tokenManager';
import { PetsStikers } from '@/features/user/types/myPetsStiker'
import { ApiResponse } from '@/types/api'

export const getPetsStikers = async (petId: number): Promise<ApiResponse<PetsStikers[]>> => {
  const token = getAccessToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`/api/v1/stickers/${petId}/image`, {
    method: 'GET',
    credentials: 'include',
    headers,
  });
  if (!res.ok) {
    return { status: res.status, message: '', data: [] } as ApiResponse<PetsStikers[]>;
  }
  return await res.json();
};