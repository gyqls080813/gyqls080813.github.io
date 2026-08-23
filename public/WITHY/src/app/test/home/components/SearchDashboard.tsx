"use client";

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSearchContents } from "@/hooks/home/PartyHooks/SearchHooker";
import { BentoCard, GridItem } from "./BentoCard";
import { processPartiesToStackedGrid } from "../layout/BlockStacker";
import { GenreParty } from "@/api/home/PartyAPI/FindHotPartyList";
import { SearchPartyData } from "@/api/home/PartyAPI/SearchParty";

interface SearchDashboardProps {
    platform?: string;
    search: string;
}

// Scoring Weights
const SCORE_EXACT_TITLE = 100;
const SCORE_PARTIAL_TITLE = 50;
const SCORE_PLATFORM_MATCH = 20;
const SCORE_PARTICIPANT_FACTOR = 0.5;

function mapSearchDataToGenreParty(s: SearchPartyData): GenreParty {
    return {
        id: s.id,
        title: s.title,
        platform: s.platform,
        mediaType: s.mediaType || 'UNKNOWN',
        genreNames: s.genreNames || [],
        currentParticipants: s.currentParticipants,
        maxParticipants: s.maxParticipants,
        isActive: s.isActive,
        isPrivate: s.isPrivate,
        scheduledActiveTime: s.scheduledActiveTime || new Date().toISOString(),
        currentPlaybackTime: s.currentPlaybackTime || null,
        thumbnail: s.thumbnail || '',
        host: {
            userId: s.host?.userId || 0,
            nickname: s.host?.nickname || "Unknown Host",
            profileImageUrl: s.host?.profileImageUrl || ""
        }
    };
}

function calculateRelevanceScore(party: GenreParty, term: string, filterPlatform?: string): number {
    let score = 0;
    const lowerTerm = term.toLowerCase();
    const lowerTitle = party.title.toLowerCase();

    // 1. Text Matching
    if (lowerTitle === lowerTerm) {
        score += SCORE_EXACT_TITLE;
    } else if (lowerTitle.includes(lowerTerm)) {
        score += SCORE_PARTIAL_TITLE;
        if (lowerTitle.startsWith(lowerTerm)) score += 10;
    }

    // 2. Platform Matching
    if (filterPlatform && party.platform === filterPlatform) {
        score += SCORE_PLATFORM_MATCH;
    }

    // 3. Activity
    score += (party.currentParticipants * SCORE_PARTICIPANT_FACTOR);

    return score;
}

export default function SearchDashboard({ platform, search }: SearchDashboardProps) {
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useSearchContents(search);

    const observerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<GridItem | null>(null);

    // --- Cumulative Logic State ---
    const [archivedParties, setArchivedParties] = useState<GenreParty[]>([]);

    // We strictly use the raw data from the current query
    const currentRawParties = useMemo(() => {
        return data?.pages.flatMap((page) => page.data.parties) || [];
    }, [data]);

    // Snapshot Ref to hold data during transition
    const lastPartiesRef = useRef<GenreParty[]>([]);
    const lastSearchRef = useRef<string>(search);

    // Update snapshot whenever we have valid data
    useEffect(() => {
        if (currentRawParties.length > 0) {
            lastPartiesRef.current = currentRawParties.map(mapSearchDataToGenreParty);
        }
    }, [currentRawParties]);

    // Detect Search Change -> Archive Old Data
    useEffect(() => {
        if (search !== lastSearchRef.current) {
            // Search changed!
            // Archive the PREVIOUS search's data (snapshot)
            // But wait, we want to stack them: [MostRecentArchive, OlderArchive...]
            // And current display will be: [NewCurrent, ...Archives]

            // Only archive if we actually had results
            if (lastPartiesRef.current.length > 0) {
                // Prevent duplication if the exact same search was repeated? 
                // User says "search everytime" -> "stack everytime". Duplicate keys handled by BlockStacker.
                setArchivedParties(prev => [...lastPartiesRef.current, ...prev]);
            }

            // Reset snapshot for the new search
            lastPartiesRef.current = [];
            lastSearchRef.current = search;
        }
    }, [search]);


    // Combined Data: Current (Top) + Archived (Bottom)
    const displayParties = useMemo(() => {
        const currentMapped = currentRawParties.map(mapSearchDataToGenreParty);
        return [...currentMapped, ...archivedParties];
    }, [currentRawParties, archivedParties]);


    // Scoring & Sorting Logic (Only sort the CURRENT batch, or sort everything?)
    // User: "New calls... stack ON TOP". 
    // This implies we preserve the order of the archives (they were already sorted when they were 'current').
    // We should ONLY RE-SORT the Current Batch. Archives are frozen history.

    // Actually, `processPartiesToStackedGrid(..., keepOrder=true)` respects array order.
    // So we just need to ensure `displayParties` is ordered: [SortedCurrent, ...Archived].

    const finalSortedParties = useMemo(() => {
        // 1. Sort Current Batch
        const currentMapped = currentRawParties.map(mapSearchDataToGenreParty);

        // Score Current
        const scoredCurrent = currentMapped.map(p => ({
            party: p,
            score: calculateRelevanceScore(p, search, platform)
        }));
        scoredCurrent.sort((a, b) => b.score - a.score);
        const sortedCurrent = scoredCurrent.map(s => s.party);

        // 2. Concatenate with Archives (Frozen)
        return [...sortedCurrent, ...archivedParties];

    }, [currentRawParties, archivedParties, search, platform]);


    // Grid Transformation
    const gridItems: GridItem[] = useMemo(() => {
        // Use Strict Stacking (Gapless)
        // Deduplication in BlockStacker will handle ID collisions if I search the same thing twice.
        return processPartiesToStackedGrid(finalSortedParties, true);
    }, [finalSortedParties]);


    // Infinite Scroll Observer (Only triggers for CURRENT search)
    useEffect(() => {
        if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) fetchNextPage();
            },
            { threshold: 0.1 }
        );

        const currentRef = observerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


    return (
        <div className="animate-in fade-in duration-700 px-8 py-12">
            <div className="mb-12 border-b border-black/5 pb-4 flex items-end gap-4">
                <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
                    '{search}' <span className="text-neutral-400">results</span>
                </h2>
                <p className="text-neutral-500 font-medium mb-1.5">
                    {finalSortedParties.length} total stacked
                </p>
                {archivedParties.length > 0 && (
                    <span className="text-xs text-neutral-400 mb-2 ml-auto">
                        ({archivedParties.length} from history)
                    </span>
                )}
            </div>

            <div className="w-full max-w-none min-h-[50vh]">
                {gridItems.length > 0 ? (
                    <div
                        className="w-full grid gap-6 overflow-visible"
                        style={{
                            gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
                            gridAutoRows: "minmax(40px, 5vw)"
                        }}
                    >
                        <AnimatePresence mode='popLayout'>
                            {gridItems.map((item) => (
                                <BentoCard
                                    key={`${item.id}-${item.index}`} // Compound Key to allow same party in different positions/searches? 
                                    // BlockStacker dedups by ID so item.id is unique.
                                    item={item}
                                    hoveredItem={hovered}
                                    setHoveredItem={setHovered}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="h-96 flex flex-col items-center justify-center text-neutral-400">
                        {/* Only show empty state if NO archives either */}
                        {archivedParties.length === 0 ? (
                            <>
                                <p className="text-xl font-bold">No matches for "{search}"</p>
                                <p>Try searching for a different title.</p>
                            </>
                        ) : (
                            <p className="text-xl font-bold">Searching...</p>
                        )}
                    </div>
                )}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={observerRef} className="h-32 w-full flex items-center justify-center mt-10">
                {isFetchingNextPage && (
                    <div className="text-neutral-500 font-medium animate-pulse">Scanning more frequencies...</div>
                )}
            </div>
        </div>
    );
}
