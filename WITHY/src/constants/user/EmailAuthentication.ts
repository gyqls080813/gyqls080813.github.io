// 서버에서 받는 응답 데이터 타입
export interface responseEmailAuthentication {
  status : number;
  message : string;
  data: string;
}


// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface EmailAuthenticationInput {
  email : string;
}

export const CHECK_KEYS = {
  all: ['user'] as const,
};