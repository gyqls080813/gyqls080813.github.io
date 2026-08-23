"use client";
// 컴포넌트
import Header from '@/components/mypage/Header/Header';
import ProfileSection from '@/components/mypage/Profile/Profile';
import HistorySection from '@/components/mypage/HistorySection/HistorySection';
import HostedPartySection from '@/components/mypage/HostedPartySection/HostedPartySection';
// 훅
import { useMyProfileQuery } from '@/hooks/user/Myprofile';
import Footer from '@/components/footer/Footer';


export default function MyPage() {
  const { data, isLoading } = useMyProfileQuery();
  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">로딩 중...</div>;
  }

  if (!data) {
    return null;
  }

  const userData = {
    nickname: data.data.nickname || "이름 없음",
    email: data.data.email || "",
    profileImageUrl: data.data.profileImageUrl
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-[1440px] mx-auto px-10 py-12">
        <ProfileSection user={userData} />
        <div className="mt-12 space-y-12">
          <HostedPartySection />
          <HistorySection />
        </div>
      </main>
      <Footer/>
    </div>
  );
}