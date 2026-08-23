import React, { useRef } from 'react';
import Image from 'next/image';
import { useUser } from '@/features/user/context/UserContext';
import { uploadProfileImage, deleteProfileImage } from '@/features/user/api/userProfile';
import accountImg from '@/shared/components/ui/account/account_boy.png';

interface ProfileHeaderProps {
  profile: { nickname?: string; name?: string; email?: string; role?: string; groupName?: string; imageUrl?: string } | null;
  loading: boolean;
}

export function ProfileHeader({ profile, loading }: ProfileHeaderProps) {
  const { refreshUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      await uploadProfileImage(e.target.files[0]);
      await refreshUser();
    } catch (err) {
      console.error('[프로필 이미지 업로드 실패]', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProfileImage();
      await refreshUser();
    } catch (err) {
      console.error('[프로필 이미지 삭제 실패]', err);
    }
  };

  const hasImage = !loading && profile?.imageUrl;

  return (
    <div
      className="mx-4 mt-5 p-4 rounded-2xl flex items-center gap-4"
      style={{
        background: 'var(--color-pet-surface, #fff)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid var(--color-pet-border, #ede9e3)',
      }}
    >
      {/* 아바타 (클릭하면 사진 업로드) */}
      <div className="relative flex-shrink-0">
        <div
          className="w-14 h-14 rounded-full overflow-hidden cursor-pointer"
          style={{ background: 'var(--color-pet-caramel, #c2956a)' }}
          onClick={() => fileInputRef.current?.click()}
          title="프로필 사진 변경"
        >
          {hasImage ? (
            <img src={profile!.imageUrl!} alt="프로필" className="w-full h-full object-cover" />
          ) : (
            <Image src={accountImg} alt="기본 프로필" width={56} height={56} className="w-full h-full object-cover" />
          )}
        </div>
        {/* 사진 삭제 X 버튼 */}
        {hasImage && (
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
            className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white cursor-pointer p-0 shadow-sm transition-transform hover:scale-110"
            style={{ background: 'var(--color-pet-red, #e05c4a)' }}
            title="사진 삭제"
            type="button"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="2" y1="2" x2="10" y2="10" />
              <line x1="10" y1="2" x2="2" y2="10" />
            </svg>
          </button>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

      {/* 이름 / 이메일 / 역할 */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span
          className="text-[1.05em] font-extrabold truncate"
          style={{ color: 'var(--color-pet-text-dark, #1c1a16)' }}
        >
          {loading ? '로딩 중...' : (profile?.nickname || profile?.name || '사용자')}
        </span>
        <span
          className="text-[0.75em] truncate"
          style={{ color: 'var(--color-pet-text-secondary, #8c7d6e)' }}
        >
          {loading ? '...' : (profile?.email || '이메일 정보 없음')}
        </span>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {!loading && profile?.role === 'HOST' && (
            <span
              className="inline-flex items-center gap-1 text-[0.72em] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(218, 165, 32, 0.12)',
                color: '#c8960a',
              }}
            >
              <span>👑</span> 호스트
            </span>
          )}
          <span
            className="text-[0.78em]"
            style={{ color: 'var(--color-pet-text-muted, #b0a090)' }}
          >
            {loading ? '...' : (profile?.groupName || '등록된 그룹 없음')}
          </span>
        </div>
      </div>
    </div>
  );
}
