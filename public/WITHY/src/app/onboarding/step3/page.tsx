"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Puzzle, ExternalLink, Check, PlayCircle, MessageCircle } from "lucide-react";
import { useCheckOnboardingMutation } from "@/hooks/user/CheckOnboarding";
import { useAuthStore } from "@/store/useAuthStore";
// 컴포넌트
import NextButton from "@/components/common/NextButton/NextButton"

export default function OnboardingStep3() {
    const router = useRouter();
    // 상태 관리
    const [isInstalled, setIsInstalled] = useState(false);
    const { mutate } = useCheckOnboardingMutation();
    const { completeOnboarding } = useAuthStore();
    const handleInstallClick = () => {
        window.open("https://drive.google.com/drive/folders/1VgK9PCGollk_4yDUXOgVQhg97fJN_jVl?usp=drive_link", "_blank");
        setTimeout(() => {
            setIsInstalled(true);
        }, 1000);
    };

    // 시작하기 버튼 핸들러
    const handleNext = () => {
        if (isInstalled) {
            mutate({ completed: true }, {
                onSuccess: () => {
                    completeOnboarding();

                    router.push("/home");
                },
                onError: (error) => {
                    console.error("온보딩 상태 업데이트 실패:", error);
                    alert("문제가 발생했습니다. 다시 시도해 주세요.");
                }
            });
        } else {
            alert("먼저 확장 프로그램을 설치해 주세요!");
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-15 animate-fade-in bg-black">
            {/* 헤더 영역 */}

            {/* 메인 카드 영역 */}
            <div className="border-2 border-gray-300 p-10 rounded-2xl shadow-sm w-full max-w-lg bg-white">
                <h1 className="text-center text-2xl text-black font-bold mb-2">마지막 단계에요!</h1>
                <p className="text-center text-l text-gray-600 mb-10">친구들과 함께 보려면 WITHY 확장 프로그램이 필요해요</p>

                {/* 아이콘 그래픽 영역 */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                            <Puzzle className="w-12 h-12 text-gray-900" />
                        </div>
                        {/* 장식용 작은 아이콘들 */}
                        <div className="absolute -right-2 -top-2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                            <PlayCircle className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="absolute -left-2 -bottom-2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                            <MessageCircle className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* 설명 리스트 */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="mt-1 min-w-[24px]">
                            <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">OTT 화면 동기화</h3>
                            <p className="text-sm text-gray-500">넷플릭스, 유튜브 영상을 친구들과 정확한 타이밍에 같이 볼 수 있어요.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="mt-1 min-w-[24px]">
                            <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">실시간 채팅 & 리액션</h3>
                            <p className="text-sm text-gray-500">영상 위에 오버레이되는 채팅으로 더 생생하게 소통하세요.</p>
                        </div>
                    </div>
                </div>

                {/* 액션 버튼 영역 */}
                <div className="space-y-3">
                    {/* 설치 버튼 */}
                    <NextButton
                        onClick={isInstalled ? () => { } : handleInstallClick}
                        text={isInstalled ? (
                            <>
                                <Check className="w-5 h-5" />
                                설치 확인됨
                            </>
                        ) : (
                            <>
                                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                익스텐션 설치하기
                            </>
                        )}
                        className={isInstalled
                            ? "border-green-500 bg-green-50 text-green-700 hover:bg-green-100 border-2 h-15 cursor:pointer"
                            : "border-gray-900 bg-white text-gray-900 hover:bg-gray-50 border-2 h-15 cursor-pointer"
                        }
                    />
                </div>

                {/* 뒤로가기 / 시작하기 버튼 */}
                <div className="flex w-full gap-4 mt-5">
                    <NextButton text="이전" href="/onboarding/step2" type="button" className="bg-white border-2 border-gray-200 text-black hover:bg-gray-50" />
                    <NextButton text="시작하기" onClick={handleNext} className={`${isInstalled
                        ? "bg-gray-900 text-white hover:bg-gray-800 active:scale-98 cursor-pointer"
                        : "bg-gray-300 text-white cursor-not-allowed hover:bg-gray-100"
                        }`} />
                </div>
            </div>

        </div>
    );
}