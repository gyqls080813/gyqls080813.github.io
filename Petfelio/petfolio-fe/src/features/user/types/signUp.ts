export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignUpResult {
  userId: number;
}

export interface SignUpResponse {
  code: number;
  isSuccess: boolean;
  message: string;
  result: SignUpResult;
}