import React from 'react';
import { useRouter } from 'next/router';

export const OnboardingHero: React.FC = () => (
  <div className="text-center text-white animate-[fadeIn_0.5s_ease-out]">
    <div className="w-12 h-12 rounded-[14px] mx-auto mb-3 flex items-center justify-center shadow-[0_4px_16px_rgba(76,217,100,0.3)]" style={{ background: 'linear-gradient(135deg, #4CD964 0%, #34C759 100%)' }}>
      <span className="text-[1.4em]">🐾</span>
    </div>
    <h1 className="text-[1.3em] font-bold m-0 mb-1.5 tracking-tight">
      Petfolio
    </h1>
    <p className="text-[0.8em] text-white/60 m-0">
      우리 반려동물의 모든 것
    </p>
  </div>
);

export const OnboardingContent: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">

      <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] animate-[slideUp_0.4s_ease-out]">
        <div className="flex justify-between items-center mb-3.5">
          <span className="text-[0.82em] font-semibold text-[var(--color-pet-text-secondary)]">이번 달 지출</span>
          <span className="text-[0.72em] text-[var(--color-pet-text-dim)] cursor-pointer">더보기 ›</span>
        </div>
        <div className="text-[1.8em] font-extrabold text-[var(--color-pet-text-dark)] tracking-tight">
          0<span className="text-[0.5em] font-semibold">원</span>
        </div>
        <div className="flex gap-4 mt-3.5">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#FF3B30]" />
            <span className="text-[0.75em] text-[var(--color-pet-text-secondary)]">지출 0원</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#4CD964]" />
            <span className="text-[0.75em] text-[var(--color-pet-text-secondary)]">수입 0원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingContent;
