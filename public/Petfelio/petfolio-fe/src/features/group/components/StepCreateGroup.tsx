import React, { useState } from 'react';
import { createGroup } from '@/features/group/api/group';
import { Card } from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { ApiError } from '@/api/request';

interface Props {
  onCreated: (groupId: number, inviteCode: string) => void;
  onBack: () => void;
}

const StepCreateGroup: React.FC<Props> = ({ onCreated, onBack }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('그룹 이름을 입력해주세요.'); return; }

    setIsLoading(true);
    try {
      const res = await createGroup({ name: name.trim() });
      onCreated(res.data.groupId, res.data.inviteCode);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.getDataMessage() || '그룹 생성에 실패했습니다.');
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
            src="/images/onboarding-create.png"
            alt="그룹 만들기"
            className="w-[120px] h-[120px] object-contain mb-1"
          />
          <Paragraph typography="t3" fontWeight="bold" textAlign="center">
            <Paragraph.Text>그룹 만들기</Paragraph.Text>
          </Paragraph>
          <Paragraph typography="t6" color="var(--color-pet-text-secondary)" textAlign="center">
            <Paragraph.Text>가계부를 함께 관리할 그룹 이름을 정해주세요</Paragraph.Text>
          </Paragraph>
        </Box>

        <form onSubmit={handleSubmit} noValidate className="w-full">
          <Box direction="column" gap="medium" fullWidth>
            <input
              type="text" value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="그룹 이름 (예: 우리 가족)"
              className={`w-full px-4 py-3.5 text-[15px] outline-none rounded-xl text-[var(--color-pet-text-dark)] transition-all duration-200 font-[inherit] box-border ${error ? 'bg-[#fef8f8] border-[1.5px] border-[#dc2626]' : 'bg-[var(--color-pet-input-bg)] border-[1.5px] border-transparent'}`}
            />
            {error && (
              <Paragraph typography="t7" color="#dc2626">
                <Paragraph.Text>{error}</Paragraph.Text>
              </Paragraph>
            )}
            <Button display="block" size="xlarge" color="primary" loading={isLoading} type="submit">
              그룹 만들기
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

export default StepCreateGroup;
