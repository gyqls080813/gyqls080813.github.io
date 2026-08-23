import React from 'react';
import { adaptive } from '@/shared/styles/colors';
import type { BorderProps } from './types';

export const Border: React.FC<BorderProps> = ({
  variant = 'full',
  height,
}) => {

  const lineStyle: React.CSSProperties = {
    height: '0.0625em',
    backgroundColor: adaptive.grey200,
    width: '100%',
  };

  if (variant === 'full') {
    return <div style={lineStyle} />;
  }

  if (variant === 'padding24') {
    return (
      <div style={{ padding: '0 1.5em' }}>
        <div style={lineStyle} />
      </div>
    );
  }

  if (variant === 'height16') {
    return (
      <div
        style={{
          height: height ? height : '1em',
          backgroundColor: adaptive.grey100,
          width: '100%',
        }}
      />
    );
  }

  return null;
};

export default Border;