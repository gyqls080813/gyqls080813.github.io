import React, { ReactNode } from 'react';
import { Paragraph } from '@/shared/components/common/Paragraph';

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export const SpeechBubble = ({
  children,
  className = '',
  borderColor = '#4A3C31',
  backgroundColor = '#FFFFFF',
}: SpeechBubbleProps) => {
  return (
    <div className={`relative text-left ${className}`}>

      {}
      <div
        className="rounded-[1.25rem] px-3 py-2.5 lg:px-4 lg:py-3 shadow-md border-2"
        style={{
          borderColor,
          backgroundColor,
        }}
      >
        {children}
      </div>

      {}
      <div
        className="absolute"
        style={{
          bottom: '-0.875rem',
          right: '1.625rem',
          width: 0,
          height: 0,
          borderLeft: '0.5rem solid transparent',
          borderRight: '0.5rem solid transparent',
          borderTop: `1rem solid ${borderColor}`,
          zIndex: 0,
        }}
      />

      {}
      <div
        className="absolute"
        style={{
          bottom: '-0.6875rem',
          right: '1.75rem',
          width: 0,
          height: 0,
          borderLeft: '0.375rem solid transparent',
          borderRight: '0.375rem solid transparent',
          borderTop: `0.8125rem solid ${backgroundColor}`,
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default SpeechBubble;