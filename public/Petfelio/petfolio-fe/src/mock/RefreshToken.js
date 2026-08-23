import { http, HttpResponse } from 'msw';

export const handlers = [
  /**
   * 토큰 재발급 Mock API
   * POST /api/v1/auth/refresh
   * Cookie에서 refresh_token을 읽어 새 accessToken 발급
   */
  http.post('*/api/v1/auth/refresh', () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '토큰 재발급 성공',
        data: {
          accessToken: 'eyJhbGci-new-access-token',
        },
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'refresh_token=mock-new-refresh-token; HttpOnly; Path=/; SameSite=Lax',
        },
      }
    );
  }),
];
