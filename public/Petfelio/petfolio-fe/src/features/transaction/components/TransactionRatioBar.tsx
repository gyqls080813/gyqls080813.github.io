import React, { useState, useEffect } from 'react';
import type { RatioItem, TransactionRatioBarProps } from '../types';

const TransactionRatioBar: React.FC<TransactionRatioBarProps> = ({
  items,
  totalAmount,
  topN = 3,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const total = totalAmount ?? items.reduce((sum, item) => sum + item.amount, 0);
  if (total === 0) return null;

  const sorted = items
    .map((item) => ({
      ...item,
      percent: (item.amount / total) * 100,
    }))
    .sort((a, b) => b.amount - a.amount);

  // 상위 topN개만 개별 표시, 나머지는 "그 외"로 묶기
  const topItems = sorted.slice(0, topN);
  const restItems = sorted.slice(topN);
  const restAmount = restItems.reduce((sum, item) => sum + item.amount, 0);
  const restPercent = restItems.reduce((sum, item) => sum + item.percent, 0);

  const displayItems = [
    ...topItems,
    ...(restItems.length > 0
      ? [{ label: '그 외', amount: restAmount, percent: restPercent, color: '#AAAAAA' }]
      : []),
  ];

  return (
    <div className={`flex flex-col gap-0 ${className}`}>
      {}
      <div className="flex w-full h-10 rounded-xl overflow-hidden bg-pet-grid">
        {displayItems.map((item, index) => {
          if (item.percent <= 0) return null;

          return (
            <div
              key={item.label}
              className="h-full flex items-center justify-center overflow-hidden transition-all duration-600 ease-out cursor-default"
              style={{
                width: mounted ? `${item.percent}%` : '0%',
                backgroundColor: `${item.color}66`,
                borderRight: index < displayItems.length - 1 ? `1px solid ${item.color}40` : 'none',
                transitionDelay: `${index * 60}ms`,
              }}
              title={`${item.label}: ${new Intl.NumberFormat('ko-KR').format(item.amount)}원 (${item.percent.toFixed(1)}%)`}
            >
              <span
                className="text-xs font-bold whitespace-nowrap px-0.5 truncate"
                style={{ color: item.color }}
              >
                {item.percent >= 15
                  ? `${item.label} ${item.percent.toFixed(0)}%`
                  : item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TransactionRatioBar.displayName = 'TransactionRatioBar';
export default TransactionRatioBar;
