import { request } from '@/api/request';
import { SignUpRequest, SignUpResponse } from '../types/signUp';

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  return request<SignUpResponse, SignUpRequest>(
    '/api/v1/auth/signup',
    'POST',
    { body: data }
  );
};