import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/v1/stickers', async ({ request }) => {

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json(
        { status: 404, message: "사용자 정보를 읽어올 수 없습니다." },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: "GET - 상세 정보 불러오기를 성공했습니다.",
        data: [
          {
            id: 1,
            category_id: 3,
            category_name: "MEAL",

            image_url: "https://placehold.co/150x150/FF9F43/white?text=MEAL",
            created_at: "2026-03-10T14:00:00Z"
          },
          {
            id: 2,
            category_id: 5,
            category_name: "MEDICAL",

            image_url: "https://placehold.co/150x150/00CFE8/white?text=MEDICAL",
            created_at: "2026-03-10T15:30:00Z"
          }
        ]
      },
      { status: 200 }
    );
  }),
];