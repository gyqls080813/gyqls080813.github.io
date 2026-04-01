import { getKSTDate } from '@/utils/timezone';

/**
 * 상대 시간 계산 (N일 N시간 후/전)
 */
export const getRelativeTime = (timeStr?: string): string => {
    if (!timeStr) return "";

    const now = new Date();
    const target = getKSTDate(timeStr);

    if (isNaN(target.getTime())) return "";

    const diff = target.getTime() - now.getTime();
    const absDiff = Math.abs(diff);

    // Calculate days, hours, and minutes
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

    // Build time string
    let timeString = "";

    if (days > 0) {
        timeString += `${days}일`;
        if (hours > 0) {
            timeString += ` ${hours}시간`;
        }
    } else if (hours > 0) {
        timeString += `${hours}시간`;
        if (minutes > 0) {
            timeString += ` ${minutes}분`;
        }
    } else {
        timeString += `${minutes}분`;
    }

    // Add 전/후
    return diff > 0 ? `${timeString} 후` : `${timeString} 전`;
};
