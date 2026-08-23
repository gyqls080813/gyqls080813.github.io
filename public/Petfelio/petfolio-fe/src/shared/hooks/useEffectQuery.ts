/**
 * useEffectQuery — Effect를 React에 연결하는 커스텀 훅
 *
 * 사용법:
 *   const { data, error, loading } = useEffectQuery(
 *     () => effectRequestWithSchema('/api/v1/items', 'GET', MySchema),
 *     [dep1, dep2]
 *   );
 *
 * 에러가 타입 안전하게 추적됨:
 *   if (error?._tag === 'ApiError') → 서버 에러
 *   if (error?._tag === 'NetworkError') → 네트워크 에러
 *   if (error?._tag === 'ParseError') → 응답 형식 오류
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { Effect, Exit } from 'effect';

interface UseEffectQueryResult<A, E> {
  data: A | null;
  error: E | null;
  loading: boolean;
  refetch: () => void;
}

export function useEffectQuery<A, E>(
  effectFn: () => Effect.Effect<A, E>,
  deps: unknown[] = []
): UseEffectQueryResult<A, E> {
  const [data, setData] = useState<A | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    const exit = await Effect.runPromiseExit(effectFn());
    if (!mountedRef.current) return;

    Exit.match(exit, {
      onFailure: (cause) => {
        // Cause에서 에러 추출
        if (cause._tag === 'Fail') {
          setError(cause.error);
        }
        setLoading(false);
      },
      onSuccess: (value) => {
        setData(value);
        setLoading(false);
      },
    });
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    run();
    return () => { mountedRef.current = false; };
  }, [run]);

  return { data, error, loading, refetch: run };
}
