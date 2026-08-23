// 서버에서 받는 응답 데이터 타입
export interface responseLogin {
  data: any;
  accessToken: string;
  refreshToken: string;
  loginType: string;
  userId: number;
  nickname: string;
}

// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface LoginInput {
  email: string;
  password: string;
}

export const LOGIN_KEYS = {
  all: ['auth'] as const,
};