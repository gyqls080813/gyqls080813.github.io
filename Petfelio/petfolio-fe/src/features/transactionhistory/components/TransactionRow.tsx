import React from 'react';
import { PawPrint } from '@/shared/components/ui/icon';
import type { TransactionRowProps } from '../types';
import { formatAmount } from '../utils';

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  index,
  animated,
  onClick,
}) => {
  const { store, amount, isPet } = transaction;
  const delay = animated ? `${index * 0.06}s` : '0s';

  return (
    <div
      className={`flex items-center justify-between px-5 py-3 group transition-colors hover:bg-[var(--color-pet-surface)] ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      style={
        animated
          ? { animation: 'txFadeSlide 0.35s ease both', animationDelay: delay, opacity: 0 }
          : undefined
      }
      onClick={() => onClick?.(transaction)}
    >
      {}
      <div className="flex-1 min-w-0">
        <p className="text-[0.8125rem] font-medium truncate text-[var(--color-pet-text)]">
          {store}
        </p>
        <span className="block mt-0.5 text-[0.75rem] font-semibold font-[Nunito,Noto_Sans_KR,sans-serif] text-[var(--color-pet-text-muted)]">
          {formatAmount(amount)}
        </span>
      </div>

      {}
      {isPet && (
        <div className="shrink-0 ml-3 w-8 h-8 flex items-center justify-center rounded-full transition-transform group-hover:scale-105 border-[1.5px] border-[var(--color-pet-paw)] text-[var(--color-pet-brown)] bg-[var(--color-pet-badge-bg)]">
          <PawPrint size="small" />
        </div>
      )}
    </div>
  );
};

TransactionRow.displayName = 'TransactionRow';
export default TransactionRow;