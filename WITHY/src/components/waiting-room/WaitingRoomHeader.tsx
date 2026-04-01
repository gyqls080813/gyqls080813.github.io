"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';

interface WaitingRoomHeaderProps {
    title: string;
    timeLeft?: string;
    isActive: boolean;
    isHost: boolean;
    onDelete: () => void;
}

export const WaitingRoomHeader: React.FC<WaitingRoomHeaderProps> = ({
    title,
    timeLeft,
    isActive,
    isHost,
    onDelete
}) => {
    return (
        <div className="absolute top-0 left-0 w-full z-10 p-8 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-between">
            {/* Left: Title */}
            <div className="flex items-start gap-4">
                <div className="text-white">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold drop-shadow-md">{title}</h1>
                    </div>
                    {/* Start time in red below title */}
                    {!isActive && timeLeft && (
                        <p className="text-red-500 text-xl font-bold mt-2 drop-shadow-md">
                            {timeLeft} 시작 예정
                        </p>
                    )}
                </div>
            </div>

            {/* Right: Status Badges */}
            <div className="flex items-center gap-3">
                {/* Delete Party Button (Host Only) */}
                {isHost && (
                    <button
                        onClick={onDelete}
                        className="flex items-center justify-center w-[34px] h-[34px] rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors"
                        title="파티 삭제"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}

                {/* Live/Waiting Badge */}
                <div className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wider uppercase shadow-sm
          ${isActive ? 'bg-red-600 text-white' : 'bg-neutral-600 text-white'}
        `}>
                    {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                    {isActive ? 'LIVE' : 'WAITING'}
                </div>
            </div>
        </div>
    );
};
