import React from 'react';
import type { HorizontalScrollGapSize, HorizontalScrollPaddingSize, HorizontalScrollProps } from './types';

type GapSize = HorizontalScrollGapSize;
type PaddingSize = HorizontalScrollPaddingSize;

const GAP_MAP: Record<GapSize, string> = {
  none: '0', xsmall: '0.25em', small: '0.5em', medium: '1em', large: '1.5em', xlarge: '2em',
};

const PADDING_MAP: Record<PaddingSize, string> = {
  none: '0', small: '1em', medium: '1.5em', large: '2em',
};

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  gap              = 'medium',
  paddingHorizontal = 'none',
  paddingVertical   = 'none',
  showScrollbar    = false,
  snap             = false,
  htmlStyle,
  className        = '',
}) => {

  const containerStyle: React.CSSProperties = {

    display:    'flex',
    flexDirection: 'row',

    flexWrap:   'nowrap',

    gap: GAP_MAP[gap],

    overflowX:  'auto',
    overflowY:  'hidden',

    alignItems: 'stretch',

    paddingLeft:   PADDING_MAP[paddingHorizontal],
    paddingRight:  PADDING_MAP[paddingHorizontal],
    paddingTop:    PADDING_MAP[paddingVertical],
    paddingBottom: PADDING_MAP[paddingVertical],

    ...(!showScrollbar && {
      msOverflowStyle: 'none',
      scrollbarWidth:  'none',
    } as React.CSSProperties),

    scrollSnapType: snap ? 'x mandatory' : undefined,

    boxSizing: 'border-box',

    ...htmlStyle,
  };

  return (
    <>

      {!showScrollbar && (
        <style>{`
          .horizontal-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      )}

      <div
        style={containerStyle}
        className={`horizontal-scroll ${className}`.trim()}
      >
        {}
        {snap
          ? React.Children.map(children, (child) => (
              <div
                style={{
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                }}
              >
                {child}
              </div>
            ))
          : children
        }
      </div>
    </>
  );
};

HorizontalScroll.displayName = 'HorizontalScroll';
export default HorizontalScroll;
