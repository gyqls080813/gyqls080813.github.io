import React from 'react';
import type { Transaction, TransactionGroup, TransactionHistoryListProps } from '../types';
import { isGrouped, groupByDate } from '../utils';
import TransactionRow from './TransactionRow';
import DateHeader from './DateHeader';
import HistoryHeader from './HistoryHeader';

export const TransactionHistoryList: React.FC<TransactionHistoryListProps> = ({
  data,
  emptyMessage = '거래 내역이 없습니다',
  animated = true,
  headerRight,
  onRowClick,
  className = '',
}) => {
  const groups: TransactionGroup[] =
    data.length === 0
      ? []
      : isGrouped(data)
        ? data
        : groupByDate(data as Transaction[]);

  return (
    <div
      className={`flex flex-col h-full rounded-xl overflow-hidden bg-[var(--color-pet-surface)] border border-[var(--color-pet-border)] shadow-[0_2px_8px_rgba(140,122,98,0.06)] ${className}`}
    >
      {}
      <HistoryHeader title="거래 내역" right={headerRight} />

      {}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* txFadeSlide 키프레임은 globals.css에서 제공됨 */}

        {groups.length === 0 ? (
          <div className="py-16 px-6 text-center">
            <p className="text-sm text-[var(--color-pet-text-subtle)]">
              {emptyMessage}
            </p>
          </div>
        ) : (
          groups.map((group, groupIdx) => (
            <div key={group.dateLabel + groupIdx}>
              <DateHeader label={group.dateLabel} />

              {group.transactions.map((tx, txIdx) => (
                <React.Fragment key={tx.id}>
                  <TransactionRow
                    transaction={tx}
                    index={txIdx}
                    animated={animated}
                    onClick={onRowClick}
                  />
                  {txIdx < group.transactions.length - 1 && (
                    <div className="mx-5 border-b border-[var(--color-pet-border)]" />
                  )}
                </React.Fragment>
              ))}

              {groupIdx < groups.length - 1 && (
                <div className="h-1.5 bg-[var(--color-pet-badge-bg)]" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

TransactionHistoryList.displayName = 'TransactionHistoryList';
export default TransactionHistoryList;
