"use client";

import React from 'react';
import PartySection from './PartySection';
import PartyCard from '../PartyCard/PartyCard';

// Generic type for genre-based party data
export interface GenrePartyData {
    genre: {
        id: number;
        name: string;
    };
    parties: any[]; // Use your actual Party type here
}

interface GenericPartySectionProps {
    data: GenrePartyData[] | undefined;
    titleFormatter: (genreName: string) => string;
    onCategorySelect?: (platform: string, category: string, label: string) => void;
    isLoading?: boolean;
}

/**
 * Generic reusable component for rendering genre-based party sections
 * Eliminates code duplication between HotGenreParty, FollowedParty, etc.
 */
const GenericPartySection: React.FC<GenericPartySectionProps> = ({
    data,
    titleFormatter,
    onCategorySelect,
    isLoading = false,
}) => {
    // Don't render during loading or if no data
    if (isLoading || !data) return null;

    // Don't render if data is empty
    if (data.length === 0) return null;

    return (
        <>
            {data.map((item) => {
                // Detect if this genre/section contains OTT content
                const firstParty = item.parties && item.parties[0];
                const platform = firstParty?.platform?.toUpperCase();
                const isOtt = platform === 'NETFLIX' || platform === 'OTT';

                return (
                    <PartySection
                        key={item.genre.id}
                        title={titleFormatter(item.genre.name)}
                        variant="expandable"
                        layout={isOtt ? 'ott' : 'standard'}
                        onViewAll={() => {
                            if (onCategorySelect) {
                                const targetPlatform = firstParty?.platform || 'ALL';
                                onCategorySelect(targetPlatform, item.genre.name, item.genre.name);
                            }
                        }}
                    >
                        {item.parties && item.parties.map((party) => (
                            <PartyCard key={party.id} party={party} />
                        ))}
                    </PartySection>
                );
            })}
        </>
    );
};

export default GenericPartySection;
