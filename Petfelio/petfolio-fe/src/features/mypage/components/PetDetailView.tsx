import React, { useState, useRef } from 'react';

import Image from 'next/image';


import { motion, AnimatePresence } from 'framer-motion';
import { Select } from '@/shared/components/common/Select';
import { getPetDetail, deletePet, updatePet } from '@/features/group/api/pet';

import { usePets } from '@/features/pet/context/PetContext';
import { deletePetImage } from '@/features/user/api/deletePetImage';
import ConfirmModal from '@/shared/components/common/ConfirmModal';
import type { PetDetailData, UpdatePetRequest } from '@/features/group/types/pet';

import dogDefault from '@/shared/components/ui/default/dog_default.png';
import catDefault from '@/shared/components/ui/default/cat_default.png';


interface PetDetailViewProps {
  pet: PetDetailData;
  onDeleted: () => void;
  onUpdated: () => void;
  healthSlot?: React.ReactNode;
}

export const PetDetailView: React.FC<PetDetailViewProps> = ({ pet, onDeleted, onUpdated, healthSlot }) => {
  const [selectedPet, setSelectedPet] = useState<PetDetailData>(pet);
  const [imageUrl, setImageUrl] = useState<string | null>(pet.image_url || pet.imageUrl || null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<UpdatePetRequest>({});

  const [deleteTarget, setDeleteTarget] = useState<PetDetailData | null>(null);
  const [deletingImage, setDeletingImage] = useState(false);
  const [memoTagInput, setMemoTagInput] = useState('');
  const [forceReset, setForceReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadSticker, stickerStatus, fetchStickers, stickerImages, mainPetId, setMainPetId } = usePets();
  const currentStickerStatus = stickerStatus[selectedPet.id] || 'idle';
  const petStickers = stickerImages[selectedPet.id] || [];
  const inputClass = "w-full px-4 py-3.5 text-[0.95rem] font-semibold rounded-[12px] bg-gray-50 border border-transparent outline-none text-gray-800 transition-colors focus:bg-gray-100 focus:border-gray-200 placeholder-gray-400";

  const startEditing = () => {
    setEditForm({
      name: selectedPet.name,
      species: selectedPet.species,
      breed: selectedPet.breed,
      birthdate: selectedPet.birthdate,
      weight: selectedPet.weight,
      gender: selectedPet.gender,
      is_neutered: selectedPet.is_neutered,
      memo: selectedPet.memo,
    });
    setEditing(true);
  };


  const handleSaveEdit = async () => {
    try {
      await updatePet(selectedPet.id, editForm);
      const res = await getPetDetail(selectedPet.id);
      setSelectedPet(res.data);
      if (res.data.image_url) setImageUrl(res.data.image_url);
      setEditing(false);
      onUpdated();
    } catch (err) {
      console.error('[반려동물 수정 실패]', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteTarget(null);
    try {
      await deletePet(deleteTarget.id);
      onDeleted();
    } catch (err) {
      console.error('[반려동물 삭제 실패]', err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setForceReset(false);

    // 기존 스티커가 있으면 먼저 삭제한 뒤 새로 업로드
    const hasExisting = petStickers && petStickers.length > 0;
    if (hasExisting) {
      try {
        await deletePetImage(selectedPet.id);
        setImageUrl(null);
      } catch (err) {
        console.error('[기존 이미지 삭제 실패]', err);
      }
    }

    await uploadSticker(selectedPet.id, file);
  };

  const handleDeleteImage = async () => {
    try {
      setDeletingImage(false);
      await deletePetImage(selectedPet.id);
      setImageUrl(null);
      setForceReset(true);
      // Wait slightly so SSE status override and UI apply seamlessly
      await fetchStickers(selectedPet.id);
    } catch (err) {
      console.error('[이미지 삭제 실패]', err);
    }
  };

  const isDog = selectedPet.species === 'DOG';

  return (
    <div className="flex flex-col gap-4">

      {/* ─── 프로필 카드 ─── */}
      <div
        className="rounded-3xl overflow-hidden flex flex-col bg-white border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.03)] relative"
      >
        <div className="p-6 pb-5 relative">
          {/* 읽기 전용 모드일 때만 액션 버튼 (우측 상단 텍스트 링크) */}
          {!editing && (
            <div className="absolute top-5 right-5 flex items-center gap-3 z-10">
              <button onClick={startEditing} className="text-[0.8rem] font-bold text-gray-400 bg-transparent border-none cursor-pointer hover:text-gray-600 transition-colors">수정</button>
              <button onClick={() => setDeleteTarget(selectedPet)} className="text-[0.8rem] font-bold text-red-400 bg-transparent border-none cursor-pointer hover:text-red-500 transition-colors">삭제</button>
            </div>
          )}

          {/* 상단: 아바타 + 이름/정보 */}
          <div className="flex items-start gap-4">
            
            <div className="flex items-center gap-5 flex-1 min-w-0 pr-12">
              {/* 아바타 영역 */}
              <div className="flex-shrink-0 relative group">
                <div className="w-[84px] h-[84px] rounded-[24px] flex items-center justify-center overflow-hidden bg-gray-50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageUrl} alt={selectedPet.name} className="w-full h-full object-cover" />
                  ) : (
                    <Image 
                      src={isDog ? dogDefault : catDefault}
                      alt={selectedPet.name}
                      width={84}
                      height={84}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  )}

                </div>
                
                {/* 사진 삭제 오버레이 버튼 */}
                {(imageUrl || (petStickers && petStickers.length > 0)) && currentStickerStatus !== 'processing' && currentStickerStatus !== 'uploading' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDeletingImage(true); }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white cursor-pointer z-10 shadow-sm transition-opacity"
                    title="사진 삭제"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}

                {/* 홈 화면 대표 반려동물 설정 오버레이 버튼 */}
                {!editing && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setMainPetId(selectedPet.id); }}
                    className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white cursor-pointer z-10 shadow-sm transition-colors ${
                      mainPetId === selectedPet.id
                        ? 'bg-indigo-500 hover:bg-indigo-600 ring-2 ring-indigo-200'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    title={mainPetId === selectedPet.id ? '✨ 홈 화면 대표 반려동물입니다' : '🏠 홈 화면 대표 반려동물로 설정'}
                  >
                    <span className="text-[14px]">🏠</span>
                  </button>
                )}
              </div>

              {/* 제목부 (읽기 / 편집) */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  {editing ? (
                    <motion.div
                      key="editing"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-2 w-full"
                    >
                      <input value={editForm.name || ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-3 py-2 text-[1.1rem] font-bold rounded-[10px] bg-gray-50 border border-transparent outline-none text-gray-800 transition-colors focus:bg-gray-100" placeholder="이름" />
                      <input value={editForm.breed || ''} onChange={e => setEditForm(f => ({ ...f, breed: e.target.value }))}
                        className="w-full px-3 py-2 text-[0.85rem] font-semibold rounded-[10px] bg-gray-50 border border-transparent outline-none text-gray-800 transition-colors focus:bg-gray-100" placeholder="품종" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="readonly"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-1.5 pt-1"
                    >
                      <span className="text-[1.3rem] font-extrabold tracking-tight text-gray-900 truncate">
                        {selectedPet.name}
                      </span>
                      <span className="text-[0.85rem] font-semibold text-gray-500 truncate">
                        {selectedPet.birthdate || '생일 입력'} · {selectedPet.breed || '종 미입력'}
                      </span>
                      {/* 수동 태그 (메모) 개별 표시 */}
                      {selectedPet.memo && (() => {
                        const tags = selectedPet.memo.split(',').map(t => t.trim()).filter(Boolean);
                        if (tags.length === 0) return null;
                        return (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {tags.map((tag, idx) => (
                              <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-gray-100 text-gray-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* 건강 및 생애주기 슬롯 (읽기 모드일 때만 표시) */}
        <AnimatePresence>
          {!editing && healthSlot && (
            <motion.div
              key="health-slot"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="border-t border-gray-100 bg-gray-50/50 overflow-hidden"
            >
              {healthSlot}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── 기존 마이페이지 수정 뷰 카드 (편집 모드 전용, Toss 스타일 폼) ─── */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex flex-col gap-4 overflow-hidden"
          >
            {/* 기본 정보 카드 */}
            <div className="rounded-3xl p-6 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-gray-100">
            <div className="text-[1rem] font-extrabold text-gray-900 mb-4">
              기본 정보
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.8rem] font-bold text-gray-500 pl-1">생년월일</span>
                <input type="date" value={editForm.birthdate || ''} onChange={e => setEditForm(f => ({ ...f, birthdate: e.target.value }))} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5" style={{ zIndex: 30, position: 'relative' }}>
                  <span className="text-[0.8rem] font-bold text-gray-500 pl-1">성별</span>
                  <Select
                    options={[{ label: '수컷', value: 'MALE' }, { label: '암컷', value: 'FEMALE' }]}
                    value={editForm.gender || 'MALE'}
                    onChange={(val) => setEditForm(f => ({ ...f, gender: val as 'MALE' | 'FEMALE' }))}
                    fullWidth
                  />
                </div>
                <div className="flex flex-col gap-1.5" style={{ zIndex: 20 }}>
                  <span className="text-[0.8rem] font-bold text-gray-500 pl-1">몸무게 (kg)</span>
                  <input type="number" step="0.1" value={editForm.weight ?? ''} onChange={e => setEditForm(f => ({ ...f, weight: parseFloat(e.target.value) || 0 }))} className={inputClass} placeholder="입력" />
                </div>
              </div>
            </div>
          </div>

          {/* 건강 특이사항 카드 */}
          <div className="rounded-3xl p-6 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-gray-100">
            <div className="text-[1rem] font-extrabold text-gray-900 mb-4">
              건강 및 진료 정보
            </div>

            {/* 중성화 여부 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 mb-4" style={{ zIndex: 10, position: 'relative' }}>
              <span className="text-[0.95rem] font-bold text-gray-800">
                중성화 여부
              </span>
              <div className="w-[120px]">
                <Select
                  options={[{ label: '수술 완료', value: 'true' }, { label: '미완료', value: 'false' }]}
                  value={editForm.is_neutered ? 'true' : 'false'}
                  onChange={(val) => setEditForm(f => ({ ...f, is_neutered: val === 'true' }))}
                  fullWidth
                />
              </div>
            </div>

            {/* 메모 태그 */}
            <div>
              <span className="text-[0.8rem] font-bold text-gray-500 pl-1 mb-1.5 block">보유 질환 / 특이사항 메모</span>
              {(() => {
                const tags = (editForm.memo || '').split(',').map(t => t.trim()).filter(Boolean);
                const addTag = () => {
                  const val = memoTagInput.trim();
                  if (!val || tags.includes(val)) return;
                  const newTags = [...tags, val];
                  setEditForm(f => ({ ...f, memo: newTags.join(', ') }));
                  setMemoTagInput('');
                };
                const removeTag = (idx: number) => {
                  const newTags = tags.filter((_, i) => i !== idx);
                  setEditForm(f => ({ ...f, memo: newTags.join(', ') }));
                };
                return (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <input type="text" value={memoTagInput}
                        onChange={e => setMemoTagInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                        className={inputClass} placeholder="예: 땅콩 알러지" style={{ flex: 1 }} />
                      <button onClick={addTag} className="w-[46px] h-[46px] rounded-xl flex items-center justify-center shrink-0 border-none cursor-pointer text-white text-lg font-extrabold bg-gray-800 hover:bg-gray-900 transition-colors" title="추가">
                        +
                      </button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.8rem] font-bold bg-gray-100 text-gray-700">
                            {tag}
                            <button onClick={() => removeTag(idx)} className="bg-transparent border-none cursor-pointer p-0 flex items-center text-gray-400 hover:text-red-500 text-[1rem]">×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
          
          {/* 큰 사이즈의 저장/취소 하단 고정 버튼 */}
          <div className="flex gap-3 mt-2 mb-4">
            <button onClick={() => setEditing(false)} className="flex-1 py-4 bg-gray-200 text-gray-600 font-bold rounded-2xl text-[0.95rem] hover:bg-gray-300 transition-colors duration-200 cursor-pointer border-none shadow-sm">
              취소하기
            </button>
            <button onClick={handleSaveEdit} className="flex-[2] py-4 bg-blue-500 text-white font-bold rounded-2xl text-[0.95rem] hover:bg-blue-600 transition-colors duration-200 cursor-pointer border-none shadow-sm">
              저장하기
            </button>
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 대형 AI 스티커 공작소 존 (읽기 전용 모드일 때만 표시) ─── */}

      {!editing && (
      <div 
        className="rounded-[1.25rem] p-7 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 relative overflow-hidden"
        style={{
          background: 'var(--color-pet-bg, #faf9f7)',
          border: '1px solid var(--color-pet-border, #ede9e3)',
          minHeight: '260px',
        }}
      >
        {(() => {
          const effectiveStatus = forceReset ? 'idle' : currentStickerStatus;
          const hasStickers = petStickers && petStickers.length > 0;
          const isProcessing = effectiveStatus === 'processing' || effectiveStatus === 'uploading';
          
          // 1. 진행 중 상태 화면 (가장 우선)
          if (isProcessing) {
            return (
              <div className="flex flex-col items-center gap-4 mt-2 py-4">
                <div className="relative w-20 h-20 mb-2">
                  <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">🪄</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[1.1rem] font-extrabold text-indigo-900">
                    {effectiveStatus === 'uploading' ? '사진을 업로드하는 중...' : 'AI가 스티커를 무럭무럭 찌는 중!'}
                  </span>
                  <p className="text-[0.85rem] font-medium text-indigo-600/80 leading-snug">
                    약 1~2분 정도 소요될 수 있습니다.<br/>
                    <strong className="text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md mt-1 inline-block">화면을 벗어나 다른 행동을 하셔도</strong><br/>백그라운드에서 안전하게 생성됩니다!
                  </p>
                </div>
              </div>
            );
          }

          // 2. 스티커 생성 완료 직후 팝업 (갤러리 로딩 직전)
          if (effectiveStatus === 'completed' && !hasStickers) {
            return (
              <div className="flex flex-col items-center w-full gap-3 mt-2 animate-fadeIn py-6">
                <div className="text-4xl mb-2">🎉</div>
                <span className="text-[1.1rem] font-extrabold text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100 shadow-sm">
                  스티커 변환 완료!
                </span>
                <span className="text-[0.85rem] text-gray-500 font-medium mt-1 animate-pulse">
                  멋진 스티커들을 불러오고 있습니다...
                </span>
              </div>
            );
          }

          // 3. 스티커 갤러리 뷰 (이미 생성된 스티커가 있는 경우)
          if (hasStickers) {
            return (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-4 mt-1">
                  <h3 className="text-[1.05rem] font-extrabold text-gray-900 flex items-center gap-1.5">
                    <span className="text-xl">✨</span> 마이 스티커 팩
                  </h3>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[0.75rem] font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors border-none cursor-pointer"
                  >
                    새로 만들기
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 w-full">
                  {petStickers.slice(0, 9).map((sticker, idx) => (
                    <div key={idx} className="aspect-square bg-white rounded-2xl p-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden flex items-center justify-center hover:shadow-md transition-shadow relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sticker.imageUrl} alt={`스티커 ${idx+1}`} className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            );
          }

          // 4. 스티커 생성 프롬프트 (아무것도 안 한 쌩초보 상태)
          return (
            <div className="flex flex-col items-center py-4">
              <div className="w-[72px] h-[72px] bg-white rounded-full flex flex-col items-center justify-center shadow-sm border border-gray-100 text-3xl mb-3">
                ✨
              </div>
              <div>
                <h3 className="text-[1.15rem] font-extrabold text-gray-900 mb-1.5 tracking-tight">반려동물 AI 스티커 만들기</h3>
                <p className="text-[0.85rem] text-gray-500 leading-snug font-medium">
                  사진 한 장으로 우리 아이만의<br/>귀여운 맞춤 스티커 9종을 받아보세요!
                </p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 w-full max-w-[280px] py-4 bg-gray-900 text-white text-[0.95rem] font-bold rounded-2xl shadow-md transition-transform active:scale-[0.98] cursor-pointer border-none hover:bg-black"
              >
                사진 선택하고 스티커 만들기
              </button>
            </div>
          );
        })()}
      </div>
      )}

      {/* 모달 */}
      {deleteTarget && (
        <ConfirmModal
          title={`${deleteTarget.name}을(를) 삭제하시겠어요?`}
          subtitle="삭제된 반려동물 정보는 복구할 수 없습니다."
          actions={[{ label: '삭제하기', danger: true, onClick: handleDeleteConfirm }]}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {deletingImage && (
        <ConfirmModal
          title="사진을 삭제하시겠어요?"
          subtitle="실물 사진이 삭제되면 기본 애니메이션으로 대체됩니다."
          actions={[{ label: '삭제하기', danger: true, onClick: handleDeleteImage }]}
          onClose={() => setDeletingImage(false)}
        />
      )}
    </div>
  );
};

export default PetDetailView;
