import { fetchNetflixMetadataAction, NetflixMetadata } from "@/app/actions/netflix";
import { fetchYoutubeMetadataAction, YoutubeMetadata } from "@/app/actions/youtube";

/**
 * 넷플릭스 URL 분석 및 메타데이터 반환
 */
export const getNetflixMetadata = async (url: string): Promise<NetflixMetadata> => {
  const result = await fetchNetflixMetadataAction(url);

  if (!result.success) {
    throw new Error(result.error || "넷플릭스 정보를 가져오지 못했습니다.");
  }

  return result;
};

/**
 * 유튜브 URL 분석 및 메타데이터 반환
 * 명세서 규격(contentTitle, contentId)을 따릅니다.
 */
export const getYoutubeMetadata = async (url: string): Promise<YoutubeMetadata> => {
  const result = await fetchYoutubeMetadataAction(url);

  if (!result.success) {
    // 서버 액션에서 반환한 구체적인 에러 메시지(예: '유효한 URL이 아닙니다')를 전달합니다.
    throw new Error(result.error || "유튜브 정보를 가져오지 못했습니다.");
  }

  return result;
};