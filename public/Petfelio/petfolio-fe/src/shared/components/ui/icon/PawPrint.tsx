import { SvgFrame, IconProps } from '@/shared/components/common/Assets';

export const PawPrint = (props: IconProps) => (
    <SvgFrame {...props}>
        <ellipse cx="12" cy="17" rx="4" ry="3" />
        <ellipse cx="7.5" cy="11.5" rx="1.5" ry="2" />
        <ellipse cx="16.5" cy="11.5" rx="1.5" ry="2" />
        <ellipse cx="9.5" cy="7.5" rx="1.5" ry="2" />
        <ellipse cx="14.5" cy="7.5" rx="1.5" ry="2" />
    </SvgFrame>
);
