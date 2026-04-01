import React from 'react';
import { Card } from '@/shared/components/common/Card';
import { Button } from '@/shared/components/common/Button';
import { ListRow } from '@/shared/components/common/ListRow';

interface InviteCodeSectionProps {
  inviteCode: string;
  isHost: boolean;
  refreshing: boolean;
  onRefresh: () => void;
}

export function InviteCodeSection({ inviteCode, isHost, refreshing, onRefresh }: InviteCodeSectionProps) {
  const [showCode, setShowCode] = React.useState(false);

  const handleCopy = () => {
    if (!inviteCode) return;
    navigator.clipboard.writeText(inviteCode).catch(() => {});
  };

  return (
    <Card elevation="low" radius="large">
      {/* 헤더 */}
      <div style={{ padding: '0.875em 1em 0.5em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-pet-text, #3d2c1e)' }}>
          초대 코드
        </span>
        {isHost && (
          <Button size="small" variant="weak" color="dark" loading={refreshing} onClick={onRefresh} htmlStyle={{ fontSize: '0.75rem' }}>
            갱신
          </Button>
        )}
      </div>

      {/* 코드 행 */}
      <ListRow
        border="none"
        verticalPadding="small"
        contents={
          showCode ? (
            <span 
              onClick={() => setShowCode(false)}
              style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-pet-text, #3d2c1e)', fontFamily: 'monospace', cursor: 'pointer' }}
            >
              {inviteCode || '—'}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setShowCode(true)}
              style={{
                background: '#f0f6ff',
                color: '#3182f6',
                border: 'none',
                padding: '0.4em 0.8em',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              눌러서 확인하기
            </button>
          )
        }
        right={
          <button type="button" onClick={handleCopy} aria-label="초대 코드 복사"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-pet-text-muted, #b0a090)', padding: '0.25em', fontSize: '1.2em' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        }
      />

      {/* 안내 텍스트 */}
      <div style={{ padding: '0 1em 0.875em' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-pet-text-muted, #b0a090)' }}>
          이 코드를 공유하여 구성원을 초대하세요
        </span>
      </div>
    </Card>
  );
}
