import React from 'react';
import Image from 'next/image';
import { Card } from '@/shared/components/common/Card';
import { ListRow } from '@/shared/components/common/ListRow';
import trashImg from '@/shared/components/ui/category/trash.png';

interface LeaveGroupSectionProps {
  isHost?: boolean;
  onLeave: () => void;
}

export function LeaveGroupSection({ isHost, onLeave }: LeaveGroupSectionProps) {
  return (
    <Card elevation="low" radius="large">
      <ListRow
        border="none"
        verticalPadding="medium"
        withTouchEffect
        onClick={onLeave}
        left={
          <Image src={trashImg} alt="" width={44} height={44} style={{ objectFit: 'contain' }} />
        }
        contents={
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-pet-red, #e05c5c)', marginBottom: '0.15em' }}>
              {isHost ? '그룹 해체' : '그룹 탈퇴'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-pet-text-muted, #b0a090)' }}>
              {isHost
                ? '모든 구성원이 강퇴되고, 그룹이 삭제됩니다.'
                : '그룹에서 나가게 됩니다.'
              }
            </div>
          </div>
        }
      />
    </Card>
  );
}
