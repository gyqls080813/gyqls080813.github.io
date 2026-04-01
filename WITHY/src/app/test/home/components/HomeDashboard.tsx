"use client";

import React from "react";
import { BentoCard, GridItem } from "./BentoCard";
import { useHotContents } from "@/hooks/home/PartyHooks/HotHooker";
import { useFollowedContents } from "@/hooks/home/PartyHooks/FollowedHooker";
import { useContinueContents } from "@/hooks/home/PartyHooks/ContinueHooker";
import { adaptGenrePartyToGridItem, adaptContinuePartyToGridItem } from "../data/adapter";
import RecommendAIParty from "@/components/home/CardContainer/PartySection/RecommendAIParty";
import EmptyState from "@/components/home/EmptyState/EmptyState";

const SectionTitle = ({ title, sub }: { title: string; sub: string }) => (
    <div className="mb-6 ml-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
        <p className="text-neutral-400 text-sm mt-1">{sub}</p>
    </div>
);

export default function HomeDashboard() {
    const { data: hotData } = useHotContents();
    const { data: followedData } = useFollowedContents();

    return (
        <div className="w-full max-w-none px-6 py-10 space-y-16">
            <RecommendAIParty />

            {hotData?.map((group, i) => (
                <ContentSection
                    key={`hot-${group.genre.id}-${i}`}
                    group={group}
                    sectionType="Hot"
                />
            ))}

            {followedData?.map((group, i) => (
                <ContentSection
                    key={`follow-${group.genre.id}-${i}`}
                    group={group}
                    sectionType="Followed"
                />
            ))}

            <ContinueSection />
        </div>
    );
}

// 1. Continue Watching
const ContinueSection = () => {
    const { data: parties, isLoading } = useContinueContents();

    if (isLoading) return null;

    const hasData = parties && parties.length > 0;
    const items: GridItem[] = hasData ? parties.map((p, i) => adaptContinuePartyToGridItem(p, i)) : [];

    return (
        <section className="mb-16">
            <SectionTitle title="🔥 가장 잘맞는 이어보기" sub="시청 중인 파티로 바로 돌아가세요" />

            {hasData ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="min-h-[280px]">
                            <BentoCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </section>
    );
};

// Unified Section Component
const ContentSection = ({ group, sectionType }: { group: any, sectionType: string }) => {
    const rawParties = group.parties || [];

    // Create uniform items
    const items: GridItem[] = rawParties.map((p: any, i: number) => {
        return adaptGenrePartyToGridItem(p, i);
    });

    const titlePrefix = sectionType === "Hot" ? "🔥 요즘 핫한" : "🔥 내가 팔로우한";
    const subText = sectionType === "Hot" ? "지금 가장 인기 있는 파티들을 모았어요" : "취향저격 장르 파티를 모았어요";

    return (
        <section>
            <SectionTitle title={`${titlePrefix} ${group.genre.name}`} sub={subText} />
            {items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <div key={`${group.genre.id}-${item.id}-${index}`} className="aspect-[4/3] w-full">
                            {/* Card itself has aspect ratio control for image, but container helps grid sizing */}
                            <BentoCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </section>
    );
};
