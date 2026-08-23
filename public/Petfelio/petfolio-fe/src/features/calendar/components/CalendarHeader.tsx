import React from 'react';
import type { CalendarHeaderProps } from '../types';

const MONTH_NAMES = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3">

      <button
        type="button"
        onClick={onPrevMonth}
        className="bg-transparent border-none text-[1em] text-[var(--color-pet-text-dim)] cursor-pointer px-2 py-1"
        aria-label="이전 달"
      >‹</button>

      <div
        onClick={onToday}
        className="text-center cursor-pointer"
      >
        <div className="text-[1.2em] font-extrabold text-[var(--color-pet-text-dark)] tracking-tight">
          {MONTH_NAMES[month]}
        </div>
        <div className="text-[0.68em] text-[var(--color-pet-text-secondary)] font-medium mt-px">
          {year}
        </div>
      </div>

      <button
        type="button"
        onClick={onNextMonth}
        className="bg-transparent border-none text-[1em] text-[var(--color-pet-text-dim)] cursor-pointer px-2 py-1"
        aria-label="다음 달"
      >›</button>
    </div>
  );
};

CalendarHeader.displayName = 'CalendarHeader';
export default CalendarHeader;
