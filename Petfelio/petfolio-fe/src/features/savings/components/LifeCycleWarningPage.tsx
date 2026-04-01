import React from 'react';
import Image from 'next/image';
import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { adaptive, colors } from '@/shared/styles/colors';
import { useLifeCycleData } from './lifecycle/useLifeCycleData';
import { LifeCycleChecklistView } from './lifecycle/LifeCycleChecklistView';
import { Activity } from '@/shared/components/ui/icon';
import type { PetItem } from '@/features/group/types/pet';
import { Badge } from '@/shared/components/common/Badge';

// Import Lottie 
import dogDefaultImg from '@/shared/components/ui/default/dog_default.png';
import catDefaultImg from '@/shared/components/ui/default/cat_default.png';
import { usePets, STICKER_CATEGORIES } from '@/features/pet';
import { Skeleton, SkeletonCircle, SkeletonCard } from '@/shared/components/skeleton/Skeleton';

/* ── 글로벌 애니메이션 키프레임 ─── */
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

const LifeCycleWarningPage: React.FC = () => {
  const {
    pets,
    selectedPetIndex,
    setSelectedPetIndex,
    lifeCycleData,
    selectedStageIndex,
    setSelectedStageIndex,
    stages,
    selectedStage,
    currentPet: currentPetRaw,
    lcLoading,
    stickerImageUrl,
    updateChecklist,
  } = useLifeCycleData();

  const { getStickerByCategory, stickerImages } = usePets();

  const currentPetTyped = currentPetRaw as PetItem | undefined;

  // 로딩 중이면 실제 컴포넌트와 동일한 구조의 스켈레톤 표시
  if (lcLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
          padding: '1rem',
          boxSizing: 'border-box',
          paddingBottom: '8rem',
        }}
      >
        {/* ── Pet Selector 스켈레톤 (실제와 동일한 구조) ── */}
        <div
          style={{
            display: 'flex', gap: '1rem', overflowX: 'auto',
            padding: '0.5rem 0.25rem 1.25rem 0.25rem',
            scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
          }}
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '0.4rem', flexShrink: 0,
                opacity: idx === 0 ? 1 : 0.6,
              }}
            >
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%', padding: '3px',
                background: idx === 0 ? 'linear-gradient(45deg, #8FBC8F, #3cb371)' : 'transparent',
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  overflow: 'hidden', border: '2px solid white',
                }}>
                  <SkeletonCircle size={54} />
                </div>
              </div>
              <Skeleton width={36} height={12} />
            </div>
          ))}
        </div>

        {/* ── Header Area 스켈레톤 (실제 Box 컴포넌트와 동일) ── */}
        <Box
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          htmlStyle={{ marginBottom: '1.25rem', padding: '0 0.25rem' }}
        >
          <Box direction="row" alignItems="center" gap="small">
            <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
                 style={{ background: 'rgba(194, 149, 106, 0.15)' }}>
              <SkeletonCircle size={44} />
            </div>
            <Box direction="column">
              <Skeleton width={150} height={18} style={{ marginBottom: 4 }} />
              <Skeleton width={110} height={13} />
            </Box>
          </Box>
          <Skeleton width={100} height={28} borderRadius={20} />
        </Box>

        {/* ── Stages Tab Bar 스켈레톤 (실제 버튼과 동일 스타일) ── */}
        <div style={{
          display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto',
          padding: '0 0.25rem', paddingBottom: '0.5rem',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
        }}>
          {['중년기', '청년기', '유년기', '노년기'].map((name, idx) => (
            <div
              key={idx}
              style={{
                flex: '1 0 auto',
                minWidth: '70px',
                padding: '0.65rem 1rem',
                borderRadius: '1rem',
                border: idx === 0 ? '1.5px solid #8FBC8F' : '1.5px solid transparent',
                background: idx === 0 ? '#8FBC8F' : 'rgba(255, 255, 255, 0.6)',
                backdropFilter: idx === 0 ? 'none' : 'blur(4px)',
                boxShadow: idx === 0 ? '0 8px 16px rgba(143, 188, 143, 0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
                textAlign: 'center' as const,
              }}
            >
              <Skeleton width="100%" height={16} borderRadius={4} />
            </div>
          ))}
        </div>

        {/* ── Guide Box 스켈레톤 (실제와 동일한 glassmorphism 스타일) ── */}
        <Box
          direction="row"
          gap="small"
          padding="medium"
          htmlStyle={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '1.25rem',
            marginBottom: '0.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ marginTop: '0.1rem', background: '#ecfdf5', padding: '0.4rem', borderRadius: '50%' }}>
            <Skeleton width={16} height={16} borderRadius="50%" />
          </div>
          <div style={{ flex: 1 }}>
            <Skeleton width="95%" height={14} style={{ marginBottom: 8 }} />
            <Skeleton width="70%" height={14} />
          </div>
        </Box>

        {/* ── Checklist 스켈레톤 (실제 SavingsChecklist와 동일한 구조) ── */}
        <Box direction="column" gap="medium" className="w-full">
          {/* Title bar — 실제와 동일 */}
          <Box direction="row" alignItems="center" justifyContent="space-between" className="px-1">
            <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-xl shadow-sm border border-white/50">
              <Skeleton width={120} height={18} />
            </div>
            <div className="!bg-[#333] !rounded-full py-1.5 px-4 shadow-sm" style={{ borderRadius: 9999, background: '#333' }}>
              <Skeleton width={60} height={16} />
            </div>
          </Box>

          {/* Checklist items — 실제 SavingsChecklist 아이템과 동일한 클래스 */}
          <Box direction="column" gap="small">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl border-[1.5px] bg-white/70 border-white backdrop-blur-sm shadow-sm"
              >
                <div className="shrink-0">
                  <Skeleton width={28} height={28} borderRadius={6} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <Skeleton width="35%" height={16} />
                  <Skeleton width="85%" height={13} />
                </div>
              </div>
            ))}
          </Box>
        </Box>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        padding: '1rem',
        boxSizing: 'border-box',
        paddingBottom: '8rem',
      }}
    >
      <style>{LIFECYCLE_KEYFRAMES}</style>

      {/* ── Top Pet Selector (Instagram Story Style) ────────────── */}
      {pets.length > 1 && (
        <div
          style={{
            display: 'flex', gap: '1rem', overflowX: 'auto',
            padding: '0.5rem 0.25rem 1.25rem 0.25rem',
            scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
            animation: 'lcFadeInUp 0.5s ease-out both',
          }}
        >
          {pets.map((p, idx) => {
            const isSelected = selectedPetIndex === idx;
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
                    {(() => {
                      const hasSticker = stickerImages[p.id]?.some(s => s.categoryId === STICKER_CATEGORIES.GROOMING);
                      if (hasSticker) {
                        return (
                          <img 
                            src={getStickerByCategory(p.id, STICKER_CATEGORIES.GROOMING)} 
                            alt={p.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        );
                      }
                      return (
                        <Image 
                          src={p.species === 'DOG' ? dogDefaultImg : catDefaultImg} 
                          alt={p.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      );
                    })()}
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? adaptive.grey900 : adaptive.grey500, transition: 'all 0.2s' }}>
                  {p.name.length > 4 ? p.name.substring(0, 4) + '..' : p.name}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Header Area ─────────────────────────────────────────── */}
      <Box
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        htmlStyle={{
          marginBottom: '1.25rem', padding: '0 0.25rem',
          animation: 'lcFadeInUp 0.5s ease-out 0.1s both',
        }}
      >
        <Box direction="row" alignItems="center" gap="small">
          {/* Sticker Avatar */}
          {currentPetTyped && (
            <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
                 style={{ background: currentPetTyped.species === 'DOG' ? 'rgba(194, 149, 106, 0.15)' : 'rgba(106, 149, 194, 0.15)' }}>
              {(() => {
                const hasSticker = stickerImages[currentPetTyped.id]?.some(s => s.categoryId === STICKER_CATEGORIES.GROOMING);
                if (hasSticker) {
                  return (
                    <img 
                      src={getStickerByCategory(currentPetTyped.id, STICKER_CATEGORIES.GROOMING)}
                      alt={currentPetTyped.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  );
                }
                return (
                  <Image 
                    src={currentPetTyped.species === 'DOG' ? dogDefaultImg : catDefaultImg} 
                    alt={currentPetTyped.name}
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                );
              })()}
            </div>
          )}
          <Box direction="column">
            <Paragraph typography="t4" fontWeight="bold" color={adaptive.grey900}>
              {currentPetTyped?.name ? `${currentPetTyped.name}의 건강지도` : '연령별 건강 지도'}
            </Paragraph>
            <Paragraph typography="st7" color={adaptive.grey500}>
              성장 단계별 맞춤 가이드
            </Paragraph>
          </Box>
        </Box>

        {/* Current Age Badge */}
        {lifeCycleData?.currentStageName && (
          <Badge 
            size="small" 
            color="green" 
            variant="fill" 
            className="!bg-[#8FBC8F] !text-white !rounded-full px-3 py-1.5 font-bold shadow-md"
          >
            현재 나이: {lifeCycleData.currentStageName.split(' ')[0]}
          </Badge>
        )}
      </Box>

      {/* ── Stages Tab Bar ─────────────────────────────────────── */}
      {stages.length > 0 && (
        <div style={{
          display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto',
          padding: '0 0.25rem', paddingBottom: '0.5rem',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
          animation: 'lcFadeInUp 0.5s ease-out 0.2s both',
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
                  minWidth: '70px',
                  padding: '0.65rem 1rem',
                  borderRadius: '1rem',
                  border: `1.5px solid ${isSelected ? '#8FBC8F' : 'transparent'}`,
                  background: isSelected ? '#8FBC8F' : 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: isSelected ? 'none' : 'blur(4px)',
                  color: isSelected ? colors.white : adaptive.grey600,
                  fontSize: '0.9rem',
                  fontWeight: isSelected ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected ? '0 8px 16px rgba(143, 188, 143, 0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
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

      {/* ── Checklist Area ─────────────────────────────────────── */}
      {selectedStage && currentPetTyped ? (
          <div
            key={`stage-${selectedStageIndex}`}
            style={{ animation: 'lcFadeInTab 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <Box direction="column" gap="medium">
              {/* Stage Guide Box (Glassmorphism) */}
              <Box
                direction="row"
                gap="small"
                padding="medium"
                htmlStyle={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '1.25rem',
                  marginBottom: '0.5rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                  alignItems: 'flex-start',
                  animation: 'lcFadeInUp 0.4s ease-out 0.1s both',
                }}
              >
                <div style={{ marginTop: '0.1rem', background: '#ecfdf5', padding: '0.4rem', borderRadius: '50%' }}>
                  <Activity size="small" color="#10b981" />
                </div>
                <Paragraph typography="st6" color={adaptive.grey800} style={{ lineHeight: 1.6, fontWeight: 600 }}>
                  {selectedStage.petMessage?.detail || selectedStage.stageSummary}
                </Paragraph>
              </Box>

              <div style={{ animation: 'lcFadeInUp 0.5s ease-out 0.2s both' }}>
                <LifeCycleChecklistView
                  key={`${currentPetTyped.id}-${selectedStageIndex}`} 
                  title="건강 관리 체크리스트"
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
            </Box>
          </div>
      ) : (
        <Box padding="xlarge" alignItems="center" justifyContent="center" htmlStyle={{ marginTop: '2rem', animation: 'lcFadeInUp 0.5s ease-out both' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.8 }}>🏥</div>
          <Paragraph typography="t5" fontWeight="bold" color={adaptive.grey800} textAlign="center" style={{ marginBottom: '0.5rem' }}>
            건강 관리 데이터를 불러올 수 없어요
          </Paragraph>
          {pets.length === 0 ? (
            <Paragraph typography="st6" color={adaptive.grey500} textAlign="center">
              먼저 소중한 반려동물을 등록하여<br/>건강 지도와 맞춤 관리 기능을 시작해보세요.
            </Paragraph>
          ) : (
            <Paragraph typography="st6" color={adaptive.grey500} textAlign="center">
              해당 품종({currentPetTyped?.breed || '알 수 없음'})과 나이에 맞는<br/>생애주기 정보가 아직 준비되지 않았거나<br/>서버 연결 문제가 발생했습니다.
            </Paragraph>
          )}
        </Box>
      )}
    </div>
  );
};

export default LifeCycleWarningPage;
