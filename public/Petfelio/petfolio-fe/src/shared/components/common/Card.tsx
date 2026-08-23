import React from 'react';
import { adaptive, colors } from '@/shared/styles/colors';
import { Box } from '@/shared/components/common/Box';
import type { BoxProps, CardElevation, CardProps, CardHeaderProps, CardMediaProps, CardFooterProps } from './types';

const ELEVATION_MAP: Record<CardElevation, string | undefined> = {
  none:   undefined,
  low:    '0 0.0625em 0.25em rgba(0, 0, 0, 0.06)',
  medium: '0 0.125em 0.5em rgba(0, 0, 0, 0.10)',
  high:   '0 0.25em 1em rgba(0, 0, 0, 0.15)',
};

const Header: React.FC<CardHeaderProps> = ({
  title,
  right,
  htmlStyle,
  className = '',
}) => {
  const headerStyle: React.CSSProperties = {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    padding:        '0.75em 1em',
    borderBottom:   `0.0625em solid ${adaptive.grey200}`,
    ...htmlStyle,
  };

  return (
    <div style={headerStyle} className={className}>
      <div style={{ flex: 1 }}>{title}</div>
      {right && (
        <div style={{ flexShrink: 0, marginLeft: '0.75em' }}>{right}</div>
      )}
    </div>
  );
};

const Media: React.FC<CardMediaProps> = ({
  src,
  alt = '',
  height = '12em',
  children,
  htmlStyle,
  className = '',
}) => {
  const mediaStyle: React.CSSProperties = {
    width:      '100%',
    height,
    overflow:   'hidden',
    flexShrink: 0,
    ...htmlStyle,
  };

  const imgStyle: React.CSSProperties = {
    width:    '100%',
    height:   '100%',
    objectFit:'cover',
    display:  'block',
  };

  return (
    <div style={mediaStyle} className={className}>
      {children ?? (src && <img src={src} alt={alt} style={imgStyle} />)}
    </div>
  );
};

const Footer: React.FC<CardFooterProps> = ({
  children,
  htmlStyle,
  className = '',
}) => {
  const footerStyle: React.CSSProperties = {
    display:     'flex',
    alignItems:  'center',
    padding:     '0.75em 1em',
    borderTop:   `0.0625em solid ${adaptive.grey200}`,
    ...htmlStyle,
  };

  return (
    <div style={footerStyle} className={className}>
      {children}
    </div>
  );
};

const CardMain: React.FC<CardProps> = ({
  children,
  elevation = 'low',
  clickable = false,
  withBorder,
  background = 'white',
  radius = 'medium',
  htmlStyle,
  className = '',
  onClick,
  ...boxProps
}) => {

  const shouldShowBorder = withBorder ?? elevation === 'none';

  const cardStyle: React.CSSProperties = {
    boxShadow:  ELEVATION_MAP[elevation],
    transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
    overflow:   'hidden',
    ...htmlStyle,
  };

  return (
    <Box
      direction="column"
      background={background}
      radius={radius}
      withBorder={shouldShowBorder}
      onClick={onClick}
      htmlStyle={cardStyle}
      className={`${clickable ? 'card-clickable' : ''} ${className}`.trim()}
      {...boxProps}
    >
      {}
      {clickable && (
        <style>{`
          .card-clickable {
            cursor: pointer;
          }
          .card-clickable:active {
            opacity: 0.75;
          }
        `}</style>
      )}
      {children}
    </Box>
  );
};

export const Card = Object.assign(CardMain, {
  Header,
  Media,
  Footer,
});

Card.displayName = 'Card';
export default Card;
