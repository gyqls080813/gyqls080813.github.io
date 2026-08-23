"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteUserMutation } from '@/hooks/user/DeleteUser';
import { useAuthStore } from '@/store/useAuthStore';
import Image from "next/image";
import NextButton from "@/components/common/NextButton/NextButton";
export default function ProfileEditLanding() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user, setLogout } = useAuthStore();
    const { mutate: deleteUserMutate } = useDeleteUserMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        deleteUserMutate(
            {},
            {
                onSuccess: () => {
                    setLogout();
                    queryClient.clear();
                    router.push("/login");
                },
                onError: (err) => {
                    console.error("삭제 실패:", err);
                    alert("삭제 중 오류가 발생했습니다.");
                }
            }
        );
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">

            {/* 
                Brand Header: Static Position & Look 
                - Identical to Login/Regist for consistency
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

            {/* Menu Container */}
            <div className="relative z-10 w-full max-w-md px-6 mt-30">
                <div className="bg-transparent w-full relative">
                    <div className="flex flex-col justify-center items-center mb-10">
                        {/* Title removed or minimal - Button text explains function */}
                    </div>

                    <NextButton
                        text="프로필 / 닉네임 변경"
                        onClick={() => router.push("/mypage/profile/edit")}
                        className="bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-500 rounded-xl py-4 font-bold shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                    />

                    <div>
                        {user?.data?.loginType === "LOCAL" && (
                            <div className="my-6 flex items-center gap-4">
                                <div className="flex-1 h-px bg-zinc-800"></div>
                                <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                                <div className="flex-1 h-px bg-zinc-800"></div>
                            </div>
                        )}
                    </div>

                    <div>
                        {user?.data?.loginType === "LOCAL" && (
                            <NextButton
                                text="비밀번호 변경"
                                onClick={() => router.push("/mypage/profile/edit/password")}
                                className="bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-500 rounded-xl py-4 font-bold shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                            />
                        )}
                    </div>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-zinc-800"></div>
                        <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                        <div className="flex-1 h-px bg-zinc-800"></div>
                    </div>

                    <NextButton
                        text="계정 삭제"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 hover:border-red-500/50 py-4 rounded-xl"
                    />

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-zinc-800"></div>
                        <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                        <div className="flex-1 h-px bg-zinc-800"></div>
                    </div>

                    <NextButton
                        text="뒤로"
                        onClick={() => router.push("/mypage")}
                        className="bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-500 rounded-xl py-4 font-bold shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                    />
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.2)] w-80 text-center relative overflow-hidden">
                        {/* Red Glow Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

                        <h2 className="text-xl font-bold text-white mb-2">정말 탈퇴하시겠습니까?</h2>
                        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                            삭제된 데이터는 <span className="text-red-500 font-bold">복구할 수 없습니다.</span>
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-4 py-3 bg-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-700 transition font-bold text-sm"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition font-bold text-sm shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}