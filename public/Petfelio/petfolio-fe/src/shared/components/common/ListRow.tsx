'use client';

import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { ui } from '@/shared/styles/colors';
import type { ListRowProps, ListRowRef, ListRowLoaderProps } from './types';

const VERTICAL_PADDING_MAP = {
  extraSmall: '0.25em',
  small: '0.5em',
  medium: '0.75em',
  large: '1em',
  xlarge: '1.5em',
};

const HORIZONTAL_PADDING_MAP = {
  small: '1.25em',
  medium: '1.5em',
};

const ListRowComponent = forwardRef<ListRowRef, ListRowProps>((props, ref) => {

  const {
    border = 'indented',
    disabled = false,
    disabledStyle = 'type1',
    verticalPadding = 'medium',
    horizontalPadding = 'medium',
    left,
    leftAlignment = 'center',
    contents,
    right,
    rightAlignment = 'center',
    withArrow = false,
    withTouchEffect = false,
    onClick,
    className = '',
  } = props;

  const [effect, setEffect] = useState<'shine' | 'blink' | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerEffect = (type: 'shine' | 'blink', duration: number) => {

    setEffect(type);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => setEffect(null), duration * 1000);
  };

  useImperativeHandle(ref, () => ({
    shine: (duration = 2) => triggerEffect('shine', duration),
    blink: (duration = 1.5) => triggerEffect('blink', duration),
  }));

  const isClickable = !disabled && (onClick || withTouchEffect);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    padding: `${VERTICAL_PADDING_MAP[verticalPadding]} ${HORIZONTAL_PADDING_MAP[horizontalPadding]}`,

    backgroundColor: disabled
      ? disabledStyle === 'type2'
        ? 'rgba(0, 0, 0, 0.04)'
        : 'rgba(255, 255, 255, 0.5)'
      : 'transparent',

    opacity: disabled ? 0.5 : 1,

    cursor: isClickable ? 'pointer' : 'default',

    overflow: 'hidden',

    userSelect: 'none',

    transition: 'background-color 0.2s ease',
  };

  const borderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,

    left: border === 'indented'
      ? HORIZONTAL_PADDING_MAP[horizontalPadding]
      : 0,

    height: '1px',

    backgroundColor: 'rgba(0, 0, 0, 0.05)',

    display: border === 'none' ? 'none' : 'block',
  };

  return (
    <>
      {/* 스타일은 globals.css로 이동됨 */}

      {}
      <div
        className={`
          ${isClickable ? 'list-row-touchable' : ''}
          ${effect === 'blink' ? 'list-row-blink' : ''}
          ${effect === 'shine' ? 'list-row-shine' : ''}
          ${className}
        `.trim()}
        style={containerStyle}

        onClick={disabled ? undefined : onClick}
      >

        {}
        <div style={borderStyle} />

        {}
        {left && (
          <div
            style={{
              display: 'flex',
              alignItems: leftAlignment === 'top'
                ? 'flex-start'
                : 'center',
              marginRight: '1em',
              flexShrink: 0,
            }}
          >
            {left}
          </div>
        )}

        {}
        {contents && (
          <div
            style={{
              flex: 1,
              overflow: 'hidden',
            }}
          >
            {contents}
          </div>
        )}

        {}
        {(right || withArrow) && (
          <div
            style={{
              display: 'flex',
              alignItems: rightAlignment === 'top'
                ? 'flex-start'
                : 'center',
              marginLeft: '1em',
              flexShrink: 0,
            }}
          >

            {right}

            {}
            {withArrow && (
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  marginLeft: '0.25em',
                  opacity: 0.3,
                }}
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        )}

      </div>
    </>
  );
});

ListRowComponent.displayName = 'ListRow';

const Loader = ({
  type = 'square',
  verticalPadding = 'medium',
}: ListRowLoaderProps) => {

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${VERTICAL_PADDING_MAP[verticalPadding]} ${HORIZONTAL_PADDING_MAP.medium}`,
  };

  const getShapeStyle = (): React.CSSProperties => {

    const baseStyle: React.CSSProperties = {
      backgroundColor: ui.skeleton,
      animation: 'pulse 1.5s infinite ease-in-out',
    };

    if (type === 'circle')
      return {
        ...baseStyle,
        width: '2.5em',
        height: '2.5em',
        borderRadius: '50%',
        marginRight: '1em',
      };

    if (type === 'square')
      return {
        ...baseStyle,
        width: '2.5em',
        height: '2.5em',
        borderRadius: '0.5em',
        marginRight: '1em',
      };

    return {
      ...baseStyle,
      width: '100%',
      height: '1.25em',
      borderRadius: '0.25em',
    };
  };

  return (
    <>
      {/* 스타일은 globals.css로 이동됨 (listRowPulse) */}

      <div style={containerStyle}>

        {}
        {type !== 'bar' && <div style={getShapeStyle()} />}

        {}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5em',
          }}
        >
          <div
            style={{
              backgroundColor: ui.skeleton,
              height: '1.25em',
              width: '60%',
              borderRadius: '0.25em',
              animation: 'listRowPulse 1.5s infinite ease-in-out',
            }}
          />

          <div
            style={{
              backgroundColor: ui.skeleton,
              height: '1em',
              width: '40%',
              borderRadius: '0.25em',
              animation: 'listRowPulse 1.5s infinite ease-in-out',
            }}
          />
        </div>

      </div>
    </>
  );
};

export const ListRow = Object.assign(ListRowComponent, { Loader });