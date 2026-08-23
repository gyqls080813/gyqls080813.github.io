import React, { useState, useCallback } from 'react';
import TransactionHeader from './TransactionHeader';
import TransactionRatioBar from './TransactionRatioBar';
import TransactionList from './TransactionList';
import type { TransactionItem, RatioItem, TransactionProps } from '../types';

const shiftDate = (dateStr: string, days: number): string => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};

const Transaction: React.FC<TransactionProps> = ({
  dateString,
  transactionsByDate,
  categoryColors,
  categoryIcons = {},
  onClose,
  onAdd,
  onEdit,
  onDelete,
  onDateChange,
  className = '',
}) => {
  const [currentDate, setCurrentDate] = useState(dateString || new Date().toISOString().slice(0, 10));

  const handlePrevDay = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = shiftDate(prev, -1);
      onDateChange?.(newDate);
      return newDate;
    });
  }, [onDateChange]);

  const handleNextDay = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = shiftDate(prev, 1);
      onDateChange?.(newDate);
      return newDate;
    });
  }, [onDateChange]);

  const transactions = transactionsByDate[currentDate] || [];
  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const ratioItems: RatioItem[] = Object.entries(
    transactions.reduce<Record<string, number>>((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {})
  ).map(([label, amount]) => ({
    label,
    amount,
    color: categoryColors[label] || '#8B7355',
  }));

  return (
    <div className={`flex flex-col w-full bg-pet-surface border border-pet-border ${className}`}>
      <TransactionHeader
        currentDate={currentDate}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
        onClose={onClose}
        onAdd={onAdd}
      />

      <div className="p-4 flex flex-col gap-4">
        {transactions.length > 0 ? (
          <>
            <div className="text-center">
              <span className="text-xs text-pet-text-muted">총 지출</span>
              <p className="text-xl font-bold text-pet-text mt-0.5">
                {new Intl.NumberFormat('ko-KR').format(totalAmount)}원
              </p>
            </div>
            <TransactionRatioBar items={ratioItems} />
            <TransactionList
              transactions={transactions}
              categoryIcons={categoryIcons}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm text-pet-text-muted">이 날의 거래 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

Transaction.displayName = 'Transaction';
export default Transaction;
