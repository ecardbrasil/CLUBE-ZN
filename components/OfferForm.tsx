
import React, { useState, useEffect } from 'react';
import type { Offer } from '../types';
import { TagIcon } from './icons/TagIcon';

interface OfferFormProps {
    offer: Offer | null;
    onSave: (offer: Offer) => void;
    onClose: () => void;
}

const OfferForm: React.FC<OfferFormProps> = ({ offer, onSave, onClose }) => {
    const [formData, setFormData] = useState<Offer>({
        id: 0,
        title: '',
        description: '',
        discountType: 'percentage',
        discountValue: null,
        customDiscountText: '',
    });

    useEffect(() => {
        if (offer) {
            setFormData(offer);
        } else {
            setFormData({
                id: 0,
                title: '',
                description: '',
                discountType: 'percentage',
                discountValue: null,
                customDiscountText: '',
            });
        }
    }, [offer]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'discountValue' ? (value === '' ? null : parseFloat(value)) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    const inputClasses = "w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-text-secondary";

    return (
        <div className="w-full max-w-lg p-8 md:p-10 space-y-6 bg-surface rounded-3xl max-h-[90vh] overflow-y-auto">
            <div className="text-center">
                <TagIcon className="h-10 w-10 text-primary mx-auto" />
                <h2 className="mt-4 text-3xl font-extrabold text-text-primary">
                    {offer ? 'Editar Oferta' : 'Nova Oferta'}
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                    Preencha os detalhes do benefício que você irá oferecer.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input name="title" type="text" required placeholder="Título da Oferta (ex: Corte de Cabelo)" className={inputClasses} value={formData.title} onChange={handleInputChange} />
                <textarea name="description" rows={3} placeholder="Descrição curta da oferta..." className={`${inputClasses} resize-y`} value={formData.description} onChange={handleInputChange} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Tipo de Desconto</label>
                        <select name="discountType" value={formData.discountType} onChange={handleInputChange} className={inputClasses}>
                            <option value="percentage">Percentual (%)</option>
                            <option value="fixed">Valor Fixo (R$)</option>
                            <option value="custom">Customizado</option>
                        </select>
                    </div>
                    <div>
                         {formData.discountType === 'percentage' && (
                             <>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Valor do Desconto (%)</label>
                                <input name="discountValue" type="number" placeholder="Ex: 15" className={inputClasses} value={formData.discountValue ?? ''} onChange={handleInputChange} />
                             </>
                         )}
                         {formData.discountType === 'fixed' && (
                             <>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Valor do Desconto (R$)</label>
                                <input name="discountValue" type="number" placeholder="Ex: 10" className={inputClasses} value={formData.discountValue ?? ''} onChange={handleInputChange} />
                             </>
                         )}
                         {formData.discountType === 'custom' && (
                             <>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Texto da Oferta</label>
                                <input name="customDiscountText" type="text" placeholder="Ex: Leve 2 Pague 1" className={inputClasses} value={formData.customDiscountText} onChange={handleInputChange} />
                             </>
                         )}
                    </div>
                </div>

                <div className="pt-2 space-y-3">
                     <button type="submit" className="w-full flex justify-center py-3 px-4 text-lg font-bold rounded-xl text-white bg-primary hover:opacity-90 transition-opacity duration-300">
                        Salvar Oferta
                    </button>
                    <button type="button" onClick={onClose} className="w-full flex justify-center py-3 px-4 text-md font-bold rounded-xl text-text-secondary bg-surface hover:bg-gray-100 transition-colors duration-300">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OfferForm;
