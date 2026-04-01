import { SvgFrame, IconProps } from '@/shared/components/common/Assets';

export const PopcornIcon = (props: IconProps) => (
  <SvgFrame {...props}>
    <path d="M4 10h16v12H4z" />
    <path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <path d="M10 6V4a2 2 0 0 1 4 0v2" />
  </SvgFrame>
);
