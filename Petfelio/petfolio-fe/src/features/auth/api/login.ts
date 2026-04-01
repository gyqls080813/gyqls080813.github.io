import { request } from '@/api/request';
import { LoginRequest, LoginResponse } from '../types/login';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    return request<LoginResponse, LoginRequest>(
        '/api/v1/auth/login',
        'POST',
        { body: data }
    );
};
