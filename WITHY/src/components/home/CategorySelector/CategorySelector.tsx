'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSearchCategory } from '@/hooks/home/SearchCategory';
import { CATEGORY_CODES } from '@/constants/home/CallCategory';
import CategoryButton from './CategoryButton';
import { useGenrePartyCounts } from '@/hooks/home/useGenrePartyCounts';

interface CategorySelectorProps {
    currentPlatform?: string;
    onSelect: (category: string, label: string) => void;
    currentCategory?: string; // To highlight selected genre
}

const CategorySelector = ({ currentPlatform, onSelect, currentCategory }: CategorySelectorProps) => {
    // Load expansion state from sessionStorage
    const STORAGE_KEY = 'categorySelector_expanded';
    const [isExpanded, setIsExpanded] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            return saved === 'true';
        }
        return false;
    });

    // Map platform label to API platform code (OTT vs YOUTUBE)
    // 'Wait' logic: If platform is coming soon (Tving etc), we might not have categories yet?
    // User said "Then put that platform's categories...".
    // Assuming Tving/etc are just "OTT" internally or separate?
    // Current logic in NavSection passed 'title' (OTT or YOUTUBE) to useSearchCategory.
    // We need to map: "NETFLIX" -> "OTT", "YOUTUBE" -> "YOUTUBE".
    // For new platforms, if they are "OTT", we show OTT genres? Or hide?
    // Let's assume Netflix -> OTT, Youtube -> YOUTUBE.
    // Others: "Coming Soon" so maybe no genres? Or display dummy/OTT genres?
    // "해당 플랫폼의 카테고리" implies we should show something.
    // existing `useSearchCategory` takes `platform` argument.

    let apiPlatform = 'OTT';
    if (currentPlatform === 'YOUTUBE') apiPlatform = 'YOUTUBE';
    // For now, default others to OTT or handle emptiness.

    const { data: fetchedGenres = [], isLoading } = useSearchCategory(apiPlatform, true); // Always fetch if mounted

    // 🎯 각 장르별 파티 개수를 가져옵니다 (프론트엔드에서 계산)
    const genreNames = fetchedGenres.map((g: { name: string; partyCount: number }) => g.name);
    const { countMap, isLoading: isCountLoading } = useGenrePartyCounts(apiPlatform, genreNames);

    // Helper to get ID (copied from NavSection logic)
    const getGenreId = (platform: string, genreName: string): string | undefined => {
        if (platform === 'YOUTUBE') {
            return CATEGORY_CODES.YOUTUBE.find(item => item.name === genreName)?.id;
        }
        // Assuming 'OTT' covers Netflix
        if (platform === 'OTT' || platform === 'NETFLIX') { // handle safe fallback
            // Actually NavSection passed 'title' which was 'OTT' or 'YOUTUBE'.
            // We should stick to that if possible.
            // But currentPlatform coming in is likely 'NETFLIX' (label) or 'OTT' (type)?
            // Navbar passes `type` as title. type is 'OTT' or 'YOUTUBE'. label is 'NETFLIX'.
            // We need to know the *type*.
            // In Navbar: onFilterChange(platform, ...) -> platform is item.id.
            // Existing items: type 'OTT' -> id 'OTT'. (Wait, existing logic: title={type}, label={type=='OTT'?'NETFLIX':type})
            // So for Netflix, the ID passed to filter is likely 'OTT' or 'NETFLIX'?
            // Let's check Navbar again: onFilterChange(platform, category, label).
            // NavSection title={type}. type comes from API. likely 'OTT' and 'YOUTUBE'.
            // If I select Netflix, platform is 'OTT'.
            // If I select Tving, platform is 'Tving'.

            // So if platform is 'OTT', search 'OTT'. If 'YOUTUBE', search 'YOUTUBE'.
            // If 'Tving', we might not have logic yet.

            for (const key in CATEGORY_CODES.OTT) {
                const items = CATEGORY_CODES.OTT[key as keyof typeof CATEGORY_CODES.OTT];
                const found = items.find(item => item.name === genreName);
                if (found) return found.id;
            }
        }
        return undefined;
    };

    // If no platform selected, we might shouldn't render? But parent handles that.

    // Also include "All" (전체) option with updated party counts from countMap
    const genresWithCounts = fetchedGenres
        .map((g: { name: string; partyCount: number }) => ({
            name: g.name,
            partyCount: countMap.get(g.name) || 0
        }))
        .sort((a: { name: string; partyCount: number }, b: { name: string; partyCount: number }) => b.partyCount - a.partyCount); // 방 개수 내림차순 정렬
    const allGenres = [{ name: "전체", partyCount: 0 }, ...genresWithCounts];

    const toggleExpand = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(STORAGE_KEY, String(newState));
        }
    };

    // 선택된 카테고리가 10개 이후에 있으면 자동으로 펼치기
    React.useEffect(() => {
        if (currentCategory && allGenres.length > 10) {
            const selectedIndex = allGenres.findIndex(g => g.name === currentCategory);
            if (selectedIndex >= 10 && !isExpanded) {
                setIsExpanded(true);
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem(STORAGE_KEY, 'true');
                }
            }
        }
    }, [currentCategory, allGenres, isExpanded]);

    return (
        <div className="w-full mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Header removed as per request */}

            <div className="w-full grid grid-cols-10 gap-2 transition-all min-h-[32px]">
                {isLoading ? (
                    // Loading Skeletons
                    Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="h-8 bg-neutral-900 rounded-full animate-pulse" />
                    ))
                ) : (
                    (isExpanded ? allGenres : allGenres.slice(0, 10)).map((genreObj) => {
                        const isSelected = (!currentCategory && genreObj.name === "전체") || currentCategory === genreObj.name;
                        return (
                            <CategoryButton
                                key={genreObj.name}
                                genre={genreObj.name}
                                isSelected={isSelected}
                                partyCount={genreObj.name === "전체" ? undefined : genreObj.partyCount}
                                onClick={() => {
                                    if (genreObj.name === "전체") {
                                        onSelect("", "전체");
                                    } else {
                                        const id = getGenreId(apiPlatform, genreObj.name);
                                        onSelect(id || genreObj.name, genreObj.name);
                                    }
                                }}
                            />
                        );
                    })
                )}
            </div>

            {/* Bottom "More" Button (Simulating BR tag area) */}
            {!isLoading && allGenres.length > 10 && (
                <div className="flex justify-center mt-2 w-full">
                    <button
                        onClick={toggleExpand}
                        className="flex items-center text-xs text-neutral-400 hover:text-white transition-colors py-1"
                    >
                        {isExpanded ? '접기' : '더보기'}
                        {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategorySelector;
