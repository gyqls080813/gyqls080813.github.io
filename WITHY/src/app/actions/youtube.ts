'use server'



export interface YoutubeMetadata {
  success: boolean;
  contentTitle?: string;
  contentId?: string;
  error?: string;
}

export async function fetchYoutubeMetadataAction(url: string): Promise<YoutubeMetadata> {
  try {
    // 1. Video ID 추출 (정규표현식)
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[7].length === 11) ? match[7] : null;

    if (!videoId) {
      return { success: false, error: '유효한 유튜브 URL이 아닙니다.' };
    }

    // 2. oEmbed API 호출 (공식 엔드포인트 사용)
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl, {
      cache: 'no-store' // 항상 최신 데이터 확인
    });

    if (!response.ok) {
      return { success: false, error: '유효하지 않은 영상이거나 퍼가기가 제한된 영상입니다.' };
    }

    const data = await response.json();

    return {
      success: true,
      contentTitle: data.title, // oEmbed가 제공하는 정확한 제목
      contentId: videoId
    };
  } catch (error) {
    return { success: false, error: '유튜브 정보 확인 중 오류가 발생했습니다.' };
  }
}
