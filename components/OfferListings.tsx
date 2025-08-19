import React, { useState, useMemo, useEffect } from 'react';
import type { Offer, Profile } from '../lib/supabaseClient';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../contexts/ToastContext';
import type { AuthSession } from '@supabase/supabase-js';

import OfferCard from './OfferCard';
import OfferCardSkeleton from './OfferCardSkeleton';
import { SearchIcon } from './icons/SearchIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { SortAscendingIcon } from './icons/SortAscendingIcon';

type OfferWithProfile = Offer & { profiles: Profile | null };

interface OfferListingsProps {
    session: AuthSession;
}

const OfferListings: React.FC<OfferListingsProps> = ({ session }) => {
    const [offers, setOffers] = useState<OfferWithProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [sortBy, setSortBy] = useState<'created_at' | 'percentage' | 'fixed'>('created_at');
    const { addToast } = useToast();

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('offers')
                    .select('*, profiles(*)');

                if (error) throw error;
                
                // Filtra ofertas onde o perfil do parceiro existe
                const validOffers = data.filter(offer => offer.profiles);
                setOffers(validOffers as OfferWithProfile[]);
            } catch (error: any) {
                console.error('Error fetching offers:', error.message || error);
                addToast('Erro ao carregar as ofertas.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, [addToast]);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(offers.map(o => o.profiles?.category).filter(Boolean) as string[]);
        return ['Todos', ...Array.from(uniqueCategories)];
    }, [offers]);

    const processedOffers = useMemo(() => {
        let filtered = offers.filter(offer => {
            if (!offer.profiles) return false;
            const matchesCategory = selectedCategory === 'Todos' || offer.profiles.category === selectedCategory;
            const searchTermLower = searchTerm.toLowerCase();
            const matchesSearch =
                offer.title.toLowerCase().includes(searchTermLower) ||
                (offer.description && offer.description.toLowerCase().includes(searchTermLower)) ||
                offer.profiles.company_name?.toLowerCase().includes(searchTermLower);
            return matchesCategory && matchesSearch;
        });

        switch (sortBy) {
            case 'percentage':
                filtered.sort((a, b) => {
                    const valA = a.discount_type === 'percentage' ? a.discount_value || 0 : -1;
                    const valB = b.discount_type === 'percentage' ? b.discount_value || 0 : -1;
                    return valB - valA;
                });
                break;
            case 'fixed':
                filtered.sort((a, b) => {
                    const valA = a.discount_type === 'fixed' ? a.discount_value || 0 : -1;
                    const valB = b.discount_type === 'fixed' ? b.discount_value || 0 : -1;
                    return valB - valA;
                });
                break;
            case 'created_at':
            default:
                filtered.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());
                break;
        }

        return filtered;
    }, [searchTerm, selectedCategory, sortBy, offers]);

    const handleLocationClick = () => {
        addToast('Funcionalidade de localização em breve!', 'success');
    };

    const filterClasses = "sticky top-[81px] bg-background/90 backdrop-blur-sm py-4 z-30";

    return (
        <>
            <div className={`mb-12 space-y-6 ${filterClasses}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    <div className="relative lg:col-span-2">
                        <input
                            type="text"
                            placeholder="Buscar por oferta ou parceiro..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-surface px-5 py-3 pl-12 rounded-full text-text-primary border border-border focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                            aria-label="Buscar ofertas"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-text-secondary" />
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="w-full bg-surface px-5 py-3 pl-12 rounded-full text-text-primary border border-border focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 appearance-none"
                            aria-label="Ordenar ofertas por"
                        >
                            <option value="created_at">Mais Recentes</option>
                            <option value="percentage">Maior Desconto (%)</option>
                            <option value="fixed">Maior Desconto (R$)</option>
                        </select>
                         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <SortAscendingIcon className="h-5 w-5 text-text-secondary" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                     <button
                        onClick={handleLocationClick}
                        className="flex items-center gap-2 px-5 py-2 text-sm sm:text-base font-bold rounded-full transition-all duration-300 bg-primary/10 text-primary hover:bg-primary/20 shadow-sm"
                    >
                        <MapPinIcon className="h-5 w-5" />
                        <span>Perto de Mim</span>
                    </button>
                    <div className="w-px h-6 bg-border mx-2"></div>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'bg-surface text-text-secondary hover:bg-gray-100 border border-border'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => <OfferCardSkeleton key={i} />)}
                </div>
            ) : processedOffers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {processedOffers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} session={session} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-text-secondary">Nenhuma oferta encontrada.</p>
                    <p className="text-gray-400 mt-2">Tente ajustar sua busca ou filtros.</p>
                </div>
            )}
        </>
    );
};

export default OfferListings;
