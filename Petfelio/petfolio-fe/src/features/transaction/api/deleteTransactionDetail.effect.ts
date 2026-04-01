/**
 * Effect 버전: 거래 상세 삭제 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const deleteTransactionDetailsEffect = (
  transactionId: number
): Effect.Effect<unknown, HttpError> =>
  effectRequest(
    `/api/v1/transactions/${transactionId}/classifications`,
    'DELETE'
  );
