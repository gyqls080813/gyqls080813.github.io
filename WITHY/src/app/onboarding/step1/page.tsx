"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react"; // 아이콘 라이브러리 (설치 필요: lucide-react)

// 컴포넌트
import NextButton from "@/components/common/NextButton/NextButton"
import Input from "@/components/common/Input/Input";
// 훅
import { useNicknameMutation } from "@/hooks/user/Nickname";
import { useRandomNicknameQuery } from "@/hooks/user/RandomNickname";
import { useCheckNicknameMutation } from "@/hooks/user/CheckNickname";

export default function OnboardingStep1() {
    const router = useRouter();
    const [nickname, setNickname] = useState("");
    const [checkMessage, setCheckMessage] = useState("");
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    const { mutate: nicknameMutate } = useNicknameMutation();
    const { mutate: checknameMutate } = useCheckNicknameMutation();
    const { data, refetch } = useRandomNicknameQuery();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.length <= 20) {
            setNickname(val);
            setIsAvailable(null);
            setCheckMessage("");
        }
    };

    useEffect(() => {
        if (data?.data?.nickname) {
            setNickname(data.data.nickname);
            setIsAvailable(null);
            setCheckMessage("");
        }
    }, [data]);

    const handleCheck = async () => {
        if (nickname.trim().length === 0) {
            setCheckMessage("닉네임을 입력해주세요.");
            setIsAvailable(false);
            return;
        }
        if (nickname.trim().length < 2) {
            setCheckMessage("2글자 이상 입력해주세요.");
            setIsAvailable(false);
            return;
        }

       checknameMutate({ nickname }, {
            onSuccess: (res) => {
                if(res.data.isDuplicate === true){
                    setIsAvailable(false);
                    setCheckMessage("중복된 닉네임입니다.");
                } else{
                    setIsAvailable(true);
                    setCheckMessage("사용 가능한 닉네임입니다.");
                }
                return;
            },
            onError: (err) => {
                setIsAvailable(false);
                console.error(err);
                return;
            }
        });

    };

    const handleNext = () => {
        if (!nickname.trim() || isAvailable !== true) {
            setCheckMessage(isAvailable !== true ? "닉네임 중복 확인을 해주세요." : "닉네임을 입력해주세요!");
            return;
        }
       nicknameMutate({ nickname }, {
            onSuccess: () => {
                router.push("/onboarding/step2")
                return;
            },
            onError: (err) => {
                console.error(err);
                return;
            }
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-15 bg-black">
            <div className="border-2 border-gray-300 p-7 rounded-2xl shadow-sm w-full max-w-lg bg-white">
                <h1 className="text-center text-2xl text-black font-bold mb-10">닉네임을 설정해주세요</h1>

                <div className="flex gap-2 w-full">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            className={`pr-10 ${isAvailable === true ? "border-green-500 focus:border-green-500" : ""} ${isAvailable === false ? "border-red-500 focus:border-red-500" : "focus:border-gray-900"}`}
                            placeholder="닉네임을 입력하세요"
                            value={nickname}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="랜덤 닉네임 생성"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>

                    <NextButton
                        text="중복확인"
                        onClick={handleCheck}
                        className="w-24 bg-gray-200 hover:bg-gray-300 text-black font-medium text-sm"
                    />
                </div>

                <div className="flex justify-between items-center mt-2 mb-5 px-1">
                    <p className={`text-sm font-medium ${isAvailable === true ? "text-green-600" : "text-red-500"}`}>
                        {checkMessage} &nbsp;
                    </p>
                    <p className="text-sm text-gray-600">
                        {nickname.length}/20
                    </p>
                </div>

                <NextButton
                    onClick={handleNext}
                    text="다음"
                    className={`${isAvailable === true
                        ? "bg-gray-900 text-white hover:bg-gray-800 active:scale-98"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                />
            </div>
        </div>
    );
}