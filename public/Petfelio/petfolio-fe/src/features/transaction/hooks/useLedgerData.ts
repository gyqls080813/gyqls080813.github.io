import { useMemo } from 'react';
import type { TransactionItem } from '../types';
import type { CalendarEvent, DaySummary } from '@/features/calendar';
import type { Transaction as HistoryTransaction } from '@/features/transactionhistory';
import type { PetFilter } from '@/features/transactionhistory';
import { CATEGORY_COLORS, CATEGORY_STICKERS } from '@/shared/constants/categories';

interface UseLedgerDataParams {
  transactions: Record<string, TransactionItem[]>;
  startDate: string;
  endDate: string;
  petFilter: PetFilter;
}

export function useLedgerData({ transactions, startDate, endDate, petFilter }: UseLedgerDataParams) {

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    const events: CalendarEvent[] = [];
    Object.entries(transactions).forEach(([date, txs]) => {
      const categoryAmounts: Record<string, number> = {};
      txs.forEach((tx) => {
        categoryAmounts[tx.category] = (categoryAmounts[tx.category] || 0) + tx.amount;
      });
      const topCategory = Object.entries(categoryAmounts).sort((a, b) => b[1] - a[1])[0];
      if (topCategory) {
        events.push({
          date,
          color: CATEGORY_COLORS[topCategory[0]] || 'var(--color-pet-brown)',
          label: topCategory[0],
        });
      }
    });
    return events;
  }, [transactions]);

  const daySummaries: Record<string, DaySummary> = useMemo(() => {
    const summaries: Record<string, DaySummary> = {};
    Object.entries(transactions).forEach(([date, txs]) => {
      const totalAmount = txs.reduce((sum, tx) => sum + tx.amount, 0);
      const categoryAmounts: Record<string, number> = {};
      txs.forEach((tx) => {
        categoryAmounts[tx.category] = (categoryAmounts[tx.category] || 0) + tx.amount;
      });
      const topCategory = Object.entries(categoryAmounts).sort((a, b) => b[1] - a[1])[0]?.[0];
      const stickerSrc = topCategory ? CATEGORY_STICKERS[topCategory] : undefined;
      summaries[date] = { totalAmount, stickerSrc };
    });
    return summaries;
  }, [transactions]);

  const filteredTransactions: HistoryTransaction[] = useMemo(() => {
    const result: HistoryTransaction[] = [];

    Object.entries(transactions).forEach(([date, txs]) => {
      if (startDate && date < startDate) return;
      if (endDate && date > endDate) return;

      txs.forEach((tx) => {
        if (petFilter === 'pet' && !tx.isPet) return;
        if (petFilter === 'noPet' && tx.isPet) return;

        result.push({
          id: tx.id,
          date,
          store: tx.store,
          amount: tx.amount,
          category: tx.category,
          time: tx.time,
          isPet: tx.isPet,
          pets: tx.pets,
        });
      });
    });

    return result.sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, startDate, endDate, petFilter]);

  return { calendarEvents, daySummaries, filteredTransactions };
}
