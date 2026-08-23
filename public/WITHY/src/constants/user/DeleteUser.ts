// 서버에서 받는 응답 데이터 타입
export interface responseDeleteUser {
  status: number;
  message: string;
}


// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface DeleteUserInput {
}

export const DELETE_KEYS = {
  all: ['user'] as const,
};