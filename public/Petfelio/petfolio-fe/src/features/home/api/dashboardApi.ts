import { ApiResponse } from '@/types/api';
import { getAccessToken } from '@/api/tokenManager';

/** 안전한 fetch 래퍼 — 404/500 등에서 throw하지 않고 빈 데이터 반환 */
async function safeFetch<T>(path: string): Promise<ApiResponse<T>> {
    try {
        const token = getAccessToken();
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(path, {
            method: 'GET',
            credentials: 'include',
            headers,
        });
        if (!res.ok) {
            return { status: res.status, message: '', data: null as T };
        }
        return await res.json();
    } catch {
        return { status: 0, message: 'network error', data: null as T };
    }
}

export const getMonthlyCompare = async (petId: number, year: number, month: number) => {
    return safeFetch<unknown>(`/api/v1/dashboard/monthly/compare/pets/${petId}?year=${year}&month=${month}`);
};

export const getRanking = async () => {
    return safeFetch<unknown>('/api/v1/dashboard/members/rank');
};

export const getDashboardSummary = async () => {
    return safeFetch<any>('/api/v1/dashboard/summary');
};
