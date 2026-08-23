/**
 * Effect 버전: 카드 등록 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';
import type { RegisterCardRequest } from '../types/card';

export const registerCardEffect = (
  data: RegisterCardRequest
): Effect.Effect<unknown, HttpError> =>
  effectRequest('/api/v1/cards', 'POST', { body: data });
