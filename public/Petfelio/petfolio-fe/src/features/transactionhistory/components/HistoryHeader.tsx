import React from 'react';
import type { HistoryHeaderProps } from '../types';

const HistoryHeader: React.FC<HistoryHeaderProps> = ({
  title = '거래 내역',
  right,
}) => (
  <div className="flex items-center justify-between px-5 py-3.5 shrink-0 bg-[var(--color-pet-surface)] border-b border-[var(--color-pet-border)]">
    <h3 className="text-[0.9375rem] font-bold tracking-tight text-[var(--color-pet-text)]">
      {title}
    </h3>
    {right && <div className="shrink-0 ml-3 flex items-center gap-2">{right}</div>}
  </div>
);

HistoryHeader.displayName = 'HistoryHeader';
export default HistoryHeader;
