import React from 'react';
import type { BottomSheetAction, BottomSheetProps } from './types';

const BottomSheet: React.FC<BottomSheetProps> = ({
  title,
  subtitle,
  actions,
  onClose,
}) => {
  return (
    <>

      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-pet-surface rounded-t-2xl shadow-lg animate-slide-up">

        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-pet-grid" />
        </div>

        {(title || subtitle) && (
          <div className="px-5 py-3 border-b border-pet-border">
            {title && <p className="text-sm font-semibold text-pet-text">{title}</p>}
            {subtitle && <p className="text-xs text-pet-text-muted mt-0.5">{subtitle}</p>}
          </div>
        )}

        <div className="flex flex-col">
          {actions.map((action, idx) => (
            <button
              key={idx}
              type="button"
              className={`flex items-center gap-3 px-5 py-4 text-left text-sm font-medium border-none bg-transparent cursor-pointer transition-colors ${
                action.danger
                  ? 'text-pet-red hover:bg-pet-red/5'
                  : 'text-pet-text hover:bg-pet-badge-bg'
              }`}
              onClick={action.onClick}
            >
              {action.icon && <span className="flex items-center">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>

        {}
        <div className="px-4 pt-2 pb-6">
          <button
            type="button"
            className="w-full py-3 rounded-xl text-sm font-semibold text-pet-text-muted bg-pet-grid border-none cursor-pointer hover:bg-pet-border transition-colors"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
      {/* 스타일은 globals.css에서 제공됨 (bottomSheetSlideUp, animate-slide-up) */}
    </>
  );
};

BottomSheet.displayName = 'BottomSheet';
export default BottomSheet;
