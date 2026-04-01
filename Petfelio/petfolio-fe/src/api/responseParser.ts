import { ApiError } from './types';

export const parseResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.clone().json();
        } catch {
            errorData = await response.text();
        }
        throw new ApiError(response.status, response.statusText, errorData);
    }

    const text = await response.text();
    
    // 읽어온 텍스트가 있으면 JSON 파싱을 시도합니다.
    let data;
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        // 파싱에 실패하면(HTML 등) 원본 텍스트를 사용합니다.
        data = text;
    }

    if (!response.ok) {
        throw new ApiError(response.status, response.statusText, data);
    }

    return data as T;
};
