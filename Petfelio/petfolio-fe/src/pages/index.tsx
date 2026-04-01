import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SplashContent } from '@/features/auth/components/SplashContent';
import { AuthLayout } from '@/shared/components/layout/AuthLayout';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {

      router.replace('/login');
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AuthLayout fullDark>
      <SplashContent />
    </AuthLayout>
  );
}

export const getServerSideProps = async () => ({ props: {} });
