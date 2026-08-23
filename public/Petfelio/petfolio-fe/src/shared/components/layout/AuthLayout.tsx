import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  hero?: React.ReactNode;
  fullDark?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, hero, fullDark = false }) => {
  if (fullDark) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center font-[Pretendard,'Noto_Sans_KR',-apple-system,sans-serif] text-[var(--color-pet-text-dark)]"
        style={{ background: 'var(--color-pet-auth-bg-gradient, linear-gradient(160deg, #fdf6ee 0%, #f5ece0 40%, #efe4d6 100%))' }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col justify-center font-[Pretendard,'Noto_Sans_KR',-apple-system,sans-serif] overflow-auto bg-[var(--color-pet-layout-bg)]">
      {hero && (
        <div
          className="rounded-3xl px-7 pt-9 pb-7 mx-6 flex flex-col items-center relative overflow-hidden"
          style={{ background: 'var(--color-pet-auth-hero-bg, linear-gradient(160deg, #f5ece0 0%, #efe4d6 50%, #e8d9c8 100%))' }}
        >
          <div
            className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full"
            style={{ background: 'var(--color-pet-auth-circle, rgba(193, 154, 107, 0.1))' }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full"
            style={{ background: 'var(--color-pet-auth-circle-light, rgba(193, 154, 107, 0.06))' }}
          />
          {hero}
        </div>
      )}
      <div className="px-6 pb-8 relative z-[1]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
