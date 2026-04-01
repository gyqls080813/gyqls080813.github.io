"use client";

import React from 'react';
import RecommendAIParty from "./PartySection/RecommendAIParty"; // Uncommented and moved
import HotGenreParty from "./PartySection/HotGenreParty";
import FollowedParty from "./PartySection/FollowedParty";
import ContinueParty from "./PartySection/ContinueParty";

import CategorySelector from "../CategorySelector/CategorySelector";

interface HomeDashboardProps {
  onCategorySelect: (platform: string, category: string, label: string) => void;
  currentPlatform?: string;
  currentCategory?: string;
}

const HomeDashboard = ({ onCategorySelect, currentPlatform, currentCategory }: HomeDashboardProps) => {
  return (
    <div className="space-y-4 pb-20">
      {/*
        Show Category Selector only if a platform is selected (and it's not "Home" although "Home" might mean "OTT" default?).
        User said "When Netflix is clicked... categories appear".
        If currentPlatform is defined (e.g. "NETFLIX"), show selector.
      */}
      {currentPlatform && (
        <CategorySelector
          currentPlatform={currentPlatform}
          currentCategory={currentCategory}
          onSelect={(category, label) => {
            // onCategorySelect(platform, categoryId, categoryLabel)
            // We need to pass the currentPlatform as the first arg.
            onCategorySelect(currentPlatform, category, label);
          }}
        />
      )}

      <div className="space-y-12">
        <RecommendAIParty />
        <HotGenreParty onCategorySelect={onCategorySelect} />
        <FollowedParty onCategorySelect={onCategorySelect} />
        <ContinueParty />
      </div>
    </div>
  );
};

export default HomeDashboard;