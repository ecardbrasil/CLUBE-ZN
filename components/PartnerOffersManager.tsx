
import React, { useState } from 'react';
import { MOCK_OFFERS } from '../constants';
import type { Offer } from '../types';
import Modal from './Modal';
import OfferForm from './OfferForm';
import { PlusIcon } from './icons/PlusIcon';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { TagIcon } from './icons/TagIcon';

const PartnerOffersManager: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>(MOCK_OFFERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

    const handleAddNew = () => {
        setEditingOffer(null);
        setIsModalOpen(true);
    };

    const handleEdit = (offer: Offer) => {
        setEditingOffer(offer);
        setIsModalOpen(true);
    };
    
    const handleDelete = (id: number) => {
        if(confirm('Tem certeza que deseja excluir esta oferta?')) {
            setOffers(offers.filter(o => o.id !== id));
        }
    };

    const handleSaveOffer = (offer: Offer) => {
        if (offer.id === 0) { // New offer
            setOffers([...offers, { ...offer, id: Date.now() }]);
        } else { // Editing offer
            setOffers(offers.map(o => o.id === offer.id ? offer : o));
        }
        setIsModalOpen(false);
    };
    
    const getDiscountText = (offer: Offer) => {
        switch (offer.discountType) {
            case 'percentage':
                return `${offer.discountValue}% OFF`;
            case 'fixed':
                return `R$ ${offer.discountValue},00 OFF`;
            case 'custom':
                return offer.customDiscountText;
            default:
                return '';
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Minhas Ofertas ({offers.length})</h2>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/20"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span>Nova Oferta</span>
                </button>
            </div>
            
            {offers.length > 0 ? (
                <div className="space-y-4">
                    {offers.map(offer => (
                        <div key={offer.id} className="bg-surface border border-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                           <div className="flex-grow">
                                <p className="font-bold text-lg text-text-primary">{offer.title}</p>
                                <p className="text-text-secondary text-sm mb-2">{offer.description}</p>
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full">
                                    <TagIcon className="h-4 w-4" />
                                    <span>{getDiscountText(offer)}</span>
                                </div>
                           </div>
                           <div className="flex items-center gap-3 flex-shrink-0">
                               <button onClick={() => handleEdit(offer)} className="p-2 text-text-secondary hover:text-primary transition-colors"><EditIcon className="h-5 w-5" /></button>
                               <button onClick={() => handleDelete(offer.id)} className="p-2 text-text-secondary hover:text-red-500 transition-colors"><TrashIcon className="h-5 w-5" /></button>
                           </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-surface border border-border rounded-2xl">
                    <p className="text-xl text-text-secondary">Nenhuma oferta cadastrada.</p>
                    <p className="text-gray-400 mt-2">Clique em "Nova Oferta" para começar a atrair clientes.</p>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <OfferForm 
                    offer={editingOffer} 
                    onSave={handleSaveOffer}
                    onClose={() => setIsModalOpen(false)} 
                />
            </Modal>
        </div>
    );
};

export default PartnerOffersManager;
