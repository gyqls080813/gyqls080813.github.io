import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

export interface HoverActionGroupProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const HoverActionGroup: React.FC<HoverActionGroupProps> = ({ onEdit, onDelete }) => {
  if (!onEdit && !onDelete) return null;

  return (
    <div
      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0
                 bg-white/90 backdrop-blur-sm px-1.5 py-1 rounded-full border border-gray-200/50
                 shadow-sm pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                 transition-opacity duration-200 z-20"
      onClick={(e) => e.stopPropagation()}
    >
      {onEdit && (
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
          aria-label="Edit"
        >
          <Edit3 size={14} strokeWidth={2.5} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Delete"
        >
          <Trash2 size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

export default HoverActionGroup;
