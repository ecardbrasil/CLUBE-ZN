
import React, { useState, useMemo, useEffect } from 'react';
import type { Profile } from '../types';
import PartnerCard from './PartnerCard';
import { SearchIcon } from './icons/SearchIcon';
import { supabase } from '../lib/supabaseClient';
import PartnerCardSkeleton from './PartnerCardSkeleton';

interface PartnerListingsProps {
    showActionButtons: boolean;
    stickyFilters?: boolean;
}

const PartnerListings: React.FC<PartnerListingsProps> = ({ showActionButtons, stickyFilters = false }) => {
    const [partners, setPartners] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    useEffect(() => {
        const fetchPartners = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_type', 'partner');

            if (error) {
                console.error('Error fetching partners:', error);
            } else {
                setPartners(data || []);
            }
            setLoading(false);
        };
        fetchPartners();
    }, []);

    const categories = useMemo(() => ['Todos', ...new Set(partners.map((p) => p.category).filter(Boolean) as string[])], [partners]);

    const filteredPartners = useMemo(() => {
        return partners.filter((partner) => {
            const matchesCategory = selectedCategory === 'Todos' || partner.category === selectedCategory;
            const matchesSearch =
                partner.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                partner.category?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory, partners]);

    const filterClasses = stickyFilters ? "sticky top-[81px] bg-background/90 backdrop-blur-sm py-4 z-30" : "";

    return (
        <>
            <div className={`mb-12 space-y-6 ${filterClasses}`}>
                <div className="relative max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Buscar por nome ou categoria..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-surface px-5 py-3 pl-12 rounded-full text-text-primary border border-border focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        aria-label="Buscar parceiros"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-text-secondary" />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
                    {Array.from({ length: 6 }).map((_, i) => <PartnerCardSkeleton key={i} />)}
                </div>
            ) : filteredPartners.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPartners.map((partner: Profile) => (
                        <PartnerCard key={partner.id} partner={partner} showActionButton={showActionButtons} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-text-secondary">Nenhum parceiro encontrado.</p>
                    <p className="text-gray-400 mt-2">Tente ajustar sua busca ou filtro.</p>
                </div>
            )}
        </>
    );
};

export default PartnerListings;
