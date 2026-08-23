import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@/shared/components/lottle/GREEN DOG.json';

export const SplashContent: React.FC = () => (
  <div className="flex flex-col items-center gap-4 animate-[fadeIn_0.8s_ease-out]">
    <Lottie animationData={loadingAnimation} loop autoplay renderer={"canvas" as any}
      style={{ width: 300, height: 300 }} />
    <div className="text-center">
      <h1 className="text-[2.4em] font-extrabold m-0 tracking-tight text-[#3a2e22]">
        Petfolio
      </h1>
      <p className="text-[0.85em] text-[#a08c78] mt-1.5 tracking-[0.08em]">
        반려동물 가계부
      </p>
    </div>
  </div>
);

export default SplashContent;
