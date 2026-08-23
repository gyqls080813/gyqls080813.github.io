export interface CalendarEvent {
  date: string;
  color?: string;
  label?: string;
}

export interface CalendarProps {
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  events?: CalendarEvent[];
  initialYear?: number;
  initialMonth?: number;
  daySummaries?: Record<string, DaySummary>;
  onMonthChange?: (year: number, month: number) => void;
  className?: string;
}

export interface DaySummary {
  totalAmount: number;
  stickerSrc?: string;
}

export interface CalendarDayCellProps {
  day: number;
  dateString: string;
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  events: CalendarEvent[];

  daySummary?: DaySummary;
  onClick: (dateString: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface CalendarDetailCellProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CalendarGridProps {
  year: number;
  month: number;
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  events?: CalendarEvent[];

  daySummaries?: Record<string, DaySummary>;
}

export interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday?: () => void;
}
