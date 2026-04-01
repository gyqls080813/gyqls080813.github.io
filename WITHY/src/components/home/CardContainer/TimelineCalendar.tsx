"use client";

import React, { useMemo, useState } from 'react';
import TimelineDateCell from './TimelineDateCell';
import TimelineModal from './TimelineModal';
import { GenreParty } from '@/api/home/PartyAPI/FindGenrePartyList';
import { getKSTTimeComponents } from '@/utils/timezone';

interface TimelineCalendarProps {
    parties: GenreParty[];
}

const TimelineCalendar: React.FC<TimelineCalendarProps> = ({ parties }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDateKey, setModalDateKey] = useState('');

    // 날짜별로 파티 그룹화
    const groupedByDate = useMemo(() => {
        const groups: { [key: string]: GenreParty[] } = {};

        // 대기중 파티만 필터링 (유효한 scheduledActiveTime을 가진 파티만)
        const waitingParties = parties.filter(party =>
            !party.isActive && party.scheduledActiveTime && new Date(party.scheduledActiveTime).getTime()
        );

        waitingParties.forEach(party => {
            const { year, month, date } = getKSTTimeComponents(party.scheduledActiveTime);
            const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(party);
        });

        // 각 날짜별로 시간순 정렬 → 동일 시간이면 제목 가나다순
        Object.keys(groups).forEach(dateKey => {
            groups[dateKey].sort((a, b) => {
                // 1차 정렬: 시간순 (빠른 순서)
                const timeA = new Date(a.scheduledActiveTime).getTime();
                const timeB = new Date(b.scheduledActiveTime).getTime();

                if (timeA !== timeB) {
                    return timeA - timeB;
                }

                // 2차 정렬: 동일 시간이면 제목 가나다순 (알파벳 포함)
                return a.title.localeCompare(b.title, 'ko-KR');
            });
        });

        return groups;
    }, [parties]);

    // 2주 날짜 배열 생성
    const weekDates = useMemo(() => {
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (let i = 0; i < 14; i++) {
            const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
            dates.push(date);
        }
        return dates;
    }, []);

    const handleMoreClick = (dateKey: string) => {
        setModalDateKey(dateKey);
        setModalOpen(true);
    };

    const getDateKey = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    return (
        <>
            <div className="grid grid-cols-7 gap-2">
                {weekDates.map((date, index) => {
                    const dateKey = getDateKey(date);
                    const partiesForDate = groupedByDate[dateKey] || [];

                    return (
                        <TimelineDateCell
                            key={index}
                            date={date}
                            parties={partiesForDate}
                            onMoreClick={() => handleMoreClick(dateKey)}
                        />
                    );
                })}
            </div>

            <TimelineModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                dateKey={modalDateKey}
                parties={groupedByDate[modalDateKey] || []}
            />
        </>
    );
};

export default TimelineCalendar;
