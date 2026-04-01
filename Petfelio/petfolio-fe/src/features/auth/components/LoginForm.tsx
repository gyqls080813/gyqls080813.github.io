import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { validateEmail, validatePassword } from '@/features/auth/utils/validation';
import { login } from '@/features/auth/api/login';
import { setAccessToken } from '@/api/tokenManager';
import { request, ApiError } from '@/api/request';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';

type FieldErrors = Record<string, string>;

const inputClassName = (hasError = false) =>
  `w-full px-4 py-3.5 text-[15px] outline-none rounded-[14px] text-[var(--color-pet-text-primary)] transition-all duration-200 font-[inherit] box-border ${
    hasError
      ? 'bg-[#fef8f8] border-[1.5px] border-[#dc2626]'
      : 'bg-[var(--color-pet-input-bg)] border-[1.5px] border-transparent'
  }`;

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    const errors: FieldErrors = {};
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;
    const pwErr = validatePassword(password);
    if (pwErr) errors.password = pwErr;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    try {
      const res = await login({ email, password });
      setAccessToken(res.data.accessToken);

      // 로그인 후 사용자 정보 조회 → groupId 유무로 분기
      try {
        const userRes = await request<{ status: number; data: { groupId?: number | null } }>(
          '/api/v1/users/me', 'GET'
        );
        if (userRes.data?.groupId) {
          await router.replace('/home');
        } else {
          await router.replace('/onboarding');
        }
      } catch {
        // 사용자 정보 조회 실패 시 기본적으로 홈으로
        await router.replace('/home');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setGeneralError(err.getDataMessage() || err.message || '로그인에 실패했습니다.');
      } else {
        setGeneralError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} noValidate className="flex flex-col gap-1">
      <div className="mb-2">
        <input type="text" value={email}
          onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => { const n = {...prev}; delete n.email; return n; }); setGeneralError(''); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleLogin(e as unknown as React.FormEvent); } }}
          placeholder="이메일" className={inputClassName(!!fieldErrors.email)}
        />
        {fieldErrors.email && (
          <Paragraph typography="t7" color="#dc2626" style={{ marginTop: '4px', paddingLeft: '4px' }}>
            <Paragraph.Text>{fieldErrors.email}</Paragraph.Text>
          </Paragraph>
        )}
      </div>
      <div className="mb-2">
        <input type="password" value={password}
          onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => { const n = {...prev}; delete n.password; return n; }); setGeneralError(''); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleLogin(e as unknown as React.FormEvent); } }}
          placeholder="비밀번호" className={inputClassName(!!fieldErrors.password)}
        />
        {fieldErrors.password && (
          <Paragraph typography="t7" color="#dc2626" style={{ marginTop: '4px', paddingLeft: '4px' }}>
            <Paragraph.Text>{fieldErrors.password}</Paragraph.Text>
          </Paragraph>
        )}
      </div>
      {generalError && (
        <Paragraph typography="t7" color="#dc2626" textAlign="center" style={{ padding: '8px 0' }}>
          <Paragraph.Text>{generalError}</Paragraph.Text>
        </Paragraph>
      )}
      <Button display="block" size="xlarge" color="primary" loading={isLoading} type="submit"
        onClick={() => handleLogin({ preventDefault: () => {} } as React.FormEvent)}>
        로그인
      </Button>
      <div className="text-center mt-2">
        <span className="text-sm text-[var(--color-pet-text-secondary)] cursor-pointer">비밀번호 찾기</span>
      </div>
    </form>
  );
};

export default LoginForm;
