/**
 * useEffectMutation — Effect 기반 mutation(POST/PUT/DELETE) 훅
 *
 * 사용법:
 *   const { mutate, loading, error, data } = useEffectMutation(
 *     (id: number) => deleteConsumableEffect(id)
 *   );
 *
 *   await mutate(consumableId); // 실행
 */
import { useState, useRef, useCallback } from 'react';
import { Effect, Exit } from 'effect';

interface UseEffectMutationResult<A, E, Args extends unknown[]> {
  mutate: (...args: Args) => Promise<A | null>;
  data: A | null;
  error: E | null;
  loading: boolean;
  reset: () => void;
}

export function useEffectMutation<A, E, Args extends unknown[]>(
  effectFn: (...args: Args) => Effect.Effect<A, E>
): UseEffectMutationResult<A, E, Args> {
  const [data, setData] = useState<A | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  const mutate = useCallback(async (...args: Args): Promise<A | null> => {
    setLoading(true);
    setError(null);

    const exit = await Effect.runPromiseExit(effectFn(...args));
    if (!mountedRef.current) return null;

    return Exit.match(exit, {
      onFailure: (cause) => {
        if (cause._tag === 'Fail') {
          setError(cause.error);
        }
        setLoading(false);
        return null;
      },
      onSuccess: (value) => {
        setData(value);
        setLoading(false);
        return value;
      },
    });
  }, [effectFn]);

  return { mutate, data, error, loading, reset };
}
