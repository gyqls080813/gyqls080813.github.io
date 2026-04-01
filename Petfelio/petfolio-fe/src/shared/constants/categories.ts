import feedImg from '@/shared/components/ui/category/dog_feed.png';
import boneImg from '@/shared/components/ui/category/dog_bone.png';
import hospitalImg from '@/shared/components/ui/category/dog_hospital.png';
import cutImg from '@/shared/components/ui/category/dog_cut.png';
import toyImg from '@/shared/components/ui/category/dog_toy.png';
import suppliesImg from '@/shared/components/ui/category/dog_supplies.png';
import petsiterImg from '@/shared/components/ui/category/dog_petsiter.png';
import etcImg from '@/shared/components/ui/category/account_with_dog.png';

// 고양이 아이콘 추가
import catFeedImg from '@/shared/components/ui/category/cat_feed.png';
import catBoneImg from '@/shared/components/ui/category/cat_bone.png';
import catHospitalImg from '@/shared/components/ui/category/cat_hospital.png';
import catCutImg from '@/shared/components/ui/category/cat_cut.png';
import catToyImg from '@/shared/components/ui/category/cat_toy.png';
import catSuppliesImg from '@/shared/components/ui/category/cat_supplies.png';
import catPetsiterImg from '@/shared/components/ui/category/cat_petsiter.png';
import catEtcImg from '@/shared/components/ui/category/cat_box.png';

import type { StaticImageData } from 'next/image';

export const CATEGORY_COLORS: Record<string, string> = {
  '사료': '#8B7355',
  '병원': '#c0564e',
  '간식': '#6B8E6B',
  '미용': '#B8860B',
  '장난감': '#5B7DB1',
  '용품': '#7B68A0',
  '펫시터': '#D4845A',
  '기타': '#888888',
  '음식': '#8B7355',
  '식사': '#8B7355',
};

export const CATEGORY_EMOJIS: Record<string, string> = {
  '사료': '🍖',
  '간식': '🦴',
  '병원': '🏥',
  '병원비': '🏥',
  '미용': '✂️',
  '장난감': '🧸',
  '용품': '🧹',
  '펫시터': '🧑‍⚕️',
  '기타': '📦',
  '카페': '☕',
};

export const CATEGORY_BGS: Record<string, string> = {
  '사료': '#fdf2e9',
  '간식': '#eaf5ea',
  '병원': '#fce4e4',
  '미용': '#fdf8e8',
  '장난감': '#ebf0f7',
  '용품': '#f0ecf5',
  '펫시터': '#fef0e8',
  '기타': '#f0f0f0',
};

/** 카테고리 → PNG 이미지 매핑 */
export const CATEGORY_IMAGES: Record<string, StaticImageData> = {
  '사료': feedImg,
  '간식': boneImg,
  '병원': hospitalImg,
  '미용': cutImg,
  '장난감': toyImg,
  '용품': suppliesImg,
  '펫시터': petsiterImg,
  '기타': etcImg,
};

export const CATEGORY_STICKERS: Record<string, string> = CATEGORY_EMOJIS;

/** 카테고리 → 이미지 src URL (categoryIcons prop 호환용) */
export const CATEGORY_IMAGE_URLS: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_IMAGES).map(([name, img]) => [name, img.src])
);

/** Full category metadata array */
export interface CategoryMeta {
  id: number;
  name: string;
  emoji: string;
  bg: string;
  color: string;
  image: StaticImageData; // 하위 호환성을 위해 유지 (dogImage와 동일하게 설정)
  dogImage: StaticImageData;
  catImage: StaticImageData;
}


export const CATEGORY_META: CategoryMeta[] = [
  { id: 1, name: '사료',   emoji: '🍖', bg: '#fdf2e9', color: '#8B7355', image: feedImg, dogImage: feedImg, catImage: catFeedImg },
  { id: 2, name: '간식',   emoji: '🦴', bg: '#eaf5ea', color: '#6B8E6B', image: boneImg, dogImage: boneImg, catImage: catBoneImg },
  { id: 3, name: '병원',   emoji: '🏥', bg: '#fce4e4', color: '#c0564e', image: hospitalImg, dogImage: hospitalImg, catImage: catHospitalImg },
  { id: 4, name: '미용',   emoji: '✂️', bg: '#fdf8e8', color: '#B8860B', image: cutImg, dogImage: cutImg, catImage: catCutImg },
  { id: 5, name: '장난감', emoji: '🧸', bg: '#ebf0f7', color: '#5B7DB1', image: toyImg, dogImage: toyImg, catImage: catToyImg },
  { id: 6, name: '용품',   emoji: '🧹', bg: '#f0ecf5', color: '#7B68A0', image: suppliesImg, dogImage: suppliesImg, catImage: catSuppliesImg },
  { id: 7, name: '펫시터', emoji: '🧑‍⚕️', bg: '#fef0e8', color: '#D4845A', image: petsiterImg, dogImage: petsiterImg, catImage: catPetsiterImg },
  { id: 8, name: '기타',   emoji: '📦', bg: '#f0f0f0', color: '#888888', image: etcImg, dogImage: etcImg, catImage: catEtcImg },
];


export const CATEGORY_LIST = CATEGORY_META.map(c => c.name);

export const PET_LIST: string[] = [];
