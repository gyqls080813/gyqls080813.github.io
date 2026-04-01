'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto px-10 py-3 flex items-center gap-6">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => router.push('/home')}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          aria-label="뒤로 가기"
        >
          <ArrowLeft size={24} />
        </button>

        {/* 타이틀 영역 */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            내 활동 & 프로필
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            시청 기록 및 프로필 관리
          </p>
        </div>
      </div>
    </header>
  );
}