export interface responseGetHistory {
  id: number;
  contentId: number;
  title: string;
  lastPosition: number;
  videoDuration: number;
  progress: number;
  thumbnailPath: string;
  endedAt: string;
  platform: string;
}

export interface HistoryApiResponse {
  status: number;
  message: string;
  data: responseGetHistory[];
}

export interface GetHistoryInput {
}

export const GETHISTORY_KEYS = {
  all: ['watch_history'] as const,
};