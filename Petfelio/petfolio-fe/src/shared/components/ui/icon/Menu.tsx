import { SvgFrame, IconProps } from '@/shared/components/common/Assets';

export const Menu = (props: IconProps) => (
    <SvgFrame {...props}>
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </SvgFrame>
);
