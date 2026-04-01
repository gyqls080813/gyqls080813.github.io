// 카테고리 아이템 하나에 대한 타입 정의
export interface CategoryItem {
  id: string;
  name: string;
}

// 전체 카테고리 구조에 대한 타입 정의
export interface CategoryCodes {
  YOUTUBE: CategoryItem[];
  OTT: {
    SPECIAL: CategoryItem[];
    MOVIE: CategoryItem[];
    TV: CategoryItem[];
  };
}

export const CATEGORY_CODES: CategoryCodes = {
  YOUTUBE: [
    { id: '24', name: '엔터테인먼트' },
    { id: '20', name: '게임' },
    { id: '10', name: '음악' },
    { id: '1', name: '영화/애니메이션' },
    { id: '17', name: '스포츠' },
    { id: '22', name: '인물/브이로그' },
    { id: '23', name: '코미디' },
    { id: '25', name: '뉴스/정치' },
    { id: '27', name: '교육' },
    { id: '28', name: '과학기술' },
    { id: '26', name: '노하우/스타일' },
    { id: '15', name: '반려동물/동물' },
    { id: '19', name: '여행/이벤트' },
    { id: '2', name: '자동차/교통' },
  ],
  OTT: {
    SPECIAL: [
      { id: 'KO', name: '한국 영화' },
      { id: 'FOREIGN', name: '외국 영화' },
    ],
    MOVIE: [
      { id: '10751', name: '가족' },
      { id: '16', name: '애니메이션' },
      { id: '35', name: '코미디' },
      { id: '10402', name: '음악' },
      { id: '28', name: '액션' },
      { id: '878', name: 'SF' },
      { id: '14', name: '판타지' },
      { id: '10749', name: '로맨스' },
      { id: '53', name: '스릴러' },
      { id: '27', name: '공포' },
      { id: '80', name: '범죄' },
      { id: '18', name: '드라마' },
      { id: '99', name: '다큐멘터리' },
      { id: '12', name: '어드벤처' },
      { id: '36', name: '역사' },
      { id: '37', name: '서부' },
      { id: '9648', name: '미스터리' },
      { id: '10752', name: '전쟁' },
      { id: '10770', name: 'TV 영화' },
    ],
    TV: [
      { id: '10764', name: '리얼리티' },
      { id: '35', name: '코미디' },
      { id: '16', name: '애니메이션' },
      { id: '10762', name: '키즈' },
      { id: '10751', name: '가족' },
      { id: '10759', name: '액션 & 어드벤처' },
      { id: '10765', name: 'SF & 판타지' },
      { id: '10767', name: '토크쇼' },
      { id: '9648', name: '미스터리' },
      { id: '80', name: '범죄' },
      { id: '37', name: '서부' },
      { id: '18', name: '드라마' },
      { id: '10766', name: '연속극' },
      { id: '99', name: '다큐멘터리' },
      { id: '10768', name: '전쟁 & 정치' },
      { id: '10763', name: '뉴스' },
    ],
  },
};