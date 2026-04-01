import { http, HttpResponse } from 'msw';

export const handlers = [

  http.post('*/api/v1/auth/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (!email || !password) {
      return HttpResponse.json(
        { status: 400, message: '이메일과 비밀번호를 입력해주세요.', data: {} },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '로그인에 성공했습니다.',
        data: {
          accessToken: 'eyJhbGci... (생략)',
          userId: 1,
          email: email,
          nickname: '꼬러비',
          imageUrl: 'https://example.com/image.jpg',
        },
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'refresh_token=mock-refresh-token; HttpOnly; Path=/; SameSite=Lax',
        },
      }
    );
  }),
];
