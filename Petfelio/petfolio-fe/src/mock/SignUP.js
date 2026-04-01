import { http, HttpResponse } from 'msw';

export const signUpHandlers = [
  http.post('*/api/v1/auth/signup', async ({ request }) => {
    const { name, nickname, email, password } = await request.json();

    if (!name || !nickname || !email || !password) {
      return HttpResponse.json(
        { status: 400, message: '모든 필드를 입력해주세요.', data: {} },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '회원가입 성공',
        data: {
          userId: 1,
          email: email,
        },
      },
      { status: 201 }
    );
  }),
];