import { http, HttpResponse } from 'msw';
import { getClassifications } from './store/transactionDetailStore';

export const handlers = [
  http.get('*/api/v1/transactions/:transactionId/details', async ({ params }) => {
    const { transactionId } = params;

    if (!transactionId) {
      return HttpResponse.json(
        { status: 400, message: 'transactionId is required.', data: null },
        { status: 400 }
      );
    }

    const classifications = getClassifications(transactionId);

    return HttpResponse.json(
      {
        status: 200,
        message: '거래 상세 정보를 성공적으로 불러왔습니다.',
        data: {
          transactionId: Number(transactionId),
          classifications,
        },
      },
      { status: 200 }
    );
  }),
];
