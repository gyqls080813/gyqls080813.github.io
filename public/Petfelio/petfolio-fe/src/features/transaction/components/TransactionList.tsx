import React, { useState } from 'react';
import type { TransactionItem, TransactionListProps } from '../types';
import { CATEGORY_COLORS } from '@/shared/constants/categories';

const formatAmount = (amount: number): string =>
  `${new Intl.NumberFormat('ko-KR').format(amount)}원`;

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  categoryIcons = {},
  onEdit,
  onDelete,
  className = '',
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  if (transactions.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-pet-text-muted">거래 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {transactions.map((tx) => {
        const isActive = activeId === tx.id;
        const isMine = tx.recordedBy === '나' || !tx.recordedBy;
        const catColor = CATEGORY_COLORS[tx.category] || tx.categoryColor || '#888';
        const isPetExpense = tx.isPet && tx.pets.length > 0;

        // 설명 텍스트 생성
        const descParts: string[] = [];
        if (tx.category) descParts.push(tx.category);
        if (tx.time) descParts.push(tx.time);

        return (
          <div key={tx.id}>
            {!isActive ? (
              <div
                className="px-3.5 py-3 cursor-pointer transition-colors flex items-center gap-2.5"
                style={{
                  background: isMine ? 'linear-gradient(135deg, #e8f5e9, #f1f8e9)' : '#fff',
                  borderBottom: '1px solid #f0f0f2',
                }}
                onClick={() => (isMine && (onEdit || onDelete)) && setActiveId(tx.id)}
              >
                {/* 왼쪽 컬러 바 */}
                <div
                  className="w-[3px] h-5 rounded-full shrink-0"
                  style={{ backgroundColor: isMine ? '#4CAF50' : '#e0e0e0' }}
                />

                {/* 스티커 아이콘 */}
                {tx.iconSrc && (
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <img src={tx.iconSrc} alt={tx.category} className="w-10 h-10 object-contain" />
                  </div>
                )}

                {/* 상점명 + 설명 */}
                <div className="flex-1 min-w-0">
                  <div className="text-[0.82em] font-semibold text-[var(--color-pet-text-dark,#1a1a1a)]">
                    {tx.store}
                  </div>
                  <div className="text-[0.65em] mt-px text-[var(--color-pet-text-secondary,#999)]">
                    {descParts.join(' · ') || '미분류'}
                    {isPetExpense && tx.pets.length > 0 && (
                      <> · {tx.pets.join(', ')}</>
                    )}
                  </div>
                </div>

                {/* 금액 + 배지 */}
                <div className="flex items-center gap-2">
                  <div className="text-[0.85em] font-bold text-[var(--color-pet-text-dark,#1a1a1a)]">
                    {formatAmount(tx.amount)}
                  </div>
                  {isPetExpense ? (
                    <span className="text-[0.55em] px-1.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-bold border border-[#A5D6A7]">
                      반려동물
                    </span>
                  ) : (
                    <span className="text-[0.55em] px-1.5 py-0.5 rounded-full bg-[#FFF3E0] text-[#E65100] font-bold border border-[#FFB74D]">
                      일반
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* 수정/삭제 액션 모드 */
              <div className="flex items-center gap-2 py-3 px-3.5" style={{ background: '#f5f5f5', borderBottom: '1px solid #f0f0f2' }}>
                {isMine && onEdit && (
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white border border-[#e0e0e0] text-sm font-medium text-[var(--color-pet-text-dark)] cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      onEdit(tx);
                      setActiveId(null);
                    }}
                  >
                    수정
                  </button>
                )}
                {isMine && onDelete && (
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white border border-[#ef9a9a] text-sm font-medium text-[#e53935] cursor-pointer hover:bg-red-50 transition-colors"
                    onClick={() => {
                      onDelete(tx.id);
                      setActiveId(null);
                    }}
                  >
                    삭제
                  </button>
                )}
                <button
                  type="button"
                  className="px-3 py-2.5 rounded-lg bg-white border border-[#e0e0e0] text-sm font-medium text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveId(null)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

TransactionList.displayName = 'TransactionList';
export default TransactionList;