import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/shared/components/common';
import type { TransactionItem, TransactionEditFormProps, SubItem } from '../types';

let nextId = 1;
const genId = () => `edit-sub-${nextId++}-${Math.random().toString(36).substr(2, 5)}`;

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
      className="absolute right-0 top-full mt-1 z-50 min-w-[140px] bg-pet-surface rounded-xl border border-pet-border shadow-lg overflow-hidden"
    >
      {multi && (
        <div className="px-4 py-2 text-[11px] text-pet-text-muted border-b border-pet-border/50">
          여러 개 선택 가능
        </div>
      )}
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`w-full flex items-center justify-between px-4 py-3 text-sm border-none bg-transparent cursor-pointer transition-colors hover:bg-pet-badge-bg text-left ${isSelected(opt) ? 'text-blue-500 font-semibold' : 'text-pet-text'
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

const TransactionEditForm: React.FC<TransactionEditFormProps> = ({
  transaction,
  categoryOptions,
  petList,
  onSave,
  onCancel,
}) => {
  const [subItems, setSubItems] = useState<SubItem[]>(
    transaction.subItems && transaction.subItems.length > 0
      ? transaction.subItems
      : [{ id: genId(), what: transaction.category, whom: transaction.pets.map(pName => petList.find(p => p.name === pName)?.id).filter(id => id != null) as number[], amount: transaction.amount }],
  );
  const [openDropdown, setOpenDropdown] = useState<{ kind: 'category' | 'pet'; itemId: string } | null>(null);
  const [editingAmountId, setEditingAmountId] = useState<string | null>(null);

  const totalAmount = subItems.reduce((sum, s) => sum + s.amount, 0);
  const originalAmount = transaction.amount;
  const isOverBudget = totalAmount > originalAmount;
  const remaining = originalAmount - totalAmount;

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

  const handleSave = () => {
    const saveItems = subItems.filter(s => s.what && s.amount > 0);
    onSave({
      ...transaction,
      pets: [...new Set(saveItems.flatMap((s) => s.whom.map(id => petList.find(p => p.id === id)?.name || '')))].filter(Boolean) as string[],
      amount: saveItems.reduce((sum, s) => sum + s.amount, 0),
      subItems: saveItems,
    } as any);
  };

  return (
    <>
      {}
      <style>{`
        .amount-input::-webkit-outer-spin-button,
        .amount-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .amount-input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className="flex flex-col w-full bg-pet-surface rounded-xl border border-pet-border overflow-visible">

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

        {}
        <div className="flex flex-col items-center pt-4 pb-2">
          <span className={`text-[2.5rem] font-extrabold tracking-tight leading-none ${isOverBudget ? 'text-pet-red' : 'text-pet-text'}`}>
            -{new Intl.NumberFormat('ko-KR').format(totalAmount)}원
          </span>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-xs text-pet-text-muted">
              거래 금액 {new Intl.NumberFormat('ko-KR').format(originalAmount)}원
            </span>
            <span className="text-xs text-pet-text-muted">·</span>
            <span className={`text-xs font-semibold ${isOverBudget ? 'text-pet-red' : 'text-green-600'}`}>
              {isOverBudget
                ? `${new Intl.NumberFormat('ko-KR').format(Math.abs(remaining))}원 초과`
                : `${new Intl.NumberFormat('ko-KR').format(remaining)}원 남음`}
            </span>
          </div>
        </div>
        {isOverBudget && (
          <div className="mx-5 mb-3 px-4 py-2.5 rounded-lg bg-pet-red/5 border border-pet-red/20">
            <p className="text-xs text-pet-red font-medium">
              품목 합계가 거래 금액을 초과했어요. 금액을 조정해주세요.
            </p>
          </div>
        )}

        {}
        <div className="px-5 pb-3 flex flex-col gap-3">
          {subItems.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-xl border border-pet-border overflow-visible"
            >
              {}
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
                  <span className="text-sm text-pet-text-muted">어떤 것을 사줬나요?</span>
                  <span className="flex items-center gap-1 text-sm font-medium text-blue-500">
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
                <span className="text-sm text-pet-text-muted shrink-0">누구에게 사줬나요?</span>
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
                className="flex items-center justify-between px-5 py-4 border-t border-pet-border/30 cursor-pointer hover:bg-pet-badge-bg/30 transition-colors rounded-b-xl"
                onClick={() => setEditingAmountId(editingAmountId === item.id ? null : item.id)}
              >
                <span className="text-sm text-pet-text-muted">얼마 쓰셨나요?</span>
                {editingAmountId === item.id ? (
                  <input
                    type="number"
                    max={100000000}
                    value={item.amount || ''}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      updateField(item.id, 'amount', val > 100000000 ? 100000000 : Math.max(0, val));
                    }}
                    onBlur={() => setEditingAmountId(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingAmountId(null)}
                    autoFocus
                    className="w-32 text-sm font-semibold text-pet-text text-right bg-transparent border-b-2 border-pet-brown outline-none amount-input"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="text-sm font-semibold text-pet-text">
                    {new Intl.NumberFormat('ko-KR').format(item.amount)}원
                  </span>
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
            variant={isOverBudget ? 'weak' : 'fill'}
            display="block"
            size="large"
            onClick={handleSave}
            disabled={isOverBudget}
          >
            {isOverBudget ? '금액을 조정해주세요' : '저장하기'}
          </Button>
        </div>
      </div>
    </>
  );
};

TransactionEditForm.displayName = 'TransactionEditForm';
export default TransactionEditForm;
undefined