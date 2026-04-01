'use client';

import { useEffect, useState } from 'react';
import PartyCard from '@/components/home/CardContainer/PartyCard/PartyCard';
import { useHostedPartyList } from '@/hooks/home/PartyHooks/useHostedPartyList';
import { HostedPartyData } from '@/api/home/PartyAPI/FindHostedPartyList';
import { useDeleteParty } from '@/hooks/home/PartyHooks/useDeleteParty'; // Hook import
import { Settings, Trash2, CheckCircle2, Circle, AlertCircle } from 'lucide-react'; // Icons

export default function HostedPartySection() {
    const { fetchHostedParties, isLoading, error } = useHostedPartyList();
    const [parties, setParties] = useState<HostedPartyData['parties']>([]);

    // New States for Deletion Feature
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedPartyIds, setSelectedPartyIds] = useState<number[]>([]);
    const deletePartyMutation = useDeleteParty();

    // Platform Filter State
    const [selectedPlatform, setSelectedPlatform] = useState<'NETFLIX' | 'YOUTUBE'>('NETFLIX');

    const loadParties = async () => {
        // Fetch hosted parties (page 0, size 50)
        const result = await fetchHostedParties(0, 50);
        if (result) {
            setParties(result.parties);
        }
    };

    useEffect(() => {
        loadParties();
    }, [fetchHostedParties]);

    // Handle entering/exiting edit mode
    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
        setSelectedPartyIds([]); // Clear selection when toggling
    };

    // Handle selection of parties
    const toggleSelection = (partyId: number) => {
        setSelectedPartyIds(prev =>
            prev.includes(partyId)
                ? prev.filter(id => id !== partyId)
                : [...prev, partyId]
        );
    };

    // Handle Deletion
    const handleDelete = async () => {
        if (selectedPartyIds.length === 0) return;

        // [Modified] 시스템 확인 메시지(confirm) 제거 & 완료 메시지(alert) 제거
        try {
            // Sequentially delete selected parties
            // Note: Parallel execution might be faster but sequential is safer for rate limits / ordering
            for (const id of selectedPartyIds) {
                await deletePartyMutation.mutateAsync(id);
            }
            // Silent success handling
            setIsEditMode(false);
            setSelectedPartyIds([]);
            await loadParties(); // Refresh list
        } catch (err) {
            alert('파티 삭제 중 오류가 발생했습니다.');
        }
    };

    // Platform filtering logic
    const filteredParties = parties.filter(party => {
        const platform = party.platform?.toUpperCase();
        if (selectedPlatform === 'NETFLIX') {
            return platform === 'NETFLIX' || platform === 'OTT';
        }
        return platform === selectedPlatform;
    });

    // Dynamic grid columns based on platform
    const gridCols = selectedPlatform === 'YOUTUBE'
        ? 'lg:grid-cols-3'
        : 'lg:grid-cols-4';

    // Helper function to get aspect ratio based on platform (matching PartyCard)
    const getAspectRatio = (platform?: string) => {
        const p = platform?.toUpperCase();
        if (p === 'NETFLIX' || p === 'OTT') {
            return 'aspect-[2/3]'; // 2:3 portrait for Netflix
        }
        return 'aspect-video'; // 16:9 for YouTube
    };

    if (isLoading && parties.length === 0) return <div className="p-10 text-center">로딩 중...</div>;
    // Error state handles inside, but distinct error UI can be here
    if (error && parties.length === 0) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <section className="border border-zinc-800 p-10 rounded-3xl shadow-sm bg-zinc-900 mb-12 relative overflow-hidden">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white">내가 만든 파티</h2>
                    <div className="text-gray-400 text-sm font-bold bg-zinc-800 px-3 py-1 rounded-full">
                        {filteredParties.length}개
                    </div>
                </div>

                {/* Platform Filter Buttons - Header Right */}
                {parties.length > 0 && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedPlatform('NETFLIX')}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${selectedPlatform === 'NETFLIX'
                                ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                                }`}
                        >
                            Netflix
                        </button>
                        <button
                            onClick={() => setSelectedPlatform('YOUTUBE')}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${selectedPlatform === 'YOUTUBE'
                                ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                                : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                                }`}
                        >
                            YouTube
                        </button>
                    </div>
                )}
            </div>

            {/* Party Management Buttons - Below Header */}
            {parties.length > 0 && (
                <div className="flex gap-2 mb-6">
                    {isEditMode ? (
                        <>
                            <button
                                onClick={handleDelete}
                                disabled={selectedPartyIds.length === 0 || deletePartyMutation.isPending}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Trash2 size={16} />
                                <span>{selectedPartyIds.length}개 삭제하기</span>
                            </button>
                            <button
                                onClick={toggleEditMode}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white rounded-xl transition-all font-bold text-sm"
                            >
                                취소
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={toggleEditMode}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 text-gray-400 hover:bg-zinc-800 hover:text-white rounded-xl transition-all font-bold text-sm border border-zinc-800"
                        >
                            <Settings size={16} />
                            <span>파티 관리</span>
                        </button>
                    )}
                </div>
            )}

            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {filteredParties.length > 0 ? (
                    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6`}>
                        {filteredParties.map((party) => {
                            const isSelectable = !party.isActive; // Only inactive parties can be deleted (assuming active=live)
                            const isSelected = selectedPartyIds.includes(party.id);

                            return (
                                <div key={party.id} className="relative group">
                                    <div
                                        className={`transition-all duration-300 ${isEditMode && party.isActive ? 'opacity-30 grayscale pointer-events-none' : ''}`}
                                        onClick={() => {
                                            if (isEditMode && isSelectable) {
                                                toggleSelection(party.id);
                                            }
                                        }}
                                    >
                                        <div className={`relative ${getAspectRatio(party.platform)} ${isEditMode && isSelectable ? 'cursor-pointer' : ''}`}>
                                            <PartyCard party={party} />

                                            {/* Edit Mode Overlay */}
                                            {isEditMode && isSelectable && (
                                                <div className={`absolute inset-0 rounded-[20px] transition-all duration-200 flex items-center justify-center
                                                    ${isSelected ? 'bg-primary/20 ring-4 ring-primary' : 'bg-black/40 hover:bg-black/20'}
                                                `}>
                                                    <div className={`transform transition-all duration-200 ${isSelected ? 'scale-110' : 'scale-100 hover:scale-110'}`}>
                                                        {isSelected ? (
                                                            <CheckCircle2 size={48} className="text-primary fill-primary-foreground" />
                                                        ) : (
                                                            <Circle size={48} className="text-white/50" />
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Active Party Warning in Edit Mode */}
                                    {isEditMode && party.isActive && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white/70 z-10 pointer-events-none">
                                            <AlertCircle size={12} className="text-green-500" />
                                            <span>진행중</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center text-gray-400 font-medium">
                        생성한 파티가 없습니다.
                    </div>
                )}
            </div>
        </section>
    );
}

