
import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { XIcon } from '../components/icons/XIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { XCircleIcon } from '../components/icons/XCircleIcon';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error';
}

interface ToastContextType {
    addToast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const Toast: React.FC<{ message: string, type: 'success' | 'error', onClose: () => void }> = ({ message, type, onClose }) => {
    const baseClasses = "flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow-lg";
    const typeClasses = {
        success: "text-green-500",
        error: "text-red-500",
    };
    const Icon = type === 'success' ? CheckCircleIcon : XCircleIcon;
    
    return (
        <div className={`${baseClasses} animate-modal-in`} role="alert">
            <Icon className={`w-7 h-7 ${typeClasses[type]}`} />
            <div className="pl-4 text-sm font-normal text-text-primary">{message}</div>
             <button
                onClick={onClose}
                className="p-1.5 -mr-2 ml-auto text-text-secondary hover:text-text-primary transition-colors z-10 rounded-lg hover:bg-gray-100"
                aria-label="Fechar"
            >
                <XIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: 'success' | 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 5000); // Auto-dismiss after 5 seconds
    }, []);
    
    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-5 right-5 z-50 space-y-3">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
