import React from 'react';

interface ConfirmModalAction {
  label: string;
  danger?: boolean;
  onClick: () => void;
}

interface ConfirmModalProps {
  title: string;
  subtitle?: string;
  actions: ConfirmModalAction[];
  onClose: () => void;
}

export default function ConfirmModal({ title, subtitle, actions, onClose }: ConfirmModalProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.15s ease-out' }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none"
      >
        <div
          className="bg-pet-surface rounded-2xl shadow-xl w-full max-w-[340px] pointer-events-auto overflow-hidden"
          style={{ animation: 'scaleIn 0.2s ease-out' }}
        >
          {/* Content */}
          <div className="px-6 pt-6 pb-4 text-center">
            <p className="text-[0.95rem] font-bold text-pet-text leading-snug">{title}</p>
            {subtitle && (
              <p className="text-[0.8rem] text-pet-text-muted mt-2 leading-relaxed">{subtitle}</p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-pet-border" />

          {/* Actions */}
          <div className="flex">
            <button
              type="button"
              className="flex-1 py-3.5 text-[0.88rem] font-semibold text-pet-text-muted bg-transparent border-none cursor-pointer hover:bg-pet-badge-bg transition-colors"
              onClick={onClose}
            >
              취소
            </button>
            {actions.map((action, idx) => (
              <React.Fragment key={idx}>
                <div className="w-px bg-pet-border" />
                <button
                  type="button"
                  className={`flex-1 py-3.5 text-[0.88rem] font-bold bg-transparent border-none cursor-pointer transition-colors ${
                    action.danger
                      ? 'text-pet-red hover:bg-pet-red/5'
                      : 'text-[#007AFF] hover:bg-[#007AFF]/5'
                  }`}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* 스타일은 globals.css에서 제공됨 (fadeIn, scaleIn) */}
    </>
  );
}
