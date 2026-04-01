"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// UI 구성 요소 (Reused from existing Home implementations)
import Navbar from '@/components/home/Navbar/Navbar';
import Header from '@/components/home/Header/Header';
import FriendList, { Friend } from '@/components/home/FriendList/FriendList';
import CreatePartyModal from '@/components/home/CreatePartyModal/CreatePartyModal';
import ChatBubble from '@/components/home/Chat/ChatBubble';
import ChatWindow from '@/components/home/Chat/ChatWindow';

// The NEW Dashboard
import HomeDashboard from './home/components/HomeDashboard';
// Reused Container Components for Search
// Reused Container Components for Search
import SearchParty from '@/components/home/CardContainer/SearchParty'; // (Legacy)
import SearchDashboard from './home/components/SearchDashboard';
// import SearchGenre from '@/components/home/CardContainer/SearchGenre'; // Deprecated for Test
import CategoryGrid from './home/components/CategoryGrid';

export default function HomeTest() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [currentFilter, setCurrentFilter] = useState({
    platform: "" as string | undefined,
    category: "" as string | undefined,
    label: "홈"
  });
  const [search, setSearch] = useState("");

  const [isCreatePartyOpen, setIsCreatePartyOpen] = useState(false);
  const [chatState, setChatState] = useState({
    isOpen: false,
    isMinimized: false,
    activeFriend: null as Friend | null
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleFilterChange = (platform: string, category?: string, label?: string) => {
    setCurrentFilter({
      platform: platform === "홈" ? undefined : platform,
      category: category,
      label: label || platform
    });
    setSearch("");
  };

  const handleStartChat = (friend: Friend) => {
    setChatState({ isOpen: true, isMinimized: false, activeFriend: friend });
  };

  const renderMainContent = () => {
    if (search !== "") {
      return <SearchDashboard platform={currentFilter.platform} search={search} />;
    }
    if (currentFilter.label === "홈") {
      // 🚀 Use our new Magnetic Dashboard for the "Home" view
      return <HomeDashboard />;
    }

    return (
      <CategoryGrid
        platform={currentFilter.platform || "ALL"}
        category={currentFilter.category || "ALL"}
        label={currentFilter.label}
      />
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f0f0f] relative overflow-hidden">
      <Header
        onSearch={setSearch}
        onOpenCreateParty={() => setIsCreatePartyOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Navbar
          onFilterChange={handleFilterChange}
          isOpen={isSidebarOpen}
          currentFilter={currentFilter.label}
        />

        <main className="flex-1 overflow-y-auto px-10 pt-24 pb-12 scrollbar-hide">
          <div className="w-full h-full overflow-visible">
            <div className="animate-in fade-in duration-700 overflow-visible">
              {renderMainContent()}
            </div>
          </div>
        </main>
      </div>

      {isCreatePartyOpen && <CreatePartyModal onClose={() => setIsCreatePartyOpen(false)} />}

      {chatState.isOpen ? (
        <ChatWindow
          initialActiveFriend={chatState.activeFriend}
          onClose={() => setChatState({ ...chatState, isOpen: false, activeFriend: null })}
          onMinimize={() => setChatState({ ...chatState, isOpen: false, isMinimized: true })}
        />
      ) : (
        <ChatBubble
          onClick={() => setChatState({ ...chatState, isOpen: true, isMinimized: false })}
          hasUnread={true}
        />
      )}
    </div>
  );
}
