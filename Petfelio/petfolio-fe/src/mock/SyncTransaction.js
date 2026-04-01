import { http, HttpResponse } from 'msw';

export const handlers = [

  http.post('*/api/v1/transactions/sync', async ({ request }) => {
    const url = new URL(request.url);
    const cardId = url.searchParams.get('cardId');

    if (!cardId) {
      return HttpResponse.json(
        {
          status: 400,
          message: "cardId 쿼리 파라미터가 필요합니다.",
          data: null
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: "수동 동기화를 성공적으로 마쳤습니다.",
        data: 1073741824
      },
      { status: 200 }
    );
  }),
];
