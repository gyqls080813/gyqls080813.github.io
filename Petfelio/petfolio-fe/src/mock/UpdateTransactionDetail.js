import { http, HttpResponse } from 'msw';
import { setClassifications } from './store/transactionDetailStore';

export const handlers = [
  http.put('*/api/v1/transactions/:transactionId/details', async ({ params, request }) => {
    const { transactionId } = params;

    if (!transactionId) {
      return HttpResponse.json(
        { status: 400, message: 'transactionId is required.', data: null },
        { status: 400 }
      );
    }

    const body = await request.json();
    const classifications = body.classifications || [];

    setClassifications(transactionId, classifications);

    return HttpResponse.json(
      {
        status: 200,
        message: '결제 상세 내역이 성공적으로 수정되었습니다.',
        data: { transactionId: Number(transactionId), classifications },
      },
      { status: 200 }
    );
  }),
];
