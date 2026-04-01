import React from 'react';
import { Button } from '@/shared/components/common';
import type { TransactionHeaderProps } from '../types';

const formatDateDisplay = (dateStr: string): string => {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[d.getDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
};

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  currentDate,
  onPrevDay,
  onNextDay,
  onClose,
  onAdd,
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-3 border-b border-pet-border gap-1">
      <button
        type="button"
        className="flex items-center gap-1 px-2 py-1 border-none rounded-lg bg-transparent text-pet-text-sub text-xs cursor-pointer transition-colors duration-150 hover:bg-pet-badge-bg shrink-0"
        onClick={onClose}
      >
        ← 캘린더
      </button>

      <div className="flex items-center justify-center gap-0.5 shrink-0">
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 border-none rounded-lg bg-transparent text-pet-text-sub text-base cursor-pointer transition-colors duration-150 hover:bg-pet-badge-bg active:bg-pet-badge-bg"
          onClick={onPrevDay}
          aria-label="이전 날"
        >
          ◀
        </button>
        <span className="text-sm font-bold text-pet-text tracking-tight whitespace-nowrap">
          {formatDateDisplay(currentDate)}
        </span>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 border-none rounded-lg bg-transparent text-pet-text-sub text-base cursor-pointer transition-colors duration-150 hover:bg-pet-badge-bg active:bg-pet-badge-bg"
          onClick={onNextDay}
          aria-label="다음 날"
        >
          ▶
        </button>
      </div>

      <div className="flex justify-end shrink-0">
        {onAdd && (
          <Button
            size="small"
            color="primary"
            variant="weak"
            onClick={onAdd}
            aria-label="거래 추가"
          >
            + 추가
          </Button>
        )}
      </div>
    </div>
  );
};

TransactionHeader.displayName = 'TransactionHeader';
export default TransactionHeader;
