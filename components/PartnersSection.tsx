
import React from 'react';
import PartnerListings from './PartnerListings';

const PartnersSection: React.FC = () => {
  return (
    <section id="parceiros" className="py-16 bg-background sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-text-primary">Nossos Parceiros</h2>
          <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">
            Confira os estabelecimentos que oferecem vantagens exclusivas para membros do Clube ZN.
          </p>
        </div>
        <PartnerListings showActionButtons={false} />
      </div>
    </section>
  );
};

export default PartnersSection;
