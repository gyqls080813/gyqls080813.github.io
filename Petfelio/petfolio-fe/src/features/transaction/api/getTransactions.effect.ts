/**
 * Effect 버전: 거래 목록 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const getTransactionsEffect = (
  cardId: number,
  page = 0,
  size = 20
): Effect.Effect<unknown, HttpError> =>
  effectRequest(
    `/api/v1/transactions/${cardId}/transactions?page=${page}&size=${size}`,
    'GET'
  );
