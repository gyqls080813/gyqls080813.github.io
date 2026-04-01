import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import Image from 'next/image';
import { Button } from '@/shared/components/common/Button';
import { registerPet } from '@/features/group/api/pet';
import { ApiError } from '@/api/request';
import type { PetRegisterItem } from '@/features/group/types/pet';
import dogDefaultImg from '@/shared/components/ui/default/dog_default.png';
import catDefaultImg from '@/shared/components/ui/default/cat_default.png';
import checkedAnimation from '@/shared/components/lottle/Checked.json';

interface PetFormData {
  name: string;
  species: 'DOG' | 'CAT';
  breed: string;
  gender: 'MALE' | 'FEMALE';
  birthdate: string;
  weight: string;
  memo: string;
  is_neutered: boolean;
}

const EMPTY_PET: PetFormData = {
  name: '', species: 'DOG', breed: '', gender: 'MALE',
  birthdate: '', weight: '', memo: '', is_neutered: false,
};

const VALID_DOG_BREEDS = [
  '말티즈', '푸들', '믹스견', '포메라니안', '비숑 프리제', '치와와', '시추',
  '요크셔테리어', '닥스훈트', '페키니즈', '시바이누', '미니어쳐 슈나우져',
  '제페니즈 스피츠', '불독', '웰시코기 펨브로크', '보더콜리',
  '아메리칸 코커스파니엘', '비글', '말라뮤트', '도베르만', '롯트와일러',
  '러프콜리', '사모예드', '셰퍼트', '허스키', '골든리트리버',
  '진도개', '삽살개', '제주개', '풍산개',
];

const VALID_CAT_BREEDS = [
  '믹스묘', '코리안숏헤어', '아메리칸숏헤어', '러시안블루', '페르시안', '스코티쉬폴드',
  '샴', '터키쉬앙고라', '노르웨이숲', '랙돌',
];

type QuestionStep =
  | 'species' | 'name' | 'gender' | 'breed'
  | 'birthdate' | 'weight' | 'memo' | 'neutered' | 'addMore' | 'summary';

const STEPS: QuestionStep[] = [
  'species', 'name', 'gender', 'breed', 'birthdate', 'weight', 'memo', 'neutered', 'addMore',
];

const QUESTION_MAP: Record<string, string> = {
  species:   '어떤 반려동물인가요?',
  name:      '이름이 뭐예요?',
  gender:    '성별을 알려주세요',
  breed:     '품종이 뭐예요?',
  birthdate: '생일은 언제예요?',
  weight:    '몸무게는 얼마인가요?',
  memo:      '특이사항이 있나요?',
  neutered:  '중성화를 했나요?',
  addMore:   '다른 아이도 등록할까요?',
  summary:   '등록할 반려동물을 확인해주세요',
};

interface PetRegisterWizardProps {
  inviteCode?: string;
  onComplete: () => void;
}

export const PetRegisterWizard: React.FC<PetRegisterWizardProps> = ({ inviteCode, onComplete }) => {
  const [pets, setPets] = useState<PetFormData[]>([]);
  const [currentPet, setCurrentPet] = useState<PetFormData>({ ...EMPTY_PET });
  const [stepIdx, setStepIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showComplete, setShowComplete] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedNeutered, setSelectedNeutered] = useState<boolean | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [breedError, setBreedError] = useState('');
  const [showInviteCode, setShowInviteCode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);

  const currentStep = STEPS[Math.min(stepIdx, STEPS.length - 1)];
  const question = QUESTION_MAP[currentStep];

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, [stepIdx]);

  useEffect(() => {
    if (currentStep === 'addMore') setCarouselIdx([...pets, currentPet].length - 1);
  }, [currentStep]);

  const goNext = () => { setDirection(1); setStepIdx(prev => prev + 1); };
  const goBack = () => { if (stepIdx > 0) { setDirection(-1); setStepIdx(prev => prev - 1); } };

  const finishCurrentPet = () => {
    setPets(prev => [...prev, { ...currentPet }]);
    setCurrentPet({ ...EMPTY_PET });
    setStepIdx(0);
    setDirection(1);
  };

  const submitPets = async (allPets: PetFormData[]) => {
    setError('');
    setLoading(true);
    try {
      const payload: PetRegisterItem[] = allPets.map(p => ({
        name: p.name.trim(), species: p.species,
        breed: p.breed.trim() || '미정', gender: p.gender,
        birthdate: p.birthdate || '2020-01-01',
        weight: parseFloat(p.weight) || 0,
        memo: p.memo, is_neutered: p.is_neutered,
      }));
      await registerPet(payload);
      setShowComplete(true);
      setTimeout(() => onComplete(), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? (err.getDataMessage() || '등록에 실패했어요') : '네트워크 오류가 발생했어요');
    } finally { setLoading(false); }
  };

  const handleDirectSubmit = () => submitPets([...pets, currentPet]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentStep === 'name' && !currentPet.name.trim()) return;
      if (currentStep !== 'addMore') goNext();
    }
  };

  const progress = Math.min(((stepIdx + 1) / (STEPS.length + 1)) * 100, 100);

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 60 : -60 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -30 : 30 }),
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--color-pet-bg, #faf9f6)',
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
    }}>
      {/* 프로그레스 */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '3px', background: 'rgba(0,0,0,0.06)' }}>
        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #3182f6, #6db3f2)', borderRadius: '0 2px 2px 0' }} />
      </div>

      {/* 뒤로가기 */}
      {stepIdx > 0 && currentStep !== 'summary' && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={goBack}
          style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 50, background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--color-pet-text-secondary, #888)', padding: '8px' }}>
          ←
        </motion.button>
      )}

      {/* 초대코드 */}
      {inviteCode && (
        <button 
          onClick={() => setShowInviteCode(prev => !prev)}
          style={{ position: 'fixed', top: '12px', right: '16px', zIndex: 50, background: '#f0f4ff', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: '#3182f6', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 2px 8px rgba(49,130,246,0.15)' }}>
          {showInviteCode ? `초대코드 ${inviteCode}` : '눌러서 초대코드 확인하기'}
        </button>
      )}

      {/* 메인 콘텐츠 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '160px 24px 40px', maxWidth: '440px', margin: '0 auto', width: '100%' }}>

        {/* Lottie 애니메이션 */}
        {(() => {
          const allPets = [...pets, currentPet];
          const currentImg = currentStep === 'addMore'
            ? (allPets[carouselIdx]?.species === 'DOG' ? dogDefaultImg : catDefaultImg)
            : (currentPet.species === 'DOG' ? dogDefaultImg : catDefaultImg);
          return (
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', overflow: 'hidden', width: '100%' }}>
              {currentStep === 'addMore' && allPets.length > 1 ? (
                <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3}
                  onDragEnd={(_e: any, info: { offset: { x: number } }) => {
                    if (info.offset.x < -50) setCarouselIdx(prev => Math.min(prev + 1, allPets.length - 1));
                    else if (info.offset.x > 50) setCarouselIdx(prev => Math.max(prev - 1, 0));
                  }}
                  style={{ cursor: 'grab', touchAction: 'pan-y' }}>
                  <Image src={currentImg} alt="Default Pet Profile" width={140} height={140} className="object-contain pointer-events-none" />
                </motion.div>
              ) : (
                <Image src={currentImg} alt="Default Pet Profile" width={140} height={140} className="object-contain" />
              )}
            </div>
          );
        })()}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={currentStep + stepIdx} custom={direction}
            variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* 질문 */}
            {currentStep !== 'addMore' && (
              <h2 style={{ fontSize: currentStep === 'summary' ? '22px' : '24px', fontWeight: 800, color: 'var(--color-pet-text-dark, #1a1a2e)', textAlign: 'center', margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                {question}
              </h2>
            )}

            {/* 등록 완료 카운트 */}
            {pets.length > 0 && currentStep !== 'summary' && currentStep !== 'addMore' && (
              <p style={{ fontSize: '14px', color: '#3182f6', fontWeight: 600, margin: '0 0 24px', textAlign: 'center' }}>
                {pets.length}마리 등록 완료 ✓
              </p>
            )}
            {!pets.length && currentStep !== 'summary' && currentStep !== 'addMore' && (
              <p style={{ fontSize: '14px', color: 'var(--color-pet-text-secondary, #888)', margin: '0 0 24px', textAlign: 'center' }}>
                {currentStep === 'species' ? '강아지인가요? 고양이인가요?' : ''}
              </p>
            )}

            <div style={{ width: '100%', maxWidth: '360px' }}>
              {/* 종 선택 */}
              {currentStep === 'species' && (
                <div style={{ display: 'flex', gap: '16px' }}>
                  {([
                    { val: 'DOG' as const, label: '강아지', img: dogDefaultImg },
                    { val: 'CAT' as const, label: '고양이', img: catDefaultImg },
                  ]).map(({ val, label, img }) => {
                    const isSelected = selectedSpecies === val;
                    return (
                      <button key={val}
                        onClick={() => { if (selectedSpecies) return; setSelectedSpecies(val); setCurrentPet(p => ({ ...p, species: val })); setTimeout(() => { setSelectedSpecies(null); goNext(); }, 500); }}
                        style={{ flex: 1, padding: '20px 12px 16px', borderRadius: '24px', border: isSelected ? '3px solid #3182f6' : '3px solid transparent', cursor: selectedSpecies ? 'default' : 'pointer', background: isSelected ? '#f0f6ff' : 'white', boxShadow: isSelected ? '0 4px 24px rgba(49,130,246,0.2)' : '0 4px 20px rgba(0,0,0,0.08)', transition: 'all 0.25s ease', transform: isSelected ? 'scale(1.04)' : 'scale(1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: selectedSpecies && !isSelected ? 0.4 : 1 }}>
                        <Image src={img} alt={label} width={140} height={140} className="object-contain pointer-events-none" />
                        <span style={{ fontSize: '16px', fontWeight: 700, color: isSelected ? '#3182f6' : '#1a1a2e' }}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 이름 */}
              {currentStep === 'name' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input ref={inputRef} type="text" value={currentPet.name}
                    onChange={e => setCurrentPet(p => ({ ...p, name: e.target.value }))}
                    onKeyDown={handleKeyDown} placeholder="반려동물 이름"
                    style={{ width: '100%', padding: '18px 20px', fontSize: '20px', fontWeight: 700, textAlign: 'center', letterSpacing: '0.05em', border: 'none', borderBottom: '3px solid #3182f6', borderRadius: '0', background: 'transparent', outline: 'none', color: 'var(--color-pet-text-dark, #1a1a2e)' }} />
                  <Button display="block" size="xlarge" color="primary" disabled={!currentPet.name.trim()} onClick={goNext}>다음</Button>
                </div>
              )}

              {/* 성별 */}
              {currentStep === 'gender' && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {([['MALE', '♂', '남아'], ['FEMALE', '♀', '여아']] as const).map(([val, icon, label]) => {
                    const isSelected = selectedGender === val;
                    return (
                      <button key={val}
                        onClick={() => { if (selectedGender) return; setSelectedGender(val); setCurrentPet(p => ({ ...p, gender: val })); setTimeout(() => { setSelectedGender(null); goNext(); }, 500); }}
                        style={{ flex: 1, padding: '20px 16px', borderRadius: '16px', border: isSelected ? '3px solid ' + (val === 'MALE' ? '#3182f6' : '#f06595') : '3px solid transparent', cursor: selectedGender ? 'default' : 'pointer', background: isSelected ? (val === 'MALE' ? '#f0f6ff' : '#fff5f8') : 'white', fontSize: '16px', fontWeight: 700, color: '#1a1a2e', boxShadow: isSelected ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'all 0.25s ease', transform: isSelected ? 'scale(1.05)' : 'scale(1)', opacity: selectedGender && !isSelected ? 0.4 : 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '36px', color: val === 'MALE' ? '#3182f6' : '#f06595' }}>{icon}</span>
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 품종 */}
              {currentStep === 'breed' && (() => {
                const validBreeds = currentPet.species === 'DOG' ? VALID_DOG_BREEDS : VALID_CAT_BREEDS;
                const breedValue = currentPet.breed.trim();

                // "모르겠다" 류 입력 → 믹스견 자동 매핑
                const unknownKeywords = ['모르', '모름', '모르겠', '잘 모', '글쎄', '없', '기타', '혼합', '잡종'];
                const isUnknownInput = unknownKeywords.some(kw => breedValue.includes(kw));
                const mixBreed = currentPet.species === 'DOG' ? '믹스견' : '믹스묘';

                const suggestions = breedValue && !isUnknownInput
                  ? validBreeds.filter(b => b.includes(breedValue) && b !== breedValue)
                  : breedValue ? [] : validBreeds;
                const isValidBreed = validBreeds.includes(breedValue);

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                      <input ref={inputRef} type="text" value={currentPet.breed}
                        onChange={e => { setCurrentPet(p => ({ ...p, breed: e.target.value })); setBreedError(''); }}
                        onKeyDown={e => { if (e.key === 'Enter' && isValidBreed) goNext(); }}
                        placeholder={currentPet.species === 'DOG' ? '예: 푸들, 말티즈' : '예: 러시안블루, 코리안숏헤어'}
                        style={{ width: '100%', padding: '18px 20px', fontSize: '18px', fontWeight: 600, textAlign: 'center', border: 'none', borderBottom: `3px solid ${breedError ? '#dc2626' : isValidBreed ? '#16a34a' : '#3182f6'}`, borderRadius: '0', background: 'transparent', outline: 'none', color: 'var(--color-pet-text-dark, #1a1a2e)' }} />
                      {/* 자동완성 드롭다운 */}
                      {suggestions.length > 0 && !isValidBreed && (
                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '0 0 12px 12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 20, maxHeight: '200px', overflowY: 'auto' }}>
                          {suggestions.map(s => (
                            <button key={s} type="button"
                              onClick={() => { setCurrentPet(p => ({ ...p, breed: s })); setBreedError(''); }}
                              style={{ width: '100%', padding: '12px 20px', fontSize: '15px', fontWeight: 500, textAlign: 'center', border: 'none', borderBottom: '1px solid #f0f0f0', background: 'transparent', cursor: 'pointer', color: '#1a1a2e' }}>
                              {breedValue ? s.split(breedValue).reduce((acc: React.ReactNode[], part, i) => {
                                if (i > 0) acc.push(<span key={`h${i}`} style={{ color: '#3182f6', fontWeight: 700 }}>{breedValue}</span>);
                                acc.push(part);
                                return acc;
                              }, [] as React.ReactNode[]) : s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {breedError && (
                      <p style={{ fontSize: '13px', color: '#dc2626', textAlign: 'center', margin: 0, fontWeight: 600 }}>{breedError}</p>
                    )}
                    {isValidBreed && (
                      <p style={{ fontSize: '13px', color: '#16a34a', textAlign: 'center', margin: 0, fontWeight: 600 }}>✓ 등록 가능한 품종입니다</p>
                    )}
                    {isUnknownInput && (
                      <button type="button"
                        onClick={() => { setCurrentPet(p => ({ ...p, breed: mixBreed })); setBreedError(''); }}
                        style={{ padding: '14px', borderRadius: '12px', border: '2px solid #3182f6', background: '#f0f6ff', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: '#3182f6', textAlign: 'center' }}>
                        🐾 잘 모르시겠다면 &quot;{mixBreed}&quot;(으)로 등록할게요!
                      </button>
                    )}
                    <Button display="block" size="xlarge" color="primary"
                      disabled={!isValidBreed}
                      onClick={() => {
                        if (!isValidBreed) {
                          setBreedError('등록 가능한 품종을 입력해주세요.');
                          return;
                        }
                        goNext();
                      }}>다음</Button>
                  </div>
                );
              })()}

              {/* 생일 */}
              {currentStep === 'birthdate' && (() => {
                const parts = currentPet.birthdate ? currentPet.birthdate.split('-') : ['', '', ''];
                const bYear = parts[0] || ''; const bMonth = parts[1] || ''; const bDay = parts[2] || '';
                const updateBirth = (y: string, m: string, d: string) => {
                  const yy = y.replace(/\D/g, '').slice(0, 4); const mm = m.replace(/\D/g, '').slice(0, 2); const dd = d.replace(/\D/g, '').slice(0, 2);
                  setCurrentPet(p => ({ ...p, birthdate: `${yy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}` }));
                };
                const isValid = bYear.length === 4 && bMonth.length >= 1 && bDay.length >= 1;
                const fieldStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '14px 4px', fontSize: '20px', fontWeight: 700, textAlign: 'center', border: 'none', borderBottom: '3px solid #3182f6', borderRadius: '0', background: 'transparent', outline: 'none', color: 'var(--color-pet-text-dark, #1a1a2e)' };
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', width: '100%' }}>
                      <div style={{ flex: 1.5, textAlign: 'center', minWidth: 0 }}>
                        <span style={{ fontSize: '12px', color: '#888', fontWeight: 600, display: 'block', marginBottom: '6px' }}>년</span>
                        <input ref={inputRef} type="text" inputMode="numeric" maxLength={4} placeholder="2020" value={bYear}
                          onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 4); updateBirth(v, bMonth, bDay); if (v.length === 4) monthRef.current?.focus(); }}
                          style={fieldStyle} />
                      </div>
                      <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
                        <span style={{ fontSize: '12px', color: '#888', fontWeight: 600, display: 'block', marginBottom: '6px' }}>월</span>
                        <input ref={monthRef} type="text" inputMode="numeric" maxLength={2} placeholder="01"
                          value={bMonth.replace(/^0+/, '') || ''}
                          onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 2); updateBirth(bYear, v, bDay); if (v.length === 2 || (v.length === 1 && Number(v) > 1)) dayRef.current?.focus(); }}
                          style={fieldStyle} />
                      </div>
                      <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
                        <span style={{ fontSize: '12px', color: '#888', fontWeight: 600, display: 'block', marginBottom: '6px' }}>일</span>
                        <input ref={dayRef} type="text" inputMode="numeric" maxLength={2} placeholder="15"
                          value={bDay.replace(/^0+/, '') || ''}
                          onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 2); updateBirth(bYear, bMonth, v); }}
                          onKeyDown={e => { if (e.key === 'Enter' && isValid) goNext(); }}
                          style={fieldStyle} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                      <Button display="block" size="xlarge" color="light" onClick={goNext} htmlStyle={{ flex: 1 }}>건너뛰기</Button>
                      <Button display="block" size="xlarge" color="primary" onClick={goNext} disabled={!isValid} htmlStyle={{ flex: 2 }}>다음</Button>
                    </div>
                  </div>
                );
              })()}

              {/* 몸무게 */}
              {currentStep === 'weight' && (() => {
                const w = parseFloat(currentPet.weight) || 0;
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px' }}>
                      <input ref={inputRef} type="text" inputMode="decimal" value={currentPet.weight}
                        onChange={e => {
                          let val = e.target.value.replace(/[^0-9.]/g, '');
                          const dots = val.match(/\./g);
                          if (dots && dots.length > 1) val = val.substring(0, val.lastIndexOf('.'));
                          if (/^\d{0,2}(\.\d{0,2})?$/.test(val)) {
                            setCurrentPet(p => ({ ...p, weight: val }));
                          }
                        }}
                        onKeyDown={e => { if (e.key === 'Enter' && w > 0) goNext(); }}
                        placeholder="0.0"
                        style={{ width: '180px', padding: '16px 12px', fontSize: '48px', fontWeight: 800, textAlign: 'center', border: 'none', borderBottom: '4px solid #3182f6', borderRadius: '0', background: 'transparent', outline: 'none', color: 'var(--color-pet-text-dark, #1a1a2e)', letterSpacing: '-1px' }} />
                      <span style={{ fontSize: '28px', fontWeight: 700, color: '#888' }}>kg</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                      <Button display="block" size="xlarge" color="light" onClick={goNext} htmlStyle={{ flex: 1, height: '56px', fontSize: '18px' }}>건너뛰기</Button>
                      <Button display="block" size="xlarge" color="primary" onClick={goNext} disabled={w <= 0} htmlStyle={{ flex: 2, height: '56px', fontSize: '18px' }}>다음</Button>
                    </div>
                  </div>
                );
              })()}

              {/* 메모 (태그 입력) */}
              {currentStep === 'memo' && (() => {
                const tags = currentPet.memo ? currentPet.memo.split(',').map(t => t.trim()).filter(Boolean) : [];

                const addTag = () => {
                  const val = tagInput.trim();
                  if (!val || tags.includes(val)) return;
                  const newTags = [...tags, val];
                  setCurrentPet(p => ({ ...p, memo: newTags.join(', ') }));
                  setTagInput('');
                };

                const removeTag = (idx: number) => {
                  const newTags = tags.filter((_, i) => i !== idx);
                  setCurrentPet(p => ({ ...p, memo: newTags.join(', ') }));
                };

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* 기존 태그 목록 */}
                    {tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                        {tags.map((tag, idx) => (
                          <span key={idx} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '8px 14px', borderRadius: '20px',
                            background: '#f0f6ff', color: '#3182f6',
                            fontSize: '14px', fontWeight: 600,
                          }}>
                            {tag}
                            <button onClick={() => removeTag(idx)} style={{
                              background: 'none', border: 'none', cursor: 'pointer',
                              color: '#3182f6', fontSize: '16px', lineHeight: 1, padding: 0,
                              display: 'flex', alignItems: 'center',
                            }}>×</button>
                          </span>
                        ))}
                      </div>
                    )}
                    {/* 입력 + 추가 버튼 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input ref={inputRef} type="text" value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (tagInput.trim()) addTag();
                            else goNext();
                          }
                        }}
                        placeholder="예: 알레르기 있음"
                        style={{ flex: 1, padding: '14px 20px', fontSize: '16px', fontWeight: 500, textAlign: 'center', border: 'none', borderBottom: '3px solid #3182f6', borderRadius: '0', background: 'transparent', outline: 'none', color: 'var(--color-pet-text-dark, #1a1a2e)' }} />
                      <button onClick={addTag} style={{
                        width: '44px', height: '44px', borderRadius: '50%', border: 'none',
                        background: '#3182f6', color: 'white', fontSize: '24px', fontWeight: 700,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'transform 0.15s',
                      }} title="추가">＋</button>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Button display="block" size="xlarge" color="light" onClick={goNext} htmlStyle={{ flex: 1 }}>건너뛰기</Button>
                      <Button display="block" size="xlarge" color="primary" onClick={goNext} htmlStyle={{ flex: 2 }}>다음</Button>
                    </div>
                  </div>
                );
              })()}

              {/* 중성화 */}
              {currentStep === 'neutered' && (
                <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                  {([true, false] as const).map(val => {
                    const isSelected = selectedNeutered === val;
                    return (
                      <button key={String(val)}
                        onClick={() => { if (selectedNeutered !== null) return; setSelectedNeutered(val); setCurrentPet(p => ({ ...p, is_neutered: val })); setTimeout(() => { setSelectedNeutered(null); goNext(); }, 500); }}
                        style={{ flex: 1, padding: '24px 16px', borderRadius: '20px', border: isSelected ? '3px solid #3182f6' : '3px solid transparent', cursor: selectedNeutered !== null ? 'default' : 'pointer', background: isSelected ? '#f0f6ff' : 'white', fontSize: '18px', fontWeight: 700, color: isSelected ? '#3182f6' : '#1a1a2e', boxShadow: isSelected ? '0 8px 24px rgba(49,130,246,0.15)' : '0 4px 16px rgba(0,0,0,0.06)', transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', transform: isSelected ? 'scale(1.03)' : 'scale(1)', opacity: selectedNeutered !== null && !isSelected ? 0.5 : 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: val ? (isSelected ? '#3182f6' : '#e8f0fe') : (isSelected ? '#ef4444' : '#fee2e2'), display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                          {val ? (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke={isSelected ? "white" : "#3182f6"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 6L6 18M6 6L18 18" stroke={isSelected ? "white" : "#ef4444"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        {val ? '했어요' : '안 했어요'}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 더 등록? */}
              {currentStep === 'addMore' && (() => {
                const allPets = [...pets, currentPet];
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0', alignItems: 'center', width: '100%' }}>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px', textAlign: 'center' }}>
                      {allPets[carouselIdx]?.name}
                    </p>
                    {allPets.length > 1 && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        {allPets.map((_, idx) => (
                          <button key={idx} onClick={() => setCarouselIdx(idx)}
                            style={{ width: idx === carouselIdx ? '20px' : '8px', height: '8px', borderRadius: '4px', border: 'none', background: idx === carouselIdx ? '#3182f6' : '#d1d5db', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
                        ))}
                      </div>
                    )}
                    <div style={{ width: '100%', marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                      <p style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e', textAlign: 'center', margin: '0' }}>다른 아이도 등록할까요?</p>
                      {error && <p style={{ color: '#dc2626', fontSize: '14px', textAlign: 'center', margin: '0' }}>{error}</p>}
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button display="block" size="xlarge" color="light" onClick={finishCurrentPet}>다른 아이도 등록할래요</Button>
                        <Button display="block" size="xlarge" color="primary" loading={loading} onClick={handleDirectSubmit}>
                          {allPets.length}마리 등록하기
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 완료 오버레이 */}
      <AnimatePresence>
        {showComplete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <Lottie animationData={checkedAnimation} loop={false} autoplay style={{ width: 160, height: 160 }} />
            <p style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e', marginTop: '12px' }}>등록 완료!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 나중에 할게요 */}
      {currentStep !== 'addMore' && (
        <div style={{ position: 'fixed', bottom: '24px', left: 0, right: 0, textAlign: 'center' }}>
          <span onClick={onComplete}
            style={{ fontSize: '14px', color: 'var(--color-pet-text-secondary, #888)', cursor: 'pointer' }}>
            나중에 할게요
          </span>
        </div>
      )}
    </div>
  );
};

export default PetRegisterWizard;
