import React from "react";
import type { IconSize, IconProps } from './types';
export type { IconProps } from './types';

const iconSizeMap: Record<IconSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
}

export const SvgFrame = ({
  size = 'medium',
  className = '',
  children,
  ...props
}: IconProps & { children: React.ReactNode }) => {
  const pixelSize = iconSizeMap[size];

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-colors ${className}`}
      {...props}
    >
      {children}
    </svg>
  );
};