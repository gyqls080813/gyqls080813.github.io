import React, { ReactNode, CSSProperties, ElementType, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

export type IconSize = 'small' | 'medium' | 'large';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: IconSize;
}

export type BadgeSize = 'xsmall' | 'small' | 'medium' | 'large';
export type BadgeColor = 'blue' | 'red' | 'grey' | 'green';
export type BadgeVariant = 'fill' | 'outline';

export interface BadgeProps {
  size?: BadgeSize;
  color?: BadgeColor;
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  maxLength?: number;
}

export interface BorderProps {
  variant?: 'full' | 'padding24' | 'height16';
  height?: string;
}

export interface BottomSheetAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
}

export interface BottomSheetProps {
  title?: string;
  subtitle?: string;
  actions: BottomSheetAction[];
  onClose: () => void;
}

export interface BaseButtonProps {
  as?: 'button' | 'a';
  color?: 'primary' | 'danger' | 'light' | 'dark';
  variant?: 'fill' | 'weak';
  display?: 'inline' | 'block' | 'full';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  loading?: boolean;
  disabled?: boolean;
  htmlStyle?: CSSProperties;
  children?: ReactNode;
}

export type ButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

export type SpacingSize = 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type RadiusSize = 'none' | 'small' | 'medium' | 'large' | 'circle';
export type BoxBackground = 'white' | 'grey' | 'transparent';
export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'stretch';

export interface BoxProps {
  children?: ReactNode;
  padding?: SpacingSize;
  paddingVertical?: SpacingSize;
  paddingHorizontal?: SpacingSize;
  margin?: SpacingSize;
  marginVertical?: SpacingSize;
  marginHorizontal?: SpacingSize;
  background?: BoxBackground;
  withBorder?: boolean;
  radius?: RadiusSize;
  direction?: 'row' | 'column';
  alignItems?: FlexAlign;
  justifyContent?: FlexAlign;
  wrap?: boolean;
  gap?: SpacingSize;
  fullWidth?: boolean;
  htmlStyle?: CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  role?: React.AriaRole;
  'aria-label'?: string;
}

export type CardElevation = 'none' | 'low' | 'medium' | 'high';

export interface CardProps extends Omit<BoxProps, 'withBorder'> {
  elevation?: CardElevation;
  clickable?: boolean;
  withBorder?: boolean;
}

export interface CardHeaderProps {
  title: ReactNode;
  right?: ReactNode;
  htmlStyle?: CSSProperties;
  className?: string;
}

export interface CardMediaProps {
  src?: string;
  alt?: string;
  height?: string;
  children?: ReactNode;
  htmlStyle?: CSSProperties;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  htmlStyle?: CSSProperties;
  className?: string;
}

export type HorizontalScrollGapSize = 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type HorizontalScrollPaddingSize = 'none' | 'small' | 'medium' | 'large';

export interface HorizontalScrollProps {
  children: ReactNode;
  gap?: HorizontalScrollGapSize;
  paddingHorizontal?: HorizontalScrollPaddingSize;
  paddingVertical?: HorizontalScrollPaddingSize;
  showScrollbar?: boolean;
  snap?: boolean;
  htmlStyle?: CSSProperties;
  className?: string;
}





export interface ListRowProps {
  border?: 'indented' | 'none';
  disabled?: boolean;
  disabledStyle?: 'type1' | 'type2';
  verticalPadding?: 'small' | 'medium' | 'large' | 'xlarge';
  horizontalPadding?: 'small' | 'medium';
  left?: ReactNode;
  leftAlignment?: 'top' | 'center';
  contents?: ReactNode;
  right?: ReactNode;
  rightAlignment?: 'top' | 'center';
  withArrow?: boolean;
  withTouchEffect?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export interface ListRowRef {
  shine: (duration?: number) => void;
  blink: (duration?: number) => void;
}

export interface ListRowLoaderProps {
  type?: 'square' | 'circle' | 'bar';
  verticalPadding?: 'extraSmall' | 'small' | 'medium' | 'large';
}

export interface InitialAccessoryButton {
  id: string;
  title?: string;
  icon: { name: string };
}



export type TypographyType =
  | "t1" | "st1" | "st2" | "st3" | "t2" | "st4" | "st5" | "st6"
  | "t3" | "st7" | "t4" | "st8" | "st9" | "t5" | "st10" | "t6"
  | "st11" | "t7" | "st12" | "st13";

export type FontWeightType = "regular" | "medium" | "semibold" | "bold";

export type TextAlignType =
  | "inherit" | "initial" | "revert" | "revert-layer" | "unset"
  | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";

export interface ParagraphTextProps {
  id?: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
  typography?: TypographyType;
  fontWeight?: FontWeightType;
  color?: string;
}

export interface ParagraphIconProps {
  id?: string;
  style?: CSSProperties;
  className?: string;
  name: string;
  typography?: TypographyType;
}

export interface ParagraphBadgeProps {
  id?: string;
  className?: string;
  htmlStyle?: CSSProperties;
  children: ReactNode;
  typography?: TypographyType;
  variant?: "fill" | "weak";
  color?: "blue" | "teal" | "green" | "red" | "yellow" | "elephant";
}

export interface ParagraphLinkProps {
  as?: ElementType;
  href?: string;
  type?: "underline" | "clear" | "none";
  typography?: TypographyType;
  fontWeight?: FontWeightType;
  color?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface ParagraphProps {
  typography: TypographyType;
  display?: "block" | "inline";
  ellipsisAfterLines?: number;
  textAlign?: TextAlignType;
  fontWeight?: FontWeightType;
  color?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  size?: SelectSize;
  fullWidth?: boolean;
  disabled?: boolean;
  htmlStyle?: CSSProperties;
  className?: string;
}

export interface TabProps {
  children: ReactNode;
  onChange: (index: number, key?: string | number) => void;
  size?: 'large' | 'small';
  fluid?: boolean;
  itemGap?: number;
  ariaLabel?: string;
}

export interface TabItemProps {
  children: ReactNode;
  selected: boolean;
  redBean?: boolean;
  onClick?: () => void;
}

export type TopButtonSizeType = "small" | "medium" | "large" | "xlarge" | "xsmall" | "xxlarge";

export interface TopProps {
  title: ReactNode;
  upperGap?: number;
  lowerGap?: number;
  upper?: ReactNode;
  lower?: ReactNode;
  subtitleTop?: ReactNode;
  subtitleBottom?: ReactNode;
  right?: ReactNode;
  rightVerticalAlign?: "center" | "end";
}

export interface TopUpperAssetContentProps {
  content: ReactNode;
}

export interface TopTitleParagraphProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: 22 | 28;
  color?: string;
  typography?: TypographyType;
  fontWeight?: FontWeightType;
}

export interface TopTitleSelectorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  typography?: TypographyType;
  fontWeight?: FontWeightType;
}

export interface TopTitleTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TopButtonSizeType;
  color?: string;
  variant?: "arrow" | "underline" | "clear";
}

export interface TopSubtitleParagraphProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: 13 | 15 | 17;
  color?: string;
  typography?: TypographyType;
  fontWeight?: FontWeightType;
}

export interface TopSubtitleSelectorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 13 | 15 | 17;
  color?: string;
  typography?: TypographyType;
  fontWeight?: FontWeightType;
}

export interface TopSubtitleTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TopButtonSizeType;
  variant?: "arrow" | "underline" | "clear";
  color?: string;
}

export interface TopSubtitleBadgesProps {
  badges: {
    text: string;
    type?: "blue" | "teal" | "green" | "red" | "yellow" | "elephant";
    style?: "fill" | "weak";
  }[];
}

export interface TopRightAssetContentProps {
  content: ReactNode;
}

export interface TopRightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large" | "xlarge";
}

export interface TopLowerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large" | "xlarge";
}

export interface TopLowerCTAProps {
  type: "2-button";
  leftButton: ReactNode;
  rightButton: ReactNode;
}

export interface TopLowerCTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large" | "xlarge";
}
