'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
// 컴포넌트
import NextButton from "@/components/common/NextButton/NextButton"

export default function Regist() {
    const router = useRouter();
    const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`

    // 다음 버튼 핸들러
    const handleRegist = () => {
        router.push("/regist/conditionsOfUse");
    };
    // 로그인 버튼 핸들러
    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">

            {/* 
                Brand Header: Static Position & Look 
                - Matching Login Page exact positioning
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

            {/* Regist Box */}
            <div className="relative z-10 w-full max-w-md mt-20">
                <motion.div
                    className="bg-transparent p-6 pt-0 w-full relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <NextButton
                        onClick={handleRegist}
                        text={
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5">
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                </svg>
                                이메일로 회원가입
                            </>
                        }
                        flickerOnClick={false}
                        className="bg-red-600 hover:bg-red-700 text-white border-none py-4 text-base font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)] rounded-2xl w-full"
                    />

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-zinc-800"></div>
                        <p className="flex flex-col items-center text-zinc-500 text-xs">또는</p>
                        <div className="flex-1 h-px bg-zinc-800"></div>
                    </div>

                    <NextButton
                        onClick={() => window.location.href = GOOGLE_LOGIN_URL}
                        type="button"
                        flickerOnClick={false}
                        text={
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                                </svg>
                                <span className="text-white group-hover:text-white">구글로 회원가입</span>
                            </>
                        }
                        className="bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 py-4 rounded-2xl w-full"
                    />

                    <div className="text-sm flex justify-center mt-6">
                        <p className="text-zinc-500">이미 계정이 있으신가요?
                            <button
                                onClick={(e) => {
                                    handleLogin
                                }}
                                className="font-bold text-red-500 hover:text-red-400 hover:underline cursor-pointer ml-1"
                            >
                                로그인
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
