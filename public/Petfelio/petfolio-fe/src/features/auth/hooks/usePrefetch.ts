import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAccessToken } from '@/api/tokenManager';
import { refreshAccessToken } from '@/api/tokenManager';

export type SplashPhase = 'loading' | 'needsLogin' | 'ready';

export const usePrefetch = () => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const [phase, setPhase] = useState<SplashPhase>('loading');

  useEffect(() => {
    const run = async () => {
      setStatus('인증 확인 중...');
      await wait(600);

      const token = getAccessToken();

      if (!token) {

        try {
          await refreshAccessToken();
        } catch {
          setStatus('로그인이 필요합니다');
          await wait(800);
          setPhase('needsLogin');
          router.replace('/login');
          return;
        }
      }

      setStatus('데이터 로딩 중...');

      setStatus('준비 완료!');
      setPhase('ready');
      await wait(500);
      router.replace('/ledger');
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, phase };
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
