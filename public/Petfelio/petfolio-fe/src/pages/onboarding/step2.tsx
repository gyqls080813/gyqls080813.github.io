import React from 'react';
import { useRouter } from 'next/router';
import { PetRegisterWizard } from '@/features/pet/components/PetRegisterWizard';
import { usePets } from '@/features/pet';

export default function OnboardingStep2() {
  const router = useRouter();
  const inviteCode = (router.query.inviteCode as string) || '';
  const fromMyPage = router.query.from === 'mypage';
  const { refresh } = usePets();

  const handleComplete = async () => {
    await refresh();
    router.replace(fromMyPage ? '/health' : '/home');
  };

  return (
    <PetRegisterWizard
      inviteCode={inviteCode}
      onComplete={handleComplete}
    />
  );
}
