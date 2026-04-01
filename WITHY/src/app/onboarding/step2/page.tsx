'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
// 컴포넌트
import NextButton from "@/components/common/NextButton/NextButton";
import Category from "@/components/common/Category/Category"
// 훅
import { usePreferencesMutation } from "@/hooks/user/Preferences";

export default function OnboardingStep2() {
    const router = useRouter();
    // 상태 관리
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    // 훅
    const { mutate: savePreferences, isPending } = usePreferencesMutation();

    const toggleCategory = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };
    // 다음 버튼 핸들러
    const handleNext = () => {
        if (selectedIds.length === 0) {
            alert("최소 하나 이상의 카테고리를 선택해주세요!");
            return;
        }

        savePreferences(
            { genreIds: selectedIds },
            {
                onSuccess: () => {
                    // 성공 시 step3 페이지로 이동
                    router.push("/onboarding/step3");
                },
                onError: (error) => {
                    console.error("카테고리 저장 실패:", error);
                    alert("저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
                }
            }
        );
    };

    return (
        <div className="flex flex-col items-center bg-black min-h-screen p-10">
            <Category selectedIds={selectedIds} onToggle={toggleCategory} />

            <div className="flex w-[500] gap-5">
                <NextButton
                    onClick={() => router.push("/onboarding/step1")}
                    text="이전"
                    className="bg-white border-2 border-gray-200 text-black hover:bg-gray-100 cursor-pointer"
                />

                <NextButton
                    onClick={handleNext}
                    text="다음"
                    className={`rounded-xl font-bold
                        ${selectedIds.length > 0 ? 'bg-red-500 text-white hover:bg-gray-800 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-200'}
                    `}
                />
            </div>
        </div>
    );
}