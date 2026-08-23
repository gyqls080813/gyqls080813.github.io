import { http, HttpResponse } from 'msw';

export const handlers = [

  http.patch('*/api/v1/consumables/:consumableId', async ({ request, params }) => {
    const { consumableId } = params;

    const body = await request.json();
    const { categoryId, name, purchaseCycleDays, lastPurchaseDate, nextPurchaseDate, petIds } = body;

    if (!consumableId) {
      return HttpResponse.json(
        { status: 400, message: "consumableId is required.", data: null },
        { status: 400 }
      );
    }

    if (!categoryId || !name || !purchaseCycleDays || !lastPurchaseDate || !nextPurchaseDate || !petIds) {
      return HttpResponse.json(
        { status: 400, message: "필수 파라미터가 누락되었습니다.", data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: "소비재 정보가 성공적으로 수정되었습니다.",
        data: {}
      },
      { status: 200 }
    );
  }),
];
