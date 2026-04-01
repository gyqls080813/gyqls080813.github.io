import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/shared/components/common';
import type { TransactionAddFormProps, SubItem } from '../types';

let nextId = 1;
const genId = () => `add-sub-${nextId++}-${Math.random().toString(36).substr(2, 5)}`;

const InlineDropdown: React.FC<{
  options: string[];
  selected: string | string[];
  multi?: boolean;
  onSelect: (value: string) => void;
  onClose: () => void;
}> = ({ options, selected, multi = false, onSelect, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const isSelected = (opt: string) =>
    Array.isArray(selected) ? selected.includes(opt) : selected === opt;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 z-[60] min-w-[140px] max-h-[240px] overflow-y-auto bg-pet-surface rounded-xl border border-pet-border shadow-lg custom-scrollbar"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--color-pet-border) transparent'
      }}
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--color-pet-border); border-radius: 10px; }
      `}</style>
      
      {multi && (
        <div className="px-4 py-2 text-[11px] text-pet-text-muted border-b border-pet-border/50 sticky top-0 bg-pet-surface z-10">
          여러 개 선택 가능
        </div>
      )}
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`w-full flex items-center justify-between px-4 py-3 text-sm border-none bg-transparent cursor-pointer transition-colors hover:bg-pet-badge-bg text-left ${
            isSelected(opt) ? 'text-blue-500 font-semibold' : 'text-pet-text'
          }`}
          onClick={() => onSelect(opt)}
        >
          <span>{opt}</span>
          {isSelected(opt) && (
            <span className="text-blue-500 font-bold">✓</span>
          )}
        </button>
      ))}
    </div>
  );
};

const TransactionAddForm: React.FC<TransactionAddFormProps> = ({
  dateString,
  categoryOptions,
  petList,
  initialAmount,
  initialItems,
  maxAmount,
  merchantName,
  hideHeader,
  onSave,
  onCancel,
}) => {
  const [subItems, setSubItems] = useState<SubItem[]>(
    initialItems && initialItems.length > 0
      ? initialItems
      : [{ id: genId(), what: '', whom: [], amount: initialAmount ?? 0 }]
  );
  const [openDropdown, setOpenDropdown] = useState<{ kind: 'category'; itemId: string } | null>(null);
  const [editingAmountId, setEditingAmountId] = useState<string | null>(null);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [overLimitId, setOverLimitId] = useState<string | null>(null);

  const triggerShake = useCallback((itemId: string) => {
    setShakeId(itemId);
    setOverLimitId(itemId);
    setTimeout(() => setShakeId(null), 500);
    setTimeout(() => setOverLimitId(null), 2500);
  }, []);

  const initialSnapshot = useMemo(() => {
    if (!initialItems || initialItems.length === 0) return null;
    return JSON.stringify(initialItems.map(s => ({ what: s.what, whom: [...s.whom].sort((a,b)=>a-b), amount: s.amount })));
  }, []);

  const totalAmount = subItems.reduce((sum, s) => sum + s.amount, 0);
  const limitAmount = maxAmount ?? initialAmount;
  const isOverLimit = limitAmount != null && limitAmount > 0 && totalAmount > limitAmount;

  const filledItems = subItems.filter(s => s.what && s.amount > 0);
  const hasEmptyItem = subItems.some(s => !s.what || s.amount <= 0);
  const visibleItems = subItems.filter((s, idx) => {
    if (s.what || s.amount > 0) return true;
    if (idx === subItems.length - 1) return true;
    return false;
  });

  const isDirty = useMemo(() => {
    if (!initialSnapshot) return true;
    const current = JSON.stringify(subItems.filter(s => s.what && s.amount > 0).map(s => ({ what: s.what, whom: [...s.whom].sort((a,b)=>a-b), amount: s.amount })));
    return current !== initialSnapshot;
  }, [subItems, initialSnapshot]);

  const updateField = (id: string, field: 'what' | 'amount', value: string | number) => {
    setSubItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const togglePet = (itemId: string, petId: number) => {
    setSubItems((prev) =>
      prev.map((s) => {
        if (s.id !== itemId) return s;
        const pets = s.whom.includes(petId)
          ? s.whom.filter((p) => p !== petId)
          : [...s.whom, petId];
        return { ...s, whom: pets };
      })
    );
  };

  const addSubItem = () => {
    setSubItems((prev) => [...prev, { id: genId(), what: '', whom: [], amount: 0 }]);
  };

  const removeSubItem = (id: string) => {
    if (subItems.length <= 1) return;
    setSubItems((prev) => prev.filter((s) => s.id !== id));
  };

  const isValid = filledItems.length > 0 && !isOverLimit && isDirty;

  const handleSave = () => {
    if (!isValid) return;
    const saveItems = subItems.filter(s => s.what && s.amount > 0);
    const mainCategory = saveItems[0]?.what || '기타';
    onSave({
      category: mainCategory,
      pets: [...new Set(saveItems.flatMap((s) => s.whom))],
      amount: saveItems.reduce((sum, s) => sum + s.amount, 0),
      items: saveItems.map((s) => ({ what: s.what, whom: s.whom, amount: s.amount })),
    });
  };

  const dateObj = new Date(dateString + 'T00:00:00');
  const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  return (
    <>
      <style>{`
        .amount-input::-webkit-outer-spin-button,
        .amount-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .amount-input[type=number] {
          -moz-appearance: textfield;
        }
        @keyframes shakeAmount {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-4px); }
          30%, 70% { transform: translateX(4px); }
        }
        .shake-amount {
          animation: shakeAmount 0.4s ease-in-out;
        }
      `}</style>
    <div className="flex flex-col w-full bg-pet-surface rounded-xl border border-pet-border overflow-visible">

      {!hideHeader && (
        <>
          {}
          <div className="grid grid-cols-3 items-center px-5 py-4">
            <button
              type="button"
              className="text-sm text-pet-text-sub border-none bg-transparent cursor-pointer hover:text-pet-text transition-colors text-left"
              onClick={onCancel}
            >
              ← 돌아가기
            </button>
            <span className="text-base font-bold text-pet-text text-center">상세 내역</span>
            <div />
          </div>

          {merchantName && (
            <div className="px-5 pb-1 text-center">
              <span className="text-sm font-bold text-pet-text">{merchantName}</span>
            </div>
          )}

          {}
          <div className="flex flex-col items-center pt-4 pb-2">
            <span className={`text-[2.5rem] font-extrabold tracking-tight leading-none transition-colors duration-300 ${
              totalAmount > 0 ? 'text-pet-text' : 'text-pet-text-muted/30'
            }`}>
              {totalAmount > 0 ? `${new Intl.NumberFormat('ko-KR').format(totalAmount)}원` : '0원'}
            </span>
            {limitAmount != null && limitAmount > 0 && (
              <span className={`mt-2 text-xs ${isOverLimit ? 'text-red-500 font-bold' : 'text-pet-text-muted'}`}>
                거래 금액 {new Intl.NumberFormat('ko-KR').format(limitAmount)}원 ·{' '}
                {isOverLimit ? (
                  <span style={{ color: '#FF3B30', fontWeight: 700 }}>
                    {new Intl.NumberFormat('ko-KR').format(totalAmount - limitAmount)}원 초과
                  </span>
                ) : (
                  <span style={{ color: '#4CD964', fontWeight: 700 }}>
                    {new Intl.NumberFormat('ko-KR').format(limitAmount - totalAmount)}원 남음
                  </span>
                )}
              </span>
            )}
            {(limitAmount == null || limitAmount <= 0) && (
              <span className="mt-2 text-xs text-pet-text-muted">{formattedDate}</span>
            )}
          </div>
        </>
      )}

      {}
      <div className="px-5 pb-3 pt-3 flex flex-col gap-3">
        {visibleItems.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-xl border border-pet-border overflow-visible"
          >
            { }
            <div className="flex items-center justify-between px-4 py-2.5 bg-pet-grid/40 border-b border-pet-border/50 rounded-t-xl">
              <span className="text-xs font-bold text-pet-text-muted">
                품목 {idx + 1}
              </span>
              {subItems.length > 1 && (
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs font-medium text-pet-red/80 hover:text-pet-red border-none bg-transparent cursor-pointer transition-colors"
                  onClick={() => removeSubItem(item.id)}
                >
                  삭제
                </button>
              )}
            </div>

            {}
            <div className="relative">
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 border-none bg-transparent cursor-pointer hover:bg-pet-badge-bg/30 transition-colors text-left"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown?.kind === 'category' && openDropdown.itemId === item.id
                      ? null
                      : { kind: 'category', itemId: item.id }
                  )
                }
              >
                <span className="text-sm text-pet-text-muted">어떤 것을</span>
                <span className={`flex items-center gap-1 text-sm font-medium ${item.what ? 'text-blue-500' : 'text-pet-text-muted'}`}>
                  {item.what || '선택'}
                  <span className="text-[12px] opacity-40">▾</span>
                </span>
              </button>
              {openDropdown?.kind === 'category' && openDropdown.itemId === item.id && (
                <InlineDropdown
                  options={categoryOptions}
                  selected={item.what}
                  onSelect={(val) => {
                    updateField(item.id, 'what', val);
                    setOpenDropdown(null);
                  }}
                  onClose={() => setOpenDropdown(null)}
                />
              )}
            </div>

            {}
            <div className="flex items-center justify-between border-t border-pet-border/30 px-5 py-3">
              <span className="text-sm text-pet-text-muted shrink-0">누구에게</span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {petList.map((pet) => {
                  const isSelected = item.whom.includes(pet.id);
                  return (
                    <button
                      key={pet.id}
                      type="button"
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                          : 'bg-pet-surface text-pet-text-muted border-pet-border hover:border-blue-300'
                      }`}
                      onClick={() => togglePet(item.id, pet.id)}
                    >
                      {pet.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {}
            <div
              className={`flex flex-col border-t border-pet-border/30 rounded-b-xl ${shakeId === item.id ? 'shake-amount' : ''}`}
            >
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-pet-badge-bg/30 transition-colors"
                onClick={() => setEditingAmountId(editingAmountId === item.id ? null : item.id)}
              >
                <span className={`text-sm ${overLimitId === item.id ? 'text-red-500 font-bold' : 'text-pet-text-muted'}`}>얼마나</span>
                {editingAmountId === item.id ? (
                  <input
                    type="number"
                    value={item.amount || ''}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 100000000) {
                        triggerShake(item.id);
                        return;
                      }
                      updateField(item.id, 'amount', Math.max(0, val));
                    }}
                    onBlur={() => setEditingAmountId(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingAmountId(null)}
                    autoFocus
                    className={`w-32 text-sm font-semibold text-right bg-transparent border-b-2 outline-none amount-input ${overLimitId === item.id ? 'text-red-500 border-red-500' : 'text-pet-text border-pet-brown'}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className={`text-sm font-semibold ${item.amount > 0 ? 'text-pet-text' : 'text-pet-text-muted'}`}>
                    {item.amount > 0 ? `${new Intl.NumberFormat('ko-KR').format(item.amount)}원` : '0원'}
                  </span>
                )}
              </div>
              {overLimitId === item.id && (
                <div className="px-5 pb-3 -mt-1 text-xs font-bold text-red-500 text-right">
                  1억 이상은 입력할 수 없습니다
                </div>
              )}
            </div>
          </div>
        ))}

        {}
        <button
          type="button"
          className="w-full py-3 text-sm font-medium text-pet-brown rounded-xl border border-dashed border-pet-border bg-transparent cursor-pointer hover:border-pet-brown hover:bg-pet-badge-bg/30 transition-colors"
          onClick={addSubItem}
        >
          + 품목 추가
        </button>
      </div>

      {}
      <div className="px-5 pt-3 pb-5 border-t border-pet-border">
        <Button
          color="primary"
          variant={isValid ? 'fill' : 'weak'}
          display="block"
          size="large"
          onClick={handleSave}
          disabled={!isValid}
        >
          {isOverLimit
            ? `총액이 거래 금액을 ${new Intl.NumberFormat('ko-KR').format(totalAmount - (limitAmount || 0))}원 초과합니다`
            : hasEmptyItem ? '모든 품목을 입력해주세요'
            : isValid ? '추가하기' : '내용을 입력해주세요'}
        </Button>
      </div>
    </div>
    </>
  );
};

TransactionAddForm.displayName = 'TransactionAddForm';
export default TransactionAddForm;
undefined