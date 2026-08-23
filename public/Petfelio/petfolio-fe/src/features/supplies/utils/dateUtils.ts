export const parseDate = (dateStr: string): Date => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const toDateOnly = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getWeekDates = (startDate: Date, days: number = 7): Date[] =>
  Array.from({ length: days }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });

export const getWeekStart = (d: Date): Date => {
  const monday = new Date(d);
  monday.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1));
  return toDateOnly(monday);
};

export const getCategoryBadgeColor = (
  name: string
): 'red' | 'blue' | 'grey' | 'green' => {
  const lower = name.toLowerCase();
  if (lower.includes('사료')) return 'red';
  if (lower.includes('간식')) return 'blue';
  if (lower.includes('약') || lower.includes('영양')) return 'green';
  return 'grey';
};

export const getCategoryTrackColor = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('사료')) return '#FFF3E0';
  if (lower.includes('간식')) return '#E3F2FD';
  if (lower.includes('약') || lower.includes('영양')) return '#E8F5E9';
  return '#F5F5F5';
};

export const getDaysLeft = (nextPurchaseDate: string, today: Date): number => {
  const end = parseDate(nextPurchaseDate);
  return Math.ceil((end.getTime() - today.getTime()) / 86400000);
};

export const getStatus = (daysLeft: number): 'normal' | 'warning' | 'danger' => {
  if (daysLeft <= 0) return 'danger';
  if (daysLeft <= 7) return 'warning';
  return 'normal';
};

export const getElapsedDays = (lastPurchaseDate: string, today: Date): number => {
  const start = parseDate(lastPurchaseDate);
  return Math.max(0, Math.ceil((today.getTime() - start.getTime()) / 86400000));
};

export const getProgressPercent = (elapsedDays: number, cycleDays: number): number => {
  if (cycleDays <= 0) return 100;
  return Math.min(100, Math.round((elapsedDays / cycleDays) * 100));
};
