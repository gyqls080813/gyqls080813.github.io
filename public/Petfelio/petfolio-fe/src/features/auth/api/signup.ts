import { request } from '@/api/request';
import { SignUpRequest, SignUpResponse } from '../types/signup';

export const signup = async (data: SignUpRequest): Promise<SignUpResponse> => {
    return request<SignUpResponse, SignUpRequest>(
        '/api/v1/auth/signup',
        'POST',
        { body: data }
    );
};
