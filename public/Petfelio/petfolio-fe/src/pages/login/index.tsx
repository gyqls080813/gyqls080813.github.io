import React, { useState } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <div className="fixed inset-0 bg-[var(--color-pet-auth-bg)] flex flex-col items-center font-[Pretendard,'Noto_Sans_KR',-apple-system,sans-serif] overflow-auto">
      {/* 헤더 */}
      <div className="pt-[60px] pb-6 text-center">
        <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8, fontSize: '2em' }}>
          <Paragraph.Text>Petfolio</Paragraph.Text>
        </Paragraph>
        <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center">
          <Paragraph.Text>반려동물 가계부</Paragraph.Text>
        </Paragraph>
      </div>

      {/* 탭 전환 */}
      <div className="flex w-full max-w-[400px] px-6 mb-6">
        <Button display="block" size="large"
          color={tab === 'login' ? 'primary' : 'dark'}
          variant={tab === 'login' ? 'fill' : 'weak'}
          onClick={() => setTab('login')}
          htmlStyle={{ borderRadius: '14px 0 0 14px' }}>
          로그인
        </Button>
        <Button display="block" size="large"
          color={tab === 'register' ? 'primary' : 'dark'}
          variant={tab === 'register' ? 'fill' : 'weak'}
          onClick={() => setTab('register')}
          htmlStyle={{ borderRadius: '0 14px 14px 0' }}>
          회원가입
        </Button>
      </div>

      {/* 폼 */}
      <div className="w-full max-w-[400px] px-6 pb-12 flex flex-col gap-3">
        {tab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => ({ props: {} });