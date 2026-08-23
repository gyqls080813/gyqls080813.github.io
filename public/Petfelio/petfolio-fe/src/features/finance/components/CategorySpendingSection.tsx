import React from 'react';
import Card from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';
import type { DashboardData } from '@/features/finance/types/dashboard';

const CATEGORY_COLORS = [
  '#8b5e3c', '#c4956a', '#d4a574', '#e8c9a0', '#a0845c',
  '#6b8e6b', '#b8860b', '#cd853f',
];

/** 카테고리별 지출 분석 섹션 — 수평 바 차트 */
export const CategorySpendingSection = ({ categorySpending }: { categorySpending: DashboardData['categorySpending'] }) => {
  const total = categorySpending.data.reduce((s, v) => s + v, 0);
  const hasData = total > 0;

  // 금액 큰 순으로 정렬
  const sorted = categorySpending.labels
    .map((label, i) => ({ label, amount: categorySpending.data[i] || 0, colorIdx: i }))
    .filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const maxAmount = sorted.length > 0 ? sorted[0].amount : 1;

  return (
    <Card elevation="low" radius="large" withBorder>
      <Box padding="medium" paddingHorizontal="large" direction="column">
        <Paragraph typography="st7" fontWeight="bold" color="var(--color-pet-text-muted)">
          카테고리별
        </Paragraph>
        <Paragraph typography="t5" fontWeight="bold" color="var(--color-pet-text)">
          지출 분석
        </Paragraph>
      </Box>

      {hasData ? (
        <div style={{ padding: '0.5rem 1.25rem 1.25rem' }}>
          {/* 총 지출 요약 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1rem',
            padding: '0.6rem 0.75rem',
            borderRadius: '0.6rem',
            background: 'var(--color-pet-bg-subtle, #f9f7f4)',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-pet-text-muted)', fontWeight: 500 }}>
              총 지출
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-pet-text)' }}>
              {total.toLocaleString()}원
            </span>
          </div>

          {/* 수평 바 차트 */}
          {sorted.map((item, i) => {
            const pct = Math.round((item.amount / total) * 100);
            const barWidth = (item.amount / maxAmount) * 100;
            const color = CATEGORY_COLORS[item.colorIdx % CATEGORY_COLORS.length];

            return (
              <div key={i} style={{ marginBottom: i < sorted.length - 1 ? '0.75rem' : 0 }}>
                {/* 라벨 행 */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.3rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ 
                      width: 8, height: 8, borderRadius: '50%', 
                      background: color, flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-pet-text)' }}>
                      {item.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-pet-text)' }}>
                      {item.amount.toLocaleString()}원
                    </span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 500, color: 'var(--color-pet-text-muted)' }}>
                      {pct}%
                    </span>
                  </div>
                </div>
                {/* 바 */}
                <div style={{
                  width: '100%',
                  height: 8,
                  borderRadius: 4,
                  background: 'rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${barWidth}%`,
                    height: '100%',
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Box padding="large" direction="column" alignItems="center">
          <Paragraph typography="t6" color="var(--color-pet-text-muted)" textAlign="center">
            <Paragraph.Text>이번 달 지출 데이터가 없어요</Paragraph.Text>
          </Paragraph>
        </Box>
      )}
    </Card>
  );
};

export default CategorySpendingSection;
