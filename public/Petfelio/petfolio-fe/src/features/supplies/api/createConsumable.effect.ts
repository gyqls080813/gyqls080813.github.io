import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';
import type { CreateConsumableRequest } from '../types/consumable';

export const createConsumableEffect = (
  data: CreateConsumableRequest
): Effect.Effect<unknown, HttpError> =>
  effectRequest('/api/v1/consumables', 'POST', { body: data });
