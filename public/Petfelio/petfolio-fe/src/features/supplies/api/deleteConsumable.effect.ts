import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const deleteConsumableEffect = (
  consumableId: number
): Effect.Effect<unknown, HttpError> =>
  effectRequest(`/api/v1/consumables/${consumableId}`, 'DELETE');
