/**
 * Effect 버전: 반려동물 프로필 이미지 업로드 API
 * POST /api/v1/stickers/{petId}/image (multipart/form-data)
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const uploadPetImageEffect = (
  petId: number,
  file: File
): Effect.Effect<unknown, HttpError> => {
  const formData = new FormData();
  formData.append('file', file);

  return effectRequest(
    `/api/v1/stickers/${petId}/image`,
    'POST',
    { body: formData as unknown }
  );
};
