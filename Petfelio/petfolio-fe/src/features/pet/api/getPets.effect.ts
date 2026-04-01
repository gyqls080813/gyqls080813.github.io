/**
 * Effect 버전: 반려동물 목록 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const getPetsEffect = (): Effect.Effect<unknown, HttpError> =>
  effectRequest('/api/v1/pets', 'GET');
