"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useGenreContents } from "@/hooks/home/PartyHooks/GenreHooker";
import { BentoCard, GridItem } from "./BentoCard";
import { processPartiesToStackedGrid } from "../layout/BlockStacker";

interface CategoryGridProps {
    platform: string;
    category?: string;
    label: string;
}

/**
 * Replaces SearchGenre.tsx with the new Magnetic Grid Block Stacking layout.
 */
export default function CategoryGrid({ platform, category, label }: CategoryGridProps) {
    const requestCategory = category || "";

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useGenreContents(platform, requestCategory);

    const observerRef = useRef<HTMLDivElement>(null);

    // Flatten all pages into one diverse array
    const rawParties = data?.pages.flatMap((page) => page.data.parties) || [];

    // Transform into Stacked Grid Items
    // Memoizing this is good practice ideally, but for now direct calc is fine unless laggy
    const gridItems: GridItem[] = processPartiesToStackedGrid(rawParties);

    const [hovered, setHovered] = useState<GridItem | null>(null);

    // Infinite Scroll Observer
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

    if (isLoading) {
        return (
            <div className="flex justify-center py-40">
                <div className="w-12 h-12 border-4 border-neutral-800 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-700 px-8 py-12">
            {/* Title Header */}
            <div className="mb-12 border-b border-black/5 pb-4">
                <h2 className="text-4xl font-bold tracking-tight text-neutral-900">{label}</h2>
                <p className="text-neutral-500 font-medium mt-2">
                    Explore {rawParties.length} active parties in a curated stack.
                </p>
            </div>

            <div className="w-full max-w-none">
                {gridItems.length > 0 ? (
                    <div
                        className="w-full grid gap-6 overflow-visible"
                        style={{
                            gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
                            // Ensure rows are auto-sized consistently
                            gridAutoRows: "minmax(40px, 5vw)"
                        }}
                    >
                        {gridItems.map((item) => (
                            <BentoCard
                                key={`${item.id}-${item.index}`} // Unique key
                                item={item}
                                hoveredItem={hovered}
                                setHoveredItem={setHovered}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="h-96 flex flex-col items-center justify-center text-neutral-400">
                        <p className="text-xl font-bold">No active parties found right now.</p>
                        <p className="text-sm">Be the first to start a party in this genre!</p>
                    </div>
                )}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={observerRef} className="h-32 w-full flex items-center justify-center mt-10">
                {isFetchingNextPage && (
                    <div className="text-neutral-500 font-medium">Loading next block...</div>
                )}
            </div>
        </div>
    );
}
