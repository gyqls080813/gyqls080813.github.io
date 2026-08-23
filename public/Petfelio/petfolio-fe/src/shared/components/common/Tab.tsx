import React, { ReactNode } from 'react';
import { adaptive, ui } from '@/shared/styles/colors';
import type { TabProps, TabItemProps } from './types';

const TabItem = ({ children, selected, redBean = false, onClick }: TabItemProps) => {
  return (
    <button
      role="tab"
      aria-selected={selected}
      title={redBean ? '(업데이트 있음)' : undefined}
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        borderBottom: selected
          ? `0.125em solid ${ui.tabText}`
          : '0.125em solid transparent',
        color: selected ? ui.tabText : ui.tabInactive,
        fontWeight: selected ? 'bold' : 'normal',
        cursor: 'pointer',
        padding: '0 0.5em',
        height: '100%',
        transition: 'all 0.2s ease-in-out',
        flexShrink: 0,
      }}
    >
      {children}

      {}
      {redBean && (
        <span
          style={{
            position: 'absolute',
            top: '0.25em',
            right: '-0.25em',
            width: '0.3em',
            height: '0.3em',
            backgroundColor: ui.redBean,
            borderRadius: '50%',
          }}
        />
      )}
    </button>
  );
};

const Tab = ({
  children,
  onChange,
  size = 'large',
  fluid = false,
  itemGap,
  ariaLabel,
}: TabProps) => {

  const gapInEm = itemGap ? `${itemGap / 16}em` : undefined;

  const sizeStyles = {
    large: { fontSize: '1em', height: '3em' },
    small: { fontSize: '0.875em', height: '2.5em' },
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: gapInEm,
        overflowX: fluid ? 'auto' : 'visible',
        whiteSpace: fluid ? 'nowrap' : 'normal',
        width: '100%',
        borderBottom: `0.0625em solid ${adaptive.grey200}`,
        ...sizeStyles[size],
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
      className="hide-scrollbar"
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<TabItemProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            onClick: () => onChange(index),
          });
        }
        return child;
      })}
    </div>
  );
};

Tab.Item = TabItem;

export default Tab;