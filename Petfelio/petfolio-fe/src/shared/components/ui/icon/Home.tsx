import { SvgFrame, IconProps } from '@/shared/components/common/Assets';

export const Home = (props: IconProps) => (
    <SvgFrame {...props}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </SvgFrame>
);
