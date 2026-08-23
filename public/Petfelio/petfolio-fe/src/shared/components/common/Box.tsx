import { adaptive } from '@/shared/styles/colors';
import type { SpacingSize, RadiusSize, BoxBackground, FlexAlign, BoxProps } from './types';

const SPACING_MAP: Record<SpacingSize, string> = {
  none: '0',
  xsmall: '0.25em',
  small: '0.5em',
  medium: '1em',
  large: '1.5em',
  xlarge: '2em',
};

const RADIUS_MAP: Record<RadiusSize, string> = {
  none: '0',
  small: '0.375em',
  medium: '0.75em',
  large: '1em',
  circle: '9999px',
};

const BACKGROUND_MAP: Record<BoxBackground, string> = {
  white: '#FFFFFF',
  grey: adaptive.grey100,
  transparent: 'transparent',
};

export const Box: React.FC<BoxProps> = ({
  children,

  padding = 'none',
  paddingVertical,
  paddingHorizontal,

  margin = 'none',
  marginVertical,
  marginHorizontal,

  background = 'transparent',
  withBorder = false,
  radius = 'none',

  direction = 'column',
  alignItems,
  justifyContent,
  wrap = false,
  gap,
  fullWidth = false,

  htmlStyle,
  className = '',
  onClick,
  role,
  'aria-label': ariaLabel,
}) => {

  const paddingTop = paddingVertical ? SPACING_MAP[paddingVertical] : SPACING_MAP[padding];
  const paddingBottom = paddingVertical ? SPACING_MAP[paddingVertical] : SPACING_MAP[padding];
  const paddingLeft = paddingHorizontal ? SPACING_MAP[paddingHorizontal] : SPACING_MAP[padding];
  const paddingRight = paddingHorizontal ? SPACING_MAP[paddingHorizontal] : SPACING_MAP[padding];

  const marginTop = marginVertical ? SPACING_MAP[marginVertical] : SPACING_MAP[margin];
  const marginBottom = marginVertical ? SPACING_MAP[marginVertical] : SPACING_MAP[margin];
  const marginLeft = marginHorizontal ? SPACING_MAP[marginHorizontal] : SPACING_MAP[margin];
  const marginRight = marginHorizontal ? SPACING_MAP[marginHorizontal] : SPACING_MAP[margin];

  const containerStyle: React.CSSProperties = {

    display: 'flex',
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    alignItems: alignItems,
    justifyContent: justifyContent,
    gap: gap ? SPACING_MAP[gap] : undefined,

    width: fullWidth ? '100%' : undefined,
    boxSizing: 'border-box',

    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,

    backgroundColor: BACKGROUND_MAP[background],
    borderRadius: RADIUS_MAP[radius],

    border: withBorder
      ? `0.0625em solid ${adaptive.grey200}`
      : undefined,

    cursor: onClick ? 'pointer' : undefined,

    ...htmlStyle,
  };

  return (
    <div
      style={containerStyle}
      className={className}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

Box.displayName = 'Box';
export default Box;
