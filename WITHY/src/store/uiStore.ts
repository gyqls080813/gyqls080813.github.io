import { create } from 'zustand';

interface UIState {
    isSidebarOpen: boolean;
    isCreatePartyOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    openCreateParty: () => void;
    closeCreateParty: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isSidebarOpen: true,
    isCreatePartyOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    openCreateParty: () => set({ isCreatePartyOpen: true }),
    closeCreateParty: () => set({ isCreatePartyOpen: false }),
}));
