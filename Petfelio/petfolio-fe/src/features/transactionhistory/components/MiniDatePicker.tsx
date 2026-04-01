import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { MiniDatePickerProps } from '../types';

const DAYS_KR = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function formatDisplay(dateStr: string) {
  if (!dateStr) return '';
  const [, m, d] = dateStr.split('-');
  return `${m}.${d}`;
}

const DAY_COLOR_CLASS = [
  'text-[var(--color-pet-red)]',
  'text-[var(--color-pet-text-muted)]',
  'text-[var(--color-pet-text-muted)]',
  'text-[var(--color-pet-text-muted)]',
  'text-[var(--color-pet-text-muted)]',
  'text-[var(--color-pet-text-muted)]',
  'text-[var(--color-pet-brown)]',
];

const MiniDatePicker: React.FC<MiniDatePickerProps> = ({
  value,
  onChange,
  placeholder = '날짜 선택',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const initYear = value ? parseInt(value.split('-')[0]) : today.getFullYear();
  const initMonth = value ? parseInt(value.split('-')[1]) - 1 : today.getMonth();
  const [viewYear, setViewYear] = useState(initYear);
  const [viewMonth, setViewMonth] = useState(initMonth);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const goPrev = useCallback(() => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [viewMonth]);

  const goNext = useCallback(() => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [viewMonth]);

  const handleSelect = (day: number) => {
    onChange(toDateStr(viewYear, viewMonth, day));
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDayCellClasses = (day: number) => {
    const dateStr = toDateStr(viewYear, viewMonth, day);
    const isSelected = dateStr === value;
    const isToday = dateStr === todayStr;

    const bgClass = isSelected
      ? 'bg-[var(--color-pet-brown)]'
      : isToday
        ? 'bg-[var(--color-pet-badge-bg)]'
        : 'bg-transparent';

    const dayOfWeek = (firstDay + day - 1) % 7;
    const colorClass = isSelected
      ? 'text-white'
      : dayOfWeek === 0
        ? 'text-[var(--color-pet-red)]'
        : dayOfWeek === 6
          ? 'text-[var(--color-pet-brown)]'
          : 'text-[var(--color-pet-text)]';

    const weightClass = isSelected || isToday ? 'font-bold' : 'font-normal';

    return `w-full aspect-square flex items-center justify-center rounded-md text-[0.625rem] transition-all cursor-pointer ${bgClass} ${colorClass} ${weightClass}`;
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[0.6875rem] transition-all cursor-pointer border border-[var(--color-pet-border)] ${
          value
            ? 'bg-[var(--color-pet-badge-bg)] text-[var(--color-pet-text)]'
            : 'bg-white text-[var(--color-pet-text-subtle)]'
        }`}
      >
        <span className="opacity-50 text-[12px]">📅</span>
        <span>{value ? formatDisplay(value) : placeholder}</span>
        {value && (
          <span
            onClick={handleClear}
            className="opacity-50 hover:opacity-100 transition-opacity ml-0.5 cursor-pointer"
          >
            ✕
          </span>
        )}
      </button>

      {}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 rounded-xl p-3 select-none w-[240px] right-0 bg-[var(--color-pet-surface)] border border-[var(--color-pet-border)] shadow-[0_8px_24px_rgba(140,122,98,0.12)]">
          {}
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <button
              type="button"
              onClick={goPrev}
              className="w-6 h-6 flex items-center justify-center rounded-md transition-colors hover:bg-white/60 text-[var(--color-pet-text-muted)]"
            >
              ◀
            </button>
            <span className="text-xs font-semibold text-[var(--color-pet-text)]">
              {viewYear}. {String(viewMonth + 1).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="w-6 h-6 flex items-center justify-center rounded-md transition-colors hover:bg-white/60 text-[var(--color-pet-text-muted)]"
            >
              ▶
            </button>
          </div>

          {}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_KR.map((d, i) => (
              <div
                key={d}
                className={`text-center text-[0.5625rem] font-medium py-0.5 ${DAY_COLOR_CLASS[i]}`}
              >
                {d}
              </div>
            ))}
          </div>

          {}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, idx) => {
              if (day === null) return <div key={`e-${idx}`} />;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(day)}
                  className={getDayCellClasses(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

MiniDatePicker.displayName = 'MiniDatePicker';
export default MiniDatePicker;
