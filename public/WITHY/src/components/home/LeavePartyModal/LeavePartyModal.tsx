import React from 'react';
import { X, LogOut, AlertCircle } from 'lucide-react';

interface LeavePartyModalProps {
    onClose: () => void;
    onConfirm: () => void;
    isPending: boolean;
    isHost?: boolean;
    title?: string; // New
    message?: string; // New
    showHostWarning?: boolean; // New
}

const LeavePartyModal = ({
    onClose,
    onConfirm,
    isPending,
    isHost = false,
    title,
    message,
    showHostWarning = true
}: LeavePartyModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-border animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="px-6 py-4 bg-secondary flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-primary rounded-full" />
                        <h2 className="text-lg font-black text-foreground tracking-tight">
                            {title || (isHost ? '파티 삭제하기' : '파티 나가기')}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isPending}
                        className="p-2 bg-muted/50 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-2">
                        <LogOut size={32} className="text-destructive ml-1" />
                    </div>

                    <div className="space-y-2 flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-foreground">
                            {message || (isHost ? '파티를 삭제하시겠습니까?' : '정말 나가시겠습니까?')}
                        </h3>
                        {isHost && showHostWarning && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-2">
                                <p className="text-red-500 text-sm font-bold leading-relaxed whitespace-pre-line">
                                    호스트가 퇴장하면 파티가 삭제됩니다.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-black/20 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isPending}
                        className="flex-1 py-4 bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground rounded-[20px] font-bold transition-all"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isPending}
                        className="flex-1 py-4 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[20px] font-bold shadow-lg shadow-destructive/20 transition-all flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <span className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
                        ) : (
                            <>나가기</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeavePartyModal;
