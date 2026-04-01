import { getAccessToken } from './tokenManager';

export const buildHeaders = (
    existingHeaders?: HeadersInit,
    body?: unknown
): Headers => {
    const headers = new Headers(existingHeaders);

    const isFormData = body instanceof FormData;
    if (!headers.has('Content-Type') && !isFormData) {
        headers.set('Content-Type', 'application/json');
    }

    const token = getAccessToken();
    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
};
