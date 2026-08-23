import React from 'react';
import type { CalendarDetailCellProps } from '../types';

const CalendarDetailCell: React.FC<CalendarDetailCellProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`w-full flex flex-col items-center gap-0.5 mt-0.5 ${className}`}>
      {children}
    </div>
  );
};

CalendarDetailCell.displayName = 'CalendarDetailCell';
export default CalendarDetailCell;
