import { axiosInstance } from "../../axiosInstance";

/** * 🎯 [표준 규격] 모든 파티 리스트에서 공통으로 사용할 인터페이스 
 */
export interface GenreParty {
  id: number;               // 파티 고유 식별자
  title: string;            // 파티 제목
  platform: string;         // OTT 플랫폼 구분
  currentParticipants: number; // 현재 참여 인원
  maxParticipants: number;     // 최대 참여 가능 인원
  isActive: boolean;        // 현재 활성화 여부
  activateTime: string;     // 파티 시작/활성화 시각
  progressTime: number;     // 현재 콘텐츠 재생 진행 시간 (초 단위)
  hostNickname: string;     // 호스트 닉네임
  hostprofile: string;      // 호스트 프로필 이미지 주소
  isPrivate: boolean;       // 비공개 여부
}

/** * 🎯 팔로우한 장르별 묶음 데이터 구조 
 */
export interface FollowedGenreData {
  genre: {
    id: number;
    name: string;
    code: number;
    type: string;
  };
  parties: GenreParty[]; // 각 장르에 속한 파티 리스트 (최대 10개)
}

/**
 * 🚀 팔로우한 카테고리별 파티 리스트 조회
 */
export const fetchFollowedPartyList = async (): Promise<FollowedGenreData[]> => {
  const response = await axiosInstance.get<{ data: FollowedGenreData[] }>("/api/v1/parties/following");
  return response.data.data;
};