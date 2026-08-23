import React from 'react';
import { Card } from '@/shared/components/common/Card';
import { Skeleton } from '@/shared/components/skeleton/Skeleton';
import { colors } from '@/shared/styles/colors';

export function SuppliesSkeleton() {
  return (
    <div className="max-w-[500px] mx-auto min-h-screen pb-24" style={{ background: 'transparent' }}>
      <div className="pt-2" />
      <div className="mb-6">
        <Card
          elevation="high"
          radius="large"
          padding="medium"
          htmlStyle={{
            background: `linear-gradient(135deg, ${colors.blue100} 0%, ${colors.white} 100%)`,
            border: `1px solid ${colors.blue100}`,
          }}
        >
          <Skeleton width={120} height={22} style={{ marginBottom: 6 }} />
          <Skeleton width={180} height={20} style={{ marginBottom: 16 }} />
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            <Skeleton width={100} height={22} borderRadius={12} />
            <Skeleton width={80} height={22} borderRadius={12} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} elevation="low" radius="medium" padding="small">
                <div className="flex items-center gap-2">
                  <Skeleton width={28} height={28} borderRadius={8} />
                  <div style={{ flex: 1 }}>
                    <Skeleton width="70%" height={13} style={{ marginBottom: 4 }} />
                    <Skeleton width="50%" height={11} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <Skeleton width={80} height={18} style={{ marginBottom: 12 }} />
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} elevation="low" radius="large" padding="medium">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-xl flex items-center justify-center overflow-hidden p-1"
                  style={{ background: '#f3f4f6' }}>
                  <Skeleton width={28} height={28} borderRadius={6} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Skeleton width="45%" height={15} />
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <Skeleton width={40} height={13} />
                      <Skeleton width={10} height={10} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div style={{ flex: 1, height: '5px', borderRadius: '3px', background: '#f0fdf4', overflow: 'hidden' }}>
                      <div style={{ width: `${30 + i * 15}%`, height: '100%', borderRadius: '3px', background: '#66BB6A' }} />
                    </div>
                    <Skeleton width={40} height={10} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
