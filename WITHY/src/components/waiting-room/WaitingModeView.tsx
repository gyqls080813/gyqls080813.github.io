"use client";

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface WaitingModeViewProps {
    isHost: boolean;
    onActivate: () => void;
    isActivating: boolean;
}

export const WaitingModeView: React.FC<WaitingModeViewProps> = ({
    isHost,
    onActivate,
    isActivating
}) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <div className="absolute inset-0 w-full h-full">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/8QE3y-ws7ew?autoplay=1&mute=1&loop=1&playlist=8QE3y-ws7ew&controls=0&showinfo=0&modestbranding=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-cover"
                />
            </div>

            {/* Overlay for activation button */}
            <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-6 z-50">
                {isHost && (
                    <button
                        onClick={onActivate}
                        disabled={isActivating}
                        className="flex items-center gap-3 px-12 py-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-2xl font-bold text-2xl transition-all shadow-2xl cursor-pointer"
                    >
                        <ExternalLink className="w-7 h-7" />
                        {isActivating ? '활성화 중...' : '파티 시작하기'}
                    </button>
                )}
            </div>
        </div>
    );
};
