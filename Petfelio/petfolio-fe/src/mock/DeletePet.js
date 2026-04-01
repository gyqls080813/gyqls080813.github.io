import { http, HttpResponse } from 'msw';

export const handlers = [
  http.delete('*/api/v1/pets/:petId', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json(
        { status: 404, message: '사용자 정보를 읽어올 수 없습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: 'DELETE - 반려동물 삭제에 성공했습니다.',
        data: {},
      },
      { status: 200 }
    );
  }),
];