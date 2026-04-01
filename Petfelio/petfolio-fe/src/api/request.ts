import { ApiError, API_BASE_URL, RequestOptions } from './types';
import {
    clearAccessToken,
    refreshAccessToken,
    getIsRefreshing,
    setIsRefreshing,
    enqueueWait,
    flushWaitQueue,
    clearWaitQueue,
} from './tokenManager';
import { buildHeaders } from './headerBuilder';
import { parseResponse } from './responseParser';

export { ApiError } from './types';
export type { RequestOptions } from './types';

export const request = async <T, B = unknown>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    options: RequestOptions<B> = {},
    _isRetry = false
): Promise<T> => {
    const url = `${API_BASE_URL}${path}`;
    const { body, ...restOptions } = options;

    const headers = buildHeaders(options.headers, body);

    const config: RequestInit = {
        ...restOptions,
        method,
        headers,
        credentials: 'include',
        redirect: 'manual',  // 302 자동 추적 방지 (OAuth 리다이렉트 대응)
    };

    if (body && method !== 'GET') {
        const isFormData = body instanceof FormData;
        config.body = isFormData ? (body as BodyInit) : JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);

        // 인증 관련 API는 401을 토큰 갱신이 아닌 일반 에러로 처리
        const isAuthEndpoint = path.includes('/auth/login') || path.includes('/auth/register');

        // 302 리다이렉트 → 인증 만료로 처리 (인증 API 제외)
        if (!isAuthEndpoint && (response.type === 'opaqueredirect' || response.status === 302)) {
            return handle401<T, B>(path, method, options, headers, _isRetry);
        }

        if (!isAuthEndpoint && response.status === 401) {
            return handle401<T, B>(path, method, options, headers, _isRetry);
        }

        return parseResponse<T>(response);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new Error(`Network Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
};

const handle401 = async <T, B = unknown>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    options: RequestOptions<B>,
    headers: Headers,
    _isRetry: boolean
): Promise<T> => {

    if (_isRetry) {
        clearAccessToken();
        if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
            window.location.href = '/login';
        }
        throw new ApiError(401, '인증이 만료되었습니다.');
    }

    if (getIsRefreshing()) {
        return new Promise<T>((resolve, reject) => {
            enqueueWait((newToken: string) => {
                headers.set('Authorization', `Bearer ${newToken}`);
                request<T, B>(path, method, options, true)
                    .then(resolve)
                    .catch(reject);
            });
        });
    }

    setIsRefreshing(true);
    try {
        const newToken = await refreshAccessToken();
        setIsRefreshing(false);
        flushWaitQueue(newToken);
        return request<T, B>(path, method, options, true);
    } catch (error) {
        setIsRefreshing(false);
        clearWaitQueue();
        throw error;
    }
};