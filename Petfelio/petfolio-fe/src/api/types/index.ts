export class ApiError extends Error {
    status: number;
    data?: unknown;

    constructor(status: number, message: string, data?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }

    getDataMessage(): string | undefined {
        if (this.data && typeof this.data === 'object' && 'message' in this.data) {
            return String((this.data as Record<string, unknown>).message);
        }
        return undefined;
    }
}

export const API_BASE_URL = '';

export interface RequestOptions<B> extends Omit<RequestInit, 'body'> {
    body?: B;
}
