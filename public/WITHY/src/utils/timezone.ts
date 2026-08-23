// Timezone utility for GMT+9 (Korea Standard Time)
export const KST_TIMEZONE = 'Asia/Seoul';

/**
 * Get current date/time in KST
 */
export function getKSTDate(dateString?: string | Date): Date {
    let input = dateString;

    if (typeof input === 'string') {
        // If it looks like an ISO string 'YYYY-MM-DDTHH:mm:ss...' but has no timezone indicator 'Z' or '+/-...'
        // We treat it as UTC (server standard) rather than Local Browser Time.
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(input)) {
            input = input + 'Z';
        }
    }

    const date = input ? (typeof input === 'string' ? new Date(input) : input) : new Date();
    return date;
}

/**
 * Get current KST time components
 * Uses en-US locale to safely extract components in KST timezone
 */
export function getKSTTimeComponents(dateInput?: string | Date) {
    // If string, check format
    if (typeof dateInput === 'string') {
        // If it looks like an ISO string 'YYYY-MM-DDTHH:mm:ss...' but has no timezone indicator 'Z' or '+/-...'
        // We treat it as UTC (server standard) rather than Local Browser Time.
        // Regex checks for: ends with a digit (possibly with millis)
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(dateInput)) {
            dateInput = dateInput + 'Z';
        }
    }

    const date = dateInput ? (typeof dateInput === 'string' ? new Date(dateInput) : dateInput) : new Date();

    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: KST_TIMEZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const parts = formatter.formatToParts(date);
    const getValue = (type: string) => parts.find(p => p.type === type)?.value || '0';

    return {
        year: parseInt(getValue('year')),
        month: parseInt(getValue('month')), // 1-indexed string to number
        date: parseInt(getValue('day')),
        hours: parseInt(getValue('hour')),
        minutes: parseInt(getValue('minute')),
        seconds: parseInt(getValue('second'))
    };
}


/**
 * Format date to KST time string (오전/오후 HH:MM)
 * Manual formatting to ensure Korean output without ByteString errors
 */
export function formatKSTTime(dateString: string | Date): string {
    const { hours, minutes } = getKSTTimeComponents(dateString);

    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12; // 0 -> 12
    const displayMinutes = minutes.toString().padStart(2, '0');

    return `${ampm} ${displayHours}:${displayMinutes}`;
}

/**
 * Format date to KST date string (YYYY. MM. DD.)
 */
export function formatKSTDate(dateString: string | Date): string {
    const { year, month, date } = getKSTTimeComponents(dateString);
    return `${year}. ${month}. ${date}.`;
}

/**
 * Format date to KST date+time string (YYYY. MM. DD. 오전/오후 HH:MM)
 */
export function formatKSTDateTime(dateString: string | Date): string {
    const { year, month, date } = getKSTTimeComponents(dateString);
    const timeStr = formatKSTTime(dateString);
    return `${year}. ${month}. ${date}. ${timeStr}`;
}
