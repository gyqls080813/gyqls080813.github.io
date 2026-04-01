export interface responseRandomNickname {
  status: number;
  message: string;
  data: {
    nickname: string;
  };
}

export interface RandomNicknameInput {
}

export const RANDONNICKNAME_KEYS = {
  all: ['user'] as const,
};