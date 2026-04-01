// 서버에서 받는 응답 데이터 타입
export interface responseMyProfile {
  status: number;
  message: string;
  data: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    email: string;
    status: string;
    preferredLanguage: string;
  }
}


// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface MyProfileInput {
}

export const MYPROFILE_KEYS = {
  all: ['user'] as const,
};