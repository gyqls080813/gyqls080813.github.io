import { http, HttpResponse } from 'msw';

export const handlers = [

  http.delete('*/api/v1/consumables/:consumableId', async ({ params }) => {
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
        message: "소비재가 성공적으로 삭제되었습니다.",
        data: {}
      },
      { status: 200 }
    );
  }),
];
