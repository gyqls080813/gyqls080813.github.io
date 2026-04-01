import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';


import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { Badge } from '@/shared/components/common/Badge';
import { Activity } from '@/shared/components/ui/icon';
import { Skeleton, SkeletonCircle } from '@/shared/components/skeleton/Skeleton';
import { adaptive, colors } from '@/shared/styles/colors';

import { usePets, STICKER_CATEGORIES } from '@/features/pet';
import { getPetDetail } from '@/features/group/api/pet';
import type { PetItem, PetDetailData } from '@/features/group/types/pet';
import { PetDetailView } from './PetDetailView';
import dogDefault from '@/shared/components/ui/default/dog_default.png';
import catDefault from '@/shared/components/ui/default/cat_default.png';
import dogHealtyIcon from '@/shared/components/ui/menu/dog_healty.png';
import catHospitalIcon from '@/shared/components/ui/category/cat_hospital.png';





import { useLifeCycleData } from '@/features/savings/components/lifecycle/useLifeCycleData';
import { LifeCycleChecklistView } from '@/features/savings/components/lifecycle/LifeCycleChecklistView';


// LIFECYCLE_KEYFRAMES
const LIFECYCLE_KEYFRAMES = `
  @keyframes lcFadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lcFadeInTab {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export function PetManagementTab() {
  const router = useRouter();
  const { stickerImages, getStickerByCategory, refresh: refreshPetContext } = usePets();

  const [isHealthOpen, setIsHealthOpen] = useState(false);

  const {
    pets, selectedPetIndex, setSelectedPetIndex,
    lifeCycleData, selectedStageIndex, setSelectedStageIndex,
    stages, selectedStage, currentPet: currentPetRaw,
    lcLoading, stickerImageUrl, updateChecklist,
  } = useLifeCycleData();

  const currentPetTyped = currentPetRaw as PetItem | undefined;
  
  const [selectedPetDetail, setSelectedPetDetail] = useState<PetDetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!currentPetTyped?.id) {
        setSelectedPetDetail(null);
        return;
      }
      setDetailLoading(true);
      try {
        const res = await getPetDetail(currentPetTyped.id);
        setSelectedPetDetail(res.data);
      } catch (err) {
        console.error('[반려동물 상세 조회 실패]', err);
        setSelectedPetDetail(null);
      } finally {
        setDetailLoading(false);
      }
    };
    fetchDetail();
  }, [currentPetTyped?.id, refreshPetContext]);

  if (lcLoading) {
     return <SkeletonLoading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <style>{LIFECYCLE_KEYFRAMES}</style>

      {/* ── Top Pet Selector (드래그 슬라이드 지원) ── */}
      <style>{`.pet-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
          ref={(el) => {
            if (!el) return;
            let isDown = false;
            let startX = 0;
            let scrollLeft = 0;
            el.onmousedown = (e) => {
              isDown = true;
              el.style.cursor = 'grabbing';
              startX = e.pageX - el.offsetLeft;
              scrollLeft = el.scrollLeft;
            };
            el.onmouseleave = () => { isDown = false; el.style.cursor = 'grab'; };
            el.onmouseup = () => { isDown = false; el.style.cursor = 'grab'; };
            el.onmousemove = (e) => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - el.offsetLeft;
              el.scrollLeft = scrollLeft - (x - startX);
            };
          }}
          className="pet-scroll"
          style={{
            display: 'flex', gap: '1rem', overflowX: 'auto',
            padding: '0.5rem 0.25rem 1.25rem 0.25rem',
            scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
            animation: 'lcFadeInUp 0.5s ease-out both',
            cursor: 'grab', userSelect: 'none',
          }}
        >
          {pets.map((p, idx) => {
            const isSelected = selectedPetIndex === idx;
            const hasSticker = stickerImages[p.id]?.some(s => s.categoryId === STICKER_CATEGORIES.GROOMING);
            return (
              <div 
                key={p.id} 
                onClick={() => setSelectedPetIndex(idx)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '0.4rem', cursor: 'pointer', flexShrink: 0,
                  opacity: isSelected ? 1 : 0.6, transition: 'all 0.3s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '50%', padding: '3px',
                  background: isSelected ? 'linear-gradient(45deg, #8FBC8F, #3cb371)' : 'transparent',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{ 
                    width: '100%', height: '100%', borderRadius: '50%', backgroundColor: p.species === 'DOG' ? 'rgba(194,149,106,0.15)' : 'rgba(106,149,194,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid white'
                  }}>
                    {hasSticker ? (
                      <Image 
                        src={getStickerByCategory(p.id, STICKER_CATEGORIES.GROOMING) || ''} 
                        alt={p.name} 
                        width={60} 
                        height={60} 
                        className="w-full h-full object-cover"
                        unoptimized
                      />

                    ) : (
                      <Image 
                        src={p.species === 'DOG' ? dogDefault : catDefault} 
                        alt={p.name} 
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    )}


                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? adaptive.grey900 : adaptive.grey500, transition: 'all 0.2s' }}>
                  {p.name.length > 4 ? p.name.substring(0, 4) + '..' : p.name}
                </span>
              </div>
            );
          })}
          
          <div 
            onClick={() => router.push('/onboarding/step2?from=mypage')}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '0.4rem', cursor: 'pointer', flexShrink: 0, opacity: 0.7,
            }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', padding: '3px', border: '2px dashed #b0a090', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem', color: '#b0a090' }}>+</span>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: adaptive.grey500 }}>추가</span>
          </div>
        </div>

      {pets.length === 0 ? (
        <div className="py-10 text-center flex flex-col items-center justify-center gap-4">
            <span className="text-[3rem] opacity-70">🐾</span>
            <p className="text-[0.95em] font-semibold" style={{ color: 'var(--color-pet-text-secondary, #8c7d6e)' }}>
            아직 등록된 반려동물이 없습니다.
            </p>
            <p className="text-[0.8em]" style={{ color: 'var(--color-pet-text-muted, #b0a090)' }}>
            상단의 <span className="font-bold border px-2 py-0.5 rounded-full">+ 추가</span> 모양을 눌러 아이를 먼저 등록해주세요!
            </p>
        </div>
      ) : (
        <>
            {/* ── Pet Detail & Health Slot ── */}
            {detailLoading ? (
                <div className="flex justify-center p-10"><SkeletonCircle size={50} /></div>
            ) : selectedPetDetail ? (
                <div style={{ animation: 'lcFadeInUp 0.5s ease-out 0.1s both' }}>
                    <PetDetailView 
                        key={selectedPetDetail.id}
                        pet={selectedPetDetail}
                        onDeleted={async () => {
                            await refreshPetContext();
                            setSelectedPetIndex(0);
                        }}

                        onUpdated={() => refreshPetContext()}
                        healthSlot={selectedStage && currentPetTyped ? (
                            <div className="flex flex-col">
                                <button 
                                  onClick={() => setIsHealthOpen(!isHealthOpen)}
                                  className="w-full p-4 flex items-center justify-between transition-colors hover:bg-gray-100/50 active:bg-gray-100 cursor-pointer border-none bg-transparent"
                                >
                                  <div className="flex items-center gap-3">
                                      {(() => {
                                        // 3: MEDICAL/Hospital category
                                        const petId = currentPetTyped?.id || 0;
                                        const stickers = stickerImages[petId];
                                        const aiSticker = stickers?.find(s => s.categoryId === 3)?.imageUrl;
                                        const defaultIcon = currentPetTyped?.species === 'DOG' ? dogHealtyIcon : catHospitalIcon;
                                        
                                        return (
                                          <div className="w-10 h-10 rounded-full bg-emerald-50 bg-opacity-80 flex items-center justify-center shrink-0 overflow-hidden">
                                            <Image 
                                              src={aiSticker || defaultIcon} 
                                              alt="Health" 
                                              width={30} 
                                              height={30}
                                              className="object-contain"
                                              unoptimized={!!aiSticker}
                                            />
                                          </div>
                                        );

                                      })()}
                                    <div className="flex flex-col items-start gap-0.5 text-left">
                                      <span className="font-bold text-gray-800 text-[1rem] leading-snug">이건 하셨나요?<br/>반려동물 체크리스트!</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">

                                    {lifeCycleData?.currentStageName && (
                                        <Badge size="small" color="green" variant="fill" className="!bg-[#8FBC8F] !text-white !rounded-full px-2 py-0.5 font-bold shadow-sm">
                                            {lifeCycleData.currentStageName.split(' ')[0]}
                                        </Badge>
                                    )}
                                    <span className={`transition-transform duration-300 ml-1 ${isHealthOpen ? 'rotate-180' : ''}`} style={{ color: '#b0a090' }}>
                                      ▼
                                    </span>
                                  </div>
                                </button>
            
                                <div className={`transition-all duration-[400ms] ease-in-out overflow-hidden px-4 ${isHealthOpen ? 'max-h-[2000px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                                    {/* Stages Tab Bar */}
                                    {stages.length > 0 && (
                                    <div style={{
                                        display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto',
                                        scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
                                        paddingBottom: '0.25rem', paddingTop: '0.5rem',
                                    }}>
                                    {stages.map((stage, idx) => {
                                        const isSelected = selectedStageIndex === idx;
                                        const cleanName = stage.stageName.split(' ')[0];
                                        return (
                                            <button
                                                key={stage.stageName}
                                                onClick={() => setSelectedStageIndex(idx)}
                                                style={{
                                                flex: '1 0 auto',
                                                minWidth: '60px',
                                                padding: '0.55rem 0.9rem',
                                                borderRadius: '1rem',
                                                border: `1.5px solid ${isSelected ? '#8FBC8F' : 'transparent'}`,
                                                background: isSelected ? '#8FBC8F' : 'rgba(255, 255, 255, 0.8)',
                                                backdropFilter: isSelected ? 'none' : 'blur(4px)',
                                                color: isSelected ? colors.white : adaptive.grey600,
                                                fontSize: '0.86rem',
                                                fontWeight: isSelected ? 800 : 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: isSelected ? '0 4px 12px rgba(143, 188, 143, 0.25)' : '0 1px 3px rgba(0,0,0,0.02)',
                                                whiteSpace: 'nowrap',
                                                textAlign: 'center',
                                                transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                                                }}
                                            >
                                                {cleanName}
                                            </button>
                                        );
                                    })}
                                    </div>
                                    )}
            
                                    {/* Guide Box */}
                                    <Box
                                        direction="row" gap="small" padding="medium"
                                        htmlStyle={{
                                        background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255, 255, 255, 0.9)', borderRadius: '1.25rem',
                                        marginBottom: '0.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                        alignItems: 'flex-start',
                                        }}
                                    >
                                        <div style={{ marginTop: '0.1rem', background: '#ecfdf5', padding: '0.4rem', borderRadius: '50%' }}>
                                            <Activity size="small" color="#10b981" />
                                        </div>
                                        <Paragraph typography="st6" color={adaptive.grey800} style={{ lineHeight: 1.6, fontWeight: 600 }}>
                                            {selectedStage.petMessage?.detail || selectedStage.stageSummary}
                                        </Paragraph>
                                    </Box>
            
                                    {/* Checklist */}
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <LifeCycleChecklistView
                                            key={`${currentPetTyped.id}-${selectedStageIndex}`} 
                                            title="건강 관리 점검"
                                            stageName={selectedStage.stageName.split(' ')[0]} 
                                            lifeStageId={selectedStage.lifeStageId || 0}
                                            checklist={selectedStage.checklist}
                                            petId={currentPetTyped.id}
                                            stickerImageUrl={stickerImageUrl}
                                            onToggle={async (category: string, isChecked: boolean) => {
                                                if (selectedStage.lifeStageId) {
                                                    await updateChecklist(selectedStage.lifeStageId, category, isChecked);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : undefined}
                    />
                </div>
            ) : null}
        </>
      )}

    </div>
  );
}

const SkeletonLoading = () => (
    <div className="flex flex-col gap-4 pt-2">
        <div style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0.25rem', overflowX: 'auto' }}>
            {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                    <SkeletonCircle size={60} />
                    <Skeleton width={40} height={12} />
                </div>
            ))}
        </div>
        <div className="rounded-[1.25rem] p-5 bg-white border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <SkeletonCircle size={72} />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton width="60%" height={24} />
                <Skeleton width="40%" height={16} />
              </div>
            </div>
            <Skeleton width="100%" height={40} />
        </div>
        <div className="rounded-[1.25rem] p-5 bg-white border border-gray-100 shadow-sm h-[200px] flex items-center justify-center">
             <Skeleton width="100%" height="80%" />
        </div>
    </div>
);
