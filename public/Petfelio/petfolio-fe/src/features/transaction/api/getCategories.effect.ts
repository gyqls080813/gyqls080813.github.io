/**
 * Effect 버전: 카테고리 목록 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const getCategoriesEffect = (): Effect.Effect<unknown, HttpError> =>
  effectRequest('/api/v1/categories', 'GET');
