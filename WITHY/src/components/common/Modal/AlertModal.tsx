import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}

const AlertModal = ({ isOpen, onClose, title = "알림", message }: AlertModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[24px] shadow-2xl p-6 w-[320px] md:w-[400px] flex flex-col gap-4 animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle size={24} />
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="py-2">
                    <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">
                        {message}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
