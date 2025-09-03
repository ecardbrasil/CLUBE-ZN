import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ValidationResult {
    status: 'success' | 'error' | 'info';
    message: string;
    data?: {
        customerName: string;
        offerTitle: string;
        validatedAt: string;
    }
}

const getPendingSync = (): string[] => {
    try {
        const item = localStorage.getItem('pendingSync');
        return item ? JSON.parse(item) : [];
    } catch (error) {
        return [];
    }
};

const setPendingSync = (codes: string[]) => {
    localStorage.setItem('pendingSync', JSON.stringify(codes));
};


const CouponValidator: React.FC = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ValidationResult | null>(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const { addToast } = useToast();

    const syncOfflineCoupons = useCallback(async () => {
        const pendingCodes = getPendingSync();
        if (pendingCodes.length === 0) return;

        addToast(`Sincronizando ${pendingCodes.length} cupom(ns) validado(s) offline...`, 'success');
        
        try {
            const response = await fetch('/api/sync-cupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codes: pendingCodes }),
            });
            const data = await response.json();
            if (response.ok) {
                addToast('Sincronização concluída com sucesso!', 'success');
                if (data.failed && data.failed.length > 0) {
                     addToast(`${data.failed.length} cupons falharam na sincronização.`, 'error');
                }
                setPendingSync([]); // Limpa a fila
            } else {
                throw new Error(data.error || 'Falha na sincronização.');
            }
        } catch (error: any) {
            addToast(`Erro na sincronização: ${error.message}`, 'error');
        }
    }, [addToast]);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            syncOfflineCoupons();
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        // Sincroniza ao carregar a página, caso já esteja online
        if(isOnline) {
            syncOfflineCoupons();
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [isOnline, syncOfflineCoupons]);
    

    const handleValidate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length < 6) {
            setResult({ status: 'error', message: 'O código deve ter 6 caracteres.' });
            return;
        }
        setResult(null);
        setLoading(true);

        if (isOnline) {
            try {
                const response = await fetch('/api/validar-cupom', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: code.toUpperCase() }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error);
                }
                setResult({ status: 'success', message: data.message, data: data.validationData });
                setCode('');
            } catch (error: any) {
                const errorMessage = error.message.toLowerCase().includes('failed to fetch')
                    ? 'Não foi possível conectar ao servidor. Verifique sua conexão.'
                    : error.message || 'Ocorreu um erro.';
                setResult({ status: 'error', message: errorMessage });
            } finally {
                setLoading(false);
            }
        } else {
            // Lógica Offline
            const pendingCodes = getPendingSync();
            if (!pendingCodes.includes(code.toUpperCase())) {
                pendingCodes.push(code.toUpperCase());
                setPendingSync(pendingCodes);
            }
            setResult({ status: 'info', message: `Você está offline. O cupom ${code.toUpperCase()} foi salvo e será validado assim que a conexão for restaurada.` });
            setCode('');
            setLoading(false);
        }
    };
    
    const inputClasses = "text-center w-full tracking-[.5em] font-mono text-2xl uppercase px-4 py-3 bg-white border-2 border-border rounded-xl text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-text-secondary disabled:bg-gray-100";
    
    return (
        <section aria-labelledby="validator-heading" className="max-w-md mx-auto">
            <div className="bg-surface p-8 rounded-2xl border border-border text-center">
                 {!isOnline && (
                    <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 text-sm rounded-lg">
                        Você está offline. Os cupons serão validados quando a conexão voltar.
                    </div>
                )}
                <CheckBadgeIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h1 id="validator-heading" className="text-3xl font-bold text-text-primary mb-2">Validar Cupom</h1>
                <p className="text-md text-text-secondary mb-6">
                    Digite o código apresentado pelo cliente para validar o desconto.
                </p>

                <form onSubmit={handleValidate} className="space-y-4">
                    <input 
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        maxLength={6}
                        placeholder="ABC123"
                        className={inputClasses}
                        disabled={loading}
                        required
                    />
                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Validando...' : 'Validar'}
                    </button>
                </form>
            </div>

            {result && (
                <div className={`mt-6 p-6 rounded-2xl border animate-modal-in ${
                    result.status === 'success' ? 'bg-green-50 border-green-200' : 
                    result.status === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                }`}>
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            {result.status === 'success' && <CheckCircleIcon className="h-6 w-6 text-green-500" />}
                            {result.status === 'error' && <XCircleIcon className="h-6 w-6 text-red-500" />}
                            {result.status === 'info' && <CheckBadgeIcon className="h-6 w-6 text-blue-500" />}
                        </div>
                        <div className="text-left">
                            <p className={`font-bold ${
                                result.status === 'success' ? 'text-green-800' :
                                result.status === 'error' ? 'text-red-800' : 'text-blue-800'
                            }`}>
                                {result.status === 'success' ? 'Cupom Válido!' : result.status === 'error' ? 'Falha na Validação' : 'Aviso'}
                            </p>
                            <p className="text-sm text-text-secondary">{result.message}</p>
                            {result.data && (
                                <div className="mt-3 pt-3 border-t border-gray-300/50 text-sm space-y-1">
                                    <p><strong>Cliente:</strong> {result.data.customerName}</p>
                                    <p><strong>Oferta:</strong> {result.data.offerTitle}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CouponValidator;