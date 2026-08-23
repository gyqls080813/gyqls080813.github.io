"use client";

import React, { useState } from 'react';
import { useAIContents } from "@/hooks/home/PartyHooks/AIHooker";
import AIPartyCard from "../PartyCard/AIPartyCard";
import EmptyState from '@/components/home/EmptyState/EmptyState';

const RecommendAIParty = () => {
    const { data: parties, isLoading } = useAIContents();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [lastHoveredIndex, setLastHoveredIndex] = useState<number>(0);



    // Loading... or Show Empty
    if (isLoading) return null; // Or loading skeleton
    // 🎯 약속된 대로 상위 4개 사용
    const displayParties = parties ? parties.slice(0, 4) : [];

    return (
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-white">AI가 추천! 이 파티는 어때요?</h2>
            </div>

            {/* 🎯 아코디언 컨테이너 */}
            {displayParties.length === 0 ? (
                <div className="w-full h-[400px] flex items-center justify-center rounded-xl border border-white/5 bg-neutral-900/30 text-neutral-500 text-sm">
                    AI 추천 파티가 없습니다.
                </div>
            ) : (
                <div className="flex gap-4 h-[400px] w-full">
                    {displayParties.map((party, index) => (
                        <div
                            key={party.partyId}
                            onMouseEnter={() => {
                                setHoveredId(party.partyId);
                                setLastHoveredIndex(index);
                            }}
                            onMouseLeave={() => setHoveredId(null)}
                            className="flex-1 transition-all duration-700 ease-in-out"
                            style={{
                                // 초기 상태는 첫 번째 카드가 확장되어 있게 하거나, 아무것도 선택 안 된 상태
                                flex: (hoveredId === party.partyId || (hoveredId === null && index === lastHoveredIndex)) ? 4 : 1
                            }}
                        >
                            <AIPartyCard
                                party={party}
                                isExpanded={hoveredId === party.partyId || (hoveredId === null && index === lastHoveredIndex)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};


export default RecommendAIParty;