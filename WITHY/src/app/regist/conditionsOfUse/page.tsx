"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

// 컴포넌트
import NextButton from "@/components/common/NextButton/NextButton"

// 훅
import { useAuthStore } from "@/store/useAuthStore";

// 타입 정의
interface Term {
    id: string;
    label: string;
    required: boolean;
    content: string;
}

interface AgreementsState {
    [key: string]: boolean;
}

// 약관 데이터
const TERM_LIST: Term[] = [
    { id: "term1", label: "WITHY 이용약관 동의", required: true, content: "제1조(목적) 본 약관은 WITHY 서비스의 이용조건 및 절차..." },
    { id: "term2", label: "개인정보 수집 및 이용 동의", required: true, content: "수집하는 개인정보의 항목: 이름, 이메일, 비밀번호..." },
    { id: "term3", label: "만 14세 이상입니다", required: true, content: "본 서비스는 만 14세 이상만 이용 가능합니다..." },
    { id: "term4", label: "마케팅 정보 수신 동의", required: false, content: "이벤트 및 혜택 정보를 이메일로 받아보시겠습니까?..." },
];

export default function TermsAgreement() {
    const router = useRouter();

    // 상태 관리
    const [agreements, setAgreements] = useState<AgreementsState>(
        TERM_LIST.reduce((acc, term) => ({ ...acc, [term.id]: false }), {})
    );

    const [expanded, setExpanded] = useState<AgreementsState>(
        TERM_LIST.reduce((acc, term) => ({ ...acc, [term.id]: false }), {})
    );

    const isAllChecked = Object.values(agreements).every((val) => val === true);
    const isNextEnabled = TERM_LIST.filter((term) => term.required).every((term) => agreements[term.id]);
    const user = useAuthStore((state) => state.user);
    
    // 전체 동의
    const handleAllCheck = () => {
        const nextState = !isAllChecked;
        const newAgreements: AgreementsState = {};
        TERM_LIST.forEach((term) => {
            newAgreements[term.id] = nextState;
        });
        setAgreements(newAgreements);
    };

    // 개별 체크
    const handleSingleCheck = (id: string) => {
        setAgreements((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // 약관 토글
    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // 다음 버튼 핸들러
    const handleNext = () => {
        if (user?.data?.loginType === "GOOGLE" && !user?.data?.isOnboadingComplete) {
            router.push("/onboarding/step1");
            return;
        } else {
            router.push("/regist/form");
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">

            {/* 
                Brand Header: Static Position & Look 
                Same absolute positioning as Login/Regist pages
            */}
            <div
                className="absolute left-1/2 top-1/2 z-20"
                style={{ transform: 'translate(-50%, calc(-50% - 280px)) scale(0.35)' }}
            >
                <div className="relative w-[600px] h-[600px]">
                    <div className="absolute inset-0 z-10 static-chr-lit">
                        <Image
                            src="/withy/Withy_chr.png"
                            alt="Withy Character"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 z-20 static-red-neon ml-4">
                        <Image
                            src="/withy/Withy_logo.png"
                            alt="Withy Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <div className="mt-[-40px] z-30 white-neon-glow flex justify-center">
                    <p className="text-white text-3xl font-black tracking-[0.25em] uppercase italic">
                        Watch with WITHY
                    </p>
                </div>
            </div>

            {/* Terms Content Box */}
            <div className="relative z-10 w-full max-w-md mt-[200]"> {/* Increased margin to mt-64 to show character */}
                <motion.div
                    className="bg-transparent p-6 pt-0 w-full relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl text-white font-bold mb-2">이용약관 동의</h1>
                        <p className="text-sm text-zinc-400">WITHY 서비스 이용을 위해 약관에 동의해주세요</p>
                    </div>

                    {/* --- 전체 동의하기 --- */}
                    <div
                        className="flex items-start gap-3 p-4 mb-6 cursor-pointer bg-zinc-900/50 border border-zinc-700 hover:border-red-600 rounded-xl transition-all shadow-sm group"
                        onClick={handleAllCheck}
                    >
                        <div className={`mt-0.5 w-6 h-6 min-w-[24px] rounded-full border-2 flex items-center justify-center transition-all ${isAllChecked ? "bg-red-600 border-red-600" : "bg-transparent border-zinc-500 group-hover:border-red-500"}`}>
                            {isAllChecked && <CheckIcon color="white" size={16} />}
                        </div>
                        <div>
                            <p className="text-white font-bold text-lg leading-none mb-2 group-hover:text-red-500 transition-colors">전체 동의하기</p>
                            <p className="text-xs text-zinc-400 leading-snug">
                                선택항목을 포함한 모든 약관에 동의합니다.
                            </p>
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="w-full h-px bg-zinc-800 mb-6"></div>

                    {/* --- 개별 약관 리스트 --- */}
                    <div className="space-y-3">
                        {TERM_LIST.map((term) => (
                            <div key={term.id} className="relative">
                                <div className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-zinc-900/30">
                                    {/* 체크박스 + 텍스트 */}
                                    <div
                                        className="flex items-center gap-3 cursor-pointer flex-1 group"
                                        onClick={() => handleSingleCheck(term.id)}
                                    >
                                        {/* 체크박스 UI */}
                                        <div className={`w-5 h-5 min-w-[20px] rounded border flex items-center justify-center transition-all ${agreements[term.id] ? "bg-red-600 border-red-600" : "bg-transparent border-zinc-600 group-hover:border-zinc-400"}`}>
                                            {agreements[term.id] && <CheckIcon size={14} color="white" />}
                                        </div>

                                        {/* 텍스트 UI */}
                                        <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                                            <span className={term.required ? "text-red-500 font-bold" : "text-zinc-500 font-medium"}>
                                                {term.required ? "[필수] " : "[선택] "}
                                            </span>
                                            {term.label}
                                        </span>
                                    </div>

                                    {/* 펼치기 버튼 */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleExpand(term.id);
                                        }}
                                        className="p-1 px-2 text-zinc-500 hover:text-white transition-colors"
                                    >
                                        <ChevronIcon isExpanded={expanded[term.id] || false} />
                                    </button>
                                </div>

                                {/* 펼쳐지는 내용 */}
                                {expanded[term.id] && (
                                    <div className="mt-1 ml-9 p-3 bg-zinc-900/80 rounded-lg text-xs text-zinc-400 leading-relaxed break-keep border border-zinc-800">
                                        {term.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* --- 다음 버튼 --- */}
                    <div className="mt-8">
                        <NextButton
                            onClick={handleNext}
                            text="다음"
                            className={`w-full py-4 text-base font-bold rounded-xl transition-all shadow-lg ${isNextEnabled
                                ? "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.3)] border"
                                : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
                                }`}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

interface IconProps {
    size?: number;
    color?: string;
}

function CheckIcon({ size = 16, color = "currentColor" }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

interface ChevronIconProps {
    isExpanded: boolean;
}

function ChevronIcon({ isExpanded }: ChevronIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );
}