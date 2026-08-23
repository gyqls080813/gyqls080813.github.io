import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { createGroup } from '@/features/group/api/group';
import { joinGroup } from '@/features/group/api/group';
import { ApiError } from '@/api/request';
import dogDefaultImg from '@/shared/components/ui/default/dog_default.png';
import catDefaultImg from '@/shared/components/ui/default/cat_default.png';

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

export default function OnboardingStep1() {
  const router = useRouter();
  const mode = (router.query.mode as string) || 'create';

  const [groupName, setGroupName] = useState('');
  const [groupLoading, setGroupLoading] = useState(false);
  const [groupError, setGroupError] = useState('');

  const [joinCode, setJoinCode] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState('');

  const handleCreateGroup = async () => {
    setGroupError('');
    if (!groupName.trim()) { setGroupError('그룹 이름을 입력해주세요.'); return; }
    setGroupLoading(true);
    try {
      const res = await createGroup({ name: groupName.trim() });

      router.push(`/onboarding/step2?inviteCode=${res.data.inviteCode}`);
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
      router.push('/home');
    } catch (err) {
      setJoinError(err instanceof ApiError ? (err.getDataMessage() || '코드를 확인해주세요.') : '네트워크 오류');
    } finally { setJoinLoading(false); }
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-[var(--color-pet-bg)]">
      <AnimatePresence mode="wait">
        {mode === 'create' ? (
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

            <div className="w-full max-w-[400px] flex flex-col gap-3">
              <input type="text" value={groupName}
                onChange={(e) => { setGroupName(e.target.value); setGroupError(''); }}
                placeholder="그룹 이름 (예: 우리 가족)"
                className={`${inputCls(!!groupError)} text-center font-semibold tracking-[0.1em]`}
              />
              {groupError && <Paragraph typography="t7" color="#dc2626" textAlign="center"><Paragraph.Text>{groupError}</Paragraph.Text></Paragraph>}
              <Button display="block" size="xlarge" color="primary" loading={groupLoading} onClick={handleCreateGroup}>
                그룹 만들기
              </Button>
              <div className="text-center mt-2">
                <span onClick={() => router.push('/onboarding')} className="text-sm text-[var(--color-pet-text-secondary)] cursor-pointer">← 돌아가기</span>
              </div>
            </div>
          </motion.div>
        ) : (
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

            <div className="w-full max-w-[400px] flex flex-col gap-3">
              <input type="text" value={joinCode}
                onChange={(e) => { setJoinCode(e.target.value.toUpperCase()); setJoinError(''); }}
                placeholder="초대 코드 (예: A1B2C3D4)" maxLength={8}
                className={`${inputCls(!!joinError)} text-center tracking-[0.1em] font-semibold`}
              />
              {joinError && <Paragraph typography="t7" color="#dc2626" textAlign="center"><Paragraph.Text>{joinError}</Paragraph.Text></Paragraph>}
              <Button display="block" size="xlarge" color="primary" loading={joinLoading} onClick={handleJoinGroup}>
                참여하기
              </Button>
              <div className="text-center mt-2">
                <span onClick={() => router.push('/onboarding')} className="text-sm text-[var(--color-pet-text-secondary)] cursor-pointer">← 돌아가기</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
undefined