import React, { createContext, useContext, CSSProperties, ElementType } from 'react';
import type {
  TypographyType, FontWeightType, TextAlignType,
  ParagraphTextProps, ParagraphIconProps, ParagraphBadgeProps,
  ParagraphLinkProps, ParagraphProps,
} from './types';

interface ParagraphContextProps {
  typography: TypographyType;
  color?: string;
  fontWeight?: FontWeightType;
}
const ParagraphContext = createContext<ParagraphContextProps | null>(null);

const getFontWeight = (weight?: FontWeightType) => {
  switch (weight) {
    case 'medium': return 500;
    case 'semibold': return 600;
    case 'bold': return 700;
    case 'regular':
    default: return 400;
  }
};

const Text: React.FC<ParagraphTextProps> = ({ id, style, className, children, typography, fontWeight, color }) => {

  const context = useContext(ParagraphContext);

  const currentTypography = typography || context?.typography || 't5';

  const textStyle: CSSProperties = {
    fontWeight: getFontWeight(fontWeight || context?.fontWeight),
    color: color || context?.color || 'inherit',
    ...style,
  };

  return (
    <span id={id} className={`paragraph-text ${currentTypography} ${className || ''}`} style={textStyle}>
      {children}
    </span>
  );
};

const Icon: React.FC<ParagraphIconProps> = ({ id, style, className, name, typography }) => {
  const context = useContext(ParagraphContext);

  const iconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.2em',
    height: '1.2em',
    verticalAlign: 'text-bottom',
    ...style,
  };

  return (
    <span id={id} className={`paragraph-icon ${className || ''}`} style={iconStyle}>
      {}
      <i className={`icon-${name}`} style={{ width: '100%', height: '100%', display: 'block' }} />
    </span>
  );
};

const Badge: React.FC<ParagraphBadgeProps> = ({ id, className, htmlStyle, children, typography, variant = 'fill', color = 'blue' }) => {
  const context = useContext(ParagraphContext);
  const currentTypography = typography || context?.typography || 't5';
  const badgeVariant = variant;
  const badgeColor = color;

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: '0.15em 0.4em',
    borderRadius: '0.3em',
    fontSize: '0.85em',
    fontWeight: getFontWeight('semibold'),
    marginLeft: '0.2em',
    verticalAlign: 'middle',
    ...htmlStyle,
  };

  if (badgeVariant === 'fill') {
    baseStyle.backgroundColor = `var(--color-${badgeColor}, ${badgeColor})`;
    baseStyle.color = '#fff';
  } else {
    baseStyle.backgroundColor = `var(--color-${badgeColor}-weak, #f0f0f0)`;
    baseStyle.color = `var(--color-${badgeColor}, ${badgeColor})`;
  }

  return (
    <span id={id} className={`paragraph-badge ${currentTypography} ${className || ''}`} style={baseStyle}>
      {children}
    </span>
  );
};

const Link: React.FC<ParagraphLinkProps> = ({ as: Component = 'a', href, type = 'clear', typography, fontWeight, color, children, className, style }) => {
  const context = useContext(ParagraphContext);

  const linkStyle: CSSProperties = {

    textDecoration: type === 'underline' ? 'underline' : 'none',
    color: color || context?.color || 'var(--tds-paragraph-color, #3182f6)',
    fontWeight: getFontWeight(fontWeight || context?.fontWeight),
    cursor: 'pointer',
    ...style,
  };

  return (

    <Component href={href} className={`paragraph-link ${className || ''}`} style={linkStyle}>
      {children}
    </Component>
  );
};

export const Paragraph = ({
  typography,
  display = 'block',
  ellipsisAfterLines,
  textAlign,
  fontWeight = 'regular',
  color,
  children,
  className,
  style,
}: ParagraphProps) => {

  const containerStyle: CSSProperties = {
    display: display,
    textAlign: textAlign,
    fontWeight: getFontWeight(fontWeight),
    color: color,
    margin: 0,
    ...style,
  };

  if (ellipsisAfterLines) {
    containerStyle.display = '-webkit-box';
    containerStyle.WebkitLineClamp = ellipsisAfterLines;
    containerStyle.WebkitBoxOrient = 'vertical';
    containerStyle.overflow = 'hidden';
    containerStyle.textOverflow = 'ellipsis';
  }

  const paragraphClassName = `paragraph ${typography} ${className || ''}`;

  return (

    <ParagraphContext.Provider value={{ typography, color, fontWeight }}>
      <p className={paragraphClassName.trim()} style={containerStyle}>
        {children}
      </p>
    </ParagraphContext.Provider>
  );
};

Paragraph.Text = Text;
Paragraph.Icon = Icon;
Paragraph.Badge = Badge;
Paragraph.Link = Link;

export default Paragraph;