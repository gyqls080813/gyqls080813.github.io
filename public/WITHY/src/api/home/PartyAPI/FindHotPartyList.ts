import { axiosInstance } from "../../axiosInstance";

/**
 * 🎯 [표준 규격] 모든 파티 리스트에서 공통으로 사용할 인터페이스
 * FindGenrePartyList와 동일한 구조
 */
export interface GenreParty {
  id: number;               // 파티 고유 식별자
  title: string;            // 파티 제목
  platform: string;         // 플랫폼 (OTT, YOUTUBE 등)
  mediaType: string;        // 미디어 타입 (MOVIE, YOUTUBE 등)
  genreNames: string[];     // 장르 이름 배열
  currentParticipants: number; // 현재 참여 인원
  maxParticipants: number;     // 최대 참여 가능 인원
  isActive: boolean;        // 현재 활성화 여부
  isPrivate: boolean;       // 비공개 여부
  scheduledActiveTime: string; // 파티 시작/활성화 예정 시각
  currentPlaybackTime: number | null; // 현재 재생 진행 시간
  thumbnail: string;        // 썸네일 이미지 URL
  host: {                   // 호스트 정보
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
}

/**
 * 🎯 인기 카테고리 전용 데이터 구조 (장르별 묶음)
 */
export interface HotGenreGroup {
  genre: {
    id: number;
    name: string;
    code: number;
    type: string;
  };
  parties: GenreParty[]; // 인원순 상위 최대 10개
}

interface HotPartyResponse {
  status: number;
  message: string;
  data: HotGenreGroup[]; // 인기 카테고리 리스트 (최대 3개)
}

/**
 * 🚀 인기 카테고리별 파티 리스트 조회
 */
export const fetchHotPartyList = async () => {
  const response = await axiosInstance.get<HotPartyResponse>("/api/v1/parties/popular");
  return response.data;
};