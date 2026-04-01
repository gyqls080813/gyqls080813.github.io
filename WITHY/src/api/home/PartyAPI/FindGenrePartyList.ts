import { axiosInstance } from "../../axiosInstance";

/**
 * 🎯 [표준 규격] 장르 탐색 및 검색에서 공용으로 사용하는 파티 인터페이스
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
 * 🎯 페이지네이션을 포함한 응답 규격
 */
export interface GenrePartyResponse {
  status: number;
  message: string;
  data: {
    parties: GenreParty[];
    totalPage: number;
    totalElements: number;
  };
}

/**
 * 🚀 장르별 파티 리스트 조회 (페이지네이션 적용)
 * @param platform 플랫폼 (NETFLIX, YOUTUBE 등)
 * @param genre 장르 (선택사항)
 * @param isActive 활성화 상태 필터 (true: LIVE만, false: 대기중만, undefined: 전체)
 * @param page 페이지 번호
 */
export const fetchGenrePartyList = async (
  platform: string,
  genre?: string,
  isActive?: boolean,
  page: number = 0
) => {
  const params: any = {
    platform,
    page,
    size: 20 // 🎯 요청하신 대로 한 페이지당 20개씩 가져옵니다.
  };

  if (genre && genre !== "ALL") {
    params.category = genre;
  }

  // 🆕 isActive 파라미터 추가
  if (isActive !== undefined) {
    params.isActive = isActive;
  }

  const response = await axiosInstance.get<GenrePartyResponse>("/api/v1/parties", {
    params
  });



  return response.data;
};