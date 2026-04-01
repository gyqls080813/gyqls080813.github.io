'use client';

import { X, Crown } from 'lucide-react';
import { ParticipantData } from '@/api/party/GetParticipants';

interface ParticipantsModalProps {
    participants: ParticipantData[];
    isLoading: boolean;
    onClose: () => void;
    currentCount: number;
    maxCount: number;
}

export default function ParticipantsModal({
    participants,
    isLoading,
    onClose,
    currentCount,
    maxCount
}: ParticipantsModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-md mx-4 bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">대기 인원</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {currentCount} / {maxCount}명
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} className="text-white" />
                    </button>
                </div>

                {/* Participants List */}
                <div className="p-6 max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                        </div>
                    ) : participants.length === 0 ? (
                        <p className="text-center text-gray-400 py-12">참가자가 없습니다.</p>
                    ) : (
                        <ul className="space-y-3">
                            {participants.map((participant, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    {/* Profile Image */}
                                    <div className="relative">
                                        <img
                                            src={participant.profileImage || '/default-avatar.png'}
                                            alt={participant.nickname}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                                        />
                                        {participant.role === 'HOST' && (
                                            <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                                                <Crown size={12} className="text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{participant.nickname}</p>
                                        <p className="text-xs text-gray-400">
                                            {participant.role === 'HOST' ? '호스트' : '참가자'}
                                        </p>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">
                                        {participant.status === 'ACTIVE' ? '대기중' : participant.status}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
