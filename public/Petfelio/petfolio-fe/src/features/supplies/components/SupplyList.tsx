import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/shared/components/common/Card';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import accountRest from '@/shared/components/ui/category/account_rest.png';
import { dday, strip, parse, catById } from '@/features/supplies/utils/supplyUtils';
import type { ConsumableItem, ConsumableDetailData } from '@/features/supplies/types/consumable';

interface SupplyListProps {
  items: ConsumableItem[];
  loading: boolean;
  expanded: number | null;
  detailCache: Record<number, ConsumableDetailData>;
  globalPets: any[];
  stickerImages: Record<number, any[]>;
  toggleExpand: (id: number) => void;
  handleEdit: (item: ConsumableItem) => void;
  setDeleteTarget: (item: ConsumableItem) => void;
}

export const SupplyList = ({
  items, loading, expanded, detailCache, globalPets, stickerImages, toggleExpand, handleEdit, setDeleteTarget
}: SupplyListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[15px] font-bold text-[var(--color-pet-text-dark)]">내 소모품</span>
        <span className="text-[13px] text-[var(--color-pet-text-secondary)]">총 {items.length}개</span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--color-pet-text-secondary)]">불러오는 중...</div>
      ) : items.length === 0 ? (
        <Card elevation="low" radius="large" padding="large">
          <div className="text-center py-6">
            <Image src={accountRest} alt="소모품 없음" width={100} height={100} style={{ objectFit: 'contain', margin: '0 auto 0.75rem' }} />
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center">
              <Paragraph.Text>등록된 소모품이 없어요</Paragraph.Text>
            </Paragraph>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col gap-2.5">
          {[...items].sort((a, b) => dday(a.nextPurchaseDate) - dday(b.nextPurchaseDate)).map(item => {
            const cat = catById(item.categoryId);
            const d = dday(item.nextPurchaseDate);
            const isOpen = expanded === item.id;
            const detail = detailCache[item.id];
            return (
              <div id={`supply-${item.id}`} key={item.id}>
                <Card elevation="low" radius="large" padding="medium"
                  onClick={() => toggleExpand(item.id)}
                  htmlStyle={{ cursor: 'pointer' }}>
                  <div className="flex items-center gap-3">
                  <div className="w-[60px] h-[60px] rounded-xl flex items-center justify-center overflow-hidden p-1"
                    style={{ background: cat.bg }}>
                    {(() => {
                      const petId = detailCache[item.id]?.pets[0]?.petId;
                      const pet = globalPets.find(p => p.id === petId);
                      const isCat = pet?.species === 'CAT';
                      const sticker = petId ? stickerImages[petId]?.find(s => s.categoryId === item.categoryId) : null;
                      const src = sticker?.imageUrl || (isCat ? cat.catImage : cat.dogImage);
                      return (
                        <Image 
                          src={src} 
                          alt={item.name} 
                          width={48} 
                          height={48} 
                          className="object-contain"
                          unoptimized={!!sticker}
                        />
                      );
                    })()}

                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[15px] font-bold text-[var(--color-pet-text-dark)] truncate">{item.name}</div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[13px] font-bold"
                          style={{ color: d <= 0 ? '#dc2626' : d <= 3 ? '#f59e0b' : d <= 7 ? '#3182f6' : 'var(--color-pet-text-secondary)' }}>
                          {d <= 0 ? '교체 필요' : `D-${d}`}
                        </span>
                        <span className="text-[14px] text-[var(--color-pet-text-dim)] transition-transform duration-200"
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                      </div>
                    </div>
                    {(() => {
                      const elapsed = Math.max(0, Math.ceil((strip(new Date()).getTime() - parse(item.lastPurchaseDate).getTime()) / 86400000));
                      const pct = item.purchaseCycleDays > 0 ? Math.min(100, Math.round((elapsed / item.purchaseCycleDays) * 100)) : 100;
                      const barColor = d <= 0 ? '#dc2626' : d <= 3 ? '#f59e0b' : d <= 7 ? '#3182f6' : '#66BB6A';
                      const bgColor = d <= 0 ? '#fef2f2' : d <= 3 ? '#fffbeb' : d <= 7 ? '#eff6ff' : '#f0fdf4';
                      return (
                        <div className="flex items-center gap-2 mt-0.5">
                          <div style={{ flex: 1, height: '5px', borderRadius: '3px', background: bgColor, overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: barColor, transition: 'width 0.3s ease' }} />
                          </div>
                          <span className="text-[10px] font-semibold shrink-0" style={{ color: 'var(--color-pet-text-secondary)' }}>
                            {item.purchaseCycleDays}일 주기
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                      onClick={e => e.stopPropagation()}>
                      <div className="mt-3 pt-3 border-t border-[var(--color-pet-border)]">
                        <div className="flex gap-1.5 flex-wrap mb-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ background: cat.bg, color: cat.color }}>
                            {(() => {
                              const petId = detail?.pets[0]?.petId;
                              const pet = globalPets.find(p => p.id === petId);
                              const isCat = pet?.species === 'CAT';
                              const sticker = petId ? stickerImages[petId]?.find(s => s.categoryId === item.categoryId) : null;
                              const src = sticker?.imageUrl || (isCat ? cat.catImage : cat.dogImage);
                              return (
                                <Image 
                                  src={src} 
                                  alt={cat.name} 
                                  width={14} 
                                  height={14} 
                                  className="object-contain inline"
                                  unoptimized={!!sticker}
                                />
                              );
                            })()}
                            {cat.name}
                          </span>
                          {detail?.pets?.map(p => (
                            <span key={p.petId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f0f4ff] text-[#3182f6]">🐾 {p.petName}</span>
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
                            className="flex items-center justify-center gap-2 w-full mb-3 py-2.5 px-4 rounded-xl text-[13px] font-bold transition-all active:scale-95"
                            style={{
                              background: 'linear-gradient(135deg, #3182f6 0%, #1b6de8 100%)',
                              color: '#fff',
                              boxShadow: '0 3px 10px rgba(49,130,246,0.3)',
                              textDecoration: 'none',
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                            </svg>
                            구매하러 가기
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                          </a>
                        )}
                        <div className="flex gap-2 mt-1">
                          <Button display="block" size="small" color="light" onClick={() => handleEdit(item)}>수정</Button>
                          <Button display="block" size="small" color="danger" onClick={() => setDeleteTarget(item)}>삭제</Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
