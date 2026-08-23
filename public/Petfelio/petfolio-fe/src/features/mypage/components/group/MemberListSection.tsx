import React from 'react';
import { Card } from '@/shared/components/common/Card';
import { ListRow } from '@/shared/components/common/ListRow';
import { Badge } from '@/shared/components/common/Badge';
import { MemberAvatar } from './MemberAvatar';
import type { GroupMember } from '@/features/group/types/group';

interface MemberListSectionProps {
  members: GroupMember[];
  groupName: string;
  isHost: boolean;
  onKick: (member: GroupMember) => void;
  onDelegate?: (member: GroupMember) => void;
}

export function MemberListSection({ members, groupName, isHost, onKick, onDelegate }: MemberListSectionProps) {
  return (
    <Card elevation="low" radius="large">
      <Card.Header
        title={
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-pet-text, #3d2c1e)' }}>
            그룹 구성원
          </span>
        }
        right={
          groupName
            ? <span style={{ fontSize: '0.8rem', color: 'var(--color-pet-text-secondary, #8c7d6e)' }}>{groupName}</span>
            : undefined
        }
      />

      {members.length === 0 ? (
        <div style={{ padding: '2em', textAlign: 'center', color: 'var(--color-pet-text-muted, #b0a090)', fontSize: '0.85rem' }}>
          구성원이 없습니다
        </div>
      ) : (
        members.map((member, idx) => {
          const isHostMember = member.role === 'HOST';
          return (
            <ListRow
              key={member.userId}
              border={idx === 0 ? 'none' : 'indented'}
              verticalPadding="medium"
              left={<MemberAvatar imageUrl={member.imageUrl} name={member.name} userId={member.userId} />}
              contents={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-pet-text, #3d2c1e)' }}>
                      {member.nickname || member.name}
                    </span>
                    {isHostMember && <span style={{ fontSize: '0.75em' }}>☆</span>}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-pet-text-muted, #b0a090)' }}>
                    {member.name}
                  </span>
                </div>
              }
              right={
                isHostMember ? (
                  <Badge size="small" color="grey" variant="outline">호스트</Badge>
                ) : isHost ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                    {onDelegate && (
                      <button type="button" onClick={() => onDelegate(member)} aria-label={`${member.nickname} 위임`}
                        title="방장 위임"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFB300', padding: '0.25em', display: 'flex', alignItems: 'center', fontSize: '1.2em' }}>
                        ⭐
                      </button>
                    )}
                    <button type="button" onClick={() => onKick(member)} aria-label={`${member.nickname} 강퇴`}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-pet-text-muted, #b0a090)', padding: '0.25em', display: 'flex', alignItems: 'center', gap: '0.25em' }}>
                      ✕
                    </button>
                  </div>
                ) : null
              }
            />
          );
        })
      )}
    </Card>
  );
}
