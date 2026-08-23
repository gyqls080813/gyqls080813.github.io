import React from 'react';
import type { CalendarEvent, DaySummary, CalendarDayCellProps } from '../types';

const formatCompactAmount = (amount: number): string => {
  if (amount >= 10000) {
    const man = (amount / 10000).toFixed(1);
    return `${man}만`;
  }
  return new Intl.NumberFormat('ko-KR').format(amount);
};

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  dateString,
  isToday,
  isSelected,
  isCurrentMonth,
  isSunday,
  isSaturday,
  events,
  daySummary,
  onClick,
  children,
  className = '',
}) => {
  const getTextColor = (): string => {
    if (!isCurrentMonth) return '#d1d1d6';
    if (isSelected) return '#fff';
    if (isSunday) return '#FF3B30';
    if (isSaturday) return '#007AFF';
    return 'var(--color-pet-text-dark)';
  };

  const getBackground = (): string => {
    if (isSelected) return 'var(--color-pet-text-dark)';
    if (isToday) return '#f0f0f2';
    return 'transparent';
  };

  return (
    <div
      onClick={() => onClick(dateString)}
      role="button"
      aria-label={`${dateString} 선택`}
      className="flex flex-col items-center justify-start py-1.5 cursor-pointer rounded-[10px] transition-[background] duration-100 min-h-[72px]"
      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'var(--color-pet-bg-light)'; }}
      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
    >
      {}
      <div
        className="w-8 h-8 flex items-center justify-center text-[0.88em] transition-all duration-150"
        style={{
          borderRadius: isToday || isSelected ? 10 : 16,
          fontWeight: isToday || isSelected ? 700 : 400,
          color: getTextColor(),
          background: getBackground(),
        }}>
        {day}
      </div>

      {}
      {daySummary && daySummary.totalAmount > 0 && (
        <div className="text-[0.52em] font-semibold mt-[3px] text-[var(--color-pet-text-secondary)] whitespace-nowrap">
          {formatCompactAmount(daySummary.totalAmount)}
        </div>
      )}

      {}
      {events && events.length > 0 && (
        <div className="flex gap-0.5 mt-[3px]">
          {events.slice(0, 3).map((evt, i) => (
            <div key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: evt.color || '#4CD964' }} />
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

CalendarDayCell.displayName = 'CalendarDayCell';
export default CalendarDayCell;
