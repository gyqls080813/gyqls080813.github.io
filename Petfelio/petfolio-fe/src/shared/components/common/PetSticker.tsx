import React from 'react';
import { motion } from 'framer-motion';

export type PetStickerType =
  | 'grooming'
  | 'savings'
  | 'medical'
  | 'snacks'
  | 'overspending'
  | 'default';

export type PetStickerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';

export interface PetStickerProps {
  imageUrl?: string;
  type: PetStickerType;
  size?: PetStickerSize;
  alt?: string;
  className?: string;
}

const dummyStickerMap: Record<string, string> = {
  grooming: 'https://loremflickr.com/96/96/pomeranian,grooming/all',
  savings: 'https://loremflickr.com/96/96/pomeranian,money/all',
  medical: 'https://loremflickr.com/96/96/pomeranian,hospital/all',
  snacks: 'https://loremflickr.com/96/96/pomeranian,snack/all',
  overspending: 'https://loremflickr.com/96/96/pomeranian,sad/all',
  default: 'https://loremflickr.com/96/96/pomeranian/all',
};

const sizeClassMap: Record<PetStickerSize, string> = {
  xs: 'w-[1.75em] h-[1.75em]',
  sm: 'w-[2em] h-[2em]',
  md: 'w-[2.5em] h-[2.5em]',
  lg: 'w-[4em] h-[4em]',
  xl: 'w-[6em] h-[6em]',

  hero: 'w-[24em] h-[24em]',
};

export const PetSticker: React.FC<PetStickerProps> = ({
  imageUrl,
  type,
  size = 'md',
  alt,
  className = '',
}) => {

  const src: string =
    imageUrl && imageUrl.trim() !== ''
      ? imageUrl
      : dummyStickerMap[type] ?? dummyStickerMap.default;

  const baseClass = [
    'object-cover',
    'drop-shadow-sm',
    'pointer-events-none',
    'rounded-xl',
    'bg-white',
    'p-[0.15em]',
    sizeClassMap[size],
  ].join(' ');

  const mergedClass = [baseClass, className].filter(Boolean).join(' ');

  return (
    <motion.img
      src={src}
      alt={alt}
      className={mergedClass}
      draggable={false}
      initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
      }}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = dummyStickerMap.default;
      }}
    />
  );
};

PetSticker.displayName = 'PetSticker';
export default PetSticker;