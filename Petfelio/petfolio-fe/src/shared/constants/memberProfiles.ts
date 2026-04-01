// 신규 프로필 이미지 추가
import boy2 from '@/shared/components/ui/account/account_boy2.png';
import boy3 from '@/shared/components/ui/account/account_boy3.png';
import girl2 from '@/shared/components/ui/account/account_girl2.png';
import girl3 from '@/shared/components/ui/account/account_girl3.png';


import type { StaticImageData } from 'next/image';

/**
 * 사용자 ID → 프로필 이미지 매핑
 * 그룹 구성원, 랭킹 등 모든 곳에서 동일한 이미지를 사용합니다.
 */
export const MEMBER_PROFILES: Record<number, StaticImageData> = {
  1: boy2,
  2: boy3,
  3: girl2,
  4: girl3,
  5: boy2,
  6: boy3,
};

/** 기본 프로필 이미지들 (순환하며 사용) */
export const DEFAULT_PROFILES = [boy2, girl2, boy3, girl3];

/** 기본 프로필 이미지 (매핑 없을 때) */
export const DEFAULT_PROFILE = boy2;


/** 순위 → 프로필 이미지 (랭킹용) */
export const RANK_PROFILES: Record<number, StaticImageData> = {
  1: boy2,
  2: boy3,
  3: girl2,
};

