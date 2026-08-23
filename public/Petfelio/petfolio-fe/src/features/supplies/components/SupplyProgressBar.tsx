import React, { ReactNode } from 'react';
import { adaptive } from '@/shared/styles/colors';
import { HoverActionGroup } from './HoverActionGroup';

const pxToEm = (px: number) => `${px / 16}em`;

export interface SupplyProgressBarProps {
  trackColor?: string;
  status?: 'normal' | 'warning' | 'danger';
  height?: number;
  theme?: {
    danger?: string;
    warning?: string;
    border?: string;
  };
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const SupplyProgressBar: React.FC<SupplyProgressBarProps> = ({
  trackColor = adaptive.grey100,
  status = 'normal',
  height = 26,
  theme,
  onClick,
  onEdit,
  onDelete,
  children,
  className = '',
  style,
}) => {
  const isLapsed = status === 'danger';
  const isCritical = status === 'warning';

  const defaultBorderColor = theme?.border || 'rgba(0,0,0,0.1)';

  const baseStyle =
    'group relative flex items-center w-full overflow-hidden box-border rounded-md border transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-md';

  const stateStyle = isLapsed
    ? 'bg-red-50 border-red-300'
    : isCritical
    ? 'bg-yellow-50 border-yellow-300'
    : 'bg-gray-100 border-gray-200';

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} ${stateStyle} ${className}`}
      style={{
        height: pxToEm(height),
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: isLapsed || isCritical ? undefined : trackColor,
        borderColor:
          isLapsed
            ? 'rgba(255,77,79,0.4)'
            : isCritical
            ? 'rgba(250,173,20,0.4)'
            : defaultBorderColor,
        ...style,
      }}
    >
      {}
      <div className="relative z-10 flex items-center w-full h-full px-2">
        {children}
      </div>

      {}
      <HoverActionGroup onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default SupplyProgressBar;undefined