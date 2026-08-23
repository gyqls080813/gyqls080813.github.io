/**
 * Effect-TS 기반 에러 타입 정의
 *
 * Tagged Error 패턴으로 에러 타입을 명시적으로 추적
 * → try/catch 없이 타입 시스템에서 에러를 관리
 */
import { Data } from 'effect';

// ─── API 에러 (서버가 에러 응답을 보냄) ───
export class ApiError extends Data.TaggedError('ApiError')<{
  readonly status: number;
  readonly message: string;
  readonly data?: unknown;
}> {
  getDataMessage(): string | undefined {
    if (this.data && typeof this.data === 'object' && 'message' in this.data) {
      return String((this.data as Record<string, unknown>).message);
    }
    return undefined;
  }
}

// ─── 네트워크 에러 (연결 실패, 타임아웃 등) ───
export class NetworkError extends Data.TaggedError('NetworkError')<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

// ─── 인증 만료 에러 ───
export class UnauthorizedError extends Data.TaggedError('UnauthorizedError')<{
  readonly message: string;
}> {}

// ─── 스키마 검증 에러 (응답 데이터 형식 불일치) ───
export class ParseError extends Data.TaggedError('ParseError')<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

// ─── 모든 API 에러의 유니온 타입 ───
export type HttpError = ApiError | NetworkError | UnauthorizedError | ParseError;
