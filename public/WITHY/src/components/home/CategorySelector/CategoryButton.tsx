'use client';

import React from 'react';

interface CategoryButtonProps {
    genre: string;
    isSelected: boolean;
    onClick: () => void;
    partyCount?: number; // 방 개수 (optional)
}

const CategoryButton = ({ genre, isSelected, onClick, partyCount }: CategoryButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                h-8 px-3 py-1.5 rounded-full text-xs transition-all
                flex items-center justify-center gap-1 min-w-0
                ${isSelected
                    ? 'bg-red-600 text-white font-bold shadow-sm'
                    : 'bg-neutral-800 text-neutral-400 font-medium hover:bg-neutral-700 hover:text-white'
                }
            `}
        >
            <span className="truncate">{genre}</span>
            {partyCount !== undefined && (
                <span className="flex-shrink-0 opacity-70">({partyCount})</span>
            )}
        </button>
    );
};

export default CategoryButton;
