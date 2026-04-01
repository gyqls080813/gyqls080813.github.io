import { http, HttpResponse } from 'msw';

export const handlers = [
  /**
   * 이메일 인증 코드 발송 Mock API
   * POST /api/v1/auth/email/send
   */
  http.post('*/api/v1/auth/email/send', async ({ request }) => {
    const { email } = await request.json();

    if (!email) {
      return HttpResponse.json(
        { status: 400, message: '이메일을 입력해주세요.', data: {} },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '발송 성공',
        data: {},
      },
      { status: 200 }
    );
  }),

  /**
   * 이메일 인증 코드 검증 Mock API
   * POST /api/v1/auth/email/verify
   */
  http.post('*/api/v1/auth/email/verify', async ({ request }) => {
    const { email, code } = await request.json();

    if (!email || !code) {
      return HttpResponse.json(
        { status: 400, message: '이메일과 인증 코드를 입력해주세요.', data: {} },
        { status: 400 }
      );
    }

    // Mock: 인증 코드 "123456"이면 성공
    if (code !== '123456') {
      return HttpResponse.json(
        { status: 400, message: '인증 코드 불일치 또는 만료', data: {} },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '인증 성공',
        data: {},
      },
      { status: 200 }
    );
  }),
];
