import { axiosInstance } from "../../axiosInstance";

/**
 * 🎯 [표준 규격] 호스트 정보 인터페이스
 */
export interface PartyHost {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

/**
 * 🎯 [표준 규격] 검색 결과 파티 인터페이스
 */
export interface SearchPartyData {
  id: number;
  title: string;
  platform: string;         // "OTT", "YOUTUBE" 등
  mediaType: string;        // "MOVIE" 등
  genreNames: string[];
  currentParticipants: number;
  maxParticipants: number;
  isActive: boolean;
  scheduledActiveTime: string; // 파티 시작/활성화 예정 시각
  currentPlaybackTime: number | null; // 초 단위, 없으면 null
  thumbnail: string | null;
  host: PartyHost;
  isPrivate: boolean; // 비공개 여부
}

/**
 * 🎯 [표준 규격] 카테고리 정보 인터페이스
 */
export interface SearchCategoryData {
  id: number;
  name: string;
  code: string;
  type: string; // "OTT" 등
}

/**
 * 🎯 검색 결과 응답 규격
 */
interface SearchResponse {
  status: number;
  message: string;
  data: {
    categories: SearchCategoryData[];
    parties: SearchPartyData[];
  };
}

/**
 * 🚀 통합 검색 API (SearchParty용)
 * @param keyword 검색어
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @param sort 정렬 기준
 */
export const fetchSearchPartyList = async (keyword: string, page: number = 0, size: number = 20, sort: string = "createdAt,desc") => {
  const response = await axiosInstance.get<SearchResponse>("/api/v1/parties/search", {
    params: {
      keyword,
      page,
      size,
      sort
    }
  });

  return response.data;
};