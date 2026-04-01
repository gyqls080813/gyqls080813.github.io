// 서버에서 받는 응답 데이터 타입
export interface responseSubscribes {
  status: number;
  message: string;
  data: {
    genres: {
      id: number;
      name: string;
      code: number;
      type: string;
    }[]
  }
}


// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface SubscribesInput {
}

export const SUBSCRIBES_KEYS = {
  all: ['user'] as const,
};