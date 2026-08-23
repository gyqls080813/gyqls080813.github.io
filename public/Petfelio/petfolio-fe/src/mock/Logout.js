import { http, HttpResponse } from 'msw';

export const handlers = [

  http.post('*/api/v1/auth/logout', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '로그아웃에 성공했습니다.',
        data: {},
      },
      { status: 200 }
    );
  }),
];
