import { http, HttpResponse } from 'msw';

export const handlers = [

  http.post('*/api/v1/consumables', async ({ request }) => {

    const body = await request.json();
    const { categoryId, name, purchaseCycleDays, lastPurchaseDate, nextPurchaseDate, petIds } = body;

    if (!categoryId || !name || !purchaseCycleDays || !lastPurchaseDate || !nextPurchaseDate || !petIds) {
      return HttpResponse.json(
        { status: 400, message: "필수 파라미터가 누락되었습니다.", data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: "소비재 생성을 성공했습니다.",
        data: {
          consumableId: 1073741824
        }
      },
      { status: 200 }
    );
  }),
];
