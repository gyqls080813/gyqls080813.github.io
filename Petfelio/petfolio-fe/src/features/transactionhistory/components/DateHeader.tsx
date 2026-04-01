import React from 'react';
import type { DateHeaderProps } from '../types';

const DateHeader: React.FC<DateHeaderProps> = ({ label }) => (
  <div className="px-5 py-2 bg-[var(--color-pet-badge-bg)]">
    <span className="text-[0.6875rem] font-semibold tracking-widest uppercase font-[Nunito,Noto_Sans_KR,sans-serif] text-[var(--color-pet-brown-soft)]">
      {label}
    </span>
  </div>
);

DateHeader.displayName = 'DateHeader';
export default DateHeader;
