import { http, HttpResponse } from 'msw';
import { deleteClassifications } from './store/transactionDetailStore';

export const handlers = [
  http.delete('*/api/v1/transactions/:transactionId/details', async ({ params }) => {
    const { transactionId } = params;

    if (!transactionId) {
      return HttpResponse.json(
        { status: 400, message: 'transactionId is required.', data: null },
        { status: 400 }
      );
    }

    deleteClassifications(transactionId);

    return HttpResponse.json(
      {
        status: 200,
        message: '거래 분류가 성공적으로 삭제되었습니다.',
        data: null,
      },
      { status: 200 }
    );
  }),
];
