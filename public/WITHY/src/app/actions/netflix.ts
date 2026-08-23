'use server'

import * as cheerio from 'cheerio';

export interface NetflixMetadata {
  success: boolean;
  contentTitle?: string; // 명세서 매핑: contentTitle
  contentId?: string;    // 명세서 매핑: contentId
  title?: string;        // 호환성: contentTitle alias
  videoId?: string;      // 호환성: contentId alias
  genres?: string[];
  rawHtml?: string;      // 디버깅용 원본 HTML
  finalUrl?: string;
  error?: string;
}

export async function fetchNetflixMetadataAction(watchUrl: string): Promise<NetflixMetadata> {
  try {
    const titleUrl = watchUrl.replace(/\/watch\/(\d+).*/, '/title/$1');

    const response = await fetch(titleUrl, {
      headers: {
        'Accept-Language': 'ko-KR,ko;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // 1. contentTitle 추출: <h1> 태그가 가장 순수한 작품명을 가지고 있음
    const contentTitle = $('h1').first().text().trim() ||
      $('meta[property="og:title"]').attr('content')?.split(' | ')[0]?.trim();

    // 2. contentId 추출: URL 경로에서 숫자만 추출하는 것이 가장 확실함
    const canonicalUrl = $('link[rel="canonical"]').attr('href') || response.url;
    const idMatch = canonicalUrl.match(/\/title\/(\d+)/);
    const contentId = idMatch ? idMatch[1] : canonicalUrl.split('/').filter(Boolean).pop()?.split('?')[0];

    // 3. 장르 추출 시도 (meta 태그 활용)
    const genres: string[] = [];
    $('meta[property="video:tag"]').each((_, el) => {
      const tag = $(el).attr('content');
      if (tag) genres.push(tag);
    });

    return {
      success: true,
      contentTitle: contentTitle || '제목 없음',
      contentId: contentId || undefined,
      title: contentTitle || '제목 없음', // page.tsx 호환
      videoId: contentId || undefined,     // page.tsx 호환
      genres: genres.length > 0 ? genres : undefined,
      finalUrl: canonicalUrl,
      rawHtml: html // 디버깅용
    };

  } catch (error) {
    return { success: false, error: '넷플릭스 정보 추출 실패' };
  }
}