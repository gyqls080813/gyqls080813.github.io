import React from 'react';
import { Skeleton } from '@/shared/components/skeleton/Skeleton';
import { CATEGORY_COLORS } from '@/shared/constants/categories';
import type { TransactionListItem } from '@/features/transaction/types/transaction';
import { updatePetExpense } from '@/features/transaction/api/updatePetExpenseApi';

interface AccountTransactionListProps {
  card: { bankName: string; cardName: string; cardNumber: string; balance: number; getMonthlyTotalCount: number };
  txByDate: Record<string, (TransactionListItem & { dateStr: string; timeStr: string })[]>;
  petNames: string[];
  isLoading?: boolean;
  onBack: () => void;
  onTxClick: (tx: TransactionListItem & { dateStr: string; timeStr: string }) => void;
  onRefresh: () => void;
}

/**
 * 거래 상태 분류:
 *
 * | 상태               | categoryId | isPetExpense | isClassified | isAiClassified | 표시                    |
 * |--------------------|-----------|-------------|-------------|---------------|------------------------|
 * | AI 분류 대기중       | any       | any         | any         | false          | 스켈레톤 (깜빡이는 로딩)  |
 * | AI가 펫 거래라고 분류 | number    | true        | false       | true           | 🐾 AI분류 배지 + 초록    |
 * | AI가 펫 거래 아니라고 | null      | false       | false       | true           | 일반 결제 (주황 보더)     |
 * | 모든 거래 등록 완료   | number    | true        | true        | true           | 회색 처리                |
 */
export const AccountTransactionList: React.FC<AccountTransactionListProps> = ({
  card, txByDate, petNames, isLoading, onBack, onTxClick, onRefresh,
}) => {
  return (
    <div className="max-w-[500px] mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack}
          className="bg-transparent border-none text-[1.2em] cursor-pointer">←</button>
        <span className="text-[1.05em] font-extrabold text-[var(--color-pet-text-dark)] flex-1">
          {card.cardName.replace(' 체크카드', '')}
        </span>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-3">
        <div>
          <div className="text-[0.72em] text-[#007AFF] font-medium">{card.bankName} {card.cardNumber}</div>
          <div className="text-[1.8em] font-extrabold text-[var(--color-pet-text-dark)] mt-1">{card.getMonthlyTotalCount.toLocaleString()}원</div>
        </div>
      </div>

      {isLoading ? (
        <div>
          {[1, 2].map(group => (
            <div key={group} className="mb-3.5">
              <div className="flex justify-between items-center px-3.5 py-2.5 bg-[var(--color-pet-bg-light)] rounded-t-[14px]">
                <Skeleton width={80} height={14} />
                <Skeleton width={60} height={14} />
              </div>
              {[1, 2, 3].map((item, idx) => (
                <div key={item} className="px-3.5 py-3 animate-pulse flex items-center gap-2.5" style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f2' }}>
                  <div className="w-[3px] h-5 rounded-full bg-[#e0e0e0] shrink-0" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div>
                        <Skeleton width={80} height={14} style={{ marginBottom: 4 }} />
                        <Skeleton width={120} height={11} />
                      </div>
                    </div>
                    <Skeleton width={70} height={16} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : Object.keys(txByDate).length === 0 ? (
        <div className="text-center py-10 text-[var(--color-pet-text-secondary)] font-medium">거래 내역이 없습니다</div>
      ) : (
        Object.entries(txByDate)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([date, txs]) => {
            const dateObj = new Date(date + 'T00:00:00');
            const dateLabel = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
            const dayTotal = txs.reduce((s, t) => s + t.amount, 0);
            return (
              <div key={date} className="mb-3.5">
                <div className="flex justify-between items-center px-3.5 py-2.5 bg-[var(--color-pet-bg-light)] rounded-t-[14px]">
                  <span className="text-[0.82em] font-bold text-[var(--color-pet-text-dark)]">{dateLabel}</span>
                  <span className="text-[0.78em] font-bold text-[#FF3B30]">-{dayTotal.toLocaleString()}원</span>
                </div>

                {txs.map((tx, idx) => {
                  const isLast = idx === txs.length - 1;

                // ─── AI 분류 대기중 (isAiClassified=false): 스피너 표시 ───
                if (!tx.isAiClassified) {
                  return (
                    <div
                      key={tx.transactionId}
                      className="px-3.5 py-3 flex items-center gap-2.5"
                      style={{
                        background: '#fafafa',
                        borderBottom: '1px solid #f0f0f2',
                        opacity: 0.7,
                      }}
                    >
                      <div className="w-[3px] h-5 rounded-full bg-[#e0e0e0] shrink-0" />
                      <div className="flex justify-between items-center flex-1">
                        <div className="flex items-center gap-2.5">
                          <div>
                            <div className="text-[0.82em] font-semibold text-[var(--color-pet-text-dark)]">
                              {tx.merchantName}
                            </div>
                            <div className="text-[0.65em] mt-px text-[var(--color-pet-text-secondary)]">
                              분석 중... · {tx.timeStr}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-[0.85em] font-bold text-[var(--color-pet-text-dark)]">
                            -{tx.amount.toLocaleString()}원
                          </div>
                          <div className="w-5 h-5 flex items-center justify-center">
                            <svg className="animate-spin h-4 w-4 text-[#8E44AD]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // ─── 분류 완료 상태 판별 ───
                const isFullyRegistered = tx.isPetExpense && tx.isClassified;
                const isAiPetExpense = tx.isPetExpense && !tx.isClassified;
                // 일반 결제: AI가 펫 거래 아니라고 분류 OR AI X
                const isNormalPurchase = !tx.isPetExpense;

                const catColor = CATEGORY_COLORS[tx.categoryName ?? ''] || '#888';

                // 배경색
                let bgColor = '#fff';
                if (isFullyRegistered) bgColor = '#f9f9f9';   // 회색 (등록 완료)
                else if (isAiPetExpense) bgColor = 'linear-gradient(135deg, #e8f5e9, #f1f8e9)'; // 연초록

                // 왼쪽 보더 색
                let borderLeftColor = '#FFB74D'; // 기본 (일반 미분류)
                if (isFullyRegistered) borderLeftColor = '#e0e0e0';   // 회색
                else if (isAiPetExpense) borderLeftColor = '#4CAF50';  // 초록

                return (
                  <div key={tx.transactionId}
                    className={`px-3.5 py-3 cursor-pointer transition-colors flex items-center gap-2.5 ${isFullyRegistered ? 'opacity-60 grayscale-[20%]' : ''}`}
                    style={{
                      background: bgColor,
                      borderBottom: '1px solid #f0f0f2',
                    }}
                    onClick={() => onTxClick(tx)}>
                    <div className="w-[3px] h-5 rounded-full shrink-0" style={{ backgroundColor: borderLeftColor }} />
                    <div className="flex justify-between items-center flex-1">
                      <div className="flex items-center gap-2.5">
                        <div>
                          <div className={`text-[0.82em] font-semibold ${
                            isFullyRegistered ? 'text-[#9e9e9e]' : 'text-[var(--color-pet-text-dark)]'
                          }`}>
                            {tx.merchantName}
                          </div>
                          <div className="text-[0.65em] mt-px text-[var(--color-pet-text-secondary)]">
                            {tx.categoryName || '미분류'} · {tx.timeStr}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* AI 펫 분류 배지 (AI가 펫 거래라고 분류, 아직 등록 안 됨) */}
                        {isAiPetExpense && (
                          <button
                            className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[0.55em] font-bold border-none cursor-pointer hover:bg-[#C8E6C9] transition-colors"
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                await updatePetExpense(tx.transactionId, { isPetExpense: false });
                                onRefresh();
                              } catch (err) {
                                console.error('[반려동물 지출 해제 실패]', err);
                              }
                            }}>
                            🐾 AI가 분류했어요 ✕
                          </button>
                        )}
                        {/* 금액 */}
                        <div className={`text-[0.85em] font-bold ${
                          isFullyRegistered ? 'text-[#9e9e9e]' : 'text-[var(--color-pet-text-dark)]'
                        }`}>
                          -{tx.amount.toLocaleString()}원
                        </div>
                        {/* 등록 완료 배지 */}
                        {isFullyRegistered && (
                          <span className="text-[0.55em] px-1.5 py-0.5 rounded-full bg-[#f5f5f5] text-[#9e9e9e] font-bold border border-[#e0e0e0]">등록됨</span>
                        )}
                        {/* 일반 결제 배지 (펫 거래 아닌 것) */}
                        {isNormalPurchase && !isFullyRegistered && (
                          <span className="text-[0.55em] px-1.5 py-0.5 rounded-full bg-[#FFF3E0] text-[#E65100] font-bold border border-[#FFB74D]">일반</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
      {/* 하단 여백 (내비게이션 바에 콘텐츠가 가려지지 않도록) */}
      <div style={{ height: 80 }} />
    </div>
  );
};

export default AccountTransactionList;
