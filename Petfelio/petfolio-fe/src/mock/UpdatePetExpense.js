import { http, HttpResponse } from 'msw';
import { setPetExpense } from './store/petExpenseStore';

export const handlers = [
  http.patch('*/api/v1/transactions/:transactionId/pet-expense', async ({ params, request }) => {
    const { transactionId } = params;

    if (!transactionId) {
      return HttpResponse.json(
        { status: 400, message: 'transactionId is required.', data: null },
        { status: 400 }
      );
    }

    try {
      const { isPetExpense } = await request.json();

      if (typeof isPetExpense !== 'boolean') {
        return HttpResponse.json(
          { status: 400, message: 'isPetExpense must be a boolean.', data: null },
          { status: 400 }
        );
      }

      setPetExpense(transactionId, isPetExpense);

      return HttpResponse.json(
        { status: 200, message: '반려 동물 지출 여부가 성공적으로 수정되었습니다.', data: {} },
        { status: 200 }
      );
    } catch (e) {
      return HttpResponse.json(
        { status: 400, message: 'Invalid request body.', data: null },
        { status: 400 }
      );
    }
  }),
];
