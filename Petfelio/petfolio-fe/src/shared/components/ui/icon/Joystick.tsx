import { SvgFrame, IconProps } from '@/shared/components/common/Assets';

export const Joystick = (props: IconProps) => (
  <SvgFrame {...props}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M16 10h.01M16 14h.01M14 12h.01M18 12h.01" />
  </SvgFrame>
);
