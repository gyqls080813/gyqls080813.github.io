/**
 * Effect 버전: 일별 가계부 상세 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const getDailyLedgerDetailEffect = (
  date: string
): Effect.Effect<unknown, HttpError> =>
  effectRequest(
    `/api/v1/transactions/ledger/daily?date=${date}`,
    'GET'
  );
