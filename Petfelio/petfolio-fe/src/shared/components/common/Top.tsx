import React, { ReactNode } from 'react';
import { adaptive } from '@/shared/styles/colors';
import type {
  TypographyType, FontWeightType, TopButtonSizeType,
  TopProps, TopUpperAssetContentProps,
  TopTitleParagraphProps, TopTitleSelectorProps, TopTitleTextButtonProps,
  TopSubtitleParagraphProps, TopSubtitleSelectorProps, TopSubtitleTextButtonProps,
  TopSubtitleBadgesProps, TopRightAssetContentProps, TopRightButtonProps,
  TopLowerButtonProps, TopLowerCTAProps, TopLowerCTAButtonProps,
} from './types';

type ButtonSizeType = TopButtonSizeType;

const pxToEm = (px: number) => `${px / 16}em`;

const UpperAssetContent: React.FC<TopUpperAssetContentProps> = ({ content }) => (
  <div className="top-upper-asset">{content}</div>
);

const TitleParagraph: React.FC<TopTitleParagraphProps> = ({
  size = 22, color = adaptive.grey800, typography = 't3', fontWeight = 'bold', children, ...props
}) => (
  <h1
    role="heading"
    aria-level={1}
    style={{ fontSize: pxToEm(size), color, fontWeight }}
    {...props}
  >
    {children}
  </h1>
);

const TitleSelector: React.FC<TopTitleSelectorProps> = ({
  color = adaptive.grey800, typography = 't3', fontWeight = 'bold', children, ...props
}) => (
  <button
    aria-haspopup="listbox"
    style={{ color, fontWeight, fontSize: pxToEm(22) }}
    {...props}
  >
    {children}
  </button>
);

const TitleTextButton: React.FC<TopTitleTextButtonProps> = ({
  size = 'xlarge', color = adaptive.grey800, variant, children, ...props
}) => (
  <button style={{ color }} {...props}>{children}</button>
);

const SubtitleParagraph: React.FC<TopSubtitleParagraphProps> = ({
  size = 17, color = adaptive.grey700, typography = 't5', fontWeight = 'medium', children, ...props
}) => (
  <h2
    role="heading"
    aria-level={2}
    style={{ fontSize: pxToEm(size), color, fontWeight }}
    {...props}
  >
    {children}
  </h2>
);

const SubtitleSelector: React.FC<TopSubtitleSelectorProps> = ({
  size = 17, color = adaptive.grey700, typography = 't5', fontWeight = 'medium', children, ...props
}) => (
  <button
    aria-haspopup="listbox"
    style={{ fontSize: pxToEm(size), color, fontWeight }}
    {...props}
  >
    {children}
  </button>
);

const SubtitleTextButton: React.FC<TopSubtitleTextButtonProps> = ({
  size = 'medium', variant = 'arrow', color = adaptive.grey700, children, ...props
}) => (
  <button style={{ color }} {...props}>{children}</button>
);

const SubtitleBadges: React.FC<TopSubtitleBadgesProps> = ({ badges }) => (
  <div style={{ display: 'flex', gap: pxToEm(4) }}>
    {badges.map((badge, idx) => (
      <span key={idx} className={`badge ${badge.type} ${badge.style}`}>{badge.text}</span>
    ))}
  </div>
);

const RightAssetContent: React.FC<TopRightAssetContentProps> = ({ content }) => (
  <div>{content}</div>
);

const RightButton: React.FC<TopRightButtonProps> = ({ size = 'medium', children, ...props }) => (
  <button {...props}>{children}</button>
);

const LowerButton: React.FC<TopLowerButtonProps> = ({ size = 'small', children, ...props }) => (
  <button style={{ marginTop: pxToEm(16) }} {...props}>{children}</button>
);

const LowerCTA: React.FC<TopLowerCTAProps> = ({ type, leftButton, rightButton }) => (
  <div style={{ display: 'flex', gap: pxToEm(8), width: '100%' }}>
    <div style={{ flex: 1 }}>{leftButton}</div>
    <div style={{ flex: 1 }}>{rightButton}</div>
  </div>
);

const LowerCTAButton: React.FC<TopLowerCTAButtonProps> = ({ size = 'large', children, ...props }) => (
  <button style={{ width: '100%' }} {...props}>{children}</button>
);

export const Top: React.FC<TopProps> & {
  UpperAssetContent: typeof UpperAssetContent;
  TitleParagraph: typeof TitleParagraph;
  TitleSelector: typeof TitleSelector;
  TitleTextButton: typeof TitleTextButton;
  SubtitleParagraph: typeof SubtitleParagraph;
  SubtitleSelector: typeof SubtitleSelector;
  SubtitleTextButton: typeof SubtitleTextButton;
  SubtitleBadges: typeof SubtitleBadges;
  RightAssetContent: typeof RightAssetContent;
  RightButton: typeof RightButton;
  LowerButton: typeof LowerButton;
  LowerCTA: typeof LowerCTA;
  LowerCTAButton: typeof LowerCTAButton;
} = ({
  title,
  upperGap = 24,
  lowerGap = 24,
  upper,
  lower,
  subtitleTop,
  subtitleBottom,
  right,
  rightVerticalAlign = 'center',
}) => {
  return (
    <div
      style={{

        paddingTop: pxToEm(upperGap),
        paddingBottom: pxToEm(lowerGap),
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: rightVerticalAlign === 'center' ? 'center' : 'flex-end' }}>

        {}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {upper && <div style={{ marginBottom: pxToEm(8) }}>{upper}</div>}
          {subtitleTop && <div style={{ marginBottom: pxToEm(4) }}>{subtitleTop}</div>}

          <div className="top-title-area">{title}</div>

          {subtitleBottom && <div style={{ marginTop: pxToEm(4) }}>{subtitleBottom}</div>}
        </div>

        {}
        {right && (
          <div style={{ marginLeft: pxToEm(16) }}>
            {right}
          </div>
        )}
      </div>

      {}
      {lower && (
        <div style={{ marginTop: pxToEm(16) }}>
          {lower}
        </div>
      )}
    </div>
  );
};

Top.UpperAssetContent = UpperAssetContent;
Top.TitleParagraph = TitleParagraph;
Top.TitleSelector = TitleSelector;
Top.TitleTextButton = TitleTextButton;
Top.SubtitleParagraph = SubtitleParagraph;
Top.SubtitleSelector = SubtitleSelector;
Top.SubtitleTextButton = SubtitleTextButton;
Top.SubtitleBadges = SubtitleBadges;
Top.RightAssetContent = RightAssetContent;
Top.RightButton = RightButton;
Top.LowerButton = LowerButton;
Top.LowerCTA = LowerCTA;
Top.LowerCTAButton = LowerCTAButton;

export default Top;undefined