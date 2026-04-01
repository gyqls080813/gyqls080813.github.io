"use client";

import React from 'react';
import TimelinePartyItem from './TimelinePartyItem';
import { GenreParty } from '@/api/home/PartyAPI/FindGenrePartyList';

interface TimelineDateCellProps {
    date: Date;
    parties: GenreParty[];
    onMoreClick: () => void;
}

const TimelineDateCell: React.FC<TimelineDateCellProps> = ({ date, parties, onMoreClick }) => {
    const formatDate = (date: Date) => {
        return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    const getDayOfWeek = (date: Date) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return days[date.getDay()];
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    return (
        <div className="flex flex-col border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
            {/* 날짜 헤더 */}
            <div className={`p-2 text-center border-b border-white/10 ${isToday(date) ? 'bg-primary/20' : 'bg-white/[0.03]'
                }`}>
                <div className="text-[10px] text-neutral-400">{getDayOfWeek(date)}</div>
                <div className={`text-sm font-semibold ${isToday(date) ? 'text-primary' : 'text-white'
                    }`}>
                    {formatDate(date)}
                </div>
            </div>

            {/* 파티 목록 */}
            <div className="flex-1 space-y-1.5 p-2 bg-white/[0.02] rounded-b-lg h-[280px] overflow-y-auto">
                {parties.length > 0 ? (
                    <>
                        {parties.slice(0, 5).map((party) => (
                            <TimelinePartyItem key={party.id} party={party} size="small" />
                        ))}
                        {parties.length > 5 && (
                            <button
                                onClick={onMoreClick}
                                className="w-full py-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                            >
                                + 더보기 ({parties.length - 5})
                            </button>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-xs text-neutral-500">
                        파티 없음
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimelineDateCell;
