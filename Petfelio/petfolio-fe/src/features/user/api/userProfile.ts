import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';

/** 프로필 이미지 업로드 — POST /api/v1/users/me/image */
export const uploadProfileImage = async (file: File): Promise<ApiResponse<{ imageUrl: string }>> => {
  const formData = new FormData();
  formData.append('file', file);
  return await request<ApiResponse<{ imageUrl: string }>>(
    '/api/v1/users/me/image',
    'POST',
    { body: formData }
  );
};

/** 프로필 이미지 삭제 — DELETE /api/v1/users/me/image */
export const deleteProfileImage = async (): Promise<ApiResponse<Record<string, never>>> => {
  return await request<ApiResponse<Record<string, never>>>(
    '/api/v1/users/me/image',
    'DELETE',
  );
};

/** 비밀번호 변경 — PATCH /api/v1/users/me/password */
export const changePassword = async (currentPassword: string, newPassword: string): Promise<ApiResponse<Record<string, never>>> => {
  return await request<ApiResponse<Record<string, never>>>(
    '/api/v1/users/me/password',
    'PATCH',
    { body: { currentPassword, newPassword } }
  );
};

/** 닉네임 변경 — PATCH /api/v1/users/me/nickname */
export const changeNickname = async (nickname: string): Promise<ApiResponse<Record<string, never>>> => {
  return await request<ApiResponse<Record<string, never>>>(
    '/api/v1/users/me/nickname',
    'PATCH',
    { body: { nickname } }
  );
};

/** 회원 탈퇴 — DELETE /api/v1/users/me */
export const withdrawAccount = async (): Promise<ApiResponse<Record<string, never>>> => {
  return await request<ApiResponse<Record<string, never>>>(
    '/api/v1/users/me',
    'DELETE',
  );
};
