/**
 * Effect 버전: 거래 상세 저장 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';
import type { TransactionDetailsRequest } from '../types/transactionDetail';

export const saveTransactionDetailsEffect = (
  transactionId: number,
  data: TransactionDetailsRequest
): Effect.Effect<unknown, HttpError> =>
  effectRequest(
    `/api/v1/transactions/${transactionId}/details`,
    'POST',
    { body: data }
  );
