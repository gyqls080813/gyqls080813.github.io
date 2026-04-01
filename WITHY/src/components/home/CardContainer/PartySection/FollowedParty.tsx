"use client";

import GenericPartySection from "./GenericPartySection";
import { useFollowedContents } from "@/hooks/home/PartyHooks/FollowedHooker";

interface FollowedPartyProps {
  onCategorySelect?: (platform: string, category: string, label: string) => void;
}

const FollowedParty = ({ onCategorySelect }: FollowedPartyProps) => {
  const { data: followedData, isLoading } = useFollowedContents();

  return (
    <GenericPartySection
      data={followedData}
      isLoading={isLoading}
      titleFormatter={(genreName) => `당신이 좋아하는 ${genreName} 파티!`}
      onCategorySelect={onCategorySelect}
    />
  );
};

export default FollowedParty;