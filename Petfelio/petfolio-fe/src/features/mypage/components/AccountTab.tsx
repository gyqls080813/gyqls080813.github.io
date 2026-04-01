import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@/features/auth/api/logout';
import { changePassword, changeNickname, withdrawAccount } from '@/features/user/api/userProfile';
import { useUser } from '@/features/user/context/UserContext';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';

import account6Img from '@/shared/components/ui/account/account_boy.png';
import account7Img from '@/shared/components/ui/account/account_girl.png';
import logoutImg from '@/shared/components/ui/account/account_boy2.png';
import trashImg from '@/shared/components/ui/account/account_girl2.png';

type Modal = 'none' | 'password' | 'nickname';

export function AccountTab() {
  const router = useRouter();
  const { user, refreshUser } = useUser();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<Modal>('none');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
    // ⚠️ 보안: 로그아웃 시 모든 React Query 캐시 초기화
    // → 이전 사용자의 데이터가 다음 로그인 사용자에게 노출되지 않도록
    queryClient.clear();
    router.replace('/login');
  };

  const handleChangePassword = async () => {
    if (!currentPw || !newPw) { setMsg('모든 필드를 입력해주세요.'); return; }
    setLoading(true);
    try {
      await changePassword(currentPw, newPw);
      setMsg('비밀번호가 변경되었습니다.');
      setTimeout(() => { setModal('none'); setMsg(''); setCurrentPw(''); setNewPw(''); }, 1200);
    } catch {
      setMsg('비밀번호 변경에 실패했습니다.');
    } finally { setLoading(false); }
  };

  const handleChangeNickname = async () => {
    if (!newNickname) { setMsg('닉네임을 입력해주세요.'); return; }
    setLoading(true);
    try {
      await changeNickname(newNickname);
      await refreshUser();
      setMsg('닉네임이 변경되었습니다.');
      setTimeout(() => { setModal('none'); setMsg(''); setNewNickname(''); }, 1200);
    } catch {
      setMsg('닉네임 변경에 실패했습니다.');
    } finally { setLoading(false); }
  };

  const inputCls = "w-full px-4 py-3 text-[14px] outline-none rounded-xl font-[inherit] bg-[var(--color-pet-bg,#faf9f7)] border border-[var(--color-pet-border,#ede9e3)]";

  const menuItems: { id: string; label: string; icon: StaticImageData; danger?: boolean; onClick: () => void }[] = [
    {
      id: 'nickname', label: '닉네임 변경',
      icon: account6Img,
      onClick: () => { setModal('nickname'); setNewNickname(user?.nickname || ''); },
    },
    {
      id: 'password', label: '비밀번호 변경',
      icon: account7Img,
      onClick: () => setModal('password'),
    },
    {
      id: 'logout', label: '로그아웃',
      icon: logoutImg,
      onClick: handleLogout,
    },
    {
      id: 'withdraw', label: '회원 탈퇴', danger: true,
      icon: trashImg,
      onClick: async () => {
        if (!confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
        try {
          await withdrawAccount();
          queryClient.clear(); // 캐시 초기화
          localStorage.removeItem('accessToken');
          router.replace('/login');
        } catch {
          alert('회원 탈퇴에 실패했습니다.');
        }
      },
    },
  ];

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'var(--color-pet-surface, #fff)',
          border: '1px solid var(--color-pet-border, #ede9e3)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        {menuItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="w-full flex items-center gap-3 px-5 py-4 text-left border-none bg-transparent cursor-pointer font-[inherit] transition-all duration-150"
            style={{
              borderBottom: idx < menuItems.length - 1 ? '1px solid var(--color-pet-border, #ede9e3)' : 'none',
              color: item.danger ? 'var(--color-pet-red, #e05c4a)' : 'var(--color-pet-text-dark, #1c1a16)',
            }}
          >
            <span
              className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
            >
              <Image src={item.icon} alt="" width={40} height={40} className="object-contain" />
            </span>
            <span
              className="flex-1 text-[0.9em] font-semibold"
              style={{ color: item.danger ? 'var(--color-pet-red, #e05c4a)' : 'var(--color-pet-text-dark, #1c1a16)' }}
            >
              {item.label}
            </span>
            <span
              className="text-[0.9em] flex-shrink-0"
              style={{ color: item.danger ? 'var(--color-pet-red, #e05c4a)' : 'var(--color-pet-text-muted, #b0a090)', opacity: 0.7 }}
            >
              ›
            </span>
          </button>
        ))}
      </div>

      {/* ─── 모달 ─── */}
      {modal !== 'none' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.35)' }}
          onClick={() => { setModal('none'); setMsg(''); }}
        >
          <div
            className="w-[340px] rounded-2xl p-6 flex flex-col gap-3"
            style={{ background: 'var(--color-pet-surface, #fff)', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Paragraph typography="t4" fontWeight="bold">
              <Paragraph.Text>{modal === 'password' ? '비밀번호 변경' : '닉네임 변경'}</Paragraph.Text>
            </Paragraph>

            {modal === 'password' && (
              <>
                <input type="password" placeholder="현재 비밀번호" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} className={inputCls} />
                <input type="password" placeholder="새 비밀번호" value={newPw} onChange={(e) => setNewPw(e.target.value)} className={inputCls} />
              </>
            )}

            {modal === 'nickname' && (
              <input type="text" placeholder="새 닉네임" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} className={inputCls} />
            )}

            {msg && (
              <Paragraph typography="t7" color={msg.includes('변경되었') ? '#16a34a' : '#dc2626'}>
                <Paragraph.Text>{msg}</Paragraph.Text>
              </Paragraph>
            )}

            <div className="flex gap-2 mt-1">
              <Button display="block" size="large" color="dark" variant="weak" onClick={() => { setModal('none'); setMsg(''); }}>
                취소
              </Button>
              <Button display="block" size="large" color="primary" loading={loading}
                onClick={modal === 'password' ? handleChangePassword : handleChangeNickname}>
                변경
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
