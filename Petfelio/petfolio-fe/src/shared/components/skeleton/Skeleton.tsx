import React from 'react';

/* ─── 기본 스켈레톤 블록 ─── */
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  className = '',
  style,
}) => (
  <div
    className={`skeleton-pulse ${className}`}
    style={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, #f0ece6 25%, #e8e2d9 50%, #f0ece6 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeletonPulse 1.5s ease-in-out infinite',
      ...style,
    }}
  />
);

/* ─── 원형 스켈레톤 ─── */
export const SkeletonCircle: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => (
  <Skeleton
    width={size}
    height={size}
    borderRadius="50%"
    className={className}
  />
);

/* ─── 텍스트 라인 스켈레톤 ─── */
export const SkeletonText: React.FC<{
  lines?: number;
  widths?: (string | number)[];
  gap?: number;
  height?: number;
}> = ({ lines = 3, widths, gap = 8, height = 14 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        width={widths?.[i] || (i === lines - 1 ? '60%' : '100%')}
        height={height}
      />
    ))}
  </div>
);

/* ─── 카드형 스켈레톤 ─── */
export const SkeletonCard: React.FC<{
  height?: number | string;
  children?: React.ReactNode;
}> = ({ height = 'auto', children }) => (
  <div
    style={{
      background: 'var(--color-pet-surface, #fff)',
      borderRadius: 16,
      padding: '20px',
      border: '1px solid var(--color-pet-border, #f0f0f0)',
      height,
    }}
  >
    {children}
  </div>
);

/* ─── 리스트 아이템 스켈레톤 ─── */
export const SkeletonListItem: React.FC<{ hasAvatar?: boolean }> = ({ hasAvatar = true }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
    {hasAvatar && <SkeletonCircle size={40} />}
    <div style={{ flex: 1 }}>
      <Skeleton width="70%" height={14} style={{ marginBottom: 6 }} />
      <Skeleton width="45%" height={12} />
    </div>
    <Skeleton width={60} height={14} />
  </div>
);

export default Skeleton;
