export interface responseCheckNickname {
    status: number;
    message: string;
    data: {
        isDuplicate: boolean;
    };
}

export interface CheckNicknameInput {
    nickname: string;
}

export const CHECKEMAIL_KEYS = {
    all: ['user'] as const,
};