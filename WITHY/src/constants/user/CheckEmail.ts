export interface responseCheckEmail {
  status: number;
  message: string;
  data: {
    isDuplicate: boolean;
  };
}

export interface CheckEmailInput {
  email: string;
}

export const CHECKEMAIL_KEYS = {
  all: ['user'] as const,
};