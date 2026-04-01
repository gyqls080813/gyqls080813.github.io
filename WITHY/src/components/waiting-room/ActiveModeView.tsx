"use client";

import React from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';

interface ActiveModeViewProps {
    startUrl?: string;
}

export const ActiveModeView: React.FC<ActiveModeViewProps> = ({ startUrl }) => {
    const handleRejoin = () => {
        if (startUrl) {
            const event = new CustomEvent('WIDDY_OPEN_PARTY_TAB', {
                detail: { url: startUrl }
            });
            window.dispatchEvent(event);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black/60 backdrop-blur-md text-white p-6 z-20 animate-in fade-in duration-700">
            <div className="w-full max-w-2xl bg-neutral-900/80 border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-500">

                {/* Icon & Title */}
                <div className="flex flex-col items-center gap-6 mb-10">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                        <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                        잠시만요!
                    </h2>
                </div>

                {/* Divider with glow */}
                <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full opacity-50 mb-10" />

                {/* Content */}
                <div className="space-y-8 text-xl md:text-2xl font-bold text-gray-200 leading-relaxed">
                    <p>
                        현재 페이지를 <span className="text-red-500 underline underline-offset-8 decoration-4 decoration-red-500/50">나가야</span><br />
                        파티에서 완전히 퇴장됩니다.
                    </p>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mx-4">
                        <p className="text-base md:text-lg text-gray-400 font-medium mb-3">
                            파티 유지 중 다른 앱 실행 시
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <span className="px-4 py-2 bg-[#FF0000]/20 text-[#FF0000] rounded-lg border border-[#FF0000]/20 flex items-center gap-2">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                                </svg>
                                YouTube
                            </span>
                            <span className="px-4 py-2 bg-[#E50914]/20 text-[#E50914] rounded-lg border border-[#E50914]/20 flex items-center gap-2">
                                <span className="font-black text-lg leading-none">N</span>
                                Netflix
                            </span>
                        </div>
                        <p className="mt-4 text-red-400 font-bold">
                            원격 조작이 될 수 있으니 주의해주세요.
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={handleRejoin}
                        className="flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-xl transition-all shadow-2xl cursor-pointer"
                    >
                        <ExternalLink className="w-6 h-6" />
                        파티 다시 참여하기
                    </button>
                </div>
            </div>
        </div>
    );
};
