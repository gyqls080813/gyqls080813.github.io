import React from 'react';
import { Card } from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';

interface Props {
  onSelect: (choice: 'create' | 'join') => void;
}

const StepGroupChoice: React.FC<Props> = ({ onSelect }) => {
  return (
    <Card elevation="medium" radius="large" padding="large">
      <Box direction="column" gap="large" alignItems="center">
        <Box direction="column" gap="xsmall" alignItems="center">
          <Paragraph typography="t3" fontWeight="bold" textAlign="center">
            <Paragraph.Text>그룹을 선택해주세요</Paragraph.Text>
          </Paragraph>
          <Paragraph typography="t6" color="var(--color-pet-text-secondary)" textAlign="center">
            <Paragraph.Text>반려동물 가계부를 함께 관리할 그룹이에요</Paragraph.Text>
          </Paragraph>
        </Box>

        <Box direction="row" gap="medium" fullWidth>

          <Card
            elevation="none"
            radius="large"
            padding="medium"
            clickable
            withBorder
            onClick={() => onSelect('create')}
            htmlStyle={{ flex: 1, textAlign: 'center' }}
          >
            <Box direction="column" gap="small" alignItems="center">
              <div className="w-[110px] h-[110px] rounded-3xl flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8f0fe, #dbeafe)' }}>
                <img
                  src="/images/onboarding-create.png"
                  alt="새 그룹 만들기"
                  className="w-full h-full object-cover"
                />
              </div>
              <Paragraph typography="t5" fontWeight="bold">
                <Paragraph.Text>새 그룹 만들기</Paragraph.Text>
              </Paragraph>
              <Paragraph typography="t7" color="var(--color-pet-text-secondary)">
                <Paragraph.Text>가족·친구와 함께 시작해요</Paragraph.Text>
              </Paragraph>
            </Box>
          </Card>

          <Card
            elevation="none"
            radius="large"
            padding="medium"
            clickable
            withBorder
            onClick={() => onSelect('join')}
            htmlStyle={{ flex: 1, textAlign: 'center' }}
          >
            <Box direction="column" gap="small" alignItems="center">
              <div className="w-[110px] h-[110px] rounded-3xl flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #e6f9ee, #d1fae5)' }}>
                <img
                  src="/images/onboarding-join.png"
                  alt="기존 그룹 참여"
                  className="w-full h-full object-cover"
                />
              </div>
              <Paragraph typography="t5" fontWeight="bold">
                <Paragraph.Text>기존 그룹 참여</Paragraph.Text>
              </Paragraph>
              <Paragraph typography="t7" color="var(--color-pet-text-secondary)">
                <Paragraph.Text>초대 코드로 합류해요</Paragraph.Text>
              </Paragraph>
            </Box>
          </Card>
        </Box>
      </Box>
    </Card>
  );
};

export default StepGroupChoice;
