import type { Transaction, TransactionGroup } from './types';

export const isGrouped = (
  data: Transaction[] | TransactionGroup[]
): data is TransactionGroup[] =>
  data.length > 0 && 'dateLabel' in data[0];

export const toDateLabel = (dateStr: string): string => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}.${dd}`;
};

export const groupByDate = (transactions: Transaction[]): TransactionGroup[] => {
  const map = new Map<string, Transaction[]>();
  for (const tx of transactions) {
    const label = toDateLabel(tx.date);
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(tx);
  }
  return Array.from(map.entries()).map(([dateLabel, txs]) => ({
    dateLabel,
    transactions: txs,
  }));
};

export const formatAmount = (amount: number): string =>
  `-${new Intl.NumberFormat('ko-KR').format(amount)}원`;
