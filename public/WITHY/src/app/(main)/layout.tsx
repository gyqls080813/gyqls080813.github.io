'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/home/Header/Header';
import Navbar from '@/components/home/Navbar/Navbar';
import CreatePartyModal from '@/components/home/CreatePartyModal/CreatePartyModal';
import ActivePartyExitModal from '@/components/home/ActivePartyExitModal/ActivePartyExitModal';
import { useUIStore } from '@/store/uiStore';
import { useGuardedNavigation } from '@/hooks/useGuardedNavigation';

import { Suspense } from 'react';

// Inner component that uses searchParams
function MainLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { isSidebarOpen, isCreatePartyOpen, toggleSidebar, openCreateParty, closeCreateParty } = useUIStore();

    // Guarded navigation for party exit
    const {
        guardedNavigate,
        isExitModalOpen,
        closeModal,
        pendingDestination,
        partyIdToLeave
    } = useGuardedNavigation();

    const platform = searchParams.get('platform') || undefined;

    const handleFilterChange = (newPlatform: string, newCategory?: string, newLabel?: string) => {
        const params = new URLSearchParams();
        if (newPlatform && newPlatform !== '홈') {
            params.set('platform', newPlatform);
        }
        if (newCategory && newCategory !== 'ALL') {
            params.set('category', newCategory);
        }
        if (newLabel) {
            params.set('label', newLabel);
        }

        const queryString = params.toString();
        const dest = queryString ? `/home?${queryString}` : '/home';

        // Use guarded navigation
        guardedNavigate(dest);
    };

    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set('search', query);
        } else {
            params.delete('search');
        }
        router.push(`/home?${params.toString()}`);
    };

    // Guarded openCreateParty
    const handleOpenCreateParty = () => {
        // [Modified] 파티에 있더라도 모달은 먼저 열고, 생성 시점에 퇴장 로직을 수행하도록 변경
        openCreateParty();
    };



    const currentLabel = searchParams.get('label') || (pathname === '/home' && !platform ? '홈' : '');
    const activePlatform = platform || (pathname === '/home' ? '홈' : '');

    return (
        <div className="flex flex-col h-screen bg-background relative overflow-hidden">
            <Header
                onSearch={handleSearch}
                onOpenCreateParty={handleOpenCreateParty}
                onToggleSidebar={toggleSidebar}
            />

            <div className="flex flex-1 overflow-hidden">
                <Navbar
                    onFilterChange={handleFilterChange}
                    isOpen={isSidebarOpen}
                    currentFilter={currentLabel}
                    activePlatform={activePlatform}
                />

                <main className={`flex-1 overflow-y-auto scrollbar-hide ${pathname === '/home' ? 'px-10 pt-4 pb-12' : ''}`}>
                    <div className="max-w-[2300px] mx-auto w-full h-full">
                        {children}
                    </div>
                </main>
            </div>

            {isCreatePartyOpen && <CreatePartyModal onClose={closeCreateParty} />}

            {isExitModalOpen && partyIdToLeave && (
                <ActivePartyExitModal
                    partyId={partyIdToLeave}
                    onClose={closeModal}
                    redirectPath={pendingDestination || '/home'}
                />
            )}
        </div>
    );
}

// Default export wraps the content in Suspense
export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="flex h-screen w-full bg-background" />}>
            <MainLayoutContent>{children}</MainLayoutContent>
        </Suspense>
    );
}
