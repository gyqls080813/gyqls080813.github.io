'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useRefreshMutation } from '@/hooks/auth/Refresh';
import { Suspense } from 'react';

function CallbackContents() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setLogin = useAuthStore((state) => state.setLogin);

    const processedRef = useRef(false);

    const { mutate: refreshMutate } = useRefreshMutation();

    useEffect(() => {
        if (processedRef.current) return;

        const urlAccessToken = searchParams.get('accessToken');
        const urlRefreshToken = searchParams.get('refreshToken');

        if (urlRefreshToken) {
            processedRef.current = true; // 호출 시작 플래그

            refreshMutate(
                { refreshToken: urlRefreshToken },
                {
                    onSuccess: (response: any) => {


                        const data = response.data;

                        if (!data) {
                            console.error("데이터가 비어있습니다.");
                            return;
                        }

                        const {
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                            userId,
                            nickname,
                            loginType,
                            isOnboardingComplete,
                        } = data;



                        // 스토어 저장
                        setLogin(
                            {
                                data: {
                                    userId: userId,
                                    nickname: nickname,
                                    loginType: loginType,
                                    accessToken: newAccessToken,
                                    refreshToken: newRefreshToken,
                                    isOnboardingComplete: isOnboardingComplete
                                }
                            },
                            newAccessToken,
                            newRefreshToken
                        );

                        // 리다이렉트
                        if (!isOnboardingComplete) {
                            router.replace('/regist/conditionsOfUse');
                        } else {
                            router.replace('/home');
                        }
                    },
                    onError: (error) => {
                        console.error("토큰 갱신 실패:", error);
                        alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                        router.replace('/login');
                    }
                }
            );
        } else {
            alert("유효하지 않은 접근입니다.");
            router.replace('/login');
        }
    }, [searchParams, refreshMutate, router, setLogin]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">로그인 정보를 처리하는 중...</p>
        </div>
    );
}

export default function OAuthCallbackPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <CallbackContents />
        </Suspense>
    );
}