import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/shared/hooks/queryConfig';
import '@/shared/styles/globals.css';
import Layout from '@/shared/components/layout/Layout';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { CategoryProvider } from '@/shared/context/CategoryContext';
import { PetProvider } from '@/features/pet';
import { UserProvider } from '@/features/user/context/UserContext';
import { CardProvider } from '@/features/finance/context/CardContext';
import { ToastProvider } from '@/shared/context/ToastContext';

const NO_LAYOUT_PAGES = ['/', '/login', '/register', '/onboarding', '/onboarding/step1', '/onboarding/step2'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayout = NO_LAYOUT_PAGES.includes(router.pathname);
  const [mswReady, setMswReady] = useState(false);
  const [queryClient] = useState(() => createQueryClient());

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/mock/browser').then(({ worker }) => {
        worker.start({ onUnhandledRequest: 'bypass' }).then(() => {
          setMswReady(true);
        });
      });
    } else {
      setMswReady(true);
    }
  }, []);

  if (!mswReady) return null;

  return (
    <ToastProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <CategoryProvider>
            <PetProvider>
              <CardProvider>
                {noLayout ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </CardProvider>
            </PetProvider>
          </CategoryProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
    </ToastProvider>
  );
}
