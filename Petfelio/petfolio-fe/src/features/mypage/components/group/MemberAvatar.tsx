import React from 'react';
import Image from 'next/image';
import { MEMBER_PROFILES, DEFAULT_PROFILE, DEFAULT_PROFILES } from '@/shared/constants/memberProfiles';

interface MemberAvatarProps {
  imageUrl?: string;
  name: string;
  userId?: number;
}


const avatarStyle: React.CSSProperties = {
  width: '2.4em',
  height: '2.4em',
  borderRadius: '50%',
  background: 'var(--color-pet-badge-bg, #f0ece6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontSize: '1rem',
  color: 'var(--color-pet-text-muted, #b0a090)',
  overflow: 'hidden',
};
export function MemberAvatar({ imageUrl, name, userId }: MemberAvatarProps) {
  // 1. 하드코딩된 유저별 프로필 확인
  const hardcodedProfile = userId ? MEMBER_PROFILES[userId] : undefined;
  
  if (hardcodedProfile) {
    return (
      <div style={avatarStyle}>
        <Image src={hardcodedProfile} alt={name} width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  // 2. API에서 넘어온 imageUrl이 있으면 우선 사용
  if (imageUrl) {
    return (
      <div style={avatarStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  // 3. 없으면 userId 기반으로 디폴트 4종 중 하나를 순환하며 선택
  const fallbackProfile = userId ? DEFAULT_PROFILES[userId % DEFAULT_PROFILES.length] : DEFAULT_PROFILE;

  return (
    <div style={avatarStyle}>
      <Image src={fallbackProfile} alt={name} width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}



