import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import dogDefaultImg from '@/shared/components/ui/default/dog_default.png';

const pageVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
};

export default function OnboardingChoicePage() {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden min-h-screen bg-[var(--color-pet-bg)]">
      <motion.div variants={pageVariants}
        initial="enter" animate="center"
        transition={{ duration: 0.4 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
      >
        <Image
          src={dogDefaultImg}
          alt="Default Pet Profile"
          width={280}
          height={280}
          className="mb-4 object-contain"
        />

        <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
          <Paragraph.Text>반려동물 가계부를 시작해볼까요?</Paragraph.Text>
        </Paragraph>
        <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 40 }}>
          <Paragraph.Text>가족과 함께 관리해보세요</Paragraph.Text>
        </Paragraph>

        <div className="w-full max-w-[400px] flex flex-col gap-3">
          <Button display="block" size="xlarge" color="primary"
            onClick={() => router.push('/onboarding/step1?mode=create')}>
            그룹 만들기
          </Button>
          <Button display="block" size="xlarge" color="light"
            onClick={() => router.push('/onboarding/step1?mode=join')}>
            초대 코드로 참여하기
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export const getServerSideProps = async () => ({ props: {} });
