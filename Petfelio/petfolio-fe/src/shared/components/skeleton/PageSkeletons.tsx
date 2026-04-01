import React from 'react';
import { Skeleton, SkeletonCircle, SkeletonCard, SkeletonListItem, SkeletonText } from './Skeleton';

/* ─────────────────────────────────────────────
   Home 페이지 스켈레톤
   ───────────────────────────────────────────── */
export const HomeSkeleton: React.FC = () => (
  <div className="max-w-[500px] mx-auto" style={{ padding: '20px 16px' }}>
    {/* 상단 인사말 */}
    <Skeleton width="50%" height={24} style={{ marginBottom: 8 }} />
    <Skeleton width="70%" height={16} style={{ marginBottom: 24 }} />

    {/* 메뉴 아이콘 그리드 */}
    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 28 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <SkeletonCircle size={48} />
          <Skeleton width={40} height={10} />
        </div>
      ))}
    </div>

    {/* 이번달 요약 카드 */}
    <SkeletonCard height={140}>
      <Skeleton width="40%" height={14} style={{ marginBottom: 12 }} />
      <Skeleton width="60%" height={28} style={{ marginBottom: 16 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <Skeleton width="50%" height={40} borderRadius={12} />
        <Skeleton width="50%" height={40} borderRadius={12} />
      </div>
    </SkeletonCard>

    {/* 소모품 섹션 */}
    <div style={{ marginTop: 20 }}>
      <Skeleton width="30%" height={18} style={{ marginBottom: 12 }} />
      <div style={{ display: 'flex', gap: 12 }}>
        <Skeleton width="33%" height={100} borderRadius={14} />
        <Skeleton width="33%" height={100} borderRadius={14} />
        <Skeleton width="33%" height={100} borderRadius={14} />
      </div>
    </div>

    {/* 랭킹 섹션 */}
    <div style={{ marginTop: 20 }}>
      <Skeleton width="25%" height={18} style={{ marginBottom: 12 }} />
      <SkeletonCard>
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
      </SkeletonCard>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Dashboard 페이지 스켈레톤
   ───────────────────────────────────────────── */
export const DashboardSkeleton: React.FC = () => (
  <div className="max-w-[500px] mx-auto" style={{ padding: '20px 16px' }}>
    {/* 탭 바 */}
    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
      <Skeleton width="33%" height={36} borderRadius={20} />
      <Skeleton width="33%" height={36} borderRadius={20} />
      <Skeleton width="33%" height={36} borderRadius={20} />
    </div>

    {/* 펫 아바타 리스트 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 24 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <SkeletonCircle size={60} />
          <Skeleton width={36} height={10} />
        </div>
      ))}
    </div>

    {/* 요약 카드 */}
    <SkeletonCard height={120}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Skeleton width="30%" height={14} />
        <Skeleton width="20%" height={14} />
      </div>
      <Skeleton width="50%" height={32} style={{ marginBottom: 12 }} />
      <Skeleton width="70%" height={14} />
    </SkeletonCard>

    {/* 차트 영역 */}
    <div style={{ marginTop: 16 }}>
      <SkeletonCard height={240}>
        <SkeletonCircle size={160} className="mx-auto" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
          <Skeleton width={60} height={12} />
          <Skeleton width={60} height={12} />
          <Skeleton width={60} height={12} />
        </div>
      </SkeletonCard>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Ledger (가계부) 페이지 스켈레톤
   ───────────────────────────────────────────── */
export const LedgerSkeleton: React.FC = () => (
  <div className="max-w-[500px] mx-auto" style={{ padding: '20px 16px' }}>
    {/* 월 선택 */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 20 }}>
      <Skeleton width={24} height={24} borderRadius={6} />
      <Skeleton width={100} height={22} />
      <Skeleton width={24} height={24} borderRadius={6} />
    </div>

    {/* 캘린더 그리드 */}
    <SkeletonCard>
      {/* 요일 헤더 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} height={14} borderRadius={4} />
        ))}
      </div>
      {/* 날짜 셀 */}
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
          {Array.from({ length: 7 }).map((_, col) => (
            <Skeleton key={col} height={40} borderRadius={8} />
          ))}
        </div>
      ))}
    </SkeletonCard>

    {/* 하단 거래 내역 */}
    <div style={{ marginTop: 16 }}>
      <Skeleton width="25%" height={16} style={{ marginBottom: 12 }} />
      <SkeletonCard>
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
      </SkeletonCard>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Account (카드) 페이지 스켈레톤
   ───────────────────────────────────────────── */
export const AccountSkeleton: React.FC = () => (
  <div className="max-w-[500px] mx-auto" style={{ padding: '20px 16px' }}>
    {/* 삭제 버튼 */}
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
      <Skeleton width={56} height={28} borderRadius={10} />
    </div>
    {/* 이번달 지출 */}
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <Skeleton width={100} height={14} style={{ margin: '0 auto 8px' }} />
      <Skeleton width={160} height={36} style={{ margin: '0 auto' }} />
    </div>
    {/* 카드 */}
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
      <Skeleton width={280} height={400} borderRadius={20} />
    </div>
    {/* 인디케이터 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
      <Skeleton width={20} height={8} borderRadius={4} />
      <Skeleton width={8} height={8} borderRadius={4} />
      <Skeleton width={8} height={8} borderRadius={4} />
    </div>
    {/* 카드 정보 */}
    <div style={{ display: 'flex', gap: 8 }}>
      <Skeleton width="50%" height={64} borderRadius={14} />
      <Skeleton width="50%" height={64} borderRadius={14} />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Report 페이지 스켈레톤
   ───────────────────────────────────────────── */
export const ReportSkeleton: React.FC = () => (
  <div className="max-w-[500px] mx-auto" style={{ padding: '20px 16px' }}>
    <Skeleton width="40%" height={24} style={{ marginBottom: 20 }} />

    {/* 상위 카드 */}
    <SkeletonCard height={180}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'flex-end', marginBottom: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <SkeletonCircle size={50} />
          <Skeleton width={60} height={50} borderRadius={8} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <SkeletonCircle size={60} />
          <Skeleton width={60} height={70} borderRadius={8} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <SkeletonCircle size={45} />
          <Skeleton width={60} height={40} borderRadius={8} />
        </div>
      </div>
    </SkeletonCard>

    {/* 차트 섹션 */}
    <div style={{ marginTop: 16 }}>
      <SkeletonCard height={200}>
        <Skeleton width="30%" height={16} style={{ marginBottom: 16 }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 140 }}>
          {[60, 100, 80, 40, 90, 70].map((h, i) => (
            <Skeleton key={i} width={30} height={h} borderRadius={6} />
          ))}
        </div>
      </SkeletonCard>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Mypage 스켈레톤
   ───────────────────────────────────────────── */
export const MypageSkeleton: React.FC = () => (
  <div className="max-w-[500px] mx-auto" style={{ padding: '20px 16px' }}>
    {/* 탭 바 */}
    <div style={{ display: 'flex', gap: 0, marginBottom: 20, background: 'var(--color-pet-surface, #fff)', borderRadius: 30, overflow: 'hidden', border: '1px solid var(--color-pet-border, #f0f0f0)' }}>
      <Skeleton width="33%" height={44} borderRadius={0} />
      <Skeleton width="33%" height={44} borderRadius={0} />
      <Skeleton width="34%" height={44} borderRadius={0} />
    </div>

    {/* 프로필 카드 */}
    <SkeletonCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <SkeletonCircle size={56} />
        <div style={{ flex: 1 }}>
          <Skeleton width="50%" height={18} style={{ marginBottom: 6 }} />
          <Skeleton width="70%" height={13} />
        </div>
      </div>
    </SkeletonCard>

    {/* 리스트 아이템들 */}
    <div style={{ marginTop: 12 }}>
      <SkeletonCard>
        <SkeletonListItem hasAvatar={false} />
        <SkeletonListItem hasAvatar={false} />
        <SkeletonListItem hasAvatar={false} />
      </SkeletonCard>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Supplies (소모품) 페이지 스켈레톤
   ───────────────────────────────────────────── */
export const SuppliesSkeleton: React.FC = () => (
  <div className="max-w-[500px] mx-auto" style={{ padding: '20px 16px' }}>
    <Skeleton width="35%" height={24} style={{ marginBottom: 20 }} />

    {/* 소모품 카드 목록 */}
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} style={{ marginBottom: 12 }}>
        <SkeletonCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <SkeletonCircle size={48} />
            <div style={{ flex: 1 }}>
              <Skeleton width="60%" height={16} style={{ marginBottom: 8 }} />
              <Skeleton width="40%" height={12} style={{ marginBottom: 6 }} />
              <Skeleton width="80%" height={8} borderRadius={4} />
            </div>
          </div>
        </SkeletonCard>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Health (건강) 페이지 스켈레톤
   ───────────────────────────────────────────── */
export const HealthSkeleton: React.FC = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
    padding: '1rem',
    boxSizing: 'border-box',
    paddingBottom: '8rem',
  }}>
    {/* 헤더: 펫 아바타 + 이름 + 뱃지 */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', padding: '0 0.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <SkeletonCircle size={44} />
        <div>
          <Skeleton width={130} height={18} style={{ marginBottom: 6 }} />
          <Skeleton width={100} height={12} />
        </div>
      </div>
      <Skeleton width={90} height={28} borderRadius={20} />
    </div>

    {/* 나이대 탭 바 */}
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', padding: '0 0.25rem' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} height={40} borderRadius={16} style={{ flex: '1 0 auto', minWidth: 70 }} />
      ))}
    </div>

    {/* 가이드 박스 */}
    <SkeletonCard>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <SkeletonCircle size={32} />
        <div style={{ flex: 1 }}>
          <Skeleton width="95%" height={14} style={{ marginBottom: 8 }} />
          <Skeleton width="70%" height={14} />
        </div>
      </div>
    </SkeletonCard>

    {/* 체크리스트 타이틀 + 완료 뱃지 */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 }}>
      <Skeleton width={140} height={18} />
      <Skeleton width={60} height={24} borderRadius={12} />
    </div>

    {/* 체크리스트 아이템 3개 */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} style={{ marginBottom: 10 }}>
        <SkeletonCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Skeleton width={24} height={24} borderRadius={6} />
            <div style={{ flex: 1 }}>
              <Skeleton width="30%" height={14} style={{ marginBottom: 6 }} />
              <Skeleton width="80%" height={12} />
            </div>
          </div>
        </SkeletonCard>
      </div>
    ))}
  </div>
);

/* ─── 페이지별 스켈레톤 매핑 ─── */
export const PageSkeletons = {
  home: HomeSkeleton,
  dashboard: DashboardSkeleton,
  ledger: LedgerSkeleton,
  account: AccountSkeleton,
  report: ReportSkeleton,
  mypage: MypageSkeleton,
  supplies: SuppliesSkeleton,
  health: HealthSkeleton,
} as const;
