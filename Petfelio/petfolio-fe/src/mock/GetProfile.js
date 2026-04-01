import { http, HttpResponse } from 'msw';

export const handlers = [
  /**
   * 내 프로필 정보 조회 Mock API
   * GET /api/v1/members/me (기존 엔드포인트)
   */
  http.get('*/api/v1/members/me', () => {
    return HttpResponse.json({
      status: 200,
      message: '회원 정보 조회 성공',
      data: {
        memberId: 1,
        email: 'test@ssafy.com',
        name: '꼬러비',
        nickname: '꼬러비',
        groupName: '초코네 가족',
        role: 'USER',
        imageUrl: 'https://example.com/image.jpg',
      },
    }, { status: 200 });
  }),

  /**
   * 내 정보 조회 Mock API (새 엔드포인트)
   * GET /api/v1/users/me
   */
  http.get('*/api/v1/users/me', () => {
    return HttpResponse.json({
      status: 200,
      message: '조회 성공',
      data: {
        userId: 1,
        email: 'test@ssafy.com',
        nickname: '꼬러비',
        role: 'USER',
        groupId: 1,
        groupName: '초코네 가족',
        imageUrl: null,
      },
    }, { status: 200 });
  }),
];
