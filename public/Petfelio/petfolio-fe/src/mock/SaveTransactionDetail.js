import { http, HttpResponse } from 'msw';
import { setClassifications } from './store/transactionDetailStore';

export const handlers = [
  http.post('*/api/v1/transactions/:transactionId/details', async ({ params, request }) => {
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
        message: '거래 내역 상세 정보가 성공적으로 저장되었습니다.',
        data: { transactionId: Number(transactionId), classifications },
      },
      { status: 200 }
    );
  }),
];
