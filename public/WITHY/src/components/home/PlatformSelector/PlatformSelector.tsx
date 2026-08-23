'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PlatformSelectorProps {
    currentPlatform?: string;
    onSelect: (platformId: string, label: string) => void;
}

const PlatformSelector = ({ currentPlatform, onSelect }: PlatformSelectorProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Unified list of platforms
    const platforms = [
        // Active Platforms
        { id: 'NETFLIX', label: 'NETFLIX', logo: '/logo/NETFLIX.png', isActive: true },
        { id: 'YOUTUBE', label: 'YOUTUBE', logo: '/logo/Youtube.png', isActive: true },
        // Coming Soon Platforms
        { id: 'Tving', label: 'Tving', logo: '/logo/Tving.png', isActive: false },
        { id: 'CoupangPlay', label: '쿠팡플레이', logo: '/logo/쿠팡플레이.png', isActive: false },
        { id: 'Wavve', label: 'Wavve', logo: '/logo/Wavve.png', isActive: false },
        { id: 'Watcha', label: '왓챠', logo: '/logo/왓챠.png', isActive: false },
        { id: 'Laftel', label: 'Laftel', logo: '/logo/Laftel.jpg', isActive: false },
        { id: 'DisneyPlus', label: '디즈니 플러스', logo: '/logo/디즈니 플러스.jpg', isActive: false },
        { id: 'AppleTV', label: '애플 TV+', logo: '/logo/apple tv plus.png', isActive: false },
    ];

    // Logic: Show 5 items initially.
    // We need to reserve space for ALL items (which implies 2 rows if ~5 per row).
    // Total 9 items. If grid calls for 5 cols, we need 2 rows.

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="w-full mb-8">
            {/* Header / Title if needed, or just the grid? User didn't specify title but implied it's "Categories" */}
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl font-bold text-white">플랫폼 선택</h2>
                <button
                    onClick={toggleExpand}
                    className="flex items-center text-sm text-neutral-400 hover:text-white transition-colors"
                >
                    {isExpanded ? '접기' : '더보기'}
                    {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                </button>
            </div>

            {/* 
        Grid Container with FIXED HEIGHT to prevent shifting.
        Using a grid with min-rows or fixed height.
        Let's assume item height is approx 60px-80px. 
        If 5 cols, 9 items take 2 rows. 
        If expanded: show all. If collapsed: show 5. 
        BUT "reserve position" means height should be fixed to 2 rows always?
        Yes: "미리 그 위치를 미리 확보해놓고".
      */}
            <div className="w-full grid grid-cols-5 gap-4 h-[180px] transition-all overflow-hidden p-2">
                {platforms.map((platform, index) => {
                    // Visibility logic:
                    // If expanded: Visible.
                    // If collapsed: Only first 5 visible.
                    // BUT to reserve space, we might render them but hide them (opacity 0 + pointer-events-none)?
                    // User said "Show 5 items... click more to see rest... reserve position".
                    // If we hide them with opacity, the space is taken.

                    const isVisible = isExpanded || index < 5;

                    return (
                        <button
                            key={platform.id}
                            onClick={() => {
                                if (isVisible) {
                                    onSelect(platform.id, platform.label);
                                }
                            }}
                            disabled={!isVisible} // Disable interaction if hidden
                            className={`
                relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
                ${currentPlatform === platform.id
                                    ? 'bg-neutral-800 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                                    : 'bg-neutral-900/50 border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600'
                                }
                ${!platform.isActive ? 'grayscale' : ''} // Only grayscale for inactive, manage opacity/hover via group or custom
              `}
                        >
                            {/* Image Container */}
                            <div className={`
                    relative w-12 h-12 mb-2 rounded-full overflow-hidden border-2 
                    ${currentPlatform === platform.id ? 'border-red-600' : 'border-transparent group-hover:border-white'}
                    ${!platform.isActive ? 'opacity-60' : ''}
                `}>
                                <img
                                    src={platform.logo}
                                    alt={platform.label}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Label */}
                            <span className={`
                    text-xs font-semibold truncate w-full text-center
                    ${currentPlatform === platform.id ? 'text-white' : 'text-neutral-400'}
                `}>
                                {platform.label}
                            </span>

                            {/* Coming Soon Badge if inactive */}
                            {!platform.isActive && isVisible && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neutral-600/50" title="Coming Soon" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PlatformSelector;
