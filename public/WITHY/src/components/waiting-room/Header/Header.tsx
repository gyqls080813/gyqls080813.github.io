'use client';

import React from 'react';
import { ArrowLeft, Clock, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WaitingRoomHeaderProps {
  title: string;
  category: string;
  platform: string;
  timeLeft: string;
  waitingCount: number;
}

export default function WaitingRoomHeader({
  title,
  category,
  platform,
  timeLeft,
  waitingCount
}: WaitingRoomHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* 좌측: 뒤로가기 및 제목 */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} // 브라우저 이전 기록으로 이동
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            aria-label="뒤로 가기"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-black">{title}</h1>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-md">대기 중</span>
            </div>
            <p className="text-xs text-gray-500">{platform} · {category}</p>
          </div>
        </div>

        {/* 우측: 대기 정보 배지 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
            <Clock size={18} className="text-orange-500" />
            <span className="text-sm font-bold text-orange-600">시작까지 {timeLeft}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-gray-600">
            <Users size={18} />
            <span className="text-sm font-bold">{waitingCount}명 대기 중</span>
          </div>
        </div>
      </div>
    </header>
  );
}