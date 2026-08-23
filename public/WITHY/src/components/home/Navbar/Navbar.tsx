/* Navbar.tsx */
import React, { useState } from 'react';
import { usePlatformTypes } from '@/hooks/home/FindPlatform';
import { NavSection } from './NavSection';
import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onFilterChange: (platform: string, category?: string, label?: string) => void;
  isOpen: boolean;
  currentFilter: string;
  activePlatform?: string; // New Prop for syncing expansion
}

export default function Navbar({ onFilterChange, isOpen, currentFilter, activePlatform }: NavbarProps) {
  const { data: platformTypes = [] } = usePlatformTypes();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const router = useRouter();

  // Navigation Guard (Moved to layout handleFilterChange)
  // const { isInWaitingRoom, partyIdToLeave, setWaitingRoomState } = useNavigationGuard();
  // const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  // const leavePartyMutation = useLeaveParty();

  // Sync expanded section with activePlatform
  React.useEffect(() => {
    if (activePlatform && activePlatform !== "홈" && activePlatform !== "ALL") {
      setExpandedSection(activePlatform);
    }
  }, [activePlatform]);

  /* Sub-genre / Filter Button Style (Red Border Active) */
  const getBtnStyle = (isActive: boolean) =>
    isActive
      ? "bg-transparent border border-red-600 text-white font-bold shadow-sm"
      : "bg-transparent border border-transparent text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-300";

  return (
    <>
      <aside className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} bg-background h-full overflow-y-auto scrollbar-hide z-40 relative`}>
        <div className="p-4 space-y-2">

          {/* 1. 홈 버튼 */}
          <button
            onClick={() => {
              onFilterChange("홈", undefined, "홈");
              setExpandedSection(null); // Collapse other sections to reset their styles
            }}
            className={`
              transition-all duration-300
              ${isOpen
                ? `w-full flex items-center px-2 h-10 rounded-xl transition-all ${currentFilter === "홈" ? "text-white font-bold" : "text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-300"}`
                : `w-10 h-10 flex items-center justify-center rounded-xl mx-auto transition-colors ${currentFilter === "홈"
                  ? "bg-neutral-800 text-white"
                  : "bg-transparent text-neutral-400 hover:text-white"
                }`
              }
            `}
          >
            {isOpen ? (
              <>
                {/* Expanded: Icon inside App-Icon Box (w-10 h-10) + Text */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 ${currentFilter === "홈" ? "bg-neutral-800" : "bg-transparent"}`}>
                  <Home className="w-5 h-5 text-neutral-400" />
                </div>
                <span className="font-semibold text-sm">홈</span>
              </>
            ) : (
              /* Collapsed: Icon only */
              <Home className="w-5 h-5" />
            )}
          </button>

          <div className="my-4" />
          {/* 🎯 2. 그 아래에 서버에서 받아온 플랫폼 리스트를 뿌려줍니다. */}
          {platformTypes.map((type) => (
            <NavSection
              key={type}
              title={type}
              label={type === "OTT" ? "NETFLIX" : type}
              isOpen={isOpen}
              isExpanded={expandedSection === type}
              onToggle={() => setExpandedSection(expandedSection === type ? null : type)}
              currentFilter={currentFilter}
              onFilterChange={(platform, category, label) => {
                onFilterChange(platform, category, label);
              }}
              getBtnStyle={getBtnStyle}
            />
          ))}

          {/* 🚧 3. 준비 중인 서비스 목록 */}
          {[
            { id: 'Tving', label: 'Tving', logo: '/logo/Tving.png' },
            { id: 'CoupangPlay', label: '쿠팡플레이', logo: '/logo/coupangplay.png' },
            { id: 'Wavve', label: 'Wavve', logo: '/logo/Wavve.png' },
            { id: 'Watcha', label: '왓챠', logo: '/logo/watcha.png' },
            { id: 'Laftel', label: 'Laftel', logo: '/logo/Laftel.jpg' },
            { id: 'DisneyPlus', label: '디즈니 플러스', logo: '/logo/disneyplus.jpg' },
            { id: 'AppleTV', label: '애플 TV+', logo: '/logo/appletvplus.png' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                // 라우팅 대신 상위 컴포넌트 필터 핸들러 호출
                // platform = item.id (예: Tving), category = undefined, label = item.label
                onFilterChange(item.id, undefined, item.label);
              }}
              className={`
                transition-all duration-300
                ${isOpen
                  ? `w-full flex items-center px-2 h-10 rounded-xl transition-all opacity-60 grayscale hover:opacity-100 hover:grayscale-0 ${currentFilter === item.label ? "text-white font-bold shadow-sm opacity-100 grayscale-0" : "text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-300"}`
                  : `w-10 h-10 flex items-center justify-center rounded-xl mx-auto transition-colors opacity-60 grayscale hover:opacity-100 hover:grayscale-0 ${currentFilter === item.label
                    ? "bg-transparent text-white shadow-lg scale-105 opacity-100 grayscale-0"
                    : "bg-transparent text-neutral-400 hover:text-white"
                  }`
                }
              `}
              title={item.label}
            >
              {isOpen ? (
                <>
                  <div className={`w-10 h-10 rounded-xl bg-transparent flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden ${currentFilter === item.label ? "" : ""}`}>
                    {item.logo ? (
                      <img src={item.logo} alt={item.label} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-black">{item.label[0]}</span>
                    )}
                  </div>
                  <span className="font-semibold text-sm truncate">{item.label}</span>
                </>
              ) : (
                <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                  {item.logo ? (
                    <img src={item.logo} alt={item.label} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-black">{item.label[0]}</span>
                  )}
                </div>
              )}
            </button>
          ))}

        </div>
      </aside>
    </>
  );
}