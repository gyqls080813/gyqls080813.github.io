/**
 * Effect 버전: 월별 가계부 요약 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';

export const getMonthlyLedgerSummaryEffect = (
  year: number,
  month: number
): Effect.Effect<unknown, HttpError> =>
  effectRequest(
    `/api/v1/transactions/ledger/monthly/summary?year=${year}&month=${month}`,
    'GET'
  );
