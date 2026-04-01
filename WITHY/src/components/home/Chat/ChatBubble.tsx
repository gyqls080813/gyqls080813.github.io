import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatBubbleProps {
    onClick: () => void;
    hasUnread?: boolean;
}

const ChatBubble = ({ onClick, hasUnread = true }: ChatBubbleProps) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center z-50 animate-in zoom-in duration-300 group"
        >
            <MessageCircle className="w-7 h-7 text-primary-foreground" />

            {hasUnread && (
                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-destructive rounded-full border-2 border-background" />
            )}

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                메시지
            </span>
        </button>
    );
};

export default ChatBubble;
