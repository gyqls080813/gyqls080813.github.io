import { http, HttpResponse } from 'msw';

export const handlers = [
  /**
   * 프로필 이미지 업로드 Mock API
   * POST /api/v1/users/me/image
   */
  http.post('*/api/v1/users/me/image', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '업로드 성공',
        data: {
          imageUrl: 'https://s3.ap-northeast-2.amazonaws.com/mock-profile.jpg',
        },
      },
      { status: 200 }
    );
  }),

  /**
   * 프로필 이미지 삭제 Mock API
   * DELETE /api/v1/users/me/image
   */
  http.delete('*/api/v1/users/me/image', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '삭제 성공',
        data: {},
      },
      { status: 200 }
    );
  }),

  /**
   * 비밀번호 변경 Mock API
   * PATCH /api/v1/users/me/password
   */
  http.patch('*/api/v1/users/me/password', async ({ request }) => {
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return HttpResponse.json(
        { status: 400, message: '현재 비밀번호와 새 비밀번호를 입력해주세요.', data: {} },
        { status: 400 }
      );
    }
    return HttpResponse.json(
      { status: 200, message: '변경 성공', data: {} },
      { status: 200 }
    );
  }),

  /**
   * 닉네임 변경 Mock API
   * PATCH /api/v1/users/me/nickname
   */
  http.patch('*/api/v1/users/me/nickname', async ({ request }) => {
    const { nickname } = await request.json();
    if (!nickname) {
      return HttpResponse.json(
        { status: 400, message: '닉네임을 입력해주세요.', data: {} },
        { status: 400 }
      );
    }
    return HttpResponse.json(
      { status: 200, message: '변경 성공', data: {} },
      { status: 200 }
    );
  }),

  /**
   * 회원 탈퇴 Mock API
   * DELETE /api/v1/users/me
   */
  http.delete('*/api/v1/users/me', async () => {
    return HttpResponse.json(
      { status: 200, message: '탈퇴 성공', data: {} },
      { status: 200 }
    );
  }),
];
