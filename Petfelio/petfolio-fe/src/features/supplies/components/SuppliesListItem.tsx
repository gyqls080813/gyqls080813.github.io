import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/shared/components/common/Card';
import { Button } from '@/shared/components/common/Button';
import type { ConsumableItem, ConsumableDetailData } from '@/features/supplies/types/consumable';
import { catByName, dday, parse, strip } from '@/features/supplies/utils/supplyUtils';

interface SuppliesListItemProps {
  item: ConsumableItem;
  isOpen: boolean;
  detail?: ConsumableDetailData;
  onToggle: (id: number) => void;
  onEdit: (item: ConsumableItem) => void;
  onDelete: (item: ConsumableItem) => void;
}

export const SuppliesListItem = ({ item, isOpen, detail, onToggle, onEdit, onDelete }: SuppliesListItemProps) => {
  const cat = catByName(item.categoryName);
  const d = dday(item.nextPurchaseDate);

  const elapsed = Math.max(0, Math.ceil((strip(new Date()).getTime() - parse(item.lastPurchaseDate).getTime()) / 86400000));
  const pct = item.purchaseCycleDays > 0 ? Math.min(100, Math.round((elapsed / item.purchaseCycleDays) * 100)) : 100;
  
  const urgencyObj = d <= 0 ? { text: '교체 필요', color: '#dc2626', bg: '#fef2f2' } 
                   : d <= 3 ? { text: `D-${d}`, color: '#f59e0b', bg: '#fffbeb' } 
                   : d <= 7 ? { text: `D-${d}`, color: '#3182f6', bg: '#eff6ff' } 
                   : { text: `D-${d}`, color: 'var(--color-pet-text-secondary)', bg: '#f0fdf4', bar: '#66BB6A' };

  const barColor = urgencyObj.bar || urgencyObj.color;

  return (
    <Card elevation="low" radius="large" padding="medium" onClick={() => onToggle(item.id)} htmlStyle={{ cursor: 'pointer' }}>
      <div className="flex items-center gap-3">
        <div className="w-[40px] h-[40px] rounded-xl flex items-center justify-center overflow-hidden p-1" style={{ background: cat.bg }}>
          <Image src={cat.image} alt={cat.name} width={28} height={28} className="object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[15px] font-bold text-[var(--color-pet-text-dark)] truncate">{item.name}</div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span className="text-[13px] font-bold" style={{ color: urgencyObj.color }}>{urgencyObj.text}</span>
              <span className="text-[14px] text-[var(--color-pet-text-dim)] transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div style={{ flex: 1, height: '5px', borderRadius: '3px', background: urgencyObj.bg, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: barColor, transition: 'width 0.3s ease' }} />
            </div>
            <span className="text-[10px] font-semibold shrink-0" style={{ color: 'var(--color-pet-text-secondary)' }}>
              {item.purchaseCycleDays}일 주기
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="mt-3 pt-3 border-t border-[var(--color-pet-border)]">
              <div className="flex gap-1.5 flex-wrap mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ background: cat.bg, color: cat.color }}>
                  <Image src={cat.image} alt={cat.name} width={14} height={14} className="object-contain inline" /> {cat.name}
                </span>
                {detail?.pets?.map(p => (
                  <span key={p.petId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f0f4ff] text-[#3182f6]">
                    🐾 {p.petName}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px] mb-3">
                <div className="text-[var(--color-pet-text-secondary)]">마지막 구매</div>
                <div className="text-right font-semibold text-[var(--color-pet-text-dark)]">{item.lastPurchaseDate}</div>
                <div className="text-[var(--color-pet-text-secondary)]">다음 교체일</div>
                <div className="text-right font-semibold text-[var(--color-pet-text-dark)]">{item.nextPurchaseDate}</div>
              </div>
              {item.purchaseUrl && (
                <a
                  href={item.purchaseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 mb-3 rounded-xl bg-[#eff6ff] text-[#3182f6] text-[13px] font-bold transition-colors hover:bg-[#dbeafe] no-underline"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  구매하러 가기
                </a>
              )}
              <div className="flex gap-2 mt-1">
                <Button display="block" size="small" color="light" onClick={() => onEdit(item)}>수정</Button>
                <Button display="block" size="small" color="danger" onClick={() => onDelete(item)}>삭제</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
