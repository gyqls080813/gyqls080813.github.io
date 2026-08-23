import React from 'react';
import { Card } from '@/shared/components/common/Card';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { Badge } from '@/shared/components/common/Badge';
import { Box } from '@/shared/components/common/Box';
import { colors, adaptive } from '@/shared/styles/colors';
import { Package, PawPrint } from '@/shared/components/ui/icon';
import type { ConsumableItem } from '@/features/supplies/types/consumable';
import { dday } from '@/features/supplies/utils/supplyUtils';

interface SoonToReplaceBannerProps {
  soonItems: ConsumableItem[];
  totalItemsCount: number;
}

export const SoonToReplaceBanner = ({ soonItems, totalItemsCount }: SoonToReplaceBannerProps) => {
  if (soonItems.length === 0) return null;

  return (
    <div className="px-5 mb-6">
      <Card
        elevation="high"
        radius="large"
        padding="medium"
        htmlStyle={{
          background: `linear-gradient(135deg, ${colors.blue100} 0%, ${colors.white} 100%)`,
          border: `1px solid ${colors.blue100}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', right: '-12px', top: '-12px', opacity: 0.05 }}>
          <Package size="large" color={colors.blue500} style={{ width: '100px', height: '100px' }} />
        </div>

        <Box direction="row" alignItems="center" gap="xsmall" htmlStyle={{ marginBottom: '0.4rem' }}>
          <Paragraph typography="t2" fontWeight="bold">
            <span style={{ color: colors.blue600 }}>{soonItems.length}개</span> 소모품,
          </Paragraph>
        </Box>
        <Paragraph typography="t3" fontWeight="bold" color={adaptive.grey800} style={{ marginBottom: '1rem' }}>
          곧 교체 예정이에요 <PawPrint size="small" color={colors.blue500} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
        </Paragraph>

        <Box direction="row" gap="xsmall" htmlStyle={{ marginBottom: '1.25rem' }}>
          <Badge color="blue" variant="fill" size="small">
            이번 달 교체 {soonItems.length}개
          </Badge>
          <Badge color="grey" variant="fill" size="small">
            총 등록 {totalItemsCount}개
          </Badge>
        </Box>

        <div className="grid grid-cols-2 gap-2.5">
          {soonItems.slice(0, 2).map(s => {
            const d = dday(s.nextPurchaseDate);
            const urgencyColor = d <= 1 ? colors.red500 : d <= 3 ? '#f59e0b' : colors.blue500;
            
            return (
              <Card
                key={s.id}
                elevation="low"
                radius="medium"
                padding="small"
                htmlStyle={{
                  background: colors.white,
                  borderLeft: `4px solid ${urgencyColor}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <Box direction="row" alignItems="center" gap="xsmall" htmlStyle={{ marginBottom: '0.2rem' }}>
                   <Paragraph typography="st6" fontWeight="bold" style={{ color: urgencyColor }}>
                     {d <= 0 ? '교체 필요!' : `${d}일 뒤`}
                   </Paragraph>
                </Box>
                <Paragraph typography="st7" color={adaptive.grey600} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.name}
                </Paragraph>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
