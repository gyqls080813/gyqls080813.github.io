import React, { useState, useCallback } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import type { CalendarProps } from '../types';

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  events = [],
  daySummaries = {},
  initialYear,
  initialMonth,
  onMonthChange,
  className = '',
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(initialYear ?? today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialMonth ?? today.getMonth());

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      let newMonth = prev - 1;
      let newYear = currentYear;
      if (newMonth < 0) { newMonth = 11; newYear -= 1; setCurrentYear(newYear); }
      onMonthChange?.(newYear, newMonth);
      return newMonth;
    });
  }, [currentYear, onMonthChange]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      let newMonth = prev + 1;
      let newYear = currentYear;
      if (newMonth > 11) { newMonth = 0; newYear += 1; setCurrentYear(newYear); }
      onMonthChange?.(newYear, newMonth);
      return newMonth;
    });
  }, [currentYear, onMonthChange]);

  const handleToday = useCallback(() => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    onMonthChange?.(now.getFullYear(), now.getMonth());
  }, [onMonthChange]);

  return (
    <div className="bg-white rounded-[20px] overflow-hidden">
      <CalendarHeader
        year={currentYear}
        month={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
      <CalendarGrid
        year={currentYear}
        month={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        events={events}
        daySummaries={daySummaries}
      />
    </div>
  );
};

Calendar.displayName = 'Calendar';
export default Calendar;
