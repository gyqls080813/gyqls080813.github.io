import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'error' | 'success' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

const TOAST_DURATION = 3500;

const ICONS: Record<ToastType, string> = {
  error: '⚠️',
  success: '✅',
  info: 'ℹ️',
};

const BG_COLORS: Record<ToastType, string> = {
  error: 'rgba(220, 53, 69, 0.95)',
  success: 'rgba(40, 167, 69, 0.95)',
  info: 'rgba(49, 130, 246, 0.95)',
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, type: ToastType = 'error') => {
    const id = ++idRef.current;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        maxWidth: '90vw',
        width: '400px',
      }}>
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => dismiss(toast.id)}
              style={{
                background: BG_COLORS[toast.type],
                color: '#fff',
                padding: '14px 20px',
                borderRadius: '14px',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                pointerEvents: 'auto',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: '1.2em' }}>{ICONS[toast.type]}</span>
              <span style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</span>
              <span style={{ opacity: 0.7, fontSize: '0.8em' }}>✕</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
