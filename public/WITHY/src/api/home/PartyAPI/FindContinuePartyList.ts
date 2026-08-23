import { axiosInstance } from "../../axiosInstance";

export interface ContinueParty {
  id: number;               // 파티 고유 식별자
  title: string;            // 파티 제목
  platform: string;         // OTT 플랫폼 (NETFLIX, YOUTUBE 등)
  currentParticipants: number; // 현재 참여 인원
  maxParticipants: number;     // 최대 참여 가능 인원
  isActive: boolean;        // 현재 활성화 여부
  hostNickname: string;     // 호스트 닉네임
  hostprofile: string;      // 호스트 프로필 이미지 주소
  progressTime: number;     // 현재 콘텐츠 재생 진행 시간 (초 단위)
  activateTime: string;     // 파티 시작/활성화 시각
  isPrivate: boolean;       // 비공개 여부
}

export const fetchContinuePartyList = async () => {
  // 이어보기 API 엔드포인트 호출 (최대 3개 반환)
  // 🎯 명세서의 성공 응답 바디 구조 { data: [...] } 에 맞춰 파싱합니다.
  const response = await axiosInstance.get<{ data: ContinueParty[] }>("/api/v1/parties/recommend/continue");
  return response.data.data;
};