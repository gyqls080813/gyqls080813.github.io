import { useState } from 'react';
import { useUser } from '@/features/user/context/UserContext';
import {
  ProfileHeader,
  TabNavigation,
  AccountTab,
  GroupManagementTab,
  type Tab,
} from '@/features/mypage';


// ==========================================
// MyPage — 계정/반려동물/그룹 관리 탭 화면
// ==========================================

export default function MyPagePage() {
  const [activeTab, setActiveTab] = useState<Tab>('account');
  const { user, loading } = useUser();

  // UserContext → ProfileHeader 호환 객체로 변환
  const profile = user ? {
    nickname: user.nickname,
    name: user.name,
    email: user.email,
    role: user.role,
    groupName: user.groupName,
    imageUrl: user.imageUrl,
  } : null;

  if (loading) return (
    <div
      className="max-w-[500px] mx-auto min-h-screen"
      style={{ background: 'transparent', paddingBottom: '32px' }}
    >
      <ProfileHeader profile={null} loading={true} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );

  return (
    <div
      className="max-w-[500px] mx-auto min-h-screen"
      style={{ background: 'transparent', paddingBottom: '32px' }}
    >
      {/* ─── 1. 프로필 헤더 ─── */}
      <ProfileHeader profile={profile} loading={loading} />

      {/* ─── 2. 탭 네비게이션 ─── */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ─── 3. 탭 콘텐츠 ─── */}
      <div className="mx-4 mt-4">
        {activeTab === 'account' && <AccountTab />}
        {activeTab === 'group' && <GroupManagementTab />}
      </div>
    </div>
  );
}
