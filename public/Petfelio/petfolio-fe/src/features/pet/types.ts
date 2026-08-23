export interface Pet {
  id: number;
  name: string;
  species: 'DOG' | 'CAT';
  breed: string;
  gender: 'MALE' | 'FEMALE';
  weight: number;
  imageUrl?: string;
  stickerUrl?: string;
}

/** 스티커 이미지 (카테고리별) */
export interface StickerImage {
  categoryId: number;
  imageUrl: string;
}

/** 스티커 카테고리 매핑 */
export const STICKER_CATEGORIES = {
  FOOD: 1,        // 사료
  TREATS: 2,      // 간식
  MEDICAL: 3,     // 병원
  GROOMING: 4,    // 미용
  TOYS: 5,        // 장난감
  SUPPLIES: 6,    // 용품
  PET_SITTER: 7,  // 펫시터
  OTHERS: 8,      // 기타
} as const;

export const STICKER_CATEGORY_LABELS: Record<number, string> = {
  1: '사료',
  2: '간식',
  3: '병원',
  4: '미용',
  5: '장난감',
  6: '용품',
  7: '펫시터',
  8: '기타',
};
