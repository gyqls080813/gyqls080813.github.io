import { GridItem } from "../components/BentoCard";
import { GenreParty } from "@/api/home/PartyAPI/FindHotPartyList";
import { adaptGenrePartyToGridItem } from "../data/adapter";

// Basic Master Pattern Definition (0-10 items)
export const MASTER_PATTERN_TEMPLATE = [
    { i: 0, type: "HERO", colStart: 8, colSpan: 6, rowStart: 1, rowSpan: 6 }, // 1. Center Hero
    { i: 1, type: "MEDIUM", colStart: 1, colSpan: 4, rowStart: 1, rowSpan: 4 }, // 2. Left Med
    { i: 2, type: "MEDIUM", colStart: 17, colSpan: 4, rowStart: 1, rowSpan: 4 }, // 3. Right Med
    // Interleave Pillars to bridge gaps early
    { i: 5, type: "PILLAR", colStart: 5, colSpan: 3, rowStart: 1, rowSpan: 2 }, // 4. Left Pillar Top
    { i: 8, type: "PILLAR", colStart: 14, colSpan: 3, rowStart: 1, rowSpan: 2 }, // 5. Right Pillar Top
    { i: 6, type: "PILLAR", colStart: 5, colSpan: 3, rowStart: 3, rowSpan: 2 }, // 6. Left Pillar Mid
    { i: 9, type: "PILLAR", colStart: 14, colSpan: 3, rowStart: 3, rowSpan: 2 }, // 7. Right Pillar Mid
    // Corners
    { i: 3, type: "SMALL", colStart: 1, colSpan: 4, rowStart: 5, rowSpan: 2 }, // 8. Left Small
    { i: 4, type: "SMALL", colStart: 17, colSpan: 4, rowStart: 5, rowSpan: 2 }, // 9. Right Small
    // Bottom Pillars
    { i: 7, type: "PILLAR", colStart: 5, colSpan: 3, rowStart: 5, rowSpan: 2 }, // 10. Left Pillar Bot
    { i: 10, type: "PILLAR", colStart: 14, colSpan: 3, rowStart: 5, rowSpan: 2 }, // 11. Right Pillar Bot
] as const;

const BLOCK_HEIGHT_ROWS = 6;
const CHUNK_SIZE = 11;

/**
 * Processes a flat list of API parties into a stacked grid layout.
 * @param parties The list of parties
 * @param keepOrder If true, skips the automatic "Best Participant = Hero" swap. Used for Search where relevance order matters.
 */
export function processPartiesToStackedGrid(parties: GenreParty[], keepOrder: boolean = false): GridItem[] {
    const result: GridItem[] = [];

    // Deduplicate parties by ID to prevent repeating same party if API returns duplicates across pages
    const uniqueParties = Array.from(new Map(parties.map(p => [p.id, p])).values());

    const chunkCount = Math.ceil(uniqueParties.length / CHUNK_SIZE);

    for (let b = 0; b < chunkCount; b++) {
        // 1. Slice
        const startIdx = b * CHUNK_SIZE;
        const chunk = uniqueParties.slice(startIdx, startIdx + CHUNK_SIZE);

        // Safety check for empty chunk
        if (chunk.length === 0) continue;

        // 2. Identify Hero (Party with max participants)
        // Skip this if keepOrder is true (Search Mode)
        if (!keepOrder) {
            let maxIdx = 0;
            let maxVal = -1;

            chunk.forEach((p, idx) => {
                if (p.currentParticipants > maxVal) {
                    maxVal = p.currentParticipants;
                    maxIdx = idx;
                }
            });

            // 3. Reorder for Pattern Mapping
            // We want the best item at index 0 (which maps to HERO slot in template)
            // We simply swap element at 0 with element at maxIdx
            const sortedChunk = [...chunk];
            if (maxIdx !== 0 && sortedChunk.length > 0) {
                const temp = sortedChunk[0];
                sortedChunk[0] = sortedChunk[maxIdx];
                sortedChunk[maxIdx] = temp;

                // Update chunk for processing
                chunk.length = 0;
                chunk.push(...sortedChunk);
            }
        }

        // 4. Map to Grid with Y-Offset
        const blockOffsetY = b * BLOCK_HEIGHT_ROWS;

        chunk.forEach((party, localIndex) => {
            // If chunk is smaller than 11, we just fill what we can. 
            // Logic handles up to index 10.
            if (localIndex >= MASTER_PATTERN_TEMPLATE.length) return;

            const pattern = MASTER_PATTERN_TEMPLATE[localIndex];

            // Final Global Position
            const gridItem = adaptGenrePartyToGridItem(party, startIdx + localIndex);

            result.push(gridItem);
        });
    }

    return result;
}
