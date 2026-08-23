import { http, HttpResponse } from 'msw';

export const handlers = [

  // ── 그룹 생성 ──
  http.post('*/api/v1/groups', async ({ request }) => {
    const url = new URL(request.url);
    // /groups/join 이나 /groups/me/* 요청은 여기서 처리하지 않음
    if (url.pathname.includes('/join') || url.pathname.includes('/me/')) return;

    const { name } = await request.json();

    if (!name) {
      return HttpResponse.json(
        { status: 400, message: '그룹 이름을 입력해주세요.', data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '그룹이 성공적으로 생성되었습니다.',
        data: {
          groupId: 1,
          name: name,
          inviteCode: 'A1B2C3D4',
        },
      },
      { status: 200 }
    );
  }),

  // ── 그룹 참여 ──
  http.post('*/api/v1/groups/join', async ({ request }) => {
    const { inviteCode } = await request.json();

    if (!inviteCode) {
      return HttpResponse.json(
        { status: 400, message: '초대 코드를 입력해주세요.', data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '그룹에 성공적으로 참여했습니다.',
        data: {
          groupId: 1,
          groupName: '우리 가족',
        },
      },
      { status: 200 }
    );
  }),

  // ── 초대 코드 조회 ──
  http.get('*/api/v1/groups/me/invite-code', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '조회 성공',
        data: {
          inviteCode: 'A1B2C3D4',
        },
      },
      { status: 200 }
    );
  }),

  // ── 초대 코드 갱신 (호스트만) ──
  http.post('*/api/v1/groups/me/invite-code/refresh', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '갱신 성공',
        data: {
          inviteCode: 'X9Y8Z7W6',
        },
      },
      { status: 200 }
    );
  }),

  // ── 그룹 멤버 목록 조회 ──
  http.get('*/api/v1/groups/me/members', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '조회 성공',
        data: {
          members: [
            {
              userId: 1,
              name: '홍길동',
              nickname: '꼬러비',
              imageUrl: 'https://i.pravatar.cc/200?img=1',
              role: 'HOST',
            },
            {
              userId: 2,
              name: '김민수',
              nickname: '민수아빠',
              imageUrl: 'https://i.pravatar.cc/200?img=3',
              role: 'USER',
            },
            {
              userId: 3,
              name: '이영희',
              nickname: '초코맘',
              imageUrl: 'https://i.pravatar.cc/200?img=5',
              role: 'USER',
            },
          ],
        },
      },
      { status: 200 }
    );
  }),

  // ── 방장 위임 ──
  http.patch('*/api/v1/groups/members/:targetUserId/host', async ({ params }) => {
    const { targetUserId } = params;
    if (!targetUserId) {
      return HttpResponse.json(
        { status: 400, message: 'targetUserId is required.', data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '위임 성공',
        data: {},
      },
      { status: 200 }
    );
  }),

  // ── 멤버 강퇴 ──
  http.delete('*/api/v1/groups/members/:targetUserId', async ({ params }) => {
    const { targetUserId } = params;
    if (!targetUserId) {
      return HttpResponse.json(
        { status: 400, message: 'targetUserId is required.', data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '강퇴 성공',
        data: {},
      },
      { status: 200 }
    );
  }),

  // ── 그룹 탈퇴 ──
  http.delete('*/api/v1/groups/me/leave', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '탈퇴 성공',
        data: {},
      },
      { status: 200 }
    );
  }),
];
