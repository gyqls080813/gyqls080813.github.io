/**
 * Effect 버전: 거래 내역 동기화 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const syncTransactionsEffect = (
  cardId: number
): Effect.Effect<unknown, HttpError> =>
  effectRequest(
    `/api/v1/transactions/sync?cardId=${cardId}`,
    'POST',
    { body: {} }
  );
