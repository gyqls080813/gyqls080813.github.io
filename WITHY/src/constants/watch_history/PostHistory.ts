// 서버에서 받는 응답 데이터 타입
export interface responsePostHistory {
  status : number;
}


// 서버로 보내는 요청 데이터 타입 (아이디, 비번)
export interface PostHistoryInput {
  contentId: number;
  videoDuration: number;
  lastPosition: number;
  playTimeSeconds: number;
  endedAt: string;
  seasonNumber: number;
  episodeNumber: number;
  platform : string;
}

export const POSTHISTORY_KEYS = {
  all: ['watch_history'] as const,
};