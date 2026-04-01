import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { Badge } from '@/shared/components/common/Badge';
import { getMyPets } from '@/features/user/api/myPets';
import { updateConsumable } from '../api/updateConsumableApi';
import { getConsumableDetail } from '../api/getConsumableDetailApi';
import type { UpdateConsumableRequest } from '../types/consumable';

interface SupplyEditSheetProps {
  isOpen: boolean;
  consumableId: number | null;
  onClose: () => void;
  onSave: () => void;
}

import { CATEGORY_META } from '@/shared/constants/categories';

const CATEGORIES = CATEGORY_META;

export function SupplyEditSheet({ isOpen, consumableId, onClose, onSave }: SupplyEditSheetProps) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [purchaseCycleDays, setPurchaseCycleDays] = useState<number>(30);
  const [lastPurchaseDate, setLastPurchaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [purchaseUrl, setPurchaseUrl] = useState('');
  const [selectedPetIds, setSelectedPetIds] = useState<number[]>([]);
  const [pets, setPets] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingDetail, setFetchingDetail] = useState(false);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        try {
          const res = await getMyPets();
          const petData = (res.data as Array<{id?: number, name: string}>)?.map((p, idx) => ({
            id: p.id || idx + 1, 
            name: p.name
          })) || [];
          setPets(petData);
        } catch (e) {
          console.warn('펫 목록 로드 실패:', e);
        }

        if (consumableId) {
          setFetchingDetail(true);
          try {
            const res = await getConsumableDetail(consumableId);
            const data = res.data;
            if (data) {
              setName(data.name);
              setCategoryId(data.categoryId);
              setPurchaseCycleDays(data.purchaseCycleDays);
              setLastPurchaseDate(data.lastPurchaseDate);
              setPurchaseUrl(data.purchaseUrl || '');
              setSelectedPetIds(data.pets?.map(p => p.petId) || []);
            }
          } catch (e) {
            console.warn('상세 정보 로드 실패:', e);
          } finally {
            setFetchingDetail(false);
          }
        }
      })();
    }
  }, [isOpen, consumableId]);

  const calculateNextDate = (lastDate: string, cycle: number) => {
    const date = new Date(lastDate);
    date.setDate(date.getDate() + (cycle || 0));
    return date.toISOString().split('T')[0];
  };

  const handleSave = async () => {
    if (!consumableId || !name || !categoryId || selectedPetIds.length === 0) return;

    setLoading(true);
    try {
      const nextPurchaseDate = calculateNextDate(lastPurchaseDate, purchaseCycleDays);
      const payload: UpdateConsumableRequest = {
        categoryId,
        name,
        purchaseCycleDays,
        lastPurchaseDate,
        nextPurchaseDate,
        purchaseUrl,
        petIds: selectedPetIds,
      };

      await updateConsumable(consumableId, payload);
      onSave();
      onClose();
    } catch (e) {
      console.warn('소모품 수정 실패:', e);
      alert('수정에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const togglePet = (id: number) => {
    setSelectedPetIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999, backdropFilter: 'blur(4px)' }}
          />

          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: '90vh', backgroundColor: '#fff',
              borderRadius: '24px 24px 0 0', zIndex: 1000, boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
              overflowY: 'auto', padding: '20px', maxWidth: '500px', margin: '0 auto',
            }}
            className="hide-scrollbar"
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#d8d8dc' }} />
            </div>

            <Paragraph typography="t3" fontWeight="bold" color="grey800" style={{ marginBottom: '24px' }}>
              <Paragraph.Text>소모품 정보 수정</Paragraph.Text>
            </Paragraph>

            {fetchingDetail ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>정보를 불러오는 중입니다...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#666', marginBottom: '8px' }}>품목 이름</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #eee', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#666', marginBottom: '8px' }}>카테고리</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategoryId(cat.id)}
                        style={{
                          padding: '12px', borderRadius: '12px', border: categoryId === cat.id ? '2px solid var(--color-pet-caramel)' : '1px solid #eee',
                          backgroundColor: categoryId === cat.id ? '#FFF9F3' : '#fff', fontSize: '0.9rem', fontWeight: categoryId === cat.id ? 700 : 500,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                        }}
                      >
                        <Image src={cat.image} alt={cat.name} width={20} height={20} className="object-contain" />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#666', marginBottom: '8px' }}>관련 반려동물</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {pets.map((pet) => (
                      <button
                        key={pet.id}
                        type="button"
                        onClick={() => togglePet(pet.id)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      >
                        <Badge
                          size="medium"
                          color={selectedPetIds.includes(pet.id) ? 'blue' : 'grey'}
                          variant={selectedPetIds.includes(pet.id) ? 'fill' : 'outline'}
                          className="px-4 py-2"
                        >
                          {pet.name}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#666', marginBottom: '8px' }}>구매 주기(일)</label>
                    <input
                      type="number"
                      value={purchaseCycleDays}
                      onChange={(e) => setPurchaseCycleDays(Number(e.target.value))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #eee' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#666', marginBottom: '8px' }}>최근 구매일</label>
                    <input
                      type="date"
                      value={lastPurchaseDate}
                      onChange={(e) => setLastPurchaseDate(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #eee' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#666', marginBottom: '8px' }}>구매 링크 (선택)</label>
                  <input
                    type="url"
                    value={purchaseUrl}
                    onChange={(e) => setPurchaseUrl(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #eee' }}
                  />
                </div>

                <div style={{ marginTop: '10px', paddingBottom: '20px' }}>
                  <Button
                    display="block" size="large" color="primary"
                    onClick={handleSave}
                    disabled={loading || !name || selectedPetIds.length === 0}
                  >
                    {loading ? '수정 중...' : '변경사항 저장하기'}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
