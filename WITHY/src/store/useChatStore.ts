import { create } from 'zustand';
import { Friend } from '@/components/home/FriendList/FriendList';

interface ChatState {
    isOpen: boolean;
    isMinimized: boolean;
    activeFriend: Friend | null;
    openChat: (friend?: Friend) => void;
    closeChat: () => void;
    minimizeChat: () => void;
    toggleChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    isOpen: false,
    isMinimized: false,
    activeFriend: null,

    openChat: (friend) => set((state) => ({
        isOpen: true,
        isMinimized: false,
        activeFriend: friend || state.activeFriend // Keep existing friend if none provided, or should it clear? Usually providing null clears it. 
        // If friend is undefined, we just open. If null passed explicitly? the type says friend?: Friend.
    })),

    closeChat: () => set({ isOpen: false, activeFriend: null }),

    minimizeChat: () => set({ isOpen: false, isMinimized: true }), // Minimized might mean just hidden but keeping state? 
    // In Header.tsx logic was: isOpen: false. 
    // If we want "minimized" UI, we might need to keep isOpen true but isMinimized true. 
    // However, looking at previous Header.tsx: onMinimize={() => setChatState({ ...chatState, isOpen: false })}
    // So "minimize" effectively closed it. I will keep it consistent with previous behavior for now.

    toggleChat: () => set((state) => ({
        isOpen: !state.isOpen,
        isMinimized: false
        // If closing, should we clear friend? activeFriend: state.isOpen ? null : state.activeFriend 
        // Header logic: isOpen: !prev.isOpen, isMinimized: false. activeFriend preserved?
        // Header Logic: setChatState(prev => ({ ...prev, isOpen: !prev.isOpen, isMinimized: false }));
        // It preserved activeFriend.
    })),
}));
