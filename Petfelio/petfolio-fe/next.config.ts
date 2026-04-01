import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'petfolio-wedes.s3.ap-northeast-2.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async rewrites() {

        const apiUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
        return [
            {
                // /api/v1/... 요청을 백엔드 서버로 프록시
                source: '/api/:path*',
                destination: `${apiUrl}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
