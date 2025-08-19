
import React, { useState, useMemo } from 'react';
import { PARTNERS } from '../constants';
import type { Partner } from '../types';
import PartnerCard from '../components/PartnerCard';
import { SearchIcon } from '../components/icons/SearchIcon';

const DashboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => ['Todos', ...new Set(PARTNERS.map((p) => p.category))], []);

  const filteredPartners = useMemo(() => {
    return PARTNERS.filter((partner) => {
      const matchesCategory = selectedCategory === 'Todos' || partner.category === selectedCategory;
      const matchesSearch =
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-text-primary">Painel de Vantagens</h1>
          <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">
            Olá! Explore os benefícios exclusivos que separamos para você.
          </p>
        </div>

        {/* Filters and Search UI */}
        <div className="mb-12 space-y-6 sticky top-[81px] bg-background/90 backdrop-blur-sm py-4 z-30">
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

        {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPartners.map((partner: Partner) => (
                    <PartnerCard key={partner.id} partner={partner} showActionButton={true} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-xl text-text-secondary">Nenhum parceiro encontrado.</p>
                <p className="text-gray-400 mt-2">Tente ajustar sua busca ou filtro.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
