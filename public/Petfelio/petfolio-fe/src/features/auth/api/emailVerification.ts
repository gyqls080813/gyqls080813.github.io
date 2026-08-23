import { request } from '@/api/request';

interface EmailSendRequest {
  email: string;
}

interface EmailVerifyRequest {
  email: string;
  code: string;
}

interface EmailResponse {
  status: number;
  message: string;
  data: Record<string, never>;
}

/** 이메일 인증 코드 발송 */
export const sendEmailCode = async (email: string): Promise<EmailResponse> => {
  return request<EmailResponse, EmailSendRequest>(
    '/api/v1/auth/email/send',
    'POST',
    { body: { email } }
  );
};

/** 이메일 인증 코드 검증 */
export const verifyEmailCode = async (email: string, code: string): Promise<EmailResponse> => {
  return request<EmailResponse, EmailVerifyRequest>(
    '/api/v1/auth/email/verify',
    'POST',
    { body: { email, code } }
  );
};
