import { request } from '@/api/request';
import { clearAccessToken } from '@/api/tokenManager';
import { LogoutResponse } from '../types/logout';

export const logout = async (): Promise<void> => {
    try {
        await request<LogoutResponse>(
            '/api/v1/auth/logout',
            'POST',
        );
    } finally {
        clearAccessToken();
    }
};
