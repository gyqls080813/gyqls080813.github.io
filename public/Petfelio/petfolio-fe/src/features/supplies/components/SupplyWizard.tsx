import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/shared/components/common/Card';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { CATEGORY_META } from '@/shared/constants/categories';
import { createConsumable } from '@/features/supplies/api/createConsumableApi';
import { updateConsumable } from '@/features/supplies/api/updateConsumableApi';
import type { ConsumableDetailData } from '@/features/supplies/types/consumable';
import { MiniCal } from './MiniCal';
import { usePets, type Pet } from '@/features/pet';


const strip = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const fmt = (d: Date) =>
  [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
const parse = (s: string) => { const p = s.split('-').map(Number); return new Date(p[0], p[1]-1, p[2]); };

const CATS = CATEGORY_META;

const inputCls = `w-full px-4 py-3.5 text-[15px] outline-none rounded-xl text-[var(--color-pet-text-dark)] transition-all duration-200 font-[inherit] box-border bg-[var(--color-pet-input-bg)] border-[1.5px] border-transparent`;

const pageVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PetSticker = ({ imageUrl, size=64 }: { imageUrl?: string; size?: number }) => (
  <div className="rounded-full overflow-hidden bg-[var(--color-pet-input-bg)] flex items-center justify-center"
    style={{ width: size, height: size }}>
    {imageUrl
      ? <img src={imageUrl} alt="" className="w-full h-full object-cover"/>
      : <span style={{ fontSize: size*0.5 }}>🐾</span>}
  </div>
);

type FormStep = 'pet' | 'category' | 'info1' | 'info2';

interface SupplyWizardProps {
  mode: 'create' | 'edit';
  initial?: ConsumableDetailData;
  pets: Pet[];
  onClose: () => void;
  onSave: () => void;
}


export const SupplyWizard: React.FC<SupplyWizardProps> = ({ mode, initial, pets, onClose, onSave }) => {
  const { stickerImages } = usePets();
  const isEdit = mode === 'edit';
  const [step, setStep] = useState<FormStep>('pet');
  const [selPets, setSelPets] = useState<number[]>(initial?.pets?.map(p => p.petId) ?? []);
  const [catId, setCatId] = useState(initial?.categoryId ?? 1);
  const [name, setName] = useState(initial?.name ?? '');
  const [cycle, setCycle] = useState(String(initial?.purchaseCycleDays ?? 30));
  const [lastDate, setLastDate] = useState(initial?.lastPurchaseDate ?? fmt(strip(new Date())));
  const [url, setUrl] = useState(initial?.purchaseUrl ?? '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleNextInfo1 = () => {
    if (!name.trim()) { setError('이름을 입력해주세요'); return; }
    if (numCycle <= 0) { setError('교체 주기를 입력해주세요'); return; }
    setError('');
    setStep('info2');
  };

  const numCycle = Number(cycle) || 0;
  const nextDate = useMemo(() => {
    if (!lastDate || numCycle <= 0) return '';
    const d = parse(lastDate); d.setDate(d.getDate() + numCycle);
    return fmt(d);
  }, [lastDate, numCycle]);

  const handleSave = async () => {
    if (!name.trim()) { setError('이름을 입력해주세요'); return; }
    if (numCycle <= 0) { setError('교체 주기를 입력해주세요'); return; }
    setSaving(true);
    try {
      const body = {
        categoryId: catId, name: name.trim(),
        purchaseCycleDays: numCycle, lastPurchaseDate: lastDate,
        nextPurchaseDate: nextDate, purchaseUrl: url, petIds: selPets,
      };
      if (isEdit && initial) await updateConsumable(initial.id, body);
      else await createConsumable(body);
      onSave();
    } catch { setError('저장 중 오류가 발생했어요'); }
    finally { setSaving(false); }
  };

  const stepIdx = step === 'pet' ? 0 : step === 'category' ? 1 : step === 'info1' ? 2 : 3;
  const progress = ((stepIdx + 1) / 4) * 100;

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--color-pet-bg)] flex flex-col overflow-y-auto pb-4">
      <div className="sticky top-0 z-10 bg-[var(--color-pet-bg)]">
        <div className="h-1 bg-[var(--color-pet-border)]">
          <motion.div className="h-full bg-[#3182f6] rounded-r-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>
        {step === 'pet' ? (
          <button onClick={onClose} className="absolute top-3 left-4 bg-transparent border-none text-[20px] cursor-pointer text-[var(--color-pet-text-secondary)]">✕</button>
        ) : (
          <button onClick={() => setStep(step === 'info2' ? 'info1' : step === 'info1' ? 'category' : 'pet')} className="absolute top-3 left-4 bg-transparent border-none text-[14px] font-semibold cursor-pointer text-[var(--color-pet-text-secondary)] flex items-center gap-1">
            ← 이전
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === 'pet' && (
          <motion.div key="pet" variants={pageVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35 }}
            className="min-h-[calc(100vh-60px)] flex flex-col items-center px-6 pt-8 pb-10">
            <div className="text-[48px] mb-4">🐾</div>
            <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
              <Paragraph.Text>누구를 위한 소모품인가요?</Paragraph.Text>
            </Paragraph>
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 28 }}>
              <Paragraph.Text>반려동물을 선택해주세요</Paragraph.Text>
            </Paragraph>
            <div className="w-full max-w-[400px] flex flex-col gap-3">
              {pets.map(p => {
                const on = selPets.includes(p.id);
                return (
                  <Card key={p.id} elevation="low" radius="large" padding="medium"
                    htmlStyle={{ border: on ? '2px solid #3182f6' : '2px solid transparent', cursor: 'pointer' }}
                    onClick={() => setSelPets(on ? selPets.filter(x=>x!==p.id) : [...selPets, p.id])}>
                    <div className="flex items-center gap-3">
                      <PetSticker imageUrl={p.imageUrl} size={44} />
                      <span className="text-[15px] font-semibold text-[var(--color-pet-text-dark)] flex-1">{p.name}</span>
                      {on && <span className="text-[20px]">✅</span>}
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="w-full max-w-[400px] mt-6">
              <Button display="block" size="xlarge" color="primary"
                disabled={selPets.length === 0}
                onClick={() => setStep('category')}>
                다음
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'category' && (
          <motion.div key="cat" variants={pageVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35 }}
            className="min-h-[calc(100vh-60px)] flex flex-col items-center px-6 pt-8 pb-10">
            <div className="text-[48px] mb-4">📦</div>
            <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
              <Paragraph.Text>어떤 종류의 소모품인가요?</Paragraph.Text>
            </Paragraph>
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 28 }}>
              <Paragraph.Text>카테고리를 선택해주세요</Paragraph.Text>
            </Paragraph>
            <div className="w-full max-w-[400px] grid grid-cols-4 gap-2.5">
              {CATS.map(c => (
                <Card key={c.id} elevation="low" radius="large" padding="small"
                  htmlStyle={{ border: catId === c.id ? '2px solid #3182f6' : '2px solid transparent', cursor: 'pointer', textAlign: 'center' }}
                  onClick={() => setCatId(c.id)}>
                  <div className="w-[72px] h-[72px] mx-auto mb-1 flex items-center justify-center">
                    {(() => {
                      const petId = selPets[0];
                      const pet = pets.find(p => p.id === petId);
                      const isCat = pet?.species === 'CAT';
                      const sticker = stickerImages[petId]?.find(s => s.categoryId === c.id);
                      const src = sticker?.imageUrl || (isCat ? c.catImage : c.dogImage);
                      return (
                        <Image 
                          src={src} 
                          alt={c.name} 
                          width={60} 
                          height={60} 
                          className="object-contain"
                          unoptimized={!!sticker}
                        />
                      );
                    })()}
                  </div>


                  <div className="text-[12px] font-semibold" style={{ color: c.color }}>{c.name}</div>
                </Card>
              ))}
            </div>

            <div className="w-full max-w-[400px] sticky bottom-0 mt-auto pt-4 pb-4 bg-[var(--color-pet-bg)] z-10">
              <Button display="block" size="xlarge" color="primary" onClick={() => setStep('info1')}>다음</Button>
            </div>
          </motion.div>
        )}

        {step === 'info1' && (
          <motion.div key="info1" variants={pageVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35 }}
            className="min-h-[calc(100vh-60px)] flex flex-col items-center px-6 pt-8 pb-10">
            <div className="text-[48px] mb-4">📋</div>
            <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
              <Paragraph.Text>소모품 정보를 입력해주세요</Paragraph.Text>
            </Paragraph>
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 28 }}>
              <Paragraph.Text>기본 이름과 교체 주기를 적어주세요.</Paragraph.Text>
            </Paragraph>
            <div className="w-full max-w-[400px] flex flex-col gap-4">
              <Card elevation="low" radius="large" padding="medium">
                <div className="text-[14px] font-bold text-[var(--color-pet-text-dark)] mb-2.5">✏️ 소모품 이름</div>
                <input type="text" value={name} onChange={e => { setName(e.target.value); setError(''); }}
                  placeholder="예: 오리젠 퍼피 사료 11.4kg" className={inputCls} autoFocus />
              </Card>
              <Card elevation="low" radius="large" padding="medium">
                <div className="text-[14px] font-bold text-[var(--color-pet-text-dark)] mb-2.5">🔄 교체 주기</div>
                <div className="relative mb-3">
                  <input type="number" min="1" value={cycle} onChange={e => { setCycle(e.target.value); setError(''); }}
                    placeholder="주기" className={`${inputCls} pr-10`} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-[var(--color-pet-text-secondary)]">일</span>
                </div>
              </Card>

              {error && (
                <Paragraph typography="t7" color="#dc2626" textAlign="center">
                  <Paragraph.Text>{error}</Paragraph.Text>
                </Paragraph>
              )}
            </div>

            <div className="w-full max-w-[400px] sticky bottom-0 mt-auto pt-4 pb-4 bg-[var(--color-pet-bg)] z-10">
              <Button display="block" size="xlarge" color="primary" onClick={handleNextInfo1}>다음</Button>
            </div>
          </motion.div>
        )}

        {step === 'info2' && (
          <motion.div key="info2" variants={pageVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35 }}
            className="min-h-[calc(100vh-60px)] flex flex-col items-center px-6 pt-8 pb-10">
            <div className="text-[48px] mb-4">📅</div>
            <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
              <Paragraph.Text>마지막 구매 정보를 입력해주세요</Paragraph.Text>
            </Paragraph>
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 28 }}>
              <Paragraph.Text>이제 등록만 하시면 끝나요!</Paragraph.Text>
            </Paragraph>
            <div className="w-full max-w-[400px] flex flex-col gap-4">
              <Card elevation="low" radius="large" padding="medium">
                <div className="text-[14px] font-bold text-[var(--color-pet-text-dark)] mb-2.5">📅 마지막 구매일</div>
                <MiniCal value={lastDate} onChange={setLastDate} />
                {nextDate && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-3 px-4 py-3 rounded-xl bg-[#f0f4ff] flex items-center gap-2.5">
                    <span className="text-[18px]">🔔</span>
                    <div>
                      <div className="text-[11px] text-[var(--color-pet-text-secondary)]">다음 교체 예정일</div>
                      <div className="text-[15px] font-bold text-[#3182f6]">{nextDate}</div>
                    </div>
                  </motion.div>
                )}
              </Card>
              <Card elevation="low" radius="large" padding="medium">
                <div className="text-[14px] font-bold text-[var(--color-pet-text-dark)] mb-2.5">🔗 구매 링크 <span className="font-normal text-[var(--color-pet-text-dim)]">(선택)</span></div>
                <input type="text" value={url} onChange={e => setUrl(e.target.value)}
                  placeholder="https://..." className={inputCls} />
              </Card>

              {error && (
                <Paragraph typography="t7" color="#dc2626" textAlign="center">
                  <Paragraph.Text>{error}</Paragraph.Text>
                </Paragraph>
              )}
            </div>

            <div className="w-full max-w-[400px] sticky bottom-0 mt-auto pt-4 pb-4 bg-[var(--color-pet-bg)] z-10">
              <Button display="block" size="xlarge" color="primary" loading={saving} onClick={handleSave}>
                {isEdit ? '수정하기' : '등록하기'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupplyWizard;
