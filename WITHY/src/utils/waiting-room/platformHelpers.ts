/**
 * 플랫폼별 로고 경로 반환
 */
export const getPlatformLogo = (platform?: string): string | null => {
    const p = platform?.toUpperCase();
    if (p === 'NETFLIX' || p === 'OTT') return "/logo/NETFLIX.png";
    if (p === 'YOUTUBE') return "/logo/Youtube.png";
    return null;
};

/**
 * 플랫폼별 스타일 정보 반환
 */
export const getPlatformStyle = (platform?: string): { color: string; label: string } => {
    const p = platform?.toUpperCase() || "";
    if (p === 'YOUTUBE') return { color: 'text-red-600', label: 'YouTube' };
    if (p === 'NETFLIX' || p === 'OTT') return { color: 'text-red-500', label: 'Netflix' };
    if (p === 'TWITCH') return { color: 'text-[#9146FF]', label: 'Twitch' };
    return { color: 'text-gray-400', label: platform || 'Unknown' };
};
