import { ApiError, API_BASE_URL } from './types';

// sessionStorage에 토큰 유지 (새로고침해도 보존)
const TOKEN_KEY = 'petfolio_access_token';

let accessToken: string | null =
    typeof window !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null;

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string): void => {
    accessToken = token;
    if (typeof window !== 'undefined') sessionStorage.setItem(TOKEN_KEY, token);
};

export const clearAccessToken = (): void => {
    accessToken = null;
    if (typeof window !== 'undefined') sessionStorage.removeItem(TOKEN_KEY);
};

let isRefreshing = false;
let waitQueue: ((token: string) => void)[] = [];

export const refreshAccessToken = async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        redirect: 'manual',  // 302 → Google OAuth 자동 추적 방지
    });

    // 302 리다이렉트 또는 실패 → 세션 만료
    if (response.type === 'opaqueredirect' || response.status === 302 || !response.ok) {
        clearAccessToken();
        if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
            window.location.href = '/login';
        }
        throw new ApiError(response.status || 401, '세션이 만료되었습니다. 다시 로그인해주세요.');
    }

    const data = await response.json();
    const newAccessToken = data.data.accessToken;
    setAccessToken(newAccessToken);
    return newAccessToken;
};

export const getIsRefreshing = () => isRefreshing;
export const setIsRefreshing = (value: boolean) => { isRefreshing = value; };

export const enqueueWait = (callback: (token: string) => void) => {
    waitQueue.push(callback);
};

export const flushWaitQueue = (newToken: string) => {
    waitQueue.forEach(cb => cb(newToken));
    waitQueue = [];
};

export const clearWaitQueue = () => {
    waitQueue = [];
};
