// 서버에서 받는 응답 데이터 타입
export interface responseEditUser {
  status: number;
  message: string;
  data: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    email: string;
    status: string;
  };
}

// // 서버로 보내는 요청 데이터 타입 (아이디, 비번)
// export interface EditUserInput {
//   nickname: string;
//   profileImage: File;
// }

export const EDITUSER_KEYS = {
  all: ['user'] as const,
};