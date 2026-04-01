"use client";

import React from 'react';
import TimelinePartyItem from './TimelinePartyItem';
import { GenreParty } from '@/api/home/PartyAPI/FindGenrePartyList';

interface TimelineModalProps {
    isOpen: boolean;
    onClose: () => void;
    dateKey: string;
    parties: GenreParty[];
}

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose, dateKey, parties }) => {
    if (!isOpen) return null;

    const formatDate = (dateKey: string) => {
        const [year, month, day] = dateKey.split('-');
        return `${month}월 ${day}일`;
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-neutral-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                        {formatDate(dateKey)} 파티 목록
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* 파티 목록 */}
                <div className="space-y-2">
                    {parties.map((party) => (
                        <div key={party.id} onClick={onClose}>
                            <TimelinePartyItem party={party} size="medium" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimelineModal;
