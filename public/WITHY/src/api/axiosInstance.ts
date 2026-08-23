import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

// 토큰 갱신 상태 관리 변수들
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // RTR(쿠키 사용)을 위해 필수
});

// 1. 요청 인터셉터 (Zustand 연동)
axiosInstance.interceptors.request.use(
    (config) => {
        // Zustand 스토어에서 최신 토큰을 직접 가져옴
        const token = useAuthStore.getState().accessToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. 응답 인터셉터 (RTR 로직 통합)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // 401 에러가 발생했고 아직 재시도를 하지 않았다면
        if (error.response?.status === 401 && !originalRequest._retry) {

            // 파티 입장 API는 토큰 갱신 로직에서 제외 (비밀번호 불일치 등의 권한 문제)
            if (originalRequest.url?.includes('/parties/') &&
                originalRequest.url?.includes('/participants')) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // 이미 다른 요청이 토큰을 갱신 중이면 큐에서 대기
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { refreshToken } = useAuthStore.getState(); // 스토어에서 리프레시 토큰 추출

                const response = await axios.post(
                    `/api/v1/auth/refresh`,
                    { refreshToken }, // JSON 바디에 담아서 전송
                    { headers: { "Content-Type": "application/json" } }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                // 새 토큰들 저장
                useAuthStore.getState().setTokens(accessToken, newRefreshToken);

                // 대기 중이던 요청들 일괄 처리
                processQueue(null, accessToken);

                // 현재 요청 재시도
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // 리프레시 토큰도 만료된 경우 로그아웃 처리
                processQueue(refreshError, null);
                useAuthStore.getState().setLogout();

                // Next.js 환경에서 클라이언트 사이드 로그인 이동
                if (typeof window !== 'undefined' && !window.location.href.includes('/login')) {
                    window.location.href = '/';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);