// 서버에서 받는 응답 데이터 타입
export interface responseSignup {
  data: any;
  userId: number;
  accessToken: string;
  refreshToken: string;
  nickname: string;
  loginType: string;
}

// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface SignupInput {
  email: string;
  password: string;
}

export const SIGNUP_KEYS = {
  all: ['auth'] as const,
};