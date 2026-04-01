import React, { useState } from 'react';
import { joinGroup } from '@/features/group/api/group';
import { Card } from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { ApiError } from '@/api/request';

interface Props {
  onJoined: (groupId: number) => void;
  onBack: () => void;
}

const StepJoinGroup: React.FC<Props> = ({ onJoined, onBack }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!code.trim()) { setError('초대 코드를 입력해주세요.'); return; }

    setIsLoading(true);
    try {
      const res = await joinGroup({ inviteCode: code.trim() });
      onJoined(res.data.groupId);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.getDataMessage() || '그룹 참여에 실패했습니다. 코드를 확인해주세요.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card elevation="medium" radius="large" padding="large">
      <Box direction="column" gap="large" alignItems="center">

        <Box direction="column" gap="xsmall" alignItems="center">
          <img
            src="/images/onboarding-join.png"
            alt="그룹 참여하기"
            className="w-[120px] h-[120px] object-contain mb-1"
          />
          <Paragraph typography="t3" fontWeight="bold" textAlign="center">
            <Paragraph.Text>그룹 참여하기</Paragraph.Text>
          </Paragraph>
          <Paragraph typography="t6" color="var(--color-pet-text-secondary)" textAlign="center">
            <Paragraph.Text>초대받은 코드를 입력해주세요</Paragraph.Text>
          </Paragraph>
        </Box>

        <form onSubmit={handleSubmit} noValidate className="w-full">
          <Box direction="column" gap="medium" fullWidth>
            <input
              type="text" value={code}
              onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(''); }}
              placeholder="초대 코드 (예: A1B2C3D4)"
              maxLength={8}
              className={`w-full px-4 py-3.5 text-[17px] outline-none rounded-xl text-[var(--color-pet-text-dark)] transition-all duration-200 font-[inherit] box-border text-center tracking-[0.15em] font-bold ${error ? 'bg-[#fef8f8] border-[1.5px] border-[#dc2626]' : 'bg-[var(--color-pet-input-bg)] border-[1.5px] border-transparent'}`}
            />
            {error && (
              <Paragraph typography="t7" color="#dc2626">
                <Paragraph.Text>{error}</Paragraph.Text>
              </Paragraph>
            )}
            <Button display="block" size="xlarge" color="primary" loading={isLoading} type="submit">
              참여하기
            </Button>
          </Box>
        </form>

        <Paragraph typography="t6" color="var(--color-pet-text-secondary)" textAlign="center">
          <span onClick={onBack} className="cursor-pointer">← 돌아가기</span>
        </Paragraph>
      </Box>
    </Card>
  );
};

export default StepJoinGroup;
