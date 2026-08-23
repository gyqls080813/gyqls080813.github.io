/**
 * Effect 버전: 거래 상세 수정 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';
import type { TransactionDetailsRequest } from '../types/transactionDetail';

export const updateTransactionDetailsEffect = (
  transactionId: number,
  data: TransactionDetailsRequest
): Effect.Effect<unknown, HttpError> =>
  effectRequest(
    `/api/v1/transactions/${transactionId}/details`,
    'PUT',
    { body: data }
  );
