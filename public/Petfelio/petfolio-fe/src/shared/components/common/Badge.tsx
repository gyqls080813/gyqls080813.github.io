import type { BadgeSize, BadgeColor, BadgeVariant, BadgeProps } from './types';

const sizeStyles: Record<BadgeSize, string> = {
  xsmall: 'text-[0.6rem] px-[0.4em] py-[0.1em] font-bold',
  small: 'text-[0.75rem] px-[0.5em] py-[0.15em] font-semibold',
  medium: 'text-[0.875rem] px-[0.6em] py-[0.2em] font-medium',
  large: 'text-[1rem] px-[0.7em] py-[0.25em] font-medium',
};

const colorStyles: Record<BadgeColor, Record<BadgeVariant, string>> = {
  blue: {
    fill: 'bg-blue-100 text-blue-600',
    outline: 'border-[0.08em] border-blue-600 text-blue-600 bg-transparent',
  },
  red: {
    fill: 'bg-red-100 text-red-600',
    outline: 'border-[0.08em] border-red-600 text-red-600 bg-transparent',
  },
  grey: {
    fill: 'bg-gray-100 text-gray-600',
    outline: 'border-[0.08em] border-gray-400 text-gray-600 bg-transparent',
  },
  green: {
    fill: 'bg-green-100 text-green-600',
    outline: 'border-[0.08em] border-green-600 text-green-600 bg-transparent',
  },
};

export const Badge = ({
  size = 'medium',
  color = 'blue',
  variant = 'fill',
  children,
  className = '',
  fullWidth = false,
  maxLength = 5,
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-[0.3em] transition-all whitespace-nowrap';
  const widthStyle = fullWidth ? 'w-full' : 'w-fit';
  const selectedSize = sizeStyles[size];
  const selectedColor = colorStyles[color][variant];
  const displayChildren =
    typeof children === 'string' && children.length > maxLength
      ? `${children.substring(0, maxLength)}...`
      : children;

  return (
    <span className={`${baseStyles} ${selectedSize} ${selectedColor} ${widthStyle} ${className}`}>
      {displayChildren}
    </span>
  );
};