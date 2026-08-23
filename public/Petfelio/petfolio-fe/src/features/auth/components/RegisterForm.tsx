import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';
import { signup } from '@/features/auth/api/signup';
import { login } from '@/features/auth/api/login';
import { sendEmailCode, verifyEmailCode } from '@/features/auth/api/emailVerification';
import { setAccessToken } from '@/api/tokenManager';
import { ApiError } from '@/api/request';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import checkedAnimation from '@/shared/components/lottle/Checked.json';
import {
  validateEmail, validatePassword, validateName, validateNickname,
} from '@/features/auth/utils/validation';

type FieldErrors = Record<string, string>;

const inputClassName = (hasError = false) =>
  `w-full px-4 py-3.5 text-[15px] outline-none rounded-[14px] text-[var(--color-pet-text-primary)] transition-all duration-200 font-[inherit] box-border ${
    hasError
      ? 'bg-[#fef8f8] border-[1.5px] border-[#dc2626]'
      : 'bg-[var(--color-pet-input-bg)] border-[1.5px] border-transparent'
  }`;

export const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [regForm, setRegForm] = useState({
    name: '', nickname: '', email: '', password: '', confirmPw: '', verifyCode: '',
  });
  const [regLoading, setRegLoading] = useState(false);
  const [regErrors, setRegErrors] = useState<FieldErrors>({});
  const [regGeneral, setRegGeneral] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // 이메일 인증 상태
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');

  const updateReg = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegForm(prev => ({ ...prev, [key]: e.target.value }));
    setRegErrors(prev => { const next = { ...prev }; delete next[key]; return next; });
    setRegGeneral('');
  };

  /** 이메일 인증 코드 발송 */
  const handleSendCode = async () => {
    const emailErr = validateEmail(regForm.email);
    if (emailErr) {
      setRegErrors(prev => ({ ...prev, email: emailErr }));
      return;
    }
    setEmailSending(true);
    setEmailMsg('');
    try {
      await sendEmailCode(regForm.email);
      setEmailSent(true);
      setEmailMsg('인증 코드가 발송되었습니다.');
    } catch (err) {
      if (err instanceof ApiError) {
        setEmailMsg(err.message || '인증 코드 발송에 실패했습니다.');
      } else {
        setEmailMsg('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setEmailSending(false);
    }
  };

  /** 이메일 인증 코드 검증 */
  const handleVerifyCode = async () => {
    if (!regForm.verifyCode) {
      setEmailMsg('인증 코드를 입력해주세요.');
      return;
    }
    setEmailVerifying(true);
    setEmailMsg('');
    try {
      await verifyEmailCode(regForm.email, regForm.verifyCode);
      setEmailVerified(true);
      setEmailMsg('이메일 인증이 완료되었습니다!');
    } catch (err) {
      if (err instanceof ApiError) {
        setEmailMsg(err.message || '인증 코드가 올바르지 않습니다.');
      } else {
        setEmailMsg('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setEmailVerifying(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegGeneral('');
    const errors: FieldErrors = {};
    const nameErr = validateName(regForm.name);
    if (nameErr) errors.name = nameErr;
    const nicknameErr = validateNickname(regForm.nickname);
    if (nicknameErr) errors.nickname = nicknameErr;
    const emailErr = validateEmail(regForm.email);
    if (emailErr) errors.email = emailErr;
    if (!emailVerified) errors.email = '이메일 인증을 완료해주세요.';
    const pwErr = validatePassword(regForm.password);
    if (pwErr) errors.password = pwErr;
    if (!regForm.confirmPw) errors.confirmPw = '비밀번호 확인을 입력해주세요.';
    else if (regForm.password !== regForm.confirmPw) errors.confirmPw = '비밀번호가 일치하지 않습니다.';
    setRegErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setRegLoading(true);
    try {
      const res = await signup({
        name: regForm.name, nickname: regForm.nickname,
        email: regForm.email, password: regForm.password,
      });
      if (res.data?.accessToken) {
        setAccessToken(res.data.accessToken);
      }
      setShowSuccess(true);
      setTimeout(() => router.replace('/onboarding'), 1800);
    } catch (err) {
      if (err instanceof ApiError) {
        setRegGeneral(err.getDataMessage() || err.message || '회원가입에 실패했습니다.');
      } else {
        setRegGeneral('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setRegLoading(false);
    }
  };

  const regFields = [
    { key: 'name', placeholder: '이름', type: 'text' },
    { key: 'nickname', placeholder: '닉네임', type: 'text' },
    { key: 'password', placeholder: '비밀번호 (8~20자, 영문+숫자+특수문자 중 2가지)', type: 'password' },
    { key: 'confirmPw', placeholder: '비밀번호 확인', type: 'password' },
  ];

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <Lottie animationData={checkedAnimation} loop={false} autoplay renderer={"canvas" as any}
          style={{ width: 140, height: 140, marginBottom: '16px' }} />
        <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
          <Paragraph.Text>가입 완료!</Paragraph.Text>
        </Paragraph>
        <Paragraph typography="t5" color="var(--color-pet-text-warm)" textAlign="center">
          <Paragraph.Text>Petfolio에 오신 것을 환영합니다</Paragraph.Text>
        </Paragraph>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister} noValidate className="flex flex-col gap-1">
      {/* 이메일 인증 영역 (맨 위) */}
      <div className="mb-2">
        <div className="flex gap-2">
          <input type="text"
            value={regForm.email}
            onChange={updateReg('email')}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendCode(); } }}
            placeholder="이메일"
            className={inputClassName(!!regErrors.email)}
            disabled={emailVerified}
            style={{ flex: 1 }}
          />
          <Button size="large" color={emailVerified ? 'primary' : 'primary'}
            variant={emailVerified ? 'fill' : 'weak'}
            loading={emailSending}
            disabled={emailVerified}
            onClick={handleSendCode}
            htmlStyle={{ flexShrink: 0, minWidth: '5em' }}>
            {emailVerified ? '인증완료' : emailSent ? '재발송' : '인증'}
          </Button>
        </div>
        {regErrors.email && (
          <Paragraph typography="t7" color="#dc2626" textAlign="center" style={{ marginTop: '4px' }}>
            <Paragraph.Text>{regErrors.email}</Paragraph.Text>
          </Paragraph>
        )}
      </div>

      {/* 인증 코드 입력 */}
      {emailSent && !emailVerified && (
        <div className="mb-2">
          <div className="flex gap-2">
            <input type="text"
              value={regForm.verifyCode}
              onChange={updateReg('verifyCode')}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleVerifyCode(); } }}
              placeholder="인증 코드 6자리"
              maxLength={6}
              className={inputClassName(false)}
              style={{ flex: 1 }}
            />
            <Button size="large" color="primary"
              loading={emailVerifying}
              onClick={handleVerifyCode}
              htmlStyle={{ flexShrink: 0, minWidth: '5em' }}>
              확인
            </Button>
          </div>
        </div>
      )}

      {/* 이메일 인증 메시지 */}
      {emailMsg && (
        <Paragraph typography="t7"
          color={emailVerified ? '#16a34a' : '#dc2626'}
          textAlign="center"
          style={{ marginBottom: '4px' }}>
          <Paragraph.Text>{emailMsg}</Paragraph.Text>
        </Paragraph>
      )}

      {regFields.map((f) => (
        <div key={f.key} className="mb-2">
          <input type={f.type}
            value={regForm[f.key as keyof typeof regForm]}
            onChange={updateReg(f.key)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleRegister(e as unknown as React.FormEvent); } }}
            placeholder={f.placeholder}
            className={inputClassName(!!regErrors[f.key])}
          />
          {regErrors[f.key] && (
            <Paragraph typography="t7" color="#dc2626" style={{ marginTop: '4px', paddingLeft: '4px' }}>
              <Paragraph.Text>{regErrors[f.key]}</Paragraph.Text>
            </Paragraph>
          )}
        </div>
      ))}

      {regGeneral && (
        <Paragraph typography="t7" color="#dc2626" textAlign="center" style={{ padding: '8px 0' }}>
          <Paragraph.Text>{regGeneral}</Paragraph.Text>
        </Paragraph>
      )}
      <Button display="block" size="xlarge" color="primary" loading={regLoading} type="submit"
        onClick={() => handleRegister({ preventDefault: () => {} } as React.FormEvent)}>
        가입하기
      </Button>
    </form>
  );
};

export default RegisterForm;
