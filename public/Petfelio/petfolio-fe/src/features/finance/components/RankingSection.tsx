import React from 'react';
import dynamic from 'next/dynamic';
import Card from '@/shared/components/common/Card';
import { RankingPodium } from '@/features/finance';
import type { RankingEntry } from '@/features/finance';
import TrophyLottie from '@/shared/components/lottle/Trophy.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

/** 랭킹 섹션 */
export const RankingSection = ({ ranking }: { ranking: RankingEntry[] }) => (
  <Card elevation="low" radius="large" withBorder padding="medium">
    {ranking.length > 0 ? (
      <RankingPodium entries={ranking} />
    ) : (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <Lottie animationData={TrophyLottie} loop style={{ width: 120, height: 120, margin: '0 auto' }} />
        <p style={{ fontSize: '0.9rem', color: 'var(--color-pet-text-muted, #b0a090)', marginTop: '0.75rem' }}>
          아직 랭킹 데이터가 없어요
        </p>
      </div>
    )}
  </Card>
);

export default RankingSection;
