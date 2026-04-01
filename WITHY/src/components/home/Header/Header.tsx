"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Menu, Users, Plus, MessageCircle } from 'lucide-react';
import FriendList, { Friend } from '@/components/home/FriendList/FriendList';
import ChatWindow from '@/components/home/Chat/ChatWindow';
import { useFriend } from '@/hooks/home/useFriend';
import { useDm } from '@/hooks/home/useDm';
import { useGuardedNavigation } from '@/hooks/useGuardedNavigation';
import { useNavigationGuard } from '@/store/useNavigationGuard';
import ActivePartyExitModal from '@/components/home/ActivePartyExitModal/ActivePartyExitModal';
import { fetchSearchPartyList, SearchPartyData } from '@/api/home/PartyAPI/SearchParty';

import { useChatStore } from '@/store/useChatStore';

interface HeaderProps {
  onSearch: (query: string) => void;
  onOpenCreateParty: () => void;
  onToggleSidebar: () => void;
}

const Header = ({ onSearch, onOpenCreateParty, onToggleSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Search dropdown state
  const [searchResults, setSearchResults] = useState<SearchPartyData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);



  const friendListRef = useRef<HTMLDivElement>(null);

  // Global Chat Store
  const { isOpen: isChatOpen, activeFriend, openChat, closeChat, minimizeChat, toggleChat } = useChatStore();

  const chatButtonRef = useRef<HTMLDivElement>(null);

  // Guarded navigation for party exit
  const router = useRouter();
  const {
    guardedNavigate,
    isExitModalOpen,
    closeModal,
    pendingDestination,
    partyIdToLeave
  } = useGuardedNavigation();

  // Get party state for UI visibility (Create Party button)
  const { isInParty, isActive } = useNavigationGuard();

  // Debug: Log isInParty state changes
  useEffect(() => {
  }, [isInParty, isActive]);

  // Helper to handle starting chat from FriendList
  const handleStartChat = (friend: Friend) => {
    openChat(friend);
    // Ensure profile is closed when chat starts? Optional, but maybe good UX
    setIsProfileOpen(false);
  };

  // Close chat when clicking outside (ChatWindow handles its own outside click, but we might need this for the button toggle logic if we wrap them)
  // Actually ChatWindow has its own useClickOutside. We just need to ensure the button doesn't conflict.

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        friendListRef.current &&
        !friendListRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Notification States
  const [hasNewRequest, setHasNewRequest] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  // Check for friend requests and DMs (Polling)
  const { fetchReceivedRequests } = useFriend();
  const { fetchDmRooms } = useDm();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkNotifications = async () => {
      // 1. Friend Requests
      try {
        const requests = await fetchReceivedRequests();
        if (requests && requests.length > 0) {
          setHasNewRequest(true);
          setRequestCount(requests.length);
        } else {
          setHasNewRequest(false);
          setRequestCount(0);
        }
      } catch (e) {
        // console.error(e); 
      }

      // 2. DMs (Minimal logic: check if rooms list is valid, maybe enhance later)
      try {
        await fetchDmRooms();
      } catch (e) { }
    };

    checkNotifications(); // Initial check
    intervalId = setInterval(checkNotifications, 10000); // Poll every 10s

    return () => clearInterval(intervalId);
  }, [fetchReceivedRequests, fetchDmRooms]);

  // Debounced search API call for waiting room
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetchSearchPartyList(query, 0, 10);
      setSearchResults(response.data.parties || []);
      setShowDropdown(true);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Search handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Show dropdown with API results for all pages
    if (value.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        performSearch(value);
      }, 300);
    } else {
      setShowDropdown(false);
      setSearchResults([]);
    }
  };

  const handlePartySelect = (party: SearchPartyData) => {
    // Close dropdown
    setShowDropdown(false);
    setSearchQuery('');

    // Use guarded navigation for party selection
    guardedNavigate(`/waiting-room/${party.id}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      return;
    }

    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault();

      // Use guarded navigation for search
      const searchPath = `/home?search=${encodeURIComponent(searchQuery)}`;
      setShowDropdown(false);
      guardedNavigate(searchPath);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  return (
    <div className="pl-0 pr-8 py-4 bg-background z-50 sticky top-0 border-b border-white/5">
      <div className="flex items-center gap-4">
        {/* Left: Navigation Toggle & Logo */}
        <div className="flex items-center flex-shrink-0">
          {/* Hamburger aligns with Navbar (w-20) */}
          <div className="w-20 flex justify-center items-center">
            <button
              onClick={onToggleSidebar}
              className="cursor-pointer p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all"
              title="네비게이션 닫기"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo - Reduced by 50% */}
          <button
            onClick={() => guardedNavigate('/home')}
            className="w-48 h-14 relative overflow-hidden flex items-center justify-center rounded-lg transition-all hover:bg-white/5 cursor-pointer"
          >
            {/* 대문짝만한 로고 이미지 */}
            <img
              src="/header/unnamed__2_-removebg-preview (1).png"
              alt="Widdy Logo"
              className="h-full w-auto object-contain"
            />
          </button>
        </div>

        {/* Center: Search Bar - expands to fill remaining space */}
        <div className="flex-1">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="파티 검색..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-12 pr-6 py-3 rounded-xl bg-[#1f1f1f] border border-white/5 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            />

            {/* Search Dropdown (All Pages) */}
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-50"
              >
                {/* Search Result Header */}
                <div className="px-4 py-2 border-b border-white/10 bg-[#1f1f1f]">
                  <p className="text-sm text-neutral-400">
                    <span className="text-white font-medium">'{searchQuery}'</span>에 대한 검색 결과
                    <span className="text-white font-medium">({searchResults.length})</span>
                  </p>
                </div>

                {isSearching ? (
                  <div className="px-4 py-3 text-neutral-400 text-sm">검색 중...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((party) => (
                    <button
                      key={party.id}
                      onClick={() => handlePartySelect(party)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                    >
                      {/* Thumbnail */}
                      {party.thumbnail && (
                        <img
                          src={party.thumbnail}
                          alt={party.title}
                          className="w-12 h-12 rounded object-cover flex-shrink-0"
                        />
                      )}

                      {/* Party Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-medium truncate">{party.title}</p>
                          {party.isActive && (
                            <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase flex-shrink-0">LIVE</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                          <span>{party.platform}</span>
                          {party.genreNames?.[0] && (
                            <>
                              <span>·</span>
                              <span>{party.genreNames[0]}</span>
                            </>
                          )}
                          <span>·</span>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{party.currentParticipants}/{party.maxParticipants}명</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-neutral-400 text-sm">검색 결과가 없습니다.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0 relative">
          {/* Only show Create Party button when NOT in party */}
          {!isInParty && (
            <button
              onClick={onOpenCreateParty}
              className="cursor-pointer px-6 py-3 rounded-xl font-bold transition-all shadow-sm bg-[#500000] text-neutral-200 hover:bg-[#700000]"
              title="새로운 워치파티 생성"
            >
              + 만들기
            </button>
          )}

          {/* User Profile / Friends Button */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
              }}
              className={`cursor-pointer p-3 rounded-xl font-semibold transition-all shadow-sm border 
                ${hasNewRequest
                  ? "bg-red-600 border-red-600 text-white hover:bg-red-700"
                  : isProfileOpen
                    ? "border-red-600 text-red-500 bg-[#1f1f1f]"
                    : "border-white/5 bg-[#1f1f1f] text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              title="내 프로필 & 친구"
            >
              <Users className={`w-5 h-5 ${hasNewRequest ? "text-white" : ""}`} />
            </button>
            {hasNewRequest && requestCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-red-600 shadow-sm animate-in zoom-in duration-200">
                N
              </div>
            )}
          </div>

          {/* DM Chat Button */}
          <div ref={chatButtonRef}>
            <button
              onClick={() => {
                toggleChat();
              }}
              className={`cursor-pointer p-3 rounded-xl font-semibold transition-all shadow-sm border 
                ${isChatOpen
                  ? "border-red-600 text-red-500 bg-[#1f1f1f]"
                  : "border-white/5 bg-[#1f1f1f] text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              title="메시지함 열기"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Unified Popover Rendering */}
          {isChatOpen && (
            <ChatWindow
              initialActiveFriend={activeFriend}
              onClose={closeChat}
              onMinimize={minimizeChat}
              toggleRef={chatButtonRef}
            />
          )}

          {isProfileOpen && (
            <div ref={friendListRef} className="absolute right-0 top-0">
              <FriendList onClose={() => setIsProfileOpen(false)} onStartChat={handleStartChat} />
            </div>
          )}
        </div>
      </div>


      {/* Active Party Exit Modal */}
      {isExitModalOpen && partyIdToLeave && (
        <ActivePartyExitModal
          partyId={partyIdToLeave}
          onClose={closeModal}
          redirectPath={pendingDestination || '/home'}
        />
      )}
    </div>
  );
};

export default Header;