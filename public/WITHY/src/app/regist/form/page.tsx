"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

// 컴포넌트
import Condition from "@/components/common/Condition/Condition"
import NextButton from "@/components/common/NextButton/NextButton"
import Input from "@/components/common/Input/Input"
import PasswordToggle from "@/components/common/PasswordToggle/PasswordToggle";

// 훅
import { useRegistMutation } from "@/hooks/auth/Signup";
import { useCheckEmailMutation } from "@/hooks/user/CheckEmail";
import { useEmailAuthenticationMutation } from "@/hooks/user/EmailAuthentication";
import { useEmailVerifyMutation } from "@/hooks/user/EmailVerify";

export default function RegistForm() {

    const router = useRouter();
    // 상태 관리
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorVerify, setErrorVerify] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 버튼 상태 관리
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    // 조건 검사
    const isLengthValid = password.length >= 8;
    const isUpperValid = /[A-Z]/.test(password);
    const isSpecialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPasswordValid = isLengthValid && isUpperValid && isSpecialValid;
    // 훅 
    const { mutate: registMutate, isPending: isRegistPending } = useRegistMutation();
    const { mutate: checkMutate, isPending: isCheckPending } = useCheckEmailMutation();
    const { mutate: emailAuthMutate } = useEmailAuthenticationMutation();
    const { mutate: emailVerifyMutate } = useEmailVerifyMutation();

    // 다음 버튼 핸들러
    const handleNext = () => {
        setError("");
        if (!isCodeVerified) { setError("이메일 인증을 완료해주세요."); return; }
        if (!isPasswordValid) { setError("비밀번호 조건을 모두 충족해주세요."); return; }
        if (password !== confirmPassword) { setError("비밀번호가 일치하지 않습니다."); return; }

        registMutate(
            { email, password },
            {
                onSuccess: () => {
                    router.push("/onboarding/step1");
                },
                onError: (err) => {
                    setError("회원가입에 실패했습니다. 다시 시도해주세요.");
                    console.error(err);
                }
            }
        );
    };

    // 이메일 중복 / 인증 핸들러
    const handleEmailAuthentication = async () => {
        setErrorEmail("");
        if (!email) {
            setErrorEmail("이메일을 먼저 입력하세요");
            return;
        }
        if (!email.includes("@")) {
            setErrorEmail("올바른 이메일 주소를 입력해주세요.");
            return;
        }

        checkMutate(
            { email },
            {
                onSuccess: (res) => {
                    if (res.data.isDuplicate === false) {
                        setErrorEmail("사용 가능한 이메일입니다. 인증번호를 발송합니다...");

                        // 중복이 아닐 때만 인증번호 발송
                        emailAuthMutate(
                            { email },
                            {
                                onSuccess: () => {
                                    setIsEmailSent(true); // 활성화 상태로 변경
                                    setErrorEmail("인증번호 발송 완료");
                                },
                                onError: (err) => {
                                    setIsEmailSent(false);
                                    setErrorEmail("발송 실패");
                                    console.error(err);
                                }
                            }
                        );
                    } else {
                        setErrorEmail("이미 사용 중인 이메일입니다.");
                    }
                },
                onError: (err) => {
                    setErrorEmail("중복 체크 중 오류가 발생했습니다.");
                    console.error(err);
                }
            }
        );
    };

    // 이메일 인증 확인 핸들러
    const handleEmailVerify = async () => {
        setError("");

        if (!code) {
            setErrorVerify("인증 코드를 입력해주세요.");
            return;
        }

        emailVerifyMutate(
            { email, code },
            {
                onSuccess: () => {
                    setIsCodeVerified(true); // 활성화 상태로 변경
                    setErrorVerify("인증 성공!");
                },
                onError: (err) => {
                    setIsCodeVerified(false);
                    setErrorVerify("인증 실패");
                    console.error(err);
                }
            }
        );
    }

    return (
        <div className="relative flex max-h-screen flex-col items-center justify-center overflow-hidden bg-black">

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


            {/* Regist Form Box */}
            <div className="relative z-5 w-full max-w-md mt-64">
                <motion.div
                    className="bg-transparent p-10 pt-0 w-full relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    {/* 이메일 */}
                    <p className="text-sm text-white font-bold mb-1">이메일</p>
                    <div className="flex gap-2">
                        <Input
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl flex-1"
                        />
                        <NextButton
                            text={isCheckPending ? "처리 중..." : (isEmailSent ? "발송 완료" : "인증")}
                            onClick={handleEmailAuthentication}
                            className={`w-28 border font-bold rounded-xl transition-colors ${isEmailSent
                                ? "bg-red-600 border-red-600 text-white hover:bg-red-700"
                                : "bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
                                }`}
                        />
                    </div>
                    <div className="min-h-[20px] mb-1">
                        {errorEmail && (
                            <div className={`text-sm font-bold text-center ${isEmailSent ? "text-green-500" : "text-red-500"}    `}>
                                {errorEmail}
                            </div>
                        )}
                    </div>

                    {/* 인증 */}
                    <p className="text-sm text-white font-bold mb-1">인증번호</p>
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="인증번호 입력"
                            value={code}
                            autoComplete="false"
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl flex-1"
                        />
                        <NextButton
                            text={isCodeVerified ? "확인 완료" : "확인"}
                            onClick={handleEmailVerify}
                            className={`w-28 border font-bold rounded-xl transition-colors ${isCodeVerified
                                ? "bg-red-600 border-red-600 text-white hover:bg-red-700"
                                : "bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700"
                                }`}
                        />
                    </div>
                    <div className="min-h-[20px] mt-1">
                        {errorVerify && (
                            <div className={`text-sm font-bold text-center ${isCodeVerified ? "text-green-500" : "text-red-500"} `}>
                                {errorVerify}
                            </div>
                        )}
                    </div>

                    {/* 비밀번호 */}
                    <p className="text-sm text-white font-bold mb-1">비밀번호</p>
                    <div className="relative w-full">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="●●●●●●●●"
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="font-sans bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl [&::-ms-reveal]:hidden"
                        />
                        <PasswordToggle
                            isVisible={showPassword}
                            onToggle={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <div className="text-zinc-400">
                        <Condition newPassword={password} />
                    </div>

                    <div className="my-2"></div>

                    {/* 비밀번호 확인 */}
                    <p className="text-sm text-white font-bold mb-2">비밀번호 확인</p>
                    <div className="relative w-full">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="●●●●●●●●"
                            value={confirmPassword}
                            autoComplete="false"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="font-sans bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl [&::-ms-reveal]:hidden"
                        />
                        <PasswordToggle
                            isVisible={showConfirmPassword}
                            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </div>
                    {error && (
                        <div className="mt-1 text-red-500 text-sm font-bold text-center">
                            {error}
                        </div>
                    )}
                    <NextButton
                        text={isRegistPending ? "처리 중..." : "회원가입"}
                        onClick={handleNext}
                        type="submit"
                        className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 border py-4 text-base font-bold mt-1 w-full rounded-xl"
                    />
                </motion.div>
            </div>
        </div>
    );
}