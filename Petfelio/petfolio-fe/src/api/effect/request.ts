/**
 * Effect-TS 기반 HTTP 요청 함수
 *
 * 기존 request.ts와 동일한 로직이지만 Effect를 사용하여:
 * - 에러가 타입 시스템에 추적됨 (Effect<T, ApiError | NetworkError>)
 * - try/catch 대신 Effect.catchTag로 에러별 처리 가능
 * - Schema를 통한 런타임 응답 검증 지원
 */
import { Effect, pipe, Schema } from 'effect';
import { ApiError, NetworkError, UnauthorizedError, ParseError } from './errors';
import { getAccessToken, refreshAccessToken, clearAccessToken } from '../tokenManager';

const API_BASE_URL = '';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig<B = unknown> {
  body?: B;
  headers?: HeadersInit;
}

// ─── 헤더 빌드 ───
const buildHeaders = (existing?: HeadersInit, body?: unknown): Headers => {
  const headers = new Headers(existing);
  if (!headers.has('Content-Type') && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  const token = getAccessToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

// ─── 코어: Effect 기반 HTTP 요청 ───
export const effectRequest = <B = unknown>(
  path: string,
  method: HttpMethod = 'GET',
  config: RequestConfig<B> = {}
): Effect.Effect<unknown, ApiError | NetworkError | UnauthorizedError> =>
  Effect.tryPromise({
    try: async () => {
      const url = `${API_BASE_URL}${path}`;
      const headers = buildHeaders(config.headers, config.body);

      const init: RequestInit = {
        method,
        headers,
        credentials: 'include',
      };

      if (config.body && method !== 'GET') {
        init.body = config.body instanceof FormData
          ? (config.body as BodyInit)
          : JSON.stringify(config.body);
      }

      const response = await fetch(url, init);

      // 401 → 토큰 갱신 시도
      if (response.status === 401) {
        try {
          await refreshAccessToken();
          // 재시도
          const retryHeaders = buildHeaders(config.headers, config.body);
          const retryResponse = await fetch(url, { ...init, headers: retryHeaders });
          if (!retryResponse.ok) {
            const errorData = await retryResponse.json().catch(() => ({}));
            throw { _tag: 'ApiError', status: retryResponse.status, message: retryResponse.statusText, data: errorData };
          }
          const text = await retryResponse.text();
          return text ? JSON.parse(text) : {};
        } catch (refreshErr: any) {
          if (refreshErr?._tag === 'ApiError') throw refreshErr;
          clearAccessToken();
          if (typeof window !== 'undefined') window.location.href = '/login';
          throw { _tag: 'UnauthorizedError', message: '세션이 만료되었습니다.' };
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { _tag: 'ApiError', status: response.status, message: response.statusText, data: errorData };
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    },
    catch: (error: unknown) => {
      if (typeof error === 'object' && error !== null && '_tag' in error) {
        const e = error as any;
        if (e._tag === 'UnauthorizedError') return new UnauthorizedError({ message: e.message });
        if (e._tag === 'ApiError') return new ApiError({ status: e.status, message: e.message, data: e.data });
      }
      return new NetworkError({
        message: error instanceof Error ? error.message : 'Unknown network error',
        cause: error,
      });
    },
  });

// ─── 스키마 검증 포함 요청 ───
export const effectRequestWithSchema = <A, I, B = unknown>(
  path: string,
  method: HttpMethod,
  schema: Schema.Schema<A, I>,
  config: RequestConfig<B> = {}
): Effect.Effect<A, ApiError | NetworkError | UnauthorizedError | ParseError> =>
  pipe(
    effectRequest(path, method, config),
    Effect.flatMap((raw) =>
      pipe(
        Schema.decodeUnknown(schema)(raw),
        Effect.mapError(
          (parseErr) =>
            new ParseError({
              message: `응답 데이터 형식 불일치: ${path}`,
              cause: parseErr,
            })
        )
      )
    )
  );

// ─── Effect → Promise 변환 헬퍼 (React에서 사용) ───
export const runEffect = <A, E>(
  effect: Effect.Effect<A, E>
): Promise<A> => Effect.runPromise(effect as Effect.Effect<A, never>);
