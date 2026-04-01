// 서버에서 받는 응답 데이터 타입
export interface responseRefresh {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userId: number;
    nickname: string;
    loginType: string;
    isOnboardingComplete: boolean;
  }
}

// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface RefreshInput {
  refreshToken: string;
}

export const REFRESH_KEYS = {
  all: ['auth'] as const,
};