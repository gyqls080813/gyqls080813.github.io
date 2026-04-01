import React, { useMemo } from 'react';
import CalendarDayCell from './CalendarDayCell';
import { formatDateToString, getTodayString } from '../utils';
import type { CalendarEvent, DaySummary, CalendarGridProps } from '../types';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

interface DayCellData {
  day: number;
  dateString: string;
  isCurrentMonth: boolean;
  isSunday: boolean;
  isSaturday: boolean;
}

const generateCalendarDays = (year: number, month: number): DayCellData[] => {
  const days: DayCellData[] = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = lastDateOfPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const date = new Date(prevYear, prevMonth, day);
    const dayOfWeek = date.getDay();
    days.push({
      day, dateString: formatDateToString(date), isCurrentMonth: false,
      isSunday: dayOfWeek === 0, isSaturday: dayOfWeek === 6,
    });
  }

  for (let d = 1; d <= lastDateOfMonth; d++) {
    const date = new Date(year, month, d);
    const dayOfWeek = date.getDay();
    days.push({
      day: d, dateString: formatDateToString(date), isCurrentMonth: true,
      isSunday: dayOfWeek === 0, isSaturday: dayOfWeek === 6,
    });
  }

  const totalCells = Math.ceil(days.length / 7) * 7;
  const remaining = totalCells - days.length;
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const date = new Date(nextYear, nextMonth, d);
    const dayOfWeek = date.getDay();
    days.push({
      day: d, dateString: formatDateToString(date), isCurrentMonth: false,
      isSunday: dayOfWeek === 0, isSaturday: dayOfWeek === 6,
    });
  }

  return days;
};

const CalendarGrid: React.FC<CalendarGridProps> = ({
  year, month, selectedDate, onSelectDate, events = [], daySummaries = {},
}) => {
  const todayString = getTodayString();
  const days = useMemo(() => generateCalendarDays(year, month), [year, month]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((evt) => {
      if (!map[evt.date]) map[evt.date] = [];
      map[evt.date].push(evt);
    });
    return map;
  }, [events]);

  return (
    <div className="px-3 pb-2">

      <div className="grid grid-cols-7 text-center mb-1">
        {DAY_LABELS.map((label, idx) => (
          <div key={label}
            className="text-[0.72em] font-semibold py-2"
            style={{ color: idx === 0 ? '#FF3B30' : idx === 6 ? '#007AFF' : '#8e8e93' }}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {days.map((dayData) => (
          <CalendarDayCell
            key={dayData.dateString}
            day={dayData.day}
            dateString={dayData.dateString}
            isToday={dayData.dateString === todayString}
            isSelected={dayData.dateString === selectedDate}
            isCurrentMonth={dayData.isCurrentMonth}
            isSunday={dayData.isSunday}
            isSaturday={dayData.isSaturday}
            events={eventsByDate[dayData.dateString] || []}
            daySummary={daySummaries[dayData.dateString]}
            onClick={(date) => onSelectDate?.(date)}
          />
        ))}
      </div>
    </div>
  );
};

CalendarGrid.displayName = 'CalendarGrid';
export default CalendarGrid;
