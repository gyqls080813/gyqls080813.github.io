import { axiosInstance } from "../axiosInstance";

// 1. 서버 응답 데이터의 타입을 정의합니다.
interface PlatformResponse {
  status: number;
  message: string;
  data: {
    types: string[]; // ["OTT", "YOUTUBE"]
  };
}

export const fetchPlatformTypes = async (): Promise<string[]> => {
  try {
    // Request Header에 Authorization은 axiosInstance의 interceptor가 자동으로 넣어줍니다.
    const response = await axiosInstance.get<PlatformResponse>("/api/v1/parties/platforms/types");

    // 성공 시 데이터(types 배열)만 반환합니다.
    return response.data.data.types;
  } catch (error) {
    console.error("플랫폼 정보를 읽어올 수 없습니다.", error);
    throw error;
  }
};