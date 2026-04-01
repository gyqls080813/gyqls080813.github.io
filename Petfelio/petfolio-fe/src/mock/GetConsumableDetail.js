import { http, HttpResponse } from 'msw';

export const handlers = [

  http.get('*/api/v1/consumables/:consumableId', async ({ params }) => {
    const { consumableId } = params;

    if (!consumableId) {
      return HttpResponse.json(
        { status: 400, message: "consumableId is required.", data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: "소비재 상세 정보를 성공적으로 불러왔습니다.",
        data: {
          id: Number(consumableId) || 1073741824,
          categoryId: 1073741824,
          categoryName: "사료/간식",
          name: "하림 펫푸드 닭가슴살",
          purchaseCycleDays: 30,
          lastPurchaseDate: "2026-02-19",
          nextPurchaseDate: "2026-03-19",
          purchaseUrl: "https://example.com/item/1",
          pets: [
            {
              petId: 1073741824,
              petName: "초코"
            }
          ]
        }
      },
      { status: 200 }
    );
  }),
];
