/**
 * Effect 버전: 반려동물 지출 수정 API
 */
import { effectRequest } from '@/api/effect/request';
import type { HttpError } from '@/api/effect/errors';
import type { Effect } from 'effect';
import type { UpdatePetExpenseRequest } from '../types/transactionDetail';

export const updatePetExpenseEffect = (
  transactionId: number,
  data: UpdatePetExpenseRequest
): Effect.Effect<unknown, HttpError> =>
  effectRequest(
    `/api/v1/transactions/${transactionId}/pet-expense`,
    'PATCH',
    { body: data }
  );
