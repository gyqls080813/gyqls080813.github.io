'use client';
import { useState } from 'react';
import { Mail, Lock, LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/hooks/auth/Logout';
import { useAuthStore } from '@/store/useAuthStore';
import { X, LogOut, AlertCircle } from 'lucide-react'

interface ProfileSectionProps {
    user: {
        nickname: string;
        email: string;
        profileImageUrl: string;
    };
}

export default function Profile({ user }: ProfileSectionProps) {
    const router = useRouter();
    const { refreshToken, setLogout } = useAuthStore();
    const { mutate: logoutMutate } = useLogoutMutation();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        logoutMutate(
            { refreshToken: refreshToken || "" },
            {
                onSuccess: () => {
                    setLogout();
                    router.push("/login");
                },
                onError: (err) => {
                    console.error("로그아웃 실패:", err);
                    alert("로그아웃 중 오류가 발생했습니다.");
                    setIsLogoutModalOpen(false);
                }
            }
        );
    };

    return (
        <section className="w-full bg-zinc-900 border border-zinc-800 rounded-[30px] p-6 lg:p-8 shadow-sm mb-12">
            <div className="flex flex-wrap items-end justify-center xl:justify-between gap-y-8 gap-x-6">
                <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10 shrink-0">
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800">
                            <img
                                src={user.profileImageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-zinc-400 ml-1">닉네임</label>
                            <div className="flex items-center gap-3 px-4 py-3 bg-black border border-zinc-800 rounded-xl w-[240px] text-white">
                                <span className="text-sm truncate font-medium">{user.nickname}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-zinc-400 ml-1">이메일</label>
                            <div className="flex items-center gap-3 px-4 py-3 bg-black border border-zinc-800 rounded-xl w-[240px] text-white">
                                <Mail size={18} className="text-zinc-500 shrink-0" />
                                <span className="text-sm truncate font-medium">{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 w-full xl:w-auto pb-1">
                    <button
                        onClick={() => router.push("/mypage/profile")}
                        className="flex items-center justify-center gap-2 px-4 py-[11px] bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold text-white transition-colors border border-zinc-700 whitespace-nowrap"
                    >
                        <Lock className="w-4 h-4" />
                        정보 수정
                    </button>

                    <button
                        onClick={() => router.push("/mypage/category")}
                        className="flex items-center justify-center gap-2 px-4 py-[11px] bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold text-white transition-colors border border-zinc-700 whitespace-nowrap"
                    >
                        <LayoutGrid className="w-4 h-4" />
                        내 카테고리
                    </button>

                    <button
                        onClick={handleLogoutClick}
                        className="flex items-center justify-center gap-2 px-4 py-[11px] bg-red-900/40 hover:bg-red-900/60 rounded-xl text-sm font-bold text-red-200 transition-colors border border-red-900/30 whitespace-nowrap"
                    >
                        로그아웃
                    </button>
                </div>

            </div>
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden border border-zinc-800 animate-in zoom-in-95 duration-300">

                        {/* Header */}
                        <div className="px-6 py-4 bg-zinc-800/50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-red-600 rounded-full" />
                                <h2 className="text-lg font-black text-white tracking-tight">알림</h2>
                            </div>
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="p-2 bg-zinc-700/50 rounded-xl text-zinc-400 hover:text-white transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                                <AlertCircle className="text-red-500" size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">로그아웃</h3>
                                <p className="text-zinc-400">정말 로그아웃 하시겠습니까?</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-black/20 flex gap-3">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="flex-1 py-4 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 rounded-[20px] font-bold transition-all"
                            >
                                취소
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="flex-1 py-4 bg-red-600 text-white hover:bg-red-700 rounded-[20px] font-bold shadow-lg transition-all"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}