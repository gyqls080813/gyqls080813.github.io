// src/components/home/CardContainer/PartySection.tsx
"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PartySectionProps {
  title: string;
  children?: React.ReactNode;
  variant?: 'expandable' | 'fixed';
  onViewAll?: () => void; // Callback for View All click
  layout?: 'standard' | 'ott'; // Clearer naming than isOtt
  initialRows?: number; // Number of rows to show initially (default: 1)
  expandedRows?: number; // Number of rows to show when expanded (default: 2)
}

const PartySection = ({
  title,
  children,
  variant = 'fixed',
  onViewAll,
  layout = 'standard',
  initialRows = 1,
  expandedRows = 2,
}: PartySectionProps) => {
  // Convert children to array to handle slicing
  const childrenArray = React.Children.toArray(children);
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate column count based on layout
  const colCount = layout === 'ott' ? 4 : 3;

  // Calculate visible items based on expansion state and configurable rows
  const visibleLimit = isExpanded ? colCount * expandedRows : colCount * initialRows;
  const visibleChildren = childrenArray.slice(0, visibleLimit);

  // Check if there are more items than initially visible
  const hasMoreItems = childrenArray.length > colCount * initialRows;

  // Show "더보기" button: not expanded AND has more items
  const showMoreButton = !isExpanded && hasMoreItems;

  // Show "전체보기" button: expanded AND onViewAll handler exists
  const showViewAllButton = isExpanded && onViewAll;

  // Handler: expand to show more items
  const handleMoreClick = () => {
    setIsExpanded(true);
  };

  return (
    <section className="mb-12 last:mb-0 group">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      </div>

      {childrenArray.length === 0 ? (
        <div className="w-full h-32 flex items-center justify-center rounded-xl border border-white/5 bg-neutral-900/30 text-neutral-500 text-sm">
          진행 중인 파티가 없습니다.
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${layout === 'ott' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-3`}>
          {visibleChildren.map((child, index) => (
            <div key={index} className="flex justify-center w-full">
              {child}
            </div>
          ))}
        </div>
      )}

      {/* Button area */}
      <div className="flex justify-center mt-6">
        {showMoreButton ? (
          // "더보기" button (expand to show more rows)
          <button
            onClick={handleMoreClick}
            className="flex items-center gap-2 px-8 py-3 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white rounded-full transition-all group/btn"
          >
            <span className="text-sm font-bold">더보기</span>
            <ChevronDown className="w-4 h-4 text-zinc-400 group-hover/btn:text-white transition-colors" />
          </button>
        ) : showViewAllButton ? (
          // "전체보기" button (navigate to category page)
          <button
            onClick={onViewAll}
            className="flex items-center gap-2 px-8 py-3 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white rounded-full transition-all group/btn"
          >
            <span className="text-sm font-bold">전체보기</span>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover/btn:text-white transition-colors" />
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default PartySection;