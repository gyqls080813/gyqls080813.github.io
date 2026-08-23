import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { Card } from '@/shared/components/common/Card';
import { createGroup } from '@/features/group/api/group';
import { joinGroup } from '@/features/group/api/group';
import { registerPet } from '@/features/group/api/pet';
import { ApiError } from '@/api/request';
import type { PetRegisterItem } from '@/features/group/types/pet';
import dogDefaultImg from '@/shared/components/ui/default/dog_default.png';
import catDefaultImg from '@/shared/components/ui/default/cat_default.png';

type Step = 'choice' | 'create' | 'join' | 'registerPet';

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

const pageVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const inputCls = (hasError = false) =>
  `w-full px-4 py-3.5 text-[15px] outline-none rounded-xl text-[var(--color-pet-text-dark)] transition-all duration-200 font-[inherit] box-border ${
    hasError
      ? 'bg-[#fef8f8] border-[1.5px] border-[#dc2626]'
      : 'bg-[var(--color-pet-input-bg)] border-[1.5px] border-transparent'
  }`;

const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>('choice');
  const [inviteCode, setInviteCode] = useState('');

  const [groupName, setGroupName] = useState('');
  const [groupLoading, setGroupLoading] = useState(false);
  const [groupError, setGroupError] = useState('');

  const [joinCode, setJoinCode] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState('');

  const [petForms, setPetForms] = useState<PetFormData[]>([{ ...EMPTY_PET }]);
  const [petLoading, setPetLoading] = useState(false);
  const [petError, setPetError] = useState('');

  const goHome = () => router.replace('/home');

  const handleCreateGroup = async () => {
    setGroupError('');
    if (!groupName.trim()) { setGroupError('그룹 이름을 입력해주세요.'); return; }
    setGroupLoading(true);
    try {
      const res = await createGroup({ name: groupName.trim() });
      setInviteCode(res.data.inviteCode);
      setStep('registerPet');
    } catch (err) {
      setGroupError(err instanceof ApiError ? (err.getDataMessage() || '그룹 생성에 실패했습니다.') : '네트워크 오류');
    } finally { setGroupLoading(false); }
  };

  const handleJoinGroup = async () => {
    setJoinError('');
    if (!joinCode.trim()) { setJoinError('초대 코드를 입력해주세요.'); return; }
    setJoinLoading(true);
    try {
      await joinGroup({ inviteCode: joinCode.trim() });
      setStep('registerPet');
    } catch (err) {
      setJoinError(err instanceof ApiError ? (err.getDataMessage() || '코드를 확인해주세요.') : '네트워크 오류');
    } finally { setJoinLoading(false); }
  };

  const updatePet = (index: number, field: keyof PetFormData, value: any) => {
    setPetForms(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
    setPetError('');
  };

  const addPet = () => {
    setPetForms(prev => [...prev, { ...EMPTY_PET }]);
  };

  const removePet = (index: number) => {
    if (petForms.length <= 1) return;
    setPetForms(prev => prev.filter((_, i) => i !== index));
  };

  const currentSpecies = petForms[0]?.species || 'DOG';

  const handleRegisterPet = async () => {
    setPetError('');

    const emptyIdx = petForms.findIndex(p => !p.name.trim());
    if (emptyIdx !== -1) {
      setPetError(`${emptyIdx + 1}번째 반려동물의 이름을 입력해주세요.`);
      return;
    }
    setPetLoading(true);
    try {
      const payload: PetRegisterItem[] = petForms.map(p => ({
        name: p.name.trim(),
        species: p.species,
        breed: p.breed.trim(),
        gender: p.gender,
        birthdate: p.birthdate || '2020-01-01',
        weight: parseFloat(p.weight) || 0,
        memo: p.memo,
        is_neutered: p.is_neutered,
      }));
      await registerPet(payload);
      goHome();
    } catch (err) {
      setPetError(err instanceof ApiError ? (err.getDataMessage() || '등록 실패') : '네트워크 오류');
    } finally { setPetLoading(false); }
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-[var(--color-pet-bg)]">
      <AnimatePresence mode="wait">

        {}
        {step === 'choice' && (
          <motion.div key="choice" variants={pageVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
          >
            <Image
              src={dogDefaultImg}
              alt="Default Pet Profile"
              width={280}
              height={280}
              className="mb-4 object-contain"
            />

            <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
              <Paragraph.Text>반려동물 가계부를 시작해볼까요?</Paragraph.Text>
            </Paragraph>
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 40 }}>
              <Paragraph.Text>가족과 함께 관리해보세요</Paragraph.Text>
            </Paragraph>

            <div className="w-full max-w-[400px] flex flex-col gap-3">
              <Button display="block" size="xlarge" color="primary" onClick={() => setStep('create')}>
                그룹 만들기
              </Button>
              <Button display="block" size="xlarge" color="light" onClick={() => setStep('join')}>
                초대 코드로 참여하기
              </Button>
            </div>
          </motion.div>
        )}

        {}
        {step === 'create' && (
          <motion.div key="create" variants={pageVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center px-6 pt-12 pb-8"
          >
            <Image
              src={dogDefaultImg}
              alt="Default Pet Profile"
              width={260}
              height={260}
              className="mb-2 object-contain"
            />

            <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
              <Paragraph.Text>그룹 이름을 정해주세요</Paragraph.Text>
            </Paragraph>
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 32 }}>
              <Paragraph.Text>가계부를 함께 관리할 그룹이에요</Paragraph.Text>
            </Paragraph>

            <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }} className="w-full max-w-[400px] flex flex-col gap-3">
              <input type="text" value={groupName}
                onChange={(e) => { setGroupName(e.target.value); setGroupError(''); }}
                placeholder="그룹 이름 (예: 우리 가족)"
                className={`${inputCls(!!groupError)} text-center font-semibold tracking-[0.1em]`}
              />
              {groupError && <Paragraph typography="t7" color="#dc2626" textAlign="center"><Paragraph.Text>{groupError}</Paragraph.Text></Paragraph>}
              <Button display="block" size="xlarge" color="primary" loading={groupLoading} type="submit" onClick={() => {}}>
                그룹 만들기
              </Button>
              <div className="text-center mt-2">
                <span onClick={() => setStep('choice')} className="text-sm text-[var(--color-pet-text-secondary)] cursor-pointer">← 돌아가기</span>
              </div>
            </form>
          </motion.div>
        )}

        {}
        {step === 'join' && (
          <motion.div key="join" variants={pageVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center px-6 pt-12 pb-8"
          >
            <Image
              src={catDefaultImg}
              alt="Default Pet Profile"
              width={260}
              height={260}
              className="mb-2 object-contain"
            />

            <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
              <Paragraph.Text>초대 코드를 입력해주세요</Paragraph.Text>
            </Paragraph>
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 32 }}>
              <Paragraph.Text>가족이 공유한 코드를 입력하세요</Paragraph.Text>
            </Paragraph>

            <form onSubmit={(e) => { e.preventDefault(); handleJoinGroup(); }} className="w-full max-w-[400px] flex flex-col gap-3">
              <input type="text" value={joinCode}
                onChange={(e) => { setJoinCode(e.target.value.toUpperCase()); setJoinError(''); }}
                placeholder="초대 코드 (예: A1B2C3D4)" maxLength={8}
                className={`${inputCls(!!joinError)} text-center tracking-[0.1em] font-semibold`}
              />
              {joinError && <Paragraph typography="t7" color="#dc2626" textAlign="center"><Paragraph.Text>{joinError}</Paragraph.Text></Paragraph>}
              <Button display="block" size="xlarge" color="primary" loading={joinLoading} type="submit" onClick={() => {}}>
                참여하기
              </Button>
              <div className="text-center mt-2">
                <span onClick={() => setStep('choice')} className="text-sm text-[var(--color-pet-text-secondary)] cursor-pointer">← 돌아가기</span>
              </div>
            </form>
          </motion.div>
        )}

        {}
        {step === 'registerPet' && (
          <motion.div key="pet" variants={pageVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center px-6 py-10 overflow-y-auto"
          >
            {}
            <div className="flex items-end mb-3">
              <Image
                src={currentSpecies === 'DOG' ? dogDefaultImg : catDefaultImg}
                alt="Default Pet Profile"
                width={180}
                height={180}
                className="object-contain"
              />
            </div>

            <Paragraph typography="t2" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
              <Paragraph.Text>우리 아이를 등록해주세요</Paragraph.Text>
            </Paragraph>
            <Paragraph typography="t5" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 20 }}>
              <Paragraph.Text>여러 마리도 한 번에 등록할 수 있어요</Paragraph.Text>
            </Paragraph>

            {inviteCode && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="px-5 py-2.5 rounded-xl mb-4 bg-[#f0f4ff] text-center">
                <span className="text-[13px] text-[#3182f6] font-semibold">
                  초대 코드: <strong className="tracking-[0.1em]">{inviteCode}</strong>
                </span><br />
                <span className="text-[11px] text-[var(--color-pet-text-secondary)]">가족에게 공유해주세요</span>
              </motion.div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleRegisterPet(); }} className="w-full max-w-[400px] flex flex-col gap-4">
              {}
              {petForms.map((pet, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card elevation="low" radius="large" padding="medium">
                    {}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-pet-text-dark)' }}>
                        {pet.species === 'DOG' ? '🐶' : '🐱'} {idx + 1}번째 반려동물
                      </span>
                      {petForms.length > 1 && (
                        <span
                          onClick={() => removePet(idx)}
                          style={{
                            fontSize: '13px', color: '#dc2626', cursor: 'pointer',
                            padding: '4px 10px', borderRadius: '8px',
                            background: '#fef2f2', fontWeight: 600,
                          }}
                        >
                          삭제
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {}
                      <input type="text" value={pet.name}
                        onChange={(e) => updatePet(idx, 'name', e.target.value)}
                        placeholder="이름 (예: 초코)" className={inputCls()} />

                      {}
                      <div className="flex gap-2.5">
                        <select value={pet.species}
                          onChange={(e) => updatePet(idx, 'species', e.target.value)}
                          className={`${inputCls()} flex-1 appearance-none`}>
                          <option value="DOG">🐶 강아지</option>
                          <option value="CAT">🐱 고양이</option>
                        </select>
                        <select value={pet.gender}
                          onChange={(e) => updatePet(idx, 'gender', e.target.value)}
                          className={`${inputCls()} flex-1 appearance-none`}>
                          <option value="MALE">♂ 남아</option>
                          <option value="FEMALE">♀ 여아</option>
                        </select>
                      </div>

                      {}
                      <input type="text" value={pet.breed}
                        onChange={(e) => updatePet(idx, 'breed', e.target.value)}
                        placeholder="품종 (예: 푸들)" className={inputCls()} />

                      {}
                      <div className="flex gap-2.5">
                        <input type="date" value={pet.birthdate}
                          onChange={(e) => updatePet(idx, 'birthdate', e.target.value)}
                          className={`${inputCls()} flex-1`} />
                        <input type="number" value={pet.weight}
                          onChange={(e) => updatePet(idx, 'weight', e.target.value)}
                          placeholder="몸무게(kg)" step="0.1" min="0"
                          className={`${inputCls()} flex-1`} />
                      </div>

                      {}
                      <input type="text" value={pet.memo}
                        onChange={(e) => updatePet(idx, 'memo', e.target.value)}
                        placeholder="메모 (선택, 예: 알레르기 있음)" className={inputCls()} />

                      {}
                      <label className="flex items-center gap-2 px-4 py-3 bg-[#f7f7f9] rounded-xl cursor-pointer text-[15px] text-[#1a1a2e]">
                        <input type="checkbox" checked={pet.is_neutered}
                          onChange={(e) => updatePet(idx, 'is_neutered', e.target.checked)}
                          className="w-[18px] h-[18px] accent-[#3182f6]" />
                        중성화 완료
                      </label>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {}
              <Button display="block" size="large" color="light" variant="weak" onClick={addPet}
                htmlStyle={{ border: '1.5px dashed var(--color-pet-text-dim, #ccc)', background: 'transparent' }}>
                + 반려동물 추가하기
              </Button>

              {}
              {petError && (
                <Paragraph typography="t7" color="#dc2626" textAlign="center">
                  <Paragraph.Text>{petError}</Paragraph.Text>
                </Paragraph>
              )}

              {}
              <Button display="block" size="xlarge" color="primary" loading={petLoading} type="submit" onClick={() => {}}>
                {petForms.length > 1 ? `${petForms.length}마리 등록하기` : '등록하기'}
              </Button>

              <div className="text-center mt-1 mb-6">
                <span onClick={goHome} className="text-sm text-[var(--color-pet-text-secondary)] cursor-pointer">나중에 할게요 →</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;
undefined