
import React from 'react';
import PartnerListings from '../components/PartnerListings';

const DashboardPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-text-primary">Painel de Vantagens</h1>
          <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">
            Olá! Explore os benefícios exclusivos que separamos para você.
          </p>
        </div>
        <PartnerListings showActionButtons={true} stickyFilters={true} />
      </div>
    </div>
  );
};

export default DashboardPage;
