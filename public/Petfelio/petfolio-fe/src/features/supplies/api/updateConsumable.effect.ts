import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';
import type { UpdateConsumableRequest } from '../types/consumable';

export const updateConsumableEffect = (
  consumableId: number,
  data: UpdateConsumableRequest
): Effect.Effect<unknown, HttpError> =>
  effectRequest(`/api/v1/consumables/${consumableId}`, 'PATCH', { body: data });
