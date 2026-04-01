// 서버에서 받는 응답 데이터 타입
export interface responseEditLanguage {
  status: number;
  message: string;
  data: null;
}

// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface EditLanguageInput {
  language: string;
}

export const EDITLANGUAGE_KEYS = {
  all: ['user'] as const,
};