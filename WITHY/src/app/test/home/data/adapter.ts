import { GenreParty } from "@/api/home/PartyAPI/FindHotPartyList";
import { ContinueParty } from "@/api/home/PartyAPI/FindContinuePartyList";
import { GridItem } from "../components/BentoCard";

// Helper to get random mock poster if real one is missing
const PLACEHOLDERS = [
    "https://image.tmdb.org/t/p/w500/zzVK06F2a0gqT15k9hT4t9Z5gXj.jpg",
    "https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
    "https://image.tmdb.org/t/p/w500/2cxhvwyEw9SzMdWq8Dn75h9JHTE.jpg",
    "https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3y8qV.jpg"
];

const getRandomPoster = (id: number) => PLACEHOLDERS[id % PLACEHOLDERS.length];

export function adaptGenrePartyToGridItem(
    party: GenreParty | any,
    index: number
): GridItem {

    const poster = party.thumbnail || party.backgroundImage || party.poster_path || getRandomPoster(party.id);

    // Status Logic
    // If isActive is explicitly undefined, we might assume LIVE for hot parties or check props.
    // Assuming boolean true = LIVE, false = WAITING (or if maxParticipants > current?)
    // Let's rely on `isActive`.
    const isLive = party.isActive === true;

    return {
        id: party.id,
        title: party.title,
        poster_path: poster,
        backdrop_path: poster,
        genre: party.genreNames ? party.genreNames[0] : "General",
        index: index,
        // Removed Layout Coords for Uniform Grid

        // Added Metadata
        platform: party.platform,
        hostprofile: party.hostprofile || party.hostNickname,
        currentParticipants: party.currentParticipants,
        maxParticipants: party.maxParticipants,
        status: isLive ? 'LIVE' : 'WAITING',
        isPrivate: party.isPrivate
    };
}

export function adaptContinuePartyToGridItem(
    party: ContinueParty | any,
    index: number
): GridItem {
    const poster = party.thumbnail || party.backgroundImage || party.hostprofile || getRandomPoster(party.id);

    return {
        id: party.id,
        title: party.title,
        poster_path: poster,
        backdrop_path: poster,
        genre: party.platform,
        index: index,
        status: 'LIVE', // Continue watching implies it's ongoing or available
        isPrivate: party.isPrivate
    };
}
