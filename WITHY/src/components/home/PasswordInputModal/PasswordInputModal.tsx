import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, CheckCircle2, Hash } from 'lucide-react';

interface PasswordInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void | Promise<void>;
    title: string;
}

const PasswordInputModal = ({ isOpen, onClose, onConfirm, title }: PasswordInputModalProps) => {
    const [password, setPassword] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setPassword("");
            // Focus input after a short delay to allow animation
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) return;
        onConfirm(password);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-sm rounded-[32px] shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-6 py-4 bg-card flex justify-between items-center border-b border-border">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Lock size={14} className="text-primary" />
                        </div>
                        <h2 className="text-base font-bold text-foreground tracking-tight">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        type="button"
                        className="p-1.5 bg-secondary rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
                            Enter Passcode
                        </label>
                        <div className="flex items-center bg-black/40 rounded-[20px] px-4 py-3 border-2 border-border focus-within:border-primary/50 focus-within:bg-black/60 focus-within:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] transition-all">
                            <Hash className="text-muted-foreground mr-3 shrink-0" size={18} />
                            <input
                                ref={inputRef}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"
                                autoComplete="off"
                                className="bg-transparent border-none focus:ring-0 w-full font-bold text-lg text-white placeholder:text-muted-foreground py-2"
                            />
                        </div>
                        <p className="text-[11px] text-muted-foreground px-1">
                            호스트가 설정한 비밀번호를 입력해주세요.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={!password.trim()}
                        className="w-full py-3.5 bg-white text-black rounded-[20px] text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg disabled:bg-zinc-800 disabled:text-zinc-600 disabled:shadow-none hover:bg-gray-100"
                    >
                        <span className="mt-0.5">입장하기</span>
                        <CheckCircle2 size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordInputModal;
