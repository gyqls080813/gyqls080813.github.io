/**
 * 카테고리별 디폴트 스티커 이미지 매핑
 * 스티커가 아직 생성되지 않은 경우 이 이미지를 fallback으로 사용
 */
import feedImg from '@/shared/components/ui/category/feed.png';
import boneImg from '@/shared/components/ui/category/bone.png';
import hospitalImg from '@/shared/components/ui/category/hospital.png';
import cutImg from '@/shared/components/ui/category/cut.png';
import toyImg from '@/shared/components/ui/category/toy.png';
import suppliesImg from '@/shared/components/ui/category/supplies.png';
import petsiterImg from '@/shared/components/ui/category/petsiter.png';
import etcImg from '@/shared/components/ui/category/etc.png';
import type { StaticImageData } from 'next/image';

const DEFAULT_IMAGES: Record<number, StaticImageData> = {
  1: feedImg,      // 사료
  2: boneImg,      // 간식
  3: hospitalImg,  // 병원
  4: cutImg,       // 미용
  5: toyImg,       // 장난감
  6: suppliesImg,  // 용품
  7: petsiterImg,  // 펫시터
  8: etcImg,       // 기타
};

/** 카테고리 ID로 디폴트 이미지 URL 반환 */
export function getDefaultStickerImage(categoryId: number): string | undefined {
  const img = DEFAULT_IMAGES[categoryId];
  return img?.src;
}
