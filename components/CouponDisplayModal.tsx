import React, { useState, useEffect } from 'react';
import type { Offer, Profile } from '../lib/supabaseClient';
import { useToast } from '../contexts/ToastContext';
import Modal from './Modal';

type OfferWithProfile = Offer & { profiles: Profile };

interface CouponDisplayModalProps {
    isOpen: boolean;
    onClose: () => void;
    offer: OfferWithProfile;
    userId: string;
}

const CountdownTimer: React.FC<{ expiry: string }> = ({ expiry }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(expiry) - +new Date();
        let timeLeft = { minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <span className="font-mono text-lg">
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
    );
};


const CouponDisplayModal: React.FC<CouponDisplayModalProps> = ({ isOpen, onClose, offer, userId }) => {
    const [coupon, setCoupon] = useState<{ code: string; expiresAt: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useToast();

    useEffect(() => {
        if (isOpen) {
            const generateCoupon = async () => {
                setLoading(true);
                setError(null);
                setCoupon(null);
                try {
                    const response = await fetch('http://localhost:4000/api/gerar-cupom', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, offerId: offer.id }),
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.error || 'Falha ao gerar cupom.');
                    }
                    setCoupon(data);
                } catch (err: any) {
                    setError(err.message);
                    addToast(err.message, 'error');
                } finally {
                    setLoading(false);
                }
            };
            generateCoupon();
        }
    }, [isOpen, userId, offer.id, addToast]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full max-w-md p-8 md:p-10 space-y-6 bg-surface rounded-3xl text-center">
                <h2 className="text-2xl font-bold text-text-primary">Seu Cupom de Desconto</h2>
                <p className="text-text-secondary">
                    Apresente o código abaixo no estabelecimento <span className="font-bold">{offer.profiles.company_name}</span> para resgatar sua oferta.
                </p>

                <div className="py-8">
                    {loading && <div className="h-20 flex items-center justify-center"><p>Gerando seu código...</p></div>}
                    {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
                    {coupon && (
                        <div className="space-y-4">
                            <p className="text-lg font-medium text-text-secondary">Seu código é:</p>
                            <div 
                                className="inline-block bg-primary/10 border-2 border-dashed border-primary text-primary font-bold text-4xl tracking-widest px-8 py-4 rounded-xl cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(coupon.code);
                                    addToast('Código copiado!', 'success');
                                }}
                                title="Clique para copiar"
                            >
                                {coupon.code}
                            </div>
                            <div className="text-sm text-text-secondary bg-gray-100 px-4 py-2 rounded-full inline-flex items-center gap-2">
                                <span>Expira em:</span> <CountdownTimer expiry={coupon.expiresAt} />
                            </div>
                        </div>
                    )}
                </div>
                 <button type="button" onClick={onClose} className="w-full flex justify-center py-3 px-4 text-md font-bold rounded-xl text-text-secondary bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                    Fechar
                </button>
            </div>
        </Modal>
    );
};

export default CouponDisplayModal;