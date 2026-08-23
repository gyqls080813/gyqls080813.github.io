import React from 'react';
import Image from 'next/image';
import Card from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import type { DashboardData } from '@/features/finance/types/dashboard';
import cardImg from '@/shared/components/ui/category/card.png';

interface SummaryCardProps {
  monthlySummary: DashboardData['monthlySummary'];
  month?: number;
  petName?: string;
}

/** 이번 달 요약 카드 */
export const SummaryCard = ({ monthlySummary, month, petName }: SummaryCardProps) => {
  const m = month ?? (new Date().getMonth() + 1);
  const label = petName ? `${petName}를 위한 지출은` : '총 지출은';

  return (
    <Card elevation="low" radius="large" withBorder>
      <Box
        padding="medium"
        paddingHorizontal="large"
        htmlStyle={{
          background: 'linear-gradient(135deg, var(--color-pet-grad-start), var(--color-pet-grad-end))',
        }}
      >
        <div className="flex items-center gap-4">
          <Image src={cardImg} alt="" width={64} height={64} className="object-contain flex-shrink-0" />

          <div className="flex flex-col justify-center">
            <span className="text-[0.78rem] font-semibold mb-1" style={{ color: 'var(--color-pet-text-sub)' }}>
              {m}월 한달 간 {label}
            </span>
            <span className="text-[1.2rem] font-bold" style={{ color: 'var(--color-pet-text)' }}>
              ₩{monthlySummary.totalSpending.toLocaleString()} 이에요
            </span>
          </div>
        </div>
      </Box>
    </Card>
  );
};

export default SummaryCard;
