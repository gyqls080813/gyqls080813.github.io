"use client";

import GenericPartySection from "./GenericPartySection";
import { useHotContents } from "@/hooks/home/PartyHooks/HotHooker";

interface HotGenrePartyProps {
  onCategorySelect?: (platform: string, category: string, label: string) => void;
}

const HotGenreParty = ({ onCategorySelect }: HotGenrePartyProps) => {
  const { data: hotData, isLoading } = useHotContents();

  return (
    <GenericPartySection
      data={hotData}
      isLoading={isLoading}
      titleFormatter={(genreName) => `사람들이 많이 보는 ${genreName} 파티!`}
      onCategorySelect={onCategorySelect}
    />
  );
};

export default HotGenreParty;