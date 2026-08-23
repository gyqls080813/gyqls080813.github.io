/**
 * Effect 에러 → 사용자 친화적 한국어 메시지 변환 유틸
 *
 * 사용법:
 *   import { getErrorMessage, getErrorIcon } from '@/api/effect/errorMessages';
 *   <p>{getErrorIcon(error)} {getErrorMessage(error)}</p>
 */
import type { HttpError } from './errors';

// ─── 에러 타입별 한국어 메시지 ───
export const getErrorMessage = (error: HttpError | null): string => {
  if (!error) return '';

  switch (error._tag) {
    case 'ApiError':
      if (error.status === 400) return '요청 형식이 올바르지 않습니다.';
      if (error.status === 403) return '접근 권한이 없습니다.';
      if (error.status === 404) return '요청한 데이터를 찾을 수 없습니다.';
      if (error.status === 409) return '이미 처리된 요청입니다.';
      if (error.status >= 500) return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      return error.getDataMessage?.() ?? '알 수 없는 오류가 발생했습니다.';

    case 'NetworkError':
      return '네트워크 연결을 확인해주세요.';

    case 'UnauthorizedError':
      return '로그인이 필요합니다.';

    case 'ParseError':
      return '서버 응답 형식이 변경되었습니다. 앱을 업데이트해주세요.';

    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};

// ─── 에러 타입별 아이콘 ───
export const getErrorIcon = (error: HttpError | null): string => {
  if (!error) return '';

  switch (error._tag) {
    case 'ApiError': return '⚠️';
    case 'NetworkError': return '🌐';
    case 'UnauthorizedError': return '🔒';
    case 'ParseError': return '🔧';
    default: return '❌';
  }
};

// ─── 에러가 재시도 가능한지 판단 ───
export const isRetryable = (error: HttpError | null): boolean => {
  if (!error) return false;
  if (error._tag === 'NetworkError') return true;
  if (error._tag === 'ApiError' && error.status >= 500) return true;
  return false;
};
