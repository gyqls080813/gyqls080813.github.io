/**
 * EffectErrorBanner — Effect 에러를 시각적으로 표시하는 배너 컴포넌트
 *
 * Tagged Error 타입에 따라 아이콘/메시지/재시도 버튼이 자동으로 변경됨.
 * → "Effect로 이런 문제를 해결했다"를 보여주는 핵심 UI
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HttpError } from '@/api/effect/errors';
import { getErrorMessage, getErrorIcon, isRetryable } from '@/api/effect/errorMessages';

interface EffectErrorBannerProps {
  error: HttpError | null;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export const EffectErrorBanner: React.FC<EffectErrorBannerProps> = ({
  error,
  onRetry,
  onDismiss,
}) => {
  if (!error) return null;

  const bgMap: Record<string, string> = {
    ApiError: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
    NetworkError: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
    UnauthorizedError: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
    ParseError: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
  };

  const borderMap: Record<string, string> = {
    ApiError: '#dc3545',
    NetworkError: '#dc3545',
    UnauthorizedError: '#dc3545',
    ParseError: '#dc3545',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          background: bgMap[error._tag] || bgMap.ApiError,
          borderLeft: `4px solid ${borderMap[error._tag] || borderMap.ApiError}`,
          borderRadius: 12,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* 아이콘 */}
        <span style={{ fontSize: 20 }}>{getErrorIcon(error)}</span>

        {/* 메시지 */}
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#333' }}>
            {getErrorMessage(error)}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#777' }}>
            {error._tag}
            {error._tag === 'ApiError' && ` (${(error as any).status})`}
          </p>
        </div>

        {/* 재시도 버튼 */}
        {isRetryable(error) && onRetry && (
          <button
            onClick={onRetry}
            style={{
              background: borderMap[error._tag],
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            재시도
          </button>
        )}

        {/* 닫기 버튼 */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#999',
              cursor: 'pointer',
              fontSize: 16,
              padding: 4,
            }}
          >
            ✕
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
